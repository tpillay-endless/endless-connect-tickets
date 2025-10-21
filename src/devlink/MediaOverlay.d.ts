import * as React from "react";
import * as Types from "./types";

declare function MediaOverlay(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  classes?: Types.Builtin.Text;
  opacity?: Types.Builtin.Text;
}): React.JSX.Element;
