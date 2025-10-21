"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TypographyEyebrow.module.css";

export function TypographyEyebrow({
  as: _Component = _Builtin.DOM,
  visibility = true,
  classes = "u-margin-bottom-5",
  text = "",
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "eyebrow_wrap")}
      tag="div"
      slot=""
      _class={classes}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "eyebrow_layout")}
        tag="div"
      >
        <_Builtin.RichText
          className={_utils.cx(
            _styles,
            "eyebrow_text",
            "u-text-style-tiny",
            "u-text-transform-uppercase",
            "u-weight-medium"
          )}
          tag="div"
          slot=""
        >
          {text}
        </_Builtin.RichText>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
