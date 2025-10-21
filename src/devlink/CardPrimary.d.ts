import * as React from "react";
import * as Types from "./types";

declare function CardPrimary(props: {
  as?: React.ElementType;
  headingText?: React.ReactNode;
  headingTag?: Types.Basic.HeadingTag;
  visibility?: Types.Visibility.VisibilityConditions;
  paragraphVisibility?: Types.Visibility.VisibilityConditions;
  paragraphText?: Types.Basic.RichTextChildren;
  linkVisibility?: Types.Visibility.VisibilityConditions;
  linkScreenReaderText?: React.ReactNode;
  linkUrl?: Types.Basic.Link;
  /** button, submit, reset*/
  linkType?: Types.Builtin.Text;
  /** "_blank" opens in new tab*/
  linkTarget?: Types.Builtin.Text;
  linkAttributeName?: Types.Builtin.Text;
  linkAttributeValue?: Types.Builtin.Text;
  tag?: Types.Basic.TagType;
  classes?: Types.Builtin.Text;
  style?: Types.Builtin.Text;
}): React.JSX.Element;
