import * as React from "react";
import { match } from "react-router";
export class RouteComponent<
  TProps,
  TState,
  TMatch extends { [K in keyof TMatch]?: any }
> extends React.Component<TProps, TState> {
  constructor(props?, context?) {
    super(props, context);
  }
  get match(): match<TMatch> {
    return (this.props as any).match;
  }
}
