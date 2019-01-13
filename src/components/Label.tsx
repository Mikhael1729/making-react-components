import * as React from 'react';

interface LabelProps {
  className?: string;
  pointer?: boolean;
}

const Label: React.SFC<LabelProps> = (props) => {
  const { className, children, pointer } = props;

  return <label className={className} style={{ cursor: pointer ? 'pointer' : '' }}>
    {children}
  </label>;
};

export default Label;