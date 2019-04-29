import * as React from "react";

export interface IIconProps {
  name: string | undefined;
  cssSize?: string;
  cssMargin?: string;
}

export const Icon = (props: IIconProps) => {
  return (
    <i
      className={props.name}
      style={{
        fontSize: props.cssSize,
        margin: props.cssMargin ? props.cssMargin : "0px 6px 0px 0px"
      }} />
  )
}