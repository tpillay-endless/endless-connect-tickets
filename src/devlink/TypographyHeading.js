"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TypographyHeading.module.css";

export function TypographyHeading({
  as: _Component = _Builtin.RichText,
  fontStyle = "H2",
  visibility = true,
  classes = "u-margin-bottom-text",
  text = "",
  id,
}) {
  const _styleVariantMap = {
    Inherit: "",
    "Text Small": "w-variant-3fbd0d32-5675-1947-73b3-abb16c1fb986",
    "Text Main": "w-variant-9027c8ae-1ba5-f702-ea6e-4a1c3fca9f64",
    "Text Large": "w-variant-74a3180a-e505-b452-032f-599c8e557249",
    H6: "w-variant-823daff2-fd84-8da0-4ed1-92a39b869ad0",
    H5: "w-variant-326a9562-3263-06da-e8ef-16981fd70f1c",
    H4: "w-variant-7c7eb163-b37d-338d-2369-5eae7e6d458a",
    H3: "w-variant-701c4b6c-37cf-de59-d80d-80a1822c4994",
    H2: "w-variant-433d40c6-c261-f13f-c899-61d2cadf150f",
    H1: "w-variant-792802b6-ccdb-f982-5023-5fa970cf03d0",
    Display: "w-variant-41c609dc-9c80-9eef-75df-03bf0eea00b4",
  };

  const _activeStyleVariant = _styleVariantMap[fontStyle];

  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "c-heading", _activeStyleVariant)}
      tag="div"
      slot=""
      id={id}
    >
      {text}
    </_Component>
  ) : null;
}
