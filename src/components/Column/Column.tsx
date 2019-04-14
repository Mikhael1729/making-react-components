import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RowContext } from '../Row/Row';
import ResponsiveWidth from 'models/ResponsiveWidth';

export interface ColumnProps {
  lg?: ResponsiveWidth;
  md?: ResponsiveWidth;
  sm?: ResponsiveWidth;
  xs?: ResponsiveWidth;
  cssMargin?: number;
  onChange?: () => void;
  children?: React.ReactNode;
}

export interface ColumnState {
  cssWidth: string;
}

export default class Column extends React.Component<ColumnProps, ColumnState> {
  public static contextType = RowContext;
  private columnRef: any = React.createRef();
  public state: ColumnState = {
    cssWidth: ''
  }
  public static defaultProps = {
    cssMargin: 0
  }

  componentDidMount() {
    this.computeWidth();

    window.addEventListener("resize", this.computeWidth);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.computeWidth);
  }

  private computeWidth = (e?: any) => {
    const { lg, md, sm, xs, onChange } = this.props;

    // Screen width.
    const screenWidth = window.innerWidth;

    // Div reference.
    const div = this.columnRef.current;

    // Margin.
    const margin = this.props.cssMargin! * 2 + "px";

    // Width percentage.
    let percentage: string | undefined;

    if (screenWidth >= 1200 && lg)
      percentage = this.computePercentage(lg)
    else if (screenWidth >= 992 && md)
      percentage = this.computePercentage(md)
    else if (screenWidth >= 768 && sm)
      percentage = this.computePercentage(sm)
    else if (screenWidth < 768 && xs)
      percentage = this.computePercentage(xs)

    if(percentage) {
      // Apyling width changes.
      const newWidth = `calc(${percentage} - ${margin})`
  
      if (newWidth !== div.style.width) {
        div.style.width = newWidth;
  
        if(onChange)
          onChange();
      }
    }
  }

  private computePercentage = (size: ResponsiveWidth): string => {
    let percentage: string;

    switch (size) {
      case "1":
        percentage = "8.33%";
        break;
      case "2":
        percentage = "16.66%";
        break;
      case "3":
        percentage = "25%";
        break;
      case "4":
        percentage = "33.33%";
        break;
      case "5":
        percentage = "41.66%";
        break;
      case "6":
        percentage = "50%";
        break;
      case "7":
        percentage = "58.33%";
        break;
      case "8":
        percentage = "66.66%";
        break;
      case "9":
        percentage = "75%";
        break;
      case "10":
        percentage = "83.33%";
        break;
      case "11":
        percentage = "91.66%";
        break;
      default:
        percentage = "100%";
        break;
    }

    return percentage;
  }

  public render() {
    return (
      <div ref={this.columnRef} style={{ margin: this.props.cssMargin, display: 'flex' }}>
        {this.props.children}
      </div>
    )
  }
}
