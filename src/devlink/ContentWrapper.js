"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ContentWrapper.module.css";

export function ContentWrapper({
  as: _Component = _Builtin.DOM,
  alignment = "Inherit",
  visibility = true,
  tag = "div",
  style,
  classes = "u-margin-trim u-align-self-center u-width-full",
  slot,
}) {
  const _styleVariantMap = {
    Inherit: "",
    Left: "w-variant-67e1f4a6-997b-b215-d348-cc757a57083b",
    Center: "w-variant-4f54624e-ceb1-0769-a238-365d5e220b70",
    Right: "w-variant-405b6754-709a-81de-bf32-f0102c0c7aa2",
  };

  const _activeStyleVariant = _styleVariantMap[alignment];

  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "u-content-wrapper", _activeStyleVariant)}
      slot=""
      tag={tag}
      _class={classes}
      style={style}
    >
      <_Builtin.NotSupported _atom="Slot" />
    </_Component>
  ) : null;
}
