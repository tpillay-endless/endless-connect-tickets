"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { StrokePath } from "./StrokePath";
import * as _utils from "./utils";
import _styles from "./IconArrow.module.css";

export function IconArrow({
  as: _Component = _Builtin.DOM,
  direction = "Right",
}) {
  const _styleVariantMap = {
    Right: "",
    Left: "w-variant-dc469724-71a3-14e1-b5d5-1294323411ce",
    Top: "w-variant-b18a0fcd-abb0-329e-47f4-79155dd8284a",
    Bottom: "w-variant-caa8b8e9-e8ec-6eb3-4526-30f19f7326f5",
  };

  const _activeStyleVariant = _styleVariantMap[direction];

  return (
    <_Component
      className={_utils.cx(_styles, "u-svg", _activeStyleVariant)}
      tag="svg"
      slot=""
      viewBox="0 0 20 14"
      fill="none"
      width="20"
      height="14"
      aria-hidden="true"
    >
      <StrokePath path="M4 7a3 3 0 0 1-3-3V1h18v12H1v-3a3 3 0 0 1 3-3Zm0 0h7.29m0 0L10 4.43 12.57 7 10 9.57 11.29 7Zm0 0h.64" />
    </_Component>
  );
}
