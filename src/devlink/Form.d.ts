import * as React from "react";
import * as Types from "./types";

declare function Form(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  /** Form name shown in form submission results and as the aria label of the form for screen reader users.*/
  name?: Types.Builtin.Text;
  /** Switch to "post" if sending data externally*/
  method?: Types.Builtin.Text;
  /** Url to send form data to if sending form data externally*/
  action?: Types.Builtin.Text;
  slot?: Types.Slots.SlotContent;
}): React.JSX.Element;
