"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { StrokePath } from "./StrokePath";
import * as _utils from "./utils";
import _styles from "./CheckmarkIcon.module.css";

export function CheckmarkIcon({ as: _Component = _Builtin.Block, _class }) {
  return (
    <_Component className={_utils.cx(_styles, "checkmark-icon")} tag="div">
      <_Builtin.DOM
        className={_utils.cx(_styles, "u-svg")}
        tag="svg"
        slot=""
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        height="32"
      >
        <StrokePath path="M30 16A14 14 0 1 1 16 2" />
        <StrokePath path="M10.75 13.55 16 18.8 29.65 2.35" />
      </_Builtin.DOM>
    </_Component>
  );
}
