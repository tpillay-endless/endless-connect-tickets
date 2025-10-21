"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TypographyParagraph } from "./TypographyParagraph";
import { Clickable } from "./Clickable";
import * as _utils from "./utils";
import _styles from "./CardPrimary.module.css";

export function CardPrimary({
  as: _Component = _Builtin.DOM,
  headingText = "Lorem ipsum dolor sit amet",
  headingTag = "h3",
  visibility = true,
  paragraphVisibility = true,
  paragraphText = "",
  linkVisibility = false,
  linkScreenReaderText = "",

  linkUrl = {
    href: "#",
  },

  linkType = "button",
  linkTarget,
  linkAttributeName,
  linkAttributeValue,
  tag = "div",
  classes,
  style,
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "card_primary_wrap")}
      slot=""
      tag={tag}
      _class={classes}
      style={style}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "card_primary_inner", "u-margin-trim")}
        tag="div"
      >
        <_Builtin.Heading
          className={_utils.cx(
            _styles,
            "card_primary_title",
            "u-text-style-h4",
            "u-margin-bottom-text"
          )}
          tag={headingTag}
        >
          {headingText}
        </_Builtin.Heading>
        <TypographyParagraph
          visibility={paragraphVisibility}
          text={paragraphText}
        />
        <Clickable
          visibility={linkVisibility}
          screenReaderText={linkScreenReaderText}
          link={linkUrl}
          type={linkType}
          target={linkTarget}
          attributeName={linkAttributeName}
          attributeValue={linkAttributeValue}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
