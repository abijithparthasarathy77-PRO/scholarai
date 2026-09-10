import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  deadline: string;
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ deadline, compact = false }) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
    isExpired: boolean;
  }>({ hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, isExpired: false });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(deadline).getTime();
      const current = new Date().getTime();
      const difference = target - current;

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, isExpired: true });
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ hours, minutes, seconds, totalSeconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  if (timeLeft.isExpired) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-800">
        Deadline Passed
      </span>
    );
  }

  // Urgency styling: < 72 hours (3 days) = Red, 3-10 days = Amber, > 10 days = Slate/Blue
  const isCritical = timeLeft.totalSeconds < 72 * 3600;
  const isHigh = timeLeft.totalSeconds < 240 * 3600;

  const pad = (n: number) => String(n).padStart(2, '0');

  if (compact) {
    return (
      <span className={`font-mono font-medium text-xs ${isCritical ? 'text-rose-600 font-bold' : isHigh ? 'text-amber-600' : 'text-slate-600'}`}>
        {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-mono text-sm shadow-xs ${
      isCritical 
        ? 'bg-rose-50 border-rose-200 text-rose-700 font-bold' 
        : isHigh 
        ? 'bg-amber-50 border-amber-200 text-amber-800' 
        : 'bg-slate-50 border-slate-200 text-slate-700'
    }`}>
      <span className="flex items-center space-x-1">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping mr-1"></span>
        <span>{pad(timeLeft.hours)}h</span>
        <span>:</span>
        <span>{pad(timeLeft.minutes)}m</span>
        <span>:</span>
        <span>{pad(timeLeft.seconds)}s</span>
      </span>
    </div>
  );
};
