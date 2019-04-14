import * as React from "react";

export interface IIconProps {
  name: string;
  cssSize: string;
}

const Icon = (props: IIconProps) => {
  return (
    <i className={props.name} style={{ fontSize: props.cssSize }} />
  )
}

export default Icon;