import * as React from "react";
import * as Types from "./types";

declare function AccordionList(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  slot?: Types.Slots.SlotContent;
  /** If set to true, currently open accordion will close when new one opens.*/
  settingsClosePrevious?: Types.Builtin.Text;
  /** If set to true, accordion will close the second time we click on it.*/
  settingsCloseOnSecondClick?: Types.Builtin.Text;
  /** If set to true, accordion will open when we hover over it.*/
  settingsOpenOnHover?: Types.Builtin.Text;
  /** If set to 1, accordion item 1 will be opened by default.*/
  settingsOpenByDefaultItem?: Types.Builtin.Text;
  classes?: Types.Builtin.Text;
}): React.JSX.Element;
