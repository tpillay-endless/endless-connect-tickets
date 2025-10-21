"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { VisualImage } from "./VisualImage";
import { TypographyParagraph } from "./TypographyParagraph";
import { TypographyHeading } from "./TypographyHeading";
import { Clickable } from "./Clickable";
import * as _utils from "./utils";
import _styles from "./CardSpeaker.module.css";

export function CardSpeaker({
  as: _Component = _Builtin.DOM,
  cardVisibility = true,
  cardTag = "div",
  cardClasses,
  cardStyle,
  visualImageVisibility = true,
  visualImageImage = "https://cdn.prod.website-files.com/68c9514a4d942d4c8f7be7bf/68c9514b4d942d4c8f7be90e_placeholder.svg",
  speakerTopicVisibility = true,
  speakerTopic = "",
  speakerName = "",
  bioVisibility = true,
  bioText = "",
  linkVisibility = false,
  linkScreenReaderText = "",

  linkUrl = {
    href: "#",
  },

  linkType = "button",
  linkTarget,
  linkAttributeName,
  linkAttributeValue,
  speakerTitleVisibility = true,
  speakerTitle = "",
}) {
  return cardVisibility ? (
    <_Component
      className={_utils.cx(_styles, "card_speaker_wrap")}
      slot=""
      tag={cardTag}
      _class={cardClasses}
      style={cardStyle}
    >
      <VisualImage
        visibility={visualImageVisibility}
        image={visualImageImage}
        classes="u-ratio-4-5 u-background-skeleton"
      />
      <TypographyParagraph
        visibility={speakerTopicVisibility}
        text={speakerTopic}
        fontStyle="Text Tiny"
        classes="u-rich-text u-text-transform-uppercase u-weight-medium"
      />
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "card_speaker_name-block",
          "u-flex-vertical-nowrap",
          "u-margin-bottom-3"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "card_speaker_name")}
          tag="div"
        >
          <TypographyHeading text={speakerName} fontStyle="H5" classes=" " />
        </_Builtin.Block>
        <TypographyParagraph
          visibility={speakerTitleVisibility}
          text={speakerTitle}
          classes="u-rich-text"
          fontStyle="Text Small"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "u-max-width-35ch")}
        tag="div"
      >
        <TypographyParagraph
          visibility={bioVisibility}
          text={bioText}
          classes="u-rich-text"
        />
      </_Builtin.Block>
      <Clickable
        visibility={linkVisibility}
        screenReaderText={linkScreenReaderText}
        link={linkUrl}
        type={linkType}
        target={linkTarget}
        attributeName={linkAttributeName}
        attributeValue={linkAttributeValue}
      />
    </_Component>
  ) : null;
}
