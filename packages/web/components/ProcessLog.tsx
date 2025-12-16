'use client';

import React, { useEffect, useRef } from 'react';
import GlassCard from './GlassCard';

export interface LogEntry {
  message: string;
  type: 'info' | 'success' | 'data' | 'processing';
  timestamp: Date;
}

interface ProcessLogProps {
  logs: LogEntry[];
  className?: string;
}

export default function ProcessLog({ logs, className = '' }: ProcessLogProps) {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'data':
        return 'text-space-cyan';
      case 'processing':
        return 'text-yellow-400';
      default:
        return 'text-white/70';
    }
  };

  const getLogPrefix = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'data':
        return '→';
      case 'processing':
        return '⟳';
      default:
        return '>';
    }
  };

  return (
    <GlassCard className={`bg-black/40 ${className}`}>
      <div className="space-y-2 max-h-96 overflow-y-auto font-mono text-sm">
        {logs.length === 0 ? (
          <div className="text-white/50 italic">Awaiting commands...</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className={`${getLogColor(log.type)} flex space-x-2`}>
              <span className="font-bold">{getLogPrefix(log.type)}</span>
              <span className="flex-1">{log.message}</span>
              <span className="text-white/30 text-xs">
                {log.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </GlassCard>
  );
}
