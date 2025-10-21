import * as React from "react";
import * as Types from "./types";

declare function FormSelect(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  /** Field label shown on page*/
  displayLabel?: React.ReactNode;
  /** Field label shown in form submission backend*/
  submissionLabel?: Types.Builtin.Text;
  /** Add a space to allow multi select*/
  allowMultiSelect?: Types.Builtin.Text;
  /** Add a space to make the field required*/
  required?: Types.Builtin.Text;
  slot?: Types.Slots.SlotContent;
  inputAttributeName?: Types.Builtin.Text;
  inputAttributeValue?: Types.Builtin.Text;
}): React.JSX.Element;
