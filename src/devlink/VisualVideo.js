"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function VisualVideo({
  as: _Component = _Builtin.DOM,
  visibility = true,
  url = "https://timothyricks.us.getafile.online/background-video",
  autoplay = "autoplay",
  loop = "loop",
  muted = "muted",
  classes = "u-ratio-16-9 u-background-skeleton",
  style,
}) {
  return visibility ? (
    <_Component
      tag="video"
      slot=""
      src={url}
      playsinline=" "
      _class={classes}
      style={style}
    />
  ) : null;
}
