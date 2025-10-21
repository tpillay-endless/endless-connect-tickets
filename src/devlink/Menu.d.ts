import * as React from "react";

declare function Menu(props: {
  as?: React.ElementType;
  variant?: "Mobile" | "Desktop";
  buttonMainStyle?:
    | "Primary"
    | "Secondary"
    | "Tiny - Primary"
    | "Tiny - Secondary";
}): React.JSX.Element;
