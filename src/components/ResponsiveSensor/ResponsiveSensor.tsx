import * as React from 'react';
import ScreenBreakPoint from 'models/ScreenBreakPoint';

export interface ResponsiveSensorProps {
  callBack: (windowSize: number, breakPoint: ScreenBreakPoint) => void;
  onExtraSmall?: (windiwSize: number) => void;
  onSmall?: (windiwSize: number) => void;
  onMedium?: (windiwSize: number) => void;
  onLarge?: (windiwSize: number) => void;
}

export interface ResponsiveSensorState {
}

export class ResponsiveSensor extends React.Component<ResponsiveSensorProps, ResponsiveSensorState> {
  componentDidMount() {
    this.compute();
    window.addEventListener("resize", this.compute);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.compute);
  }

  private compute = (e?: UIEvent) => {
    const { callBack, onLarge, onMedium, onSmall, onExtraSmall } = this.props;
    const screenWidth = window.innerWidth;

    if(screenWidth >= ScreenBreakPoint.lg) {
      callBack(screenWidth, ScreenBreakPoint.lg);
      if(onLarge) 
        onLarge(screenWidth)
    }
    else if (screenWidth >= ScreenBreakPoint.md) {
      callBack(screenWidth, ScreenBreakPoint.md)
      if(onMedium)
        onMedium(screenWidth)
    } 
    else if (screenWidth >= ScreenBreakPoint.sm) {
      callBack(screenWidth, ScreenBreakPoint.sm)
      if(onSmall)
        onSmall(screenWidth)
    } 
    else if (screenWidth <= ScreenBreakPoint.xs) {
      callBack(screenWidth, ScreenBreakPoint.xs)
      if(onExtraSmall)
        onExtraSmall(screenWidth)
    }
  }

  render() {
    return <>
      {this.props.children}
    </>;
  }
}
