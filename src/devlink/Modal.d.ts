import * as React from "react";
import * as Types from "./types";

declare function Modal(props: {
  as?: React.ElementType;
  /** Each modal must have a unique ID. When using a modal inside a CMS Item, use the CMS Item's slug as the ID.*/
  modalId?: Types.Builtin.Text;
  slot?: Types.Slots.SlotContent;
  /** If set to true, modal will be visible in designer.*/
  showInDesigner?: Types.Builtin.Text;
  size?: "Small" | "Full Screen";
}): React.JSX.Element;
