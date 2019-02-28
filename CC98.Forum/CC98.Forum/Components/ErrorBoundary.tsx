import * as React from 'react';

type props = {

}

type state = {
  isError: boolean,
  error: Error,
}

export default class ErrorBoundary extends React.PureComponent<props, state> {
  state: state = {
    isError: false,
    error: null,
  }

  componentDidCatch(error: Error) {
    console.error(error)

    this.setState({
      isError: true,
      error
    })
  }

  handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    location.reload(true);
  }

  render(){
    if(this.state.isError) {
      const style: React.CSSProperties = {
        cursor: 'pointer',
        color: '#0000ee'
      };

      return (
        <div style={{ paddingLeft: '2rem' }}>
          <h1>Something went wrong</h1>
          <p>you can <a href="#" style={style} onClick={this.handleClick}>refresh</a> to retry.</p>
          <p>if this still happens, please contact with <a style={style} href="mailto:contact@cc98.org">contact@cc98.org</a>.</p>
          <hr />
          <p>{this.state.error.name}: {this.state.error.message}</p>
          <p>URL: {location.href}</p>
          <p>platform: {navigator.platform}</p>
          <p>appVersion: {navigator.appVersion}</p>
          <p style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.stack}</p>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}
