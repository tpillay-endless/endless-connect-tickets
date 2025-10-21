"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Clickable.module.css";

export function Clickable({
  as: _Component = _Builtin.DOM,
  visibility = true,
  screenReaderText = "",

  link = {
    href: "#",
  },

  type = "button",
  target,
  attributeName,
  attributeValue,
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "clickable_wrap")}
      tag="div"
      slot=""
      _class="u-cover-absolute"
    >
      <_Builtin.Link
        className={_utils.cx(_styles, "clickable_link")}
        button={false}
        target={target}
        block="inline"
        options={link}
      >
        <_Builtin.DOM
          className={_utils.cx(_styles, "clickable_text", "u-sr-only")}
          tag="span"
          slot=""
        >
          {screenReaderText}
        </_Builtin.DOM>
      </_Builtin.Link>
      <_Builtin.DOM
        className={_utils.cx(_styles, "clickable_btn")}
        tag="button"
        slot=""
        type={type}
      >
        <_Builtin.DOM
          className={_utils.cx(_styles, "clickable_text", "u-sr-only")}
          tag="span"
          slot=""
        >
          {screenReaderText}
        </_Builtin.DOM>
      </_Builtin.DOM>
    </_Component>
  ) : null;
}
