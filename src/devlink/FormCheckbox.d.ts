import * as React from "react";
import * as Types from "./types";

declare function FormCheckbox(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  /** Field label shown on page*/
  displayLabel?: React.ReactNode;
  /** Field label shown in form submission backend*/
  submissionLabel?: Types.Builtin.Text;
  /** Add a space to make the field required*/
  required?: Types.Builtin.Text;
  /** Add a space to make the field checked by default*/
  checked?: Types.Builtin.Text;
  attributeName?: Types.Builtin.Text;
  attributeValue?: Types.Builtin.Text;
  inputAttributeName?: Types.Builtin.Text;
  inputAttributeValue?: Types.Builtin.Text;
  labelAttributeName?: Types.Builtin.Text;
  labelAttributeValue?: Types.Builtin.Text;
}): React.JSX.Element;
