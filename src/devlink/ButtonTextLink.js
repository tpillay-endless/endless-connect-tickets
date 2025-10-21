"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Clickable } from "./Clickable";
import * as _utils from "./utils";
import _styles from "./ButtonTextLink.module.css";

export function ButtonTextLink({
  as: _Component = _Builtin.DOM,
  visibility = true,
  text = "Text Link",

  link = {
    href: "#",
  },

  type = "button",
  attributeName,
  attributeValue,
  classes,
  target,
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "button_link_wrap")}
      tag="div"
      slot=""
      _class={classes}
      data-button=" "
      data-trigger="hover focus"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "button_link_text", "u-text-style-main")}
        tag="div"
        aria-hidden="true"
      >
        {text}
      </_Builtin.Block>
      <Clickable
        screenReaderText={text}
        link={link}
        type={type}
        target={target}
      />
    </_Component>
  ) : null;
}
