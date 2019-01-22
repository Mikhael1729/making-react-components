import * as React from 'react';

interface ColumnProps {
  size?: string;
  cssMargin?: string;
}

const Column: React.SFC<ColumnProps> = (props) => {
  const size = props.size ? props.size : "col-12";
  return <div className={size} style={{ padding: props.cssMargin }}>
    {props.children}
  </div>;
};

export default Column;