"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FormFieldset.module.css";

export function FormFieldset({
  as: _Component = _Builtin.DOM,
  visibility = true,
  slot,
  legend = "Select all that apply",
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "form_main_fieldset_wrap")}
      tag="fieldset"
      slot=""
    >
      <_Builtin.DOM
        className={_utils.cx(_styles, "form_main_label_text")}
        tag="legend"
        slot=""
      >
        {legend}
      </_Builtin.DOM>
      <_Builtin.NotSupported _atom="Slot" />
    </_Component>
  ) : null;
}
