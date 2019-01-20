import * as React from 'react';

interface LabelProps {
  className?: string;
  pointer?: boolean;
}

const Label: React.SFC<LabelProps> = (props) => {
  const { className, children, pointer } = props;

  return <label className={className} style={{ cursor: pointer ? 'pointer' : '', width: '100%' }}>
    {children}
  </label>;
};

export default Label;