import * as React from "react";
import * as Types from "./types";

declare function TabLink(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  text?: React.ReactNode;
  /** To anchor link to this item from another page, give this item a unique ID.*/
  itemId?: Types.Builtin.Text;
}): React.JSX.Element;
