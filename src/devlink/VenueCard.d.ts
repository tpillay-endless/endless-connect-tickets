import * as React from "react";
import * as Types from "./types";

declare function VenueCard(props: {
  as?: React.ElementType;
  eyebrowText?: Types.Basic.RichTextChildren;
  data?: Types.Basic.RichTextChildren;
  buttonVisibility?: Types.Visibility.VisibilityConditions;
  buttonText?: React.ReactNode;
  buttonLink?: Types.Basic.Link;
  typographyParagraphDataAttribute?: Types.Builtin.Text;
}): React.JSX.Element;
