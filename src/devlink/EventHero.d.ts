import * as React from "react";
import * as Types from "./types";

declare function EventHero(props: {
  as?: React.ElementType;
  sectionVisibility?: Types.Visibility.VisibilityConditions;
  eyebrowVisibility?: Types.Visibility.VisibilityConditions;
  eyebrowText?: Types.Basic.RichTextChildren;
  headingText?: Types.Basic.RichTextChildren;
  locationVisibility?: Types.Visibility.VisibilityConditions;
  locationText?: Types.Basic.RichTextChildren;
  paragraphVisibility?: Types.Visibility.VisibilityConditions;
  paragraphText?: Types.Basic.RichTextChildren;
  buttonGroupVisibility?: Types.Visibility.VisibilityConditions;
  buttonVisibility?: Types.Visibility.VisibilityConditions;
  buttonText?: React.ReactNode;
  buttonLink?: Types.Basic.Link;
  imageVisibility?: Types.Visibility.VisibilityConditions;
  imageFile?: Types.Asset.Image;
  imageLoading?: Types.Builtin.Text;
  videoVisibility?: Types.Visibility.VisibilityConditions;
  videoUrl?: Types.Builtin.Text;
  sectionBackgroundColor?: "Transparent" | "Background 1" | "Background 2";
  sectionPaddingTop?: "None" | "Even" | "Small" | "Main" | "Large" | "Page Top";
  sectionPaddingBottom?:
    | "None"
    | "Even"
    | "Small"
    | "Main"
    | "Large"
    | "Page Top";
  sectionId?: Types.Basic.IdTextInput;
  sectionTheme?: "Inherit" | "Light" | "Dark" | "Brand";
  /** high, low, auto*/
  visualImageFetchPriority?: Types.Builtin.Text;
}): React.JSX.Element;
