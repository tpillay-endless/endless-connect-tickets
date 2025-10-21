"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./StarterCss.module.css";

export function StarterCss({ as: _Component = _Builtin.HtmlEmbed }) {
  return (
    <_Component
      className={_utils.cx(_styles, "u-embed-css")}
      value="%3Cstyle%3E%0A%0A%3C%2Fstyle%3E"
    />
  );
}
