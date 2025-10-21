"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { StrokePath } from "./StrokePath";
import * as _utils from "./utils";
import _styles from "./IconSearch.module.css";

export function IconSearch({ as: _Component = _Builtin.DOM }) {
  return (
    <_Component
      className={_utils.cx(_styles, "u-svg")}
      tag="svg"
      slot=""
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
    >
      <StrokePath path="M 326,171     A 155,155 0 1,1 16,171     A 155,155 0 1,1 326,171" />
      <StrokePath path="M280.602 280.602L388.602 388.602" />
    </_Component>
  );
}
