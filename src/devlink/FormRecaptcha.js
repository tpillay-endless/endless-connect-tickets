"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function FormRecaptcha({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-recaptcha")}
      tag="div"
      data-sitekey="YOUR_SITE_KEY"
    />
  );
}
