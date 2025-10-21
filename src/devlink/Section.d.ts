import * as React from "react";
import * as Types from "./types";

declare function Section(props: {
  as?: React.ElementType;
  theme?: "Inherit" | "Light" | "Dark" | "Brand";
  paddingBottom?: "None" | "Even" | "Small" | "Main" | "Large" | "Page Top";
  paddingTop?: "None" | "Even" | "Small" | "Main" | "Large" | "Page Top";
  visibility?: Types.Visibility.VisibilityConditions;
  tag?: Types.Basic.TagType;
  style?: Types.Builtin.Text;
  sectionClasses?: Types.Builtin.Text;
  containerClasses?: Types.Builtin.Text;
  attributeName?: Types.Builtin.Text;
  attributeValue?: Types.Builtin.Text;
  /** Type "id" in this field when applying an id to the section*/
  idAttributeName?: Types.Builtin.Text;
  idAttributeValue?: Types.Basic.IdTextInput;
  containerSlot?: Types.Slots.SlotContent;
  slot?: Types.Slots.SlotContent;
}): React.JSX.Element;
