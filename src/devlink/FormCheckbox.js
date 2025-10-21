"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FormCheckbox.module.css";

export function FormCheckbox({
  as: _Component = _Builtin.DOM,
  visibility = true,
  displayLabel = "I agree to the terms",
  submissionLabel = "Agreed to terms",
  required,
  checked,
  attributeName = "role",
  attributeValue = "listitem",
  inputAttributeName,
  inputAttributeValue,
  labelAttributeName,
  labelAttributeValue,
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "form_main_item")}
      tag="div"
      slot=""
      data-state="checked"
    >
      <_Builtin.DOM
        className={_utils.cx(_styles, "form_main_checkbox_label")}
        tag="label"
        slot=""
      >
        <_Builtin.DOM
          className={_utils.cx(_styles, "form_main_checkbox_input")}
          tag="input"
          slot=""
          type="checkbox"
          name={submissionLabel}
          required={required}
          checked={checked}
        />
        <_Builtin.DOM
          className={_utils.cx(_styles, "form_main_checkbox_box")}
          tag="span"
          slot=""
          data-outline=" "
        >
          <_Builtin.DOM
            className={_utils.cx(_styles, "form_main_checkbox_icon")}
            tag="svg"
            slot=""
            viewBox="0 0 11 8"
            fill="none"
            aria-hidden="true"
          >
            <_Builtin.DOM
              tag="path"
              slot=""
              d="M1 4L4 7L10 1"
              stroke="currentColor"
              vector-effect="non-scaling-stroke"
              stroke-width="0.125rem"
            />
          </_Builtin.DOM>
        </_Builtin.DOM>
        <_Builtin.DOM
          className={_utils.cx(_styles, "form_main_checkbox_text")}
          tag="span"
          slot=""
        >
          {displayLabel}
        </_Builtin.DOM>
      </_Builtin.DOM>
    </_Component>
  ) : null;
}
