"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Grid.module.css";

export function Grid({
  as: _Component = _Builtin.DOM,
  columnCount = "12",
  visibility = true,
  tag = "div",
  style = "--column-width: 18; --type: auto-fit;",
  classes = " ",
  slot,
}) {
  const _styleVariantMap = {
    1: "",
    2: "w-variant-2d129b71-f389-2bb5-157e-4c6664b6f1f7",
    3: "w-variant-205cb359-64f4-9613-16be-7b6ea21da130",
    4: "w-variant-a43392db-4e92-372b-85af-453fa5f58a0b",
    5: "w-variant-a49c393c-8eb9-9702-a7f7-b0d31c2535b6",
    6: "w-variant-1fa34b50-a837-2ff8-cbdc-a25a0f0f655e",
    7: "w-variant-40a5ac65-6ad6-ab31-f112-a487dd6f4194",
    8: "w-variant-acca940a-8500-4c63-671b-ba41437b73b7",
    9: "w-variant-3f4418b6-400a-afb6-8442-1ca7dcd18498",
    10: "w-variant-6ad0d720-f0d5-1ea4-b1b1-2599a18bd67d",
    11: "w-variant-d8367f61-c746-929f-bff3-d9477c01c581",
    12: "w-variant-fd7db3dc-d58a-e1d7-ed64-9b8a1a6798b5",
  };

  const _activeStyleVariant = _styleVariantMap[columnCount];

  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "c-grid", _activeStyleVariant)}
      slot=""
      tag={tag}
      style={style}
      _class={classes}
    >
      <_Builtin.NotSupported _atom="Slot" />
    </_Component>
  ) : null;
}
