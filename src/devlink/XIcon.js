"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./XIcon.module.css";

export function XIcon({ as: _Component = _Builtin.DOM }) {
  return (
    <_Component
      className={_utils.cx(_styles, "u-svg")}
      tag="svg"
      slot=""
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 42 42"
      width="100%"
    >
      <_Builtin.DOM
        tag="path"
        slot=""
        d="m22.493 19.381 7.65-8.892H28.33l-6.642 7.721-5.305-7.72h-6.12l8.023 11.675-8.022 9.324h1.813l7.014-8.153 5.602 8.153h6.12l-8.32-12.108Zm-2.483 2.886-.813-1.162-6.467-9.251h2.784l5.22 7.466.812 1.162 6.785 9.705h-2.785l-5.536-7.92Z"
      />
    </_Component>
  );
}
