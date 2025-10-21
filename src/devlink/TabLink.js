"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TabLink.module.css";

export function TabLink({
  as: _Component = _Builtin.Block,
  visibility = true,
  text = "Tab Link",
  itemId,
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "tab_button_item")}
      tag="div"
      data-tab-item-id={itemId}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "tab_button_text", "u-text-style-main")}
        tag="div"
      >
        {text}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "tab_button_line")}
        tag="div"
      />
    </_Component>
  ) : null;
}
