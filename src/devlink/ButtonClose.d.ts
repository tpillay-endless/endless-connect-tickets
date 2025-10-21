import * as React from "react";
import * as Types from "./types";

declare function ButtonClose(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  style?: "Primary" | "Secondary";
  /** This is the text screen readers will read when focused on the button.*/
  screenReaderText?: React.ReactNode;
  link?: Types.Basic.Link;
  classes?: Types.Builtin.Text;
  attribute1Name?: Types.Builtin.Text;
  attribute1Value?: Types.Builtin.Text;
  attribute2Name?: Types.Builtin.Text;
  attribute2Value?: Types.Builtin.Text;
}): React.JSX.Element;
