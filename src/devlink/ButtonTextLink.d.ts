import * as React from "react";
import * as Types from "./types";

declare function ButtonTextLink(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  text?: React.ReactNode;
  link?: Types.Basic.Link;
  /** button, submit, reset*/
  type?: Types.Builtin.Text;
  attributeName?: Types.Builtin.Text;
  attributeValue?: Types.Builtin.Text;
  classes?: Types.Builtin.Text;
  /** "_blank" opens in new tab*/
  target?: Types.Builtin.Text;
}): React.JSX.Element;
