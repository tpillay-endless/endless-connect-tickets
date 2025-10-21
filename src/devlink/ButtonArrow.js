"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IconArrowFull } from "./IconArrowFull";
import { Clickable } from "./Clickable";
import * as _utils from "./utils";
import _styles from "./ButtonArrow.module.css";

export function ButtonArrow({
  as: _Component = _Builtin.DOM,
  visibility = true,
  style = "Primary",
  arrowDirection = "Primary",
  screenReaderText = "Next",

  link = {
    href: "#",
  },

  attributeName,
  attributeValue,
  classes,
}) {
  const _styleVariantMap = {
    Primary: "",
    Secondary: "w-variant-bb0688d1-65b6-14b6-81e5-21e2cd39bbda",
  };

  const _activeStyleVariant = _styleVariantMap[style];

  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "button_arrow_wrap", _activeStyleVariant)}
      tag="div"
      slot=""
      _class={classes}
      data-button=" "
      data-trigger="hover focus"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "button_arrow_icon", _activeStyleVariant)}
        tag="div"
        aria-hidden="true"
      >
        <IconArrowFull direction={arrowDirection} />
      </_Builtin.Block>
      <Clickable screenReaderText={screenReaderText} link={link} />
    </_Component>
  ) : null;
}
