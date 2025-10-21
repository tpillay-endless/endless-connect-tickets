import * as React from "react";
import * as Types from "./types";

declare function BackgroundColor(props: {
  as?: React.ElementType;
  backgroundColor?: "Transparent" | "Background 1" | "Background 2";
  visibility?: Types.Visibility.VisibilityConditions;
  classes?: Types.Builtin.Text;
}): React.JSX.Element;
