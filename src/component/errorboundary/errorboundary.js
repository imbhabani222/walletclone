import React from "react";
import Error from "../error/error";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Error />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
