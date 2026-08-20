import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ERASTACK ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container" role="alert">
          <div className="error-boundary-card">
            <div className="error-icon-box">
              <AlertCircle size={32} className="error-icon" />
            </div>
            <h2 className="error-title">Terjadi Kesalahan pada Modul Antarmuka</h2>
            <p className="error-description">
              Sistem mendeteksi galat saat me-render komponen. Modul lain tetap aman dan terlindungi.
            </p>
            {this.state.error && (
              <pre className="error-snippet">
                {this.state.error.message}
              </pre>
            )}
            <div className="error-actions">
              <Button
                variant="primary"
                leftIcon={<RefreshCw size={16} />}
                onClick={this.handleReset}
              >
                Muat Ulang Halaman
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
