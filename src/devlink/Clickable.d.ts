import * as React from "react";
import * as Types from "./types";

declare function Clickable(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  /** This is the text screen readers will read when focused on the link or button.*/
  screenReaderText?: React.ReactNode;
  link?: Types.Basic.Link;
  /** button, submit, reset*/
  type?: Types.Builtin.Text;
  /** "_blank" opens in new tab*/
  target?: Types.Builtin.Text;
  attributeName?: Types.Builtin.Text;
  attributeValue?: Types.Builtin.Text;
}): React.JSX.Element;
