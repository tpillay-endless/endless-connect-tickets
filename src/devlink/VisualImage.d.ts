import * as React from "react";
import * as Types from "./types";

declare function VisualImage(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  image?: Types.Asset.Image;
  altText?: Types.Basic.AltText;
  /** Switch the value to "eager" when image is used at the top of the page.*/
  loading?: Types.Builtin.Text;
  classes?: Types.Builtin.Text;
  /** high, low, auto*/
  fetchPriority?: Types.Builtin.Text;
}): React.JSX.Element;
