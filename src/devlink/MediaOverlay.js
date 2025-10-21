"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MediaOverlay.module.css";

export function MediaOverlay({
  as: _Component = _Builtin.DOM,
  visibility = true,
  classes = "u-cover-absolute",
  opacity = "opacity: 40%;",
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "overlay_wrap")}
      tag="div"
      slot=""
      style={opacity}
      _class={classes}
    />
  ) : null;
}
