import * as React from "react";
import * as Types from "./types";

declare function Slider(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  slidesPerView?: Types.Builtin.Text;
  style?: "Overflow Visible" | "Overflow Hidden" | "Crop Left";
  classes?: Types.Builtin.Text;
  /** If set to false, slider will be swipeable but not draggable.*/
  settingsFollowFinger?: Types.Builtin.Text;
  /** If set to true, slides will not snap into place on release.*/
  settingsFreeMode?: Types.Builtin.Text;
  /** If set to false, the slider can't be controlled by the keyboard arrow keys.*/
  settingsMousewheel?: Types.Builtin.Text;
  /** If set to true, the slide will move into view when we click on it.*/
  settingsSlideToClickedSlide?: Types.Builtin.Text;
  settingsSpeed?: Types.Builtin.Text;
  slot?: Types.Slots.SlotContent;
  controlsVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
