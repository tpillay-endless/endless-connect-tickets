"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Clickable } from "./Clickable";
import * as _utils from "./utils";
import _styles from "./ButtonPlay.module.css";

export function ButtonPlay({
  as: _Component = _Builtin.DOM,
  visibility = true,
  style = "Primary",
  screenReaderText = "Play",

  link = {
    href: "#",
  },

  attributeName,
  attributeValue,
  classes = " ",
}) {
  const _styleVariantMap = {
    Primary: "",
    Secondary: "w-variant-ab355ea0-b722-2f23-3507-f0290f710e57",
  };

  const _activeStyleVariant = _styleVariantMap[style];

  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "button_toggle_wrap", _activeStyleVariant)}
      tag="div"
      slot=""
      _class={classes}
      data-button=" "
      data-trigger="hover focus"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "button_toggle_icon",
          _activeStyleVariant
        )}
        tag="div"
        aria-hidden="true"
      >
        <_Builtin.DOM
          className={_utils.cx(
            _styles,
            "button_toggle_play",
            "u-cover-absolute",
            _activeStyleVariant
          )}
          tag="svg"
          slot=""
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 1393 1394"
          fill="none"
        >
          <_Builtin.DOM
            tag="path"
            slot=""
            d="M1271 696.5L280 1393L280 -4.3318e-05L1271 696.5Z"
            fill="currentColor"
          />
        </_Builtin.DOM>
        <_Builtin.DOM
          className={_utils.cx(
            _styles,
            "button_toggle_pause",
            "u-cover-absolute",
            _activeStyleVariant
          )}
          tag="svg"
          slot=""
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 898 1277"
          fill="none"
        >
          <_Builtin.DOM
            tag="rect"
            slot=""
            x="577"
            width="321"
            height="1277"
            fill="currentColor"
          />
          <_Builtin.DOM
            tag="rect"
            slot=""
            width="321"
            height="1277"
            fill="currentColor"
          />
        </_Builtin.DOM>
      </_Builtin.Block>
      <Clickable screenReaderText={screenReaderText} link={link} />
    </_Component>
  ) : null;
}
