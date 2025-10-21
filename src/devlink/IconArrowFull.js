"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { StrokePath } from "./StrokePath";
import * as _utils from "./utils";
import _styles from "./IconArrowFull.module.css";

export function IconArrowFull({
  as: _Component = _Builtin.DOM,
  direction = "Right",
}) {
  const _styleVariantMap = {
    Right: "",
    Left: "w-variant-1c3f028b-116e-d4eb-db7f-8484491bbf2e",
    Top: "w-variant-a0a4b133-f837-5340-6c98-04b1518f150d",
    Bottom: "w-variant-5939aeba-b378-ecdc-f1bc-b6970df2be03",
  };

  const _activeStyleVariant = _styleVariantMap[direction];

  return (
    <_Component
      className={_utils.cx(_styles, "u-svg", _activeStyleVariant)}
      tag="svg"
      slot=""
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 33 26"
      fill="none"
      aria-hidden="true"
    >
      <StrokePath />
      <StrokePath path="M30.5 13L0 13" />
    </_Component>
  );
}
