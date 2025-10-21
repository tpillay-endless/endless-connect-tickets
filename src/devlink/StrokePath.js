"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./StrokePath.module.css";

export function StrokePath({
  as: _Component = _Builtin.DOM,
  path = "M18 24.8437L31 12.8438L18 0.843749",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "u-path")}
      tag="path"
      slot=""
      d={path}
    />
  );
}
