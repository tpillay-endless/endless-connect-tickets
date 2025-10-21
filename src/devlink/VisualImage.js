"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function VisualImage({
  as: _Component = _Builtin.Image,
  visibility = true,
  image = "https://cdn.prod.website-files.com/68c9514a4d942d4c8f7be7bf/68c9514b4d942d4c8f7be90e_placeholder.svg",
  altText = "__wf_reserved_inherit",
  loading = "lazy",
  classes = "u-ratio-16-9 u-background-skeleton",
  fetchPriority,
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "")}
      loading={loading}
      width="auto"
      height="auto"
      fetchpriority={fetchPriority}
      src={image}
    />
  ) : null;
}
