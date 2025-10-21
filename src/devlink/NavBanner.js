"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NavBanner.module.css";

export function NavBanner({
  as: _Component = _Builtin.Block,
  visibility = true,
  text = "Important Update Banner",

  link = {
    href: "#",
  },
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "nav_banner_wrap")}
      tag="div"
      role="region"
      aria-label="Announcement"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "nav_banner_contain")}
        tag="div"
      >
        <_Builtin.Link
          className={_utils.cx(_styles, "nav_banner_link")}
          button={false}
          data-state="external"
          block="inline"
          options={link}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "nav_banner_text", "u-line-clamp-1")}
            tag="div"
          >
            {text}
          </_Builtin.Block>
          <_Builtin.DOM
            className={_utils.cx(_styles, "nav_banner_svg")}
            tag="svg"
            slot=""
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 27 24"
            fill="none"
            aria-hidden="true"
          >
            <_Builtin.DOM
              tag="path"
              slot=""
              d="M0 12L24 12"
              stroke="currentColor"
              stroke-width="var(--nav--icon-thickness)"
              vector-effect="non-scaling-stroke"
            />
            <_Builtin.DOM
              tag="path"
              slot=""
              d="M14 1.5L24.5 12L14 22.5"
              stroke="currentColor"
              stroke-width="var(--nav--icon-thickness)"
              vector-effect="non-scaling-stroke"
            />
          </_Builtin.DOM>
        </_Builtin.Link>
        <_Builtin.DOM
          className={_utils.cx(_styles, "nav_banner_close_wrap")}
          tag="button"
          slot=""
          role="button"
        >
          <_Builtin.DOM
            className={_utils.cx(_styles, "nav_banner_close_svg")}
            tag="svg"
            slot=""
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 20 19"
            fill="none"
            aria-hidden="true"
          >
            <_Builtin.DOM
              tag="path"
              slot=""
              d="M1.51471 1.01465L18.4853 17.9852"
              stroke="currentColor"
              stroke-width="var(--nav--icon-thickness)"
              vector-effect="non-scaling-stroke"
            />
            <_Builtin.DOM
              tag="path"
              slot=""
              d="M1.51471 17.9851L18.4853 1.01454"
              stroke="currentColor"
              stroke-width="var(--nav--icon-thickness)"
              vector-effect="non-scaling-stroke"
            />
          </_Builtin.DOM>
          <_Builtin.Block
            className={_utils.cx(_styles, "nav_screen-reader-text")}
            tag="div"
          >
            {"Close Announcement Banner"}
          </_Builtin.Block>
        </_Builtin.DOM>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
