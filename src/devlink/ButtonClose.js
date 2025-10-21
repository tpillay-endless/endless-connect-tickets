"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IconX } from "./IconX";
import { Clickable } from "./Clickable";
import * as _utils from "./utils";
import _styles from "./ButtonClose.module.css";

export function ButtonClose({
  as: _Component = _Builtin.DOM,
  visibility = true,
  style = "Primary",
  screenReaderText = "Close",

  link = {
    href: "#",
  },

  classes,
  attribute1Name,
  attribute1Value,
  attribute2Name,
  attribute2Value,
}) {
  const _styleVariantMap = {
    Primary: "",
    Secondary: "w-variant-c144d67f-2c62-4dbf-0fd8-0b6056b717ec",
  };

  const _activeStyleVariant = _styleVariantMap[style];

  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "button_close_wrap", _activeStyleVariant)}
      tag="div"
      slot=""
      _class={classes}
      data-button=" "
      data-trigger="hover focus"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "button_close_icon", _activeStyleVariant)}
        tag="div"
        aria-hidden="true"
      >
        <IconX />
      </_Builtin.Block>
      <Clickable screenReaderText={screenReaderText} link={link} />
    </_Component>
  ) : null;
}
