"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./BackgroundColor.module.css";

export function BackgroundColor({
  as: _Component = _Builtin.Block,
  backgroundColor = "Background 1",
  visibility = true,
  classes = "u-cover-absolute",
}) {
  const _styleVariantMap = {
    Transparent: "",
    "Background 1": "w-variant-cd5f9287-5b9f-b1bf-cfe9-3449eb06f297",
    "Background 2": "w-variant-eb0f2029-84f7-ce58-38ea-0afc3f5a3171",
  };

  const _activeStyleVariant = _styleVariantMap[backgroundColor];

  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "background_wrap", _activeStyleVariant)}
      tag="div"
    />
  ) : null;
}
