import * as React from "react";
import * as Types from "./types";

declare function AccordionItem(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  heading?: React.ReactNode;
  content?: Types.Basic.RichTextChildren;
  classes?: Types.Builtin.Text;
}): React.JSX.Element;
