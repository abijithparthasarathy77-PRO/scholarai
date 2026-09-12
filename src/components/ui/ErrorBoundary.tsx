import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in ScholarAI:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070B17] text-[#F8FAFC] flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#0B1020] border border-[#FB7185]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(251,113,133,0.2)] text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#FB7185]/15 border border-[#FB7185]/30 flex items-center justify-center mx-auto text-[#FB7185]">
              <AlertTriangle size={32} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">ScholarAI Application Recovery</h2>
              <p className="text-xs text-[#A7B0C0] leading-relaxed">
                A rendering issue was detected, likely caused by cached data from a previous version.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-[#FB7185] text-left overflow-x-auto max-h-32">
                {this.state.error.message}
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:opacity-95 transition-opacity"
            >
              <RotateCcw size={16} />
              Reset Cache & Reload ScholarAI
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
