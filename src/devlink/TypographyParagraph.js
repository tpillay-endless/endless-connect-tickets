"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TypographyParagraph.module.css";

export function TypographyParagraph({
  as: _Component = _Builtin.RichText,
  fontStyle = "Inherit",
  visibility = true,
  classes = "u-margin-bottom-text u-rich-text",
  text = "",
  id,
  dataAttribute,
}) {
  const _styleVariantMap = {
    Inherit: "",
    "Text Tiny": "w-variant-934db1aa-3bd5-1086-088e-28381a543835",
    "Text Small": "w-variant-4099173f-f581-635c-a5fe-cf4a89c62029",
    "Text Main": "w-variant-61d538b2-709c-eb7a-4258-8c0890dc07fc",
    "Text Large": "w-variant-fdb8e663-01e0-aae6-13eb-e6dfca16b689",
    H6: "w-variant-b8555f10-fa7d-e9ba-e262-f9aa44c27c1c",
    H5: "w-variant-5c484503-e2a0-ac99-680d-56013d859efa",
    H4: "w-variant-93e8af18-8413-e3ac-0442-72629401a3db",
    H3: "w-variant-ad482112-9d0e-852c-0f6e-ba1e5a3aee59",
    H2: "w-variant-efb733fe-da83-69a3-ea4a-b3f2f89d0389",
    H1: "w-variant-3ddfa43e-abc1-422e-6e6d-23dfb7da71f3",
    Display: "w-variant-eee56f15-d7ce-d101-2f8c-83b3bbd55d4a",
  };

  const _activeStyleVariant = _styleVariantMap[fontStyle];

  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "c-paragraph", _activeStyleVariant)}
      tag="div"
      slot=""
      data={dataAttribute}
      id={id}
    >
      {text}
    </_Component>
  ) : null;
}
