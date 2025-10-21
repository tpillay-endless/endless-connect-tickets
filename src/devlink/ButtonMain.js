"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Clickable } from "./Clickable";
import { IconArrow } from "./IconArrow";
import * as _utils from "./utils";
import _styles from "./ButtonMain.module.css";

export function ButtonMain({
  as: _Component = _Builtin.DOM,
  visibility = true,
  style = "Primary",
  text = "Button Text",

  link = {
    href: "#",
  },

  type = "button",
  attributeName,
  attributeValue,
  classes,
  target,
}) {
  const _styleVariantMap = {
    Primary: "",
    Secondary: "w-variant-e85564cd-af30-a478-692b-71732aefb3ab",
    "Tiny - Primary": "w-variant-079c0236-1bf6-609e-5fbf-7b03310ddeed",
    "Tiny - Secondary": "w-variant-452e39ac-79cc-f773-f6b6-ee37dcbf3f8e",
  };

  const _activeStyleVariant = _styleVariantMap[style];

  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "button_main_wrap", _activeStyleVariant)}
      tag="div"
      slot=""
      _class={classes}
      data-button=" "
      data-trigger="hover focus"
    >
      <Clickable
        screenReaderText={text}
        link={link}
        type={type}
        target={target}
      />
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "button_main_text",
          "u-text-style-main",
          _activeStyleVariant
        )}
        tag="div"
        aria-hidden="true"
      >
        {text}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "button_main_icon", _activeStyleVariant)}
        tag="div"
      >
        <IconArrow direction="Right" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "button_main_line", _activeStyleVariant)}
        tag="div"
      />
    </_Component>
  ) : null;
}
