import * as React from "react";
import * as Types from "./types";

declare function FormRadio(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  groupName?: Types.Builtin.Text;
  /** Label text shown on page*/
  text?: React.ReactNode;
  /** Field value when checked*/
  value?: Types.Builtin.Text;
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
