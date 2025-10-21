"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TypographyTag.module.css";

export function TypographyTag({
  as: _Component = _Builtin.DOM,
  visibility = true,
  text = "Text Block",
  classes,
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "tag_wrap")}
      tag="div"
      slot=""
      _class={classes}
    >
      {text}
    </_Component>
  ) : null;
}
