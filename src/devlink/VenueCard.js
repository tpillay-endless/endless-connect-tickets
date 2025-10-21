"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TypographyEyebrow } from "./TypographyEyebrow";
import { TypographyParagraph } from "./TypographyParagraph";
import { ButtonMain } from "./ButtonMain";
import * as _utils from "./utils";
import _styles from "./VenueCard.module.css";

export function VenueCard({
  as: _Component = _Builtin.Block,
  eyebrowText = "",
  data = "",
  buttonVisibility = true,
  buttonText = "Button Text",

  buttonLink = {
    href: "#",
  },

  typographyParagraphDataAttribute,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "venue_card", "u-padding-block-5")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "venue_info")} tag="div">
        <TypographyEyebrow text={eyebrowText} classes=" " />
        <TypographyParagraph
          text={data}
          dataAttribute={typographyParagraphDataAttribute}
          classes="u-rich-text u-line-height-small"
        />
      </_Builtin.Block>
      <ButtonMain
        visibility={buttonVisibility}
        text={buttonText}
        link={buttonLink}
        style="Tiny - Secondary"
        classes=" "
      />
    </_Component>
  );
}
