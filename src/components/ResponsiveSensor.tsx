import * as React from 'react';
import ScreenBreakPoint from 'models/components/ScreenBreakPoint';

export interface ResponsiveSensorProps {
  callBack: (windowSize: number, breakPoint: ScreenBreakPoint) => void;
}

export interface ResponsiveSensorState {
}

export default class ResponsiveSensor extends React.Component<ResponsiveSensorProps, ResponsiveSensorState> {
  componentDidMount() {
    this.compute();
    window.addEventListener("resize", this.compute);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.compute);
  }

  private compute = (e?: UIEvent) => {
    const { callBack } = this.props;
    const screenWidth = window.innerWidth;

    if(screenWidth >= ScreenBreakPoint.lg)
      callBack(screenWidth, ScreenBreakPoint.lg);
    else if (screenWidth >= ScreenBreakPoint.md) 
      callBack(screenWidth, ScreenBreakPoint.md)
    else if (screenWidth >= ScreenBreakPoint.sm) 
      callBack(screenWidth, ScreenBreakPoint.sm)
    else if (screenWidth <= ScreenBreakPoint.xs)
      callBack(screenWidth, ScreenBreakPoint.xs)
  }

  public render() {
    return <>
      {this.props.children}
    </>;
  }
}
