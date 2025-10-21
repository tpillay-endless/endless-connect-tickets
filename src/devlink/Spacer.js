"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Spacer.module.css";

export function Spacer({
  as: _Component = _Builtin.Block,
  sectionSpace = "Main",
}) {
  const _styleVariantMap = {
    None: "",
    Even: "w-variant-41fc0c0a-cac3-53c9-9802-6a916e3fb342",
    Small: "w-variant-d422cbd0-f212-c815-68df-63414354c21d",
    Main: "w-variant-60a7ad7d-02b0-6682-95a5-2218e6fd1490",
    Large: "w-variant-8cc18b30-4618-8767-0111-f6abfe45aaa3",
    "Page Top": "w-variant-e359d2da-de19-6775-b122-3e06f925f39e",
  };

  const _activeStyleVariant = _styleVariantMap[sectionSpace];

  return (
    <_Component
      className={_utils.cx(
        _styles,
        "u-section-spacer",
        "u-ignore-trim",
        _activeStyleVariant
      )}
      tag="div"
    />
  );
}
