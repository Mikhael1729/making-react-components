import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface RowProps {
}

export interface RowState {
  cssWidth: string;
}

export const RowContext = React.createContext('');

export class Row extends React.Component<RowProps, RowState> {
  constructor(props: RowProps) {
    super(props);

    this.state = {
      cssWidth: ''
    }
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this) as any;

    if (node) {
      const nodeStyles = window.getComputedStyle(node);
      if (nodeStyles.width)
        this.setState({ cssWidth: nodeStyles.width })
    }
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
        <RowContext.Provider value={this.state.cssWidth}>
          {this.props.children}
        </RowContext.Provider>
      </div>
    );
  }
}
