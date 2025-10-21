import * as React from "react";
import * as Types from "./types";

declare function FormSelectOption(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  text?: React.ReactNode;
  value?: Types.Builtin.Text;
  /** Add a space to make option selected by default*/
  selected?: Types.Builtin.Text;
  /** Add a space to make option hidden from list (sometimes used on placeholder option)*/
  hidden?: Types.Builtin.Text;
}): React.JSX.Element;
