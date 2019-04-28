import React, { Component } from 'react';

export interface IErrorBoundaryProps {
}

export interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  static state: IErrorBoundaryState = {
    hasError: false
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error, info);
  }

  render() {
    if (this.state) if (this.state.hasError) return <h1>La página no carga : (</h1>
    return this.props.children;
  }
}

export default ErrorBoundary;