"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FormTextarea.module.css";

export function FormTextarea({
  as: _Component = _Builtin.DOM,
  visibility = true,
  displayLabel = "Message",
  submissionLabel = "Message",
  placeholderText = "Your Message",
  required,
  defaultValue,
  textareaAttributeName,
  textareaAttributeValue,
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
        className={_utils.cx(_styles, "form_main_field", "is-textarea")}
        tag="textarea"
        slot=""
        name={submissionLabel}
        placeholder={placeholderText}
        required={required}
        value={defaultValue}
      />
    </_Component>
  ) : null;
}
