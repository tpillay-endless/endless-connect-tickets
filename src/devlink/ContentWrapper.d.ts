import * as React from "react";
import * as Types from "./types";

declare function ContentWrapper(props: {
  as?: React.ElementType;
  alignment?: "Inherit" | "Left" | "Center" | "Right";
  visibility?: Types.Visibility.VisibilityConditions;
  tag?: Types.Basic.TagType;
  style?: Types.Builtin.Text;
  classes?: Types.Builtin.Text;
  slot?: Types.Slots.SlotContent;
}): React.JSX.Element;
