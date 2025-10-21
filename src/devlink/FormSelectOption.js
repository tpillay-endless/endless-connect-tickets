"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function FormSelectOption({
  as: _Component = _Builtin.DOM,
  visibility = true,
  text = "Option 1",
  value = "Option 1",
  selected,
  hidden,
}) {
  return visibility ? (
    <_Component
      tag="option"
      slot=""
      value={value}
      selected={selected}
      hidden={hidden}
    >
      {text}
    </_Component>
  ) : null;
}
