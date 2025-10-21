import * as React from "react";
import * as Types from "./types";

declare function ButtonPlay(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  style?: "Primary" | "Secondary";
  /** This is the text screen readers will read when focused on the button.*/
  screenReaderText?: React.ReactNode;
  link?: Types.Basic.Link;
  attributeName?: Types.Builtin.Text;
  attributeValue?: Types.Builtin.Text;
  classes?: Types.Builtin.Text;
}): React.JSX.Element;
