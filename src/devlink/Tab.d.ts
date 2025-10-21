import * as React from "react";
import * as Types from "./types";

declare function Tab(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  /** Show next and previous buttons*/
  controlsVisibility?: Types.Visibility.VisibilityConditions;
  /** Set to true to preview all tab content in designer view.*/
  previewContent?: Types.Builtin.Text;
  classes?: Types.Builtin.Text;
  slot?: Types.Slots.SlotContent;
  slot?: Types.Slots.SlotContent;
  /** Give the component a unique ID to anchor link to it from a separate page.*/
  settingsComponentId?: Types.Builtin.Text;
  /** If set to true, tab content will slide from side to side instead of fading out.*/
  settingsSlideTabs?: Types.Builtin.Text;
  /** Set a duration in seconds such as "4" to make the tabs autoplay.*/
  settingsAutoplayDuration?: Types.Builtin.Text;
  /** Set the duration for the tab transition*/
  settingsDuration?: Types.Builtin.Text;
  /** If true, the next button will loop instead of disabling when reaching end of list.*/
  settingsLoopControls?: Types.Builtin.Text;
  /** If set to true, the autoplay will pause whenever we hover over the component.*/
  settingsPauseOnHover?: Types.Builtin.Text;
}): React.JSX.Element;
