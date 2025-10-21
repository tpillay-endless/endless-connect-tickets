"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Form.module.css";

export function Form({
  as: _Component = _Builtin.DOM,
  visibility = true,
  name = "Contact Form",
  method = "get",
  action,
  slot,
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "form_main_wrap")}
      tag="div"
      slot=""
      _class="w-form"
    >
      <_Builtin.DOM
        className={_utils.cx(_styles, "form_main_element")}
        tag="form"
        slot=""
        name={name}
        aria-label={name}
        method={method}
        action={action}
      >
        <_Builtin.NotSupported _atom="Slot" />
      </_Builtin.DOM>
      <_Builtin.DOM
        className={_utils.cx(_styles, "form_main_success_wrap")}
        tag="div"
        slot=""
        tabindex="-1"
        role="region"
        aria-label="Form Success"
        _class="w-form-done"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "form_main_success_text")}
          tag="div"
        >
          {"Thank you! Your submission has been received!"}
        </_Builtin.Block>
      </_Builtin.DOM>
      <_Builtin.DOM
        className={_utils.cx(_styles, "form_main_error_wrap")}
        tag="div"
        slot=""
        tabindex="-1"
        role="region"
        aria-label="Form Failure"
        _class="w-form-fail"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "form_main_error_text")}
          tag="div"
        >
          {"Oops! Something went wrong while submitting the form."}
        </_Builtin.Block>
      </_Builtin.DOM>
      <_Builtin.FormWrapper className={_utils.cx(_styles, "u-display-none")}>
        <_Builtin.FormForm
          name="email-form"
          data-name="Email Form"
          method="get"
          id="email-form"
        />
        <_Builtin.FormSuccessMessage />
        <_Builtin.FormErrorMessage />
      </_Builtin.FormWrapper>
    </_Component>
  ) : null;
}
