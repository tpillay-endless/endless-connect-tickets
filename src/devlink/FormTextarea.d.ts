import * as React from "react";
import * as Types from "./types";

declare function FormTextarea(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  /** Field label shown on page*/
  displayLabel?: React.ReactNode;
  /** Field label shown in form submission backend*/
  submissionLabel?: Types.Builtin.Text;
  placeholderText?: Types.Builtin.Text;
  /** Add a space to make the field required*/
  required?: Types.Builtin.Text;
  defaultValue?: Types.Builtin.Text;
  textareaAttributeName?: Types.Builtin.Text;
  textareaAttributeValue?: Types.Builtin.Text;
}): React.JSX.Element;
