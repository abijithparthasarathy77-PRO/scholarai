import React, { useRef, useEffect, useState, useCallback } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Network, ZoomIn, ZoomOut, RotateCcw, Info, Sparkles } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  sublabel?: string;
  category: 'student' | 'attribute' | 'scholarship' | 'priority' | 'pipeline' | 'funding';
  x: number;
  y: number;
  radius: number;
  color: string;
  glow: string;
  details: string;
}

interface Edge {
  source: string;
  target: string;
  color: string;
  strength?: number;
}

export const OpportunityMap: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const particleOffset = useRef<number>(0);

  // Nodes graph layout
  const nodes: Node[] = [
    // Center Student
    {
      id: 'student-root',
      label: 'AARAV SHARMA',
      sublabel: 'Student Core',
      category: 'student',
      x: 0,
      y: 0,
      radius: 34,
      color: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.9)',
      details: "2nd Year B.Com (Honours) at St. Xavier's College, Mumbai. Overall Profile Completeness: 92%."
    },
    // Attributes Layer
    {
      id: 'attr-acad',
      label: 'Academic: 86%',
      sublabel: 'GPA 3.82',
      category: 'attribute',
      x: -160,
      y: -100,
      radius: 22,
      color: '#22D3EE',
      glow: 'rgba(34, 211, 238, 0.8)',
      details: "Verified 1st year marksheet aggregate 86.4% across 8 modules."
    },
    {
      id: 'attr-fin',
      label: 'Income: ₹3.2L',
      sublabel: 'EWS Tier',
      category: 'attribute',
      x: -180,
      y: 50,
      radius: 22,
      color: '#FBBF24',
      glow: 'rgba(251, 191, 36, 0.8)',
      details: 'Household income ₹3.20 Lakhs per annum qualifying for low-income & EWS schemes.'
    },
    {
      id: 'attr-loc',
      label: 'Maharashtra',
      sublabel: 'Mumbai Domicile',
      category: 'attribute',
      x: -90,
      y: 150,
      radius: 20,
      color: '#34D399',
      glow: 'rgba(52, 211, 153, 0.8)',
      details: 'Resident of Mumbai, Maharashtra. Unlocks state-specific statutory fee benefits.'
    },
    {
      id: 'attr-deg',
      label: 'B.Com Hons',
      sublabel: 'Commerce UG',
      category: 'attribute',
      x: -70,
      y: -160,
      radius: 20,
      color: '#A855F7',
      glow: 'rgba(168, 85, 247, 0.8)',
      details: 'Accredited 3-year undergraduate degree program with financial/analytical curriculum.'
    },

    // Matching Engine Hub
    {
      id: 'ai-engine',
      label: '5D AI ENGINE',
      sublabel: 'Multi-Factor Matching',
      category: 'priority',
      x: 140,
      y: -20,
      radius: 28,
      color: '#22D3EE',
      glow: 'rgba(34, 211, 238, 0.9)',
      details: 'Multi-layer algorithm calculating Academic, Degree, Domicile, Financial, and Category alignment.'
    },

    // Scholarship Matches
    {
      id: 'sch-tata',
      label: 'Tata Merit',
      sublabel: '94% Match | ₹1.0L',
      category: 'scholarship',
      x: 310,
      y: -140,
      radius: 24,
      color: '#FB7185',
      glow: 'rgba(251, 113, 133, 0.9)',
      details: 'CRITICAL PRIORITY: ₹1,00,000 funding. 48h deadline. Requires Dean Endorsement.'
    },
    {
      id: 'sch-reliance',
      label: 'Reliance UG',
      sublabel: '91% Match | ₹2.0L',
      category: 'scholarship',
      x: 340,
      y: -40,
      radius: 24,
      color: '#FBBF24',
      glow: 'rgba(251, 191, 36, 0.9)',
      details: 'HIGH PRIORITY: ₹2,00,000 funding. 5 days left. Requires Aptitude Test slot.'
    },
    {
      id: 'sch-hdfc',
      label: 'HDFC Badhte',
      sublabel: '89% Match | ₹75k',
      category: 'scholarship',
      x: 330,
      y: 60,
      radius: 22,
      color: '#34D399',
      glow: 'rgba(52, 211, 153, 0.8)',
      details: 'HIGH PRIORITY: 95% readiness score. Ready for final review & direct portal submission.'
    },
    {
      id: 'sch-maha',
      label: 'MahaDBT EWS',
      sublabel: '96% Match | ₹40k',
      category: 'scholarship',
      x: 290,
      y: 160,
      radius: 22,
      color: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.8)',
      details: 'APPLIED STAGE: Submitted via state DBT portal. Awaiting college administrative clearance.'
    },

    // Pipeline & Funding Target
    {
      id: 'node-pipeline',
      label: 'Application Pipeline',
      sublabel: '5 Active Stages',
      category: 'pipeline',
      x: 480,
      y: -10,
      radius: 26,
      color: '#34D399',
      glow: 'rgba(52, 211, 153, 0.9)',
      details: 'Dynamic Kanban pipeline tracking preparation, blockers, submission, and scrutiny.'
    },
    {
      id: 'node-funding',
      label: '₹4,85,000',
      sublabel: 'Potential Pool',
      category: 'funding',
      x: 620,
      y: -10,
      radius: 30,
      color: '#22D3EE',
      glow: 'rgba(34, 211, 238, 0.95)',
      details: 'Maximum potential strategic funding aggregate identified across qualified scholarship schemes.'
    }
  ];

  const edges: Edge[] = [
    // Student to attributes
    { source: 'student-root', target: 'attr-acad', color: '#22D3EE' },
    { source: 'student-root', target: 'attr-fin', color: '#FBBF24' },
    { source: 'student-root', target: 'attr-loc', color: '#34D399' },
    { source: 'student-root', target: 'attr-deg', color: '#A855F7' },

    // Attributes to AI Engine
    { source: 'attr-acad', target: 'ai-engine', color: '#8B5CF6' },
    { source: 'attr-fin', target: 'ai-engine', color: '#8B5CF6' },
    { source: 'attr-loc', target: 'ai-engine', color: '#8B5CF6' },
    { source: 'attr-deg', target: 'ai-engine', color: '#8B5CF6' },

    // AI Engine to Top Matches
    { source: 'ai-engine', target: 'sch-tata', color: '#FB7185' },
    { source: 'ai-engine', target: 'sch-reliance', color: '#FBBF24' },
    { source: 'ai-engine', target: 'sch-hdfc', color: '#34D399' },
    { source: 'ai-engine', target: 'sch-maha', color: '#8B5CF6' },

    // Matches to Pipeline
    { source: 'sch-tata', target: 'node-pipeline', color: '#34D399' },
    { source: 'sch-reliance', target: 'node-pipeline', color: '#34D399' },
    { source: 'sch-hdfc', target: 'node-pipeline', color: '#34D399' },
    { source: 'sch-maha', target: 'node-pipeline', color: '#34D399' },

    // Pipeline to Funding
    { source: 'node-pipeline', target: 'node-funding', color: '#22D3EE' }
  ];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.clearRect(0, 0, width, height);

    // Center coordinates
    const centerX = width / 2 + pan.x;
    const centerY = height / 2 + pan.y;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(zoom, zoom);

    // Draw background grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = -width; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, -height);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = -height; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(-width, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw edges
    particleOffset.current = (particleOffset.current + 0.005) % 1;

    edges.forEach((edge) => {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      const targetNode = nodes.find((n) => n.id === edge.target);
      if (!sourceNode || !targetNode) return;

      // Glow line
      ctx.beginPath();
      ctx.moveTo(sourceNode.x, sourceNode.y);
      ctx.lineTo(targetNode.x, targetNode.y);
      ctx.strokeStyle = `${edge.color}30`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Traveling animated data packet
      const t = (particleOffset.current + (sourceNode.x + targetNode.y) * 0.001) % 1;
      const px = sourceNode.x + (targetNode.x - sourceNode.x) * t;
      const py = sourceNode.y + (targetNode.y - sourceNode.y) * t;

      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = edge.color;
      ctx.shadowColor = edge.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw nodes
    nodes.forEach((node) => {
      const isSelected = selectedNode?.id === node.id;

      // Outer glow circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + (isSelected ? 6 : 3), 0, Math.PI * 2);
      ctx.fillStyle = isSelected ? `${node.color}50` : `${node.color}20`;
      ctx.shadowColor = node.color;
      ctx.shadowBlur = isSelected ? 24 : 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Core circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#0B1020';
      ctx.strokeStyle = node.color;
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.stroke();
      ctx.fill();

      // Node label
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `600 ${node.radius > 26 ? 11 : 9}px Outfit, sans-serif`;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(node.label, node.x, node.y - (node.sublabel ? 4 : 0));

      // Node sublabel
      if (node.sublabel) {
        ctx.font = '500 8px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = '#A7B0C0';
        ctx.fillText(node.sublabel, node.x, node.y + 7);
      }
    });

    ctx.restore();
  }, [nodes, edges, pan, zoom, selectedNode]);

  useEffect(() => {
    let active = true;
    const renderLoop = () => {
      if (!active) return;
      draw();
      animationFrameId.current = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      active = false;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [draw]);

  // Click detection to select node
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const centerX = canvas.clientWidth / 2 + pan.x;
    const centerY = canvas.clientHeight / 2 + pan.y;

    const graphX = (clickX - centerX) / zoom;
    const graphY = (clickY - centerY) / zoom;

    const clicked = nodes.find((node) => {
      const dist = Math.hypot(node.x - graphX, node.y - graphY);
      return dist <= node.radius + 6;
    });

    setSelectedNode(clicked || null);
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <GlassCard className={`p-5 rounded-3xl border border-white/10 relative flex flex-col ${className}`}>
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 z-10">
        <div>
          <div className="flex items-center gap-2">
            <Network size={18} className="text-[#8B5CF6]" />
            <h3 className="text-base sm:text-lg font-display font-bold text-white tracking-tight">
              3D Scholarship Opportunity Network
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/30 font-semibold uppercase">
              Interactive 3D Graph
            </span>
          </div>
          <p className="text-xs text-[#A7B0C0] mt-0.5">
            Real-time visual neural map linking student profile vectors to prioritized funding outcomes
          </p>
        </div>

        {/* Canvas Zoom/Pan Controls */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-black/40 backdrop-blur-md p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#A7B0C0] hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={15} />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#A7B0C0] hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={15} />
          </button>
          <button
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#A7B0C0] hover:text-white transition-colors"
            title="Reset View"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div
        ref={containerRef}
        className="relative w-full h-[420px] rounded-2xl overflow-hidden bg-[#070B17]/90 border border-white/10 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full h-full block"
        />

        {/* Overlay Node Inspector Drawer */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 p-4 rounded-2xl bg-[#0B1020]/95 backdrop-blur-xl border border-white/20 shadow-2xl animate-fadeIn z-20">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                style={{
                  backgroundColor: `${selectedNode.color}20`,
                  color: selectedNode.color,
                  border: `1px solid ${selectedNode.color}40`
                }}
              >
                {selectedNode.category}
              </span>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-xs text-[#64748B] hover:text-white"
              >
                Close
              </button>
            </div>

            <h4 className="text-sm font-display font-bold text-white mb-0.5">
              {selectedNode.label}
            </h4>
            {selectedNode.sublabel && (
              <span className="text-xs text-[#22D3EE] font-medium block mb-2">
                {selectedNode.sublabel}
              </span>
            )}

            <p className="text-xs text-[#A7B0C0] leading-relaxed">
              {selectedNode.details}
            </p>
          </div>
        )}

        {/* Instructions Hint */}
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 text-[10px] text-[#A7B0C0] pointer-events-none">
          <Sparkles size={11} className="text-[#22D3EE]" />
          <span>Click any node to inspect details • Drag to pan</span>
        </div>
      </div>
    </GlassCard>
  );
};
