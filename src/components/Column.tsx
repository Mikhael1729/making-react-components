import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RowContext } from './Row';

type ResponsiveWidth = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

export interface ColmunProps {
  lg?: ResponsiveWidth;
  md?: ResponsiveWidth;
  sm?: ResponsiveWidth;
  cssMargin?: number;
  children?: React.ReactNode;
}

export interface ColmunState {
  cssWidth: string;
}

export default class Colmun extends React.Component<ColmunProps, ColmunState> {
  public static contextType = RowContext;
  public state: ColmunState = {
    cssWidth: ''
  }

  public static defaultProps = {
    cssMargin: 0
  }
  private generateClassName = (width: ResponsiveWidth | undefined) => {
    let lg = width as string;
    lg = lg ? `col-${lg}` : '';

    return lg;
  }

  componentWillMount() {
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this) as any;
    
    if(node) {
      const nodeStyles = window.getComputedStyle(node);
      
      if(nodeStyles.margin) 
        if(nodeStyles.width) 
          this.setState({ cssWidth: nodeStyles.width });
    }
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.computeWidth);
  }

  private computeWidth = () => {
    console.log(window.innerWidth);
  }

  public render() {
    const margin = this.props.cssMargin ? this.props.cssMargin : 0;
    const rowWidth = parseFloat(this.context);
    const colWidth = parseFloat(this.state.cssWidth);
    const percentage = (colWidth / rowWidth) * 100;

    return <div
      className={this.generateClassName(this.props.lg)}
      style={{
        margin: margin + "px",
        width: `calc(${percentage}% - ${margin * 2}px)`,
        display: 'flex',
      }}>
      {this.props.children}
    </div>;
  }
}
