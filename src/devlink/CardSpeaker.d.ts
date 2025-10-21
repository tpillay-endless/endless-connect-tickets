import * as React from "react";
import * as Types from "./types";

declare function CardSpeaker(props: {
  as?: React.ElementType;
  cardVisibility?: Types.Visibility.VisibilityConditions;
  cardTag?: Types.Basic.TagType;
  cardClasses?: Types.Builtin.Text;
  cardStyle?: Types.Builtin.Text;
  visualImageVisibility?: Types.Visibility.VisibilityConditions;
  visualImageImage?: Types.Asset.Image;
  speakerTopicVisibility?: Types.Visibility.VisibilityConditions;
  speakerTopic?: Types.Basic.RichTextChildren;
  speakerName?: Types.Basic.RichTextChildren;
  bioVisibility?: Types.Visibility.VisibilityConditions;
  bioText?: Types.Basic.RichTextChildren;
  linkVisibility?: Types.Visibility.VisibilityConditions;
  linkScreenReaderText?: React.ReactNode;
  linkUrl?: Types.Basic.Link;
  /** button, submit, reset*/
  linkType?: Types.Builtin.Text;
  /** "_blank" opens in new tab*/
  linkTarget?: Types.Builtin.Text;
  linkAttributeName?: Types.Builtin.Text;
  linkAttributeValue?: Types.Builtin.Text;
  speakerTitleVisibility?: Types.Visibility.VisibilityConditions;
  speakerTitle?: Types.Basic.RichTextChildren;
}): React.JSX.Element;
