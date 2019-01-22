import * as React from 'react';

interface RowProps {
}

const Row: React.SFC<RowProps> = (props) => {
  return <div style={{ display: 'flex', flexDirection: 'row' }}>
    {props.children}
  </div>;
};

export default Row;