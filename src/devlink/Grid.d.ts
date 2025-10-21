import * as React from "react";
import * as Types from "./types";

declare function Grid(props: {
  as?: React.ElementType;
  columnCount?:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12";
  visibility?: Types.Visibility.VisibilityConditions;
  tag?: Types.Basic.TagType;
  style?: Types.Builtin.Text;
  classes?: Types.Builtin.Text;
  slot?: Types.Slots.SlotContent;
}): React.JSX.Element;
