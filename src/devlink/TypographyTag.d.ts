import * as React from "react";
import * as Types from "./types";

declare function TypographyTag(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  text?: React.ReactNode;
  classes?: Types.Builtin.Text;
}): React.JSX.Element;
