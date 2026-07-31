import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application render failed', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-[#05070D] text-white flex items-center justify-center px-6">
          <section className="max-w-xl text-center">
            <p className="text-gold-400 text-xs font-semibold tracking-[0.18em] uppercase mb-4">In Him Daily</p>
            <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-5">The page needs a fresh start.</h1>
            <p className="text-white/65 leading-relaxed mb-8">
              Something unexpected interrupted this visit. Refresh the page to reconnect and continue.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="ih-btn-gold px-7 py-3.5"
            >
              Refresh page
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
