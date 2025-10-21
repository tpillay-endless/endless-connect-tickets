import * as React from "react";
import * as Types from "./types";

declare function Block(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  tag?: Types.Basic.TagType;
  style?: Types.Builtin.Text;
  classes?: Types.Builtin.Text;
  slotContent?: Types.Slots.SlotContent;
}): React.JSX.Element;
