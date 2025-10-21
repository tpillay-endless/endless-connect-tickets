import * as React from "react";
import * as Types from "./types";

declare function VisualVideo(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  url?: Types.Builtin.Text;
  autoplay?: Types.Builtin.Text;
  loop?: Types.Builtin.Text;
  muted?: Types.Builtin.Text;
  classes?: Types.Builtin.Text;
  style?: Types.Builtin.Text;
}): React.JSX.Element;
