"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { BackgroundColor } from "./BackgroundColor";
import { ContentWrapper } from "./ContentWrapper";
import * as _utils from "./utils";
import _styles from "./EventHero.module.css";

export function EventHero({
  as: _Component = _Builtin.Section,
  sectionVisibility = true,
  eyebrowVisibility = true,
  eyebrowText = "",
  headingText = "",
  locationVisibility = true,
  locationText = "",
  paragraphVisibility = true,
  paragraphText = "",
  buttonGroupVisibility = true,
  buttonVisibility = true,
  buttonText = "Button Text",

  buttonLink = {
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
  sectionTheme = "Inherit",
  visualImageFetchPriority,
}) {
  const _styleVariantMap = {
    Inherit: "",
    Light: "w-variant-91c8e8dc-8c7a-63ae-1141-b4a4b4a34c0d",
    Dark: "w-variant-91c8e8dc-8c7a-63ae-1141-b4a4b4a34c0e",
    Brand: "w-variant-91c8e8dc-8c7a-63ae-1141-b4a4b4a34c0f",
  };

  const _activeStyleVariant = _styleVariantMap[sectionTheme];

  return sectionVisibility ? (
    <_Component
      className={_utils.cx(
        _styles,
        "event-hero_wrap",
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
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "event-hero_top-line",
          _activeStyleVariant
        )}
        tag="div"
      />
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "event-hero_contain",
          "u-container",
          "u-flex-vertical-nowrap",
          "u-overflow-hidden",
          _activeStyleVariant
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "event-hero_layout",
            "u-flex-vertical-nowrap",
            "u-flex-grow",
            "u-justify-content-between",
            "u-gap-6",
            _activeStyleVariant
          )}
          tag="div"
        >
          <ContentWrapper
            slot={
              <>
                <TypographyParagraph
                  text={
                    <_Builtin.Paragraph>
                      {"In partnership with"}
                    </_Builtin.Paragraph>
                  }
                  classes="u-margin-bottom-2 u-rich-text"
                  fontStyle="Text Tiny"
                />
                <LogoGrodan />
              </>
            }
            classes=" "
          />
          <ContentWrapper
            slot={
              <>
                <TypographyEyebrow
                  text={eyebrowText}
                  visibility={eyebrowVisibility}
                />
                <TypographyHeading text={headingText} />
                <TypographyParagraph
                  text={locationText}
                  visibility={locationVisibility}
                  fontStyle="H4"
                  classes="u-margin-bottom-text u-rich-text u-color-accent"
                />
                <TypographyParagraph
                  text={paragraphText}
                  visibility={paragraphVisibility}
                  classes="u-margin-top-6 u-margin-bottom-6 u-max-width-50ch"
                  fontStyle="H5"
                />
                <ButtonWrapper
                  slot={
                    <>
                      <ButtonMain
                        text={buttonText}
                        link={buttonLink}
                        visibility={buttonVisibility}
                      />
                      <TypographyParagraph
                        text={
                          <_Builtin.Paragraph>
                            {"Only 67 tickets left"}
                          </_Builtin.Paragraph>
                        }
                        fontStyle="Text Small"
                        classes="u-rich-text"
                        dataAttribute="ticket-counter-txt"
                      />
                    </>
                  }
                  classes="u-flex-vertical-nowrap u-gap-3"
                />
              </>
            }
            classes="u-margin-trim u-max-width-80ch"
          />
          <ContentWrapper
            slot={
              <>
                <VisualImage
                  visibility={imageVisibility}
                  image={imageFile}
                  loading={imageLoading}
                  fetchPriority={visualImageFetchPriority}
                  classes="u-cover-absolute event-hero_img"
                />
                <VisualVideo
                  url={videoUrl}
                  visibility={videoVisibility}
                  classes="u-cover-absolute"
                />
              </>
            }
            classes="u-zindex-negative u-cover-absolute"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
