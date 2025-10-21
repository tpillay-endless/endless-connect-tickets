"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FormRadio.module.css";

export function FormRadio({
  as: _Component = _Builtin.DOM,
  visibility = true,
  groupName = "color",
  text = "Red",
  value = "Red",
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
        className={_utils.cx(_styles, "form_main_radio_label")}
        tag="label"
        slot=""
      >
        <_Builtin.DOM
          className={_utils.cx(_styles, "form_main_radio_input")}
          tag="input"
          slot=""
          type="radio"
          name={groupName}
          value={value}
          required={required}
          checked={checked}
        />
        <_Builtin.DOM
          className={_utils.cx(_styles, "form_main_radio_circle_wrap")}
          tag="span"
          slot=""
          data-outline=" "
        >
          <_Builtin.DOM
            className={_utils.cx(_styles, "form_main_radio_circle_inner")}
            tag="span"
            slot=""
          />
        </_Builtin.DOM>
        <_Builtin.DOM
          className={_utils.cx(_styles, "form_main_radio_text")}
          tag="span"
          slot=""
        >
          {text}
        </_Builtin.DOM>
      </_Builtin.DOM>
    </_Component>
  ) : null;
}
