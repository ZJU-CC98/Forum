import * as React from "react";

declare global {
  interface Window {
    errorInfo: {
      event: string;
      source: string;
      line: number;
      col: number;
      error: Error;
    };
  }
}

interface ErrorBoundaryProps {}

interface ErrorBoundaryStates {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// 测试用
export class ErrorEmitter extends React.PureComponent {
  componentDidMount(): void {
    throw new Error("Test Error");
  }
  render() {
    return <React.Fragment></React.Fragment>;
  }
}

export default class ErrorBoundary extends React.PureComponent<
  ErrorBoundaryProps,
  ErrorBoundaryStates
> {
  templateRef: React.RefObject<HTMLTemplateElement>;
  rootRef: React.RefObject<HTMLDivElement>;

  state: ErrorBoundaryStates = {};

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  componentDidUpdate(
    _: Readonly<ErrorBoundaryProps>,
    prevState: Readonly<ErrorBoundaryStates>
  ): void {
    if (this.state.error && !prevState.error) {
      window.errorInfo = {
        event: this.state.error.message,
        source: (this.state.errorInfo?.componentStack || "").trim(),
        line: 0,
        col: 0,
        error: this.state.error,
      };
      const errorTemplate = document.getElementById(
        "error-template"
      ) as HTMLTemplateElement;
      const root = document.getElementById("root") as HTMLDivElement;
      root.replaceWith(errorTemplate.content.cloneNode(true));
    }
  }

  render() {
    if (this.state.error) {
      return (
        <React.Fragment>
          <div></div>
        </React.Fragment>
      );
    } else {
      return this.props.children;
    }
  }
}
