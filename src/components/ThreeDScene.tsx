import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../types';

interface ThreeDSceneProps {
  theme: ThemeMode;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export const ThreeDScene: React.FC<ThreeDSceneProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized from -1 to 1
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color definitions per theme
    const themeColors: Record<ThemeMode, { primary: string; secondary: string; glow: string }> = {
      aurora: {
        primary: 'rgba(99, 102, 241, 0.75)',    // Indigo
        secondary: 'rgba(168, 85, 247, 0.65)',  // Violet
        glow: 'rgba(6, 182, 212, 0.4)',        // Cyan
      },
      midnight: {
        primary: 'rgba(34, 211, 238, 0.85)',   // Neon Cyan
        secondary: 'rgba(168, 85, 247, 0.8)',   // Neon Purple
        glow: 'rgba(232, 121, 249, 0.6)',      // Magenta
      },
      sunset: {
        primary: 'rgba(244, 63, 94, 0.8)',     // Rose
        secondary: 'rgba(245, 158, 11, 0.75)',  // Amber
        glow: 'rgba(251, 146, 60, 0.5)',       // Coral
      },
      emerald: {
        primary: 'rgba(16, 185, 129, 0.8)',    // Mint
        secondary: 'rgba(6, 182, 212, 0.75)',   // Teal
        glow: 'rgba(52, 211, 153, 0.5)',       // Bright Mint
      },
    };

    const colors = themeColors[theme] || themeColors.aurora;

    // Define vertices for a 3D Icosahedron
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseIcosahedron: Point3D[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ];

    // Edges connecting vertices of the icosahedron
    const icosahedronEdges: [number, number][] = [];
    for (let i = 0; i < baseIcosahedron.length; i++) {
      for (let j = i + 1; j < baseIcosahedron.length; j++) {
        const dx = baseIcosahedron[i].x - baseIcosahedron[j].x;
        const dy = baseIcosahedron[i].y - baseIcosahedron[j].y;
        const dz = baseIcosahedron[i].z - baseIcosahedron[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (Math.abs(dist - 2) < 0.1) {
          icosahedronEdges.push([i, j]);
        }
      }
    }

    // Floating 3D Starfield Nodes in 3D Space
    const starCount = 55;
    const stars: Point3D[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1200,
        z: Math.random() * 800 - 200,
      });
    }

    let rotAngleX = 0;
    let rotAngleY = 0;
    let rotAngleZ = 0;

    // 3D Rotation Matrix functions
    const rotatePoint = (p: Point3D, ax: number, ay: number, az: number): Point3D => {
      // Rotate around X
      let y1 = p.y * Math.cos(ax) - p.z * Math.sin(ax);
      let z1 = p.y * Math.sin(ax) + p.z * Math.cos(ax);

      // Rotate around Y
      let x2 = p.x * Math.cos(ay) + z1 * Math.sin(ay);
      let z2 = -p.x * Math.sin(ay) + z1 * Math.cos(ay);

      // Rotate around Z
      let x3 = x2 * Math.cos(az) - y1 * Math.sin(az);
      let y3 = x2 * Math.sin(az) + y1 * Math.cos(az);

      return { x: x3, y: y3, z: z2 };
    };

    // 3D Perspective Projection to 2D Screen
    const project = (p: Point3D, fov: number, cx: number, cy: number) => {
      const cameraDist = 650;
      const factor = fov / (cameraDist + p.z);
      return {
        x: p.x * factor + cx,
        y: p.y * factor + cy,
        scale: factor,
        depth: p.z,
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      rotAngleX += 0.006 + mouseRef.current.y * 0.005;
      rotAngleY += 0.009 + mouseRef.current.x * 0.005;
      rotAngleZ += 0.003;

      // 1. Render 3D Floating Stars with Z-depth sizing
      for (let s of stars) {
        // Slowly advance stars in Z space for continuous flight feel
        s.z -= 0.6;
        if (s.z < -200) s.z = 600;

        const proj = project(s, 500, width / 2, height / 2);
        if (proj.scale > 0) {
          const alpha = Math.max(0.1, Math.min(0.8, 1 - s.z / 600));
          const size = Math.max(1, proj.scale * 3);

          ctx.beginPath();
          ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
          ctx.fillStyle = colors.glow.replace(/[\d.]+\)$/, `${alpha})`);
          ctx.fill();
        }
      }

      // 2. Render Left 3D Wireframe Icosahedron
      const scale1 = Math.min(width, height) * 0.16;
      const cx1 = width * 0.18;
      const cy1 = height * 0.32;

      const transformedVertices1 = baseIcosahedron.map(v => {
        const scaled = { x: v.x * scale1, y: v.y * scale1, z: v.z * scale1 };
        return rotatePoint(scaled, rotAngleX, rotAngleY, rotAngleZ);
      });

      const projectedVertices1 = transformedVertices1.map(v => project(v, 600, cx1, cy1));

      // Draw Edges
      ctx.save();
      ctx.shadowColor = colors.primary;
      ctx.shadowBlur = 12;
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = colors.primary;

      for (let [i, j] of icosahedronEdges) {
        const p1 = projectedVertices1[i];
        const p2 = projectedVertices1[j];

        // Only draw if in front of camera
        if (p1.scale > 0 && p2.scale > 0) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Draw Glowing Vertex Joints
      for (let p of projectedVertices1) {
        if (p.scale > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = colors.secondary;
          ctx.fill();
        }
      }
      ctx.restore();

      // 3. Render Right 3D Gyroscopic Orbital Rings
      const cx2 = width * 0.84;
      const cy2 = height * 0.65;
      const ringRadius = Math.min(width, height) * 0.18;

      ctx.save();
      ctx.shadowColor = colors.secondary;
      ctx.shadowBlur = 15;

      const ringAngles = [
        { ax: rotAngleX * 1.2, ay: rotAngleY * 0.8, color: colors.primary },
        { ax: -rotAngleX * 0.9, ay: rotAngleY * 1.3, color: colors.secondary },
        { ax: rotAngleX * 0.7, ay: -rotAngleY * 1.1, color: colors.glow },
      ];

      for (let ring of ringAngles) {
        ctx.beginPath();
        const segments = 40;
        for (let k = 0; k <= segments; k++) {
          const theta = (k / segments) * Math.PI * 2;
          const p = {
            x: Math.cos(theta) * ringRadius,
            y: Math.sin(theta) * ringRadius,
            z: 0,
          };
          const rotated = rotatePoint(p, ring.ax, ring.ay, rotAngleZ * 0.5);
          const proj = project(rotated, 600, cx2, cy2);

          if (k === 0) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full"
    />
  );
};
