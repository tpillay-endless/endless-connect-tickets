import * as React from "react";
import * as Types from "./types";

declare function TypographyHeading(props: {
  as?: React.ElementType;
  fontStyle?:
    | "Inherit"
    | "Text Small"
    | "Text Main"
    | "Text Large"
    | "H6"
    | "H5"
    | "H4"
    | "H3"
    | "H2"
    | "H1"
    | "Display";
  visibility?: Types.Visibility.VisibilityConditions;
  classes?: Types.Builtin.Text;
  text?: Types.Basic.RichTextChildren;
  id?: Types.Basic.IdTextInput;
}): React.JSX.Element;
