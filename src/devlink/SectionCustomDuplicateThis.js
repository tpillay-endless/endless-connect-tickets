"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { BackgroundColor } from "./BackgroundColor";
import { Spacer } from "./Spacer";
import { ContentWrapper } from "./ContentWrapper";
import { Block } from "./Block";
import * as _utils from "./utils";
import _styles from "./SectionCustomDuplicateThis.module.css";

export function SectionCustomDuplicateThis({
  as: _Component = _Builtin.Section,
  sectionVisibility = true,
  sectionTheme = "Inherit",
  eyebrowVisibility = true,
  eyebrowText = "",
  headingText = "",
  paragraphVisibility = true,
  paragraphText = "",
  buttonGroupVisibility = true,
  button1Visibility = true,
  button1Text = "Button Text",

  button1Link = {
    href: "#",
  },

  button2Visibility = true,
  button2Text = "Button Text",

  button2Link = {
    href: "#",
  },

  imageVisibility = true,
  imageFile = "https://cdn.prod.website-files.com/68c9514a4d942d4c8f7be7bf/68c9514b4d942d4c8f7be90e_placeholder.svg",
  imageLoading = "lazy",
  videoVisibility = false,
  videoUrl,
  sectionBackgroundColor = null,
  sectionPaddingTop = null,
  sectionPaddingBottom = null,
  sectionId,
}) {
  const _styleVariantMap = {
    Inherit: "",
    Light: "w-variant-f3a81397-d460-3add-9beb-5ec7af47907a",
    Dark: "w-variant-b4d321b1-05d4-6b05-8ab2-dfbc2f41ee4e",
    Brand: "w-variant-bb2c68bd-fd74-aa1e-69b0-e84595dd4ec8",
  };

  const _activeStyleVariant = _styleVariantMap[sectionTheme];

  return sectionVisibility ? (
    <_Component
      className={_utils.cx(
        _styles,
        "section_wrap",
        "u-section",
        _activeStyleVariant
      )}
      grid={{
        type: "section",
      }}
      tag="section"
      id={sectionId}
    >
      <BackgroundColor backgroundColor={sectionBackgroundColor} />
      <Spacer sectionSpace={sectionPaddingTop} />
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "section_contain",
          "u-container",
          _activeStyleVariant
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "section_layout",
            "u-grid-autofit",
            _activeStyleVariant
          )}
          tag="div"
        >
          <ContentWrapper
            slot={
              <>
                <TypographyEyebrow
                  text={eyebrowText}
                  visibility={eyebrowVisibility}
                />
                <TypographyHeading text={headingText} />
                <TypographyParagraph
                  text={paragraphText}
                  visibility={paragraphVisibility}
                />
                <ButtonWrapper
                  visibility={buttonGroupVisibility}
                  slot={
                    <>
                      <ButtonMain
                        text={button1Text}
                        link={button1Link}
                        visibility={button1Visibility}
                      />
                      <ButtonMain
                        text={button2Text}
                        link={button2Link}
                        visibility={button2Visibility}
                        style="Secondary"
                      />
                    </>
                  }
                />
              </>
            }
          />
          <Block
            classes="u-visual-wrap u-height-full u-radius-small u-background-skeleton"
            slotContent={
              <>
                <VisualImage
                  visibility={imageVisibility}
                  image={imageFile}
                  loading={imageLoading}
                  classes="u-cover-absolute"
                />
                <VisualVideo
                  url={videoUrl}
                  visibility={videoVisibility}
                  classes="u-cover-absolute"
                />
              </>
            }
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <Spacer sectionSpace={sectionPaddingBottom} />
    </_Component>
  ) : null;
}
