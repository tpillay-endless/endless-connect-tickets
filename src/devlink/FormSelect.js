"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FormSelect.module.css";

export function FormSelect({
  as: _Component = _Builtin.DOM,
  visibility = true,
  displayLabel = "Your Job Title",
  submissionLabel = "Job Title",
  allowMultiSelect,
  required,
  slot,
  inputAttributeName,
  inputAttributeValue,
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "form_main_label_wrap")}
      tag="label"
      slot=""
      data-trigger="focus"
    >
      <_Builtin.DOM
        className={_utils.cx(_styles, "form_main_label_text")}
        tag="span"
        slot=""
      >
        {displayLabel}
      </_Builtin.DOM>
      <_Builtin.DOM
        className={_utils.cx(_styles, "form_main_select_wrap")}
        tag="span"
        slot=""
      >
        <_Builtin.DOM
          className={_utils.cx(_styles, "form_main_field")}
          tag="select"
          slot=""
          name={submissionLabel}
          multiple={allowMultiSelect}
          required={required}
        >
          <_Builtin.NotSupported _atom="Slot" />
        </_Builtin.DOM>
        <_Builtin.DOM
          className={_utils.cx(_styles, "form_main_select_icon")}
          tag="svg"
          slot=""
          width="100%"
          viewBox="0 0 6 5"
          fill="none"
          aria-hidden="true"
        >
          <_Builtin.DOM
            tag="path"
            slot=""
            d="M0.5 1L3 3.5L5.5 1"
            stroke="currentColor"
            stroke-width="0.125rem"
            vector-effect="non-scaling-stroke"
          />
        </_Builtin.DOM>
      </_Builtin.DOM>
    </_Component>
  ) : null;
}
