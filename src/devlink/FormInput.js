"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FormInput.module.css";

export function FormInput({
  as: _Component = _Builtin.DOM,
  visibility = true,
  displayLabel = "Name",
  submissionLabel = "First Name",
  type = "text",
  placeholderText = "First Name",
  required,
  defaultValue,
  autoComplete,
  inputMode,
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
        className={_utils.cx(
          _styles,
          "form_main_label_text",
          "eyebrow_text",
          "u-text-style-tiny",
          "u-text-transform-uppercase"
        )}
        tag="span"
        slot=""
      >
        {displayLabel}
      </_Builtin.DOM>
      <_Builtin.DOM
        className={_utils.cx(_styles, "form_main_field")}
        tag="input"
        slot=""
        type={type}
        name={submissionLabel}
        placeholder={placeholderText}
        required={required}
        value={defaultValue}
        inputmode={inputMode}
        autocomplete={autoComplete}
      />
    </_Component>
  ) : null;
}
