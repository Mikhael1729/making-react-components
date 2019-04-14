import * as React from "react";

export interface IIconProps {
  name: string;
  cssSize?: string;
  cssMargin?: string;
}

const Icon = (props: IIconProps) => {
  return (
    <i
      className={props.name}
      style={{
        fontSize: props.cssSize,
        margin: props.cssMargin ? props.cssMargin : "0px 6px 0px 0px"
      }} />
  )
}

export default Icon;