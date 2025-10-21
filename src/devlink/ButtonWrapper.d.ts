import * as React from "react";
import * as Types from "./types";

declare function ButtonWrapper(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  tag?: Types.Basic.TagType;
  classes?: Types.Builtin.Text;
  style?: Types.Builtin.Text;
  slot?: Types.Slots.SlotContent;
}): React.JSX.Element;
