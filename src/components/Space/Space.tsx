import * as React from 'react';

interface ISpaceProps {
  size?: number;
  children?: never;
}

export const Space: React.FunctionComponent<ISpaceProps> = ({ size }) => {
  const spaces = Array.from(Array(size!).keys());

  return <> {spaces.map(n => (<br key={n} />))} </>
};

// Default props.
Space.defaultProps = {
  size: 1
};
