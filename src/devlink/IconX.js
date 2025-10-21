"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { StrokePath } from "./StrokePath";
import * as _utils from "./utils";
import _styles from "./IconX.module.css";

export function IconX({ as: _Component = _Builtin.DOM }) {
  return (
    <_Component
      className={_utils.cx(_styles, "u-svg")}
      tag="svg"
      slot=""
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
    >
      <StrokePath path="M2 2L24.6274 24.6274" />
      <StrokePath path="M2 25L24.6274 2.37258" />
    </_Component>
  );
}
