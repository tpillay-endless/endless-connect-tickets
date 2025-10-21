import * as React from "react";
import * as Types from "./types";

declare function SectionCustomDuplicateThis(props: {
  as?: React.ElementType;
  sectionVisibility?: Types.Visibility.VisibilityConditions;
  sectionTheme?: "Inherit" | "Light" | "Dark" | "Brand";
  eyebrowVisibility?: Types.Visibility.VisibilityConditions;
  eyebrowText?: Types.Basic.RichTextChildren;
  headingText?: Types.Basic.RichTextChildren;
  paragraphVisibility?: Types.Visibility.VisibilityConditions;
  paragraphText?: Types.Basic.RichTextChildren;
  buttonGroupVisibility?: Types.Visibility.VisibilityConditions;
  button1Visibility?: Types.Visibility.VisibilityConditions;
  button1Text?: React.ReactNode;
  button1Link?: Types.Basic.Link;
  button2Visibility?: Types.Visibility.VisibilityConditions;
  button2Text?: React.ReactNode;
  button2Link?: Types.Basic.Link;
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
}): React.JSX.Element;
