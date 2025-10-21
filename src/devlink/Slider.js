"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonArrow } from "./ButtonArrow";
import * as _utils from "./utils";
import _styles from "./Slider.module.css";

export function Slider({
  as: _Component = _Builtin.DOM,
  visibility = true,
  slidesPerView = "--lg: 4; --md: 3; --sm: 2; --xs: 1;",
  style = "Overflow Visible",
  classes = "u-gap-gutter",
  settingsFollowFinger = "true",
  settingsFreeMode = "false",
  settingsMousewheel = "true",
  settingsSlideToClickedSlide = "false",
  settingsSpeed = "600",
  slot,
  controlsVisibility = true,
}) {
  const _styleVariantMap = {
    "Overflow Visible": "",
    "Overflow Hidden": "w-variant-bfb8c45c-dbfa-13cc-2dfc-0c02a34504e4",
    "Crop Left": "w-variant-b8ee48da-439e-7156-5d2e-5b4f080e200e",
  };

  const _activeStyleVariant = _styleVariantMap[style];

  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "slider_wrap", _activeStyleVariant)}
      tag="div"
      slot=""
      _class={classes}
      data-slider="component"
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "u-embed-css", _activeStyleVariant)}
        value="%3Cstyle%3E%0A.slider_offset%20%7B%0A%20%20--slide-count%3A%20var(--lg)%3B%0A%09--lg%3A%203%3B%0A%20%20--md%3A%20var(--lg)%3B%0A%20%20--sm%3A%20var(--md)%3B%0A%20%20--xs%3A%20var(--sm)%3B%0A%7D%0A%40container%20(width%20%3C%2050em)%20%7B%0A%09.slider_offset%20%7B%20--slide-count%3A%20var(--md)%3B%20%7D%0A%7D%0A%40container%20(width%20%3C%2035em)%20%7B%0A%09.slider_offset%20%7B%20--slide-count%3A%20var(--sm)%3B%20%7D%0A%7D%0A%40container%20(width%20%3C%2020em)%20%7B%0A%09.slider_offset%20%7B%20--slide-count%3A%20var(--xs)%3B%20%7D%0A%7D%0A.slider_list%20%3E%20.w-dyn-list%2C%0A.slider_list%20%3E%20.w-dyn-list%20%3E%20*%2C%0A.slider_list%20%3E%20.w-dyn-list%20%3E%20*%20%3E%20*%20%7B%0A%09display%3A%20contents%3B%0A%7D%0A.slider_list%20%3E%20*%2C%0A.slider_list%20%3E%20.w-dyn-list%20%3E%20*%20%3E%20*%20%3E%20*%20%7B%0A%09padding-inline%3A%20calc(var(--_gap---size)%20%2F%202)%3B%0A%09height%3A%20auto%20!important%3B%0A%09flex%3A%200%200%20auto%3B%0A%09width%3A%20calc(100%25%20%2F%20var(--slide-count))%20!important%3B%0A%7D%0A%5Bdata-slider%5D.swiper-button-disabled%20%7B%0A%09opacity%3A%200.5%3B%0A%20%20pointer-events%3A%20none%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
      <_Builtin.DOM
        className={_utils.cx(_styles, "slider_offset", _activeStyleVariant)}
        tag="div"
        slot=""
        style={slidesPerView}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "slider_element",
            "swiper",
            _activeStyleVariant
          )}
          tag="div"
          data-follow-finger={settingsFollowFinger}
          data-free-mode={settingsFreeMode}
          data-mousewheel={settingsMousewheel}
          data-slide-to-clicked={settingsSlideToClickedSlide}
          data-speed={settingsSpeed}
        >
          <_Builtin.NotSupported _atom="Slot" />
        </_Builtin.Block>
      </_Builtin.DOM>
      {controlsVisibility ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "slider_controls", _activeStyleVariant)}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "slider_bullet_list",
              _activeStyleVariant
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "slider_bullet_item",
                "is-active",
                _activeStyleVariant
              )}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "slider_bullet_item",
                _activeStyleVariant
              )}
              tag="div"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "slider_button_layout",
              _activeStyleVariant
            )}
            tag="div"
          >
            <ButtonArrow
              arrowDirection="Left"
              screenReaderText="Previous"
              attributeName="data-slider"
              attributeValue="previous"
              style="Secondary"
            />
            <ButtonArrow
              attributeName="data-slider"
              attributeValue="next"
              style="Secondary"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "u-embed-js", _activeStyleVariant)}
        value="%3Clink%20rel%3D%22stylesheet%22%20href%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fswiper%408%2Fswiper-bundle.min.css%22%3E%0A%3Cscript%20src%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fswiper%408%2Fswiper-bundle.min.js%22%3E%3C%2Fscript%3E%0A%3Cscript%3E%0Adocument.addEventListener(%22DOMContentLoaded%22%2C%20()%20%3D%3E%20%7B%0A%20%20document.querySelectorAll(%22%5Bdata-slider%3D'component'%5D%3Anot(%5Bdata-slider%3D'component'%5D%20%5Bdata-slider%3D'component'%5D)%22).forEach((component)%20%3D%3E%20%7B%0A%20%20%20%20if%20(component.dataset.scriptInitialized)%20return%3B%0A%20%20%20%20component.dataset.scriptInitialized%20%3D%20%22true%22%3B%0A%0A%20%20%20%20const%20swiperElement%20%3D%20component.querySelector(%22.slider_element%22)%3B%0A%20%20%20%20const%20swiperWrapper%20%3D%20component.querySelector(%22.slider_list%22)%3B%0A%20%20%20%20if%20(!swiperElement%20%7C%7C%20!swiperWrapper)%20return%3B%0A%0A%20%20%20%20function%20removeCMSList(slot)%20%7B%0A%20%20%20%20%20%20const%20dynList%20%3D%20Array.from(slot.children).find((child)%20%3D%3E%20child.classList.contains(%22w-dyn-list%22))%3B%0A%20%20%20%20%20%20if%20(!dynList)%20return%3B%0A%20%20%20%20%20%20const%20nestedItems%20%3D%20dynList%3F.firstElementChild%3F.children%3B%0A%20%20%20%20%20%20if%20(!nestedItems)%20return%3B%0A%20%20%20%20%20%20const%20staticWrapper%20%3D%20%5B...slot.children%5D%3B%0A%20%20%20%20%20%20%5B...nestedItems%5D.forEach(el%20%3D%3E%20el.firstElementChild%20%26%26%20slot.appendChild(el.firstElementChild))%3B%0A%20%20%20%20%20%20staticWrapper.forEach((el)%20%3D%3E%20el.remove())%3B%0A%20%20%20%20%7D%0A%20%20%20%20removeCMSList(swiperWrapper)%3B%0A%0A%20%20%20%20%5B...swiperWrapper.children%5D.forEach((el)%20%3D%3E%20el.classList.add(%22swiper-slide%22))%3B%0A%0A%20%20%20%20const%20followFinger%20%3D%20swiperElement.getAttribute(%22data-follow-finger%22)%20%3D%3D%3D%20%22true%22%2C%0A%20%20%20%20%20%20freeMode%20%3D%20swiperElement.getAttribute(%22data-free-mode%22)%20%3D%3D%3D%20%22true%22%2C%0A%20%20%20%20%20%20mousewheel%20%3D%20swiperElement.getAttribute(%22data-mousewheel%22)%20%3D%3D%3D%20%22true%22%2C%0A%20%20%20%20%20%20slideToClickedSlide%20%3D%20swiperElement.getAttribute(%22data-slide-to-clicked%22)%20%3D%3D%3D%20%22true%22%2C%0A%20%20%20%20%20%20speed%20%3D%20%2BswiperElement.getAttribute(%22data-speed%22)%20%7C%7C%20600%3B%0A%0A%20%20%20%20new%20Swiper(swiperElement%2C%20%7B%0A%20%20%20%20%20%20slidesPerView%3A%20%22auto%22%2C%0A%20%20%20%20%20%20followFinger%3A%20followFinger%2C%0A%20%20%20%20%20%20loopAdditionalSlides%3A%2010%2C%0A%20%20%20%20%20%20freeMode%3A%20freeMode%2C%0A%20%20%20%20%20%20slideToClickedSlide%3A%20slideToClickedSlide%2C%0A%20%20%20%20%20%20centeredSlides%3A%20false%2C%0A%20%20%20%20%20%20autoHeight%3A%20false%2C%0A%20%20%20%20%20%20speed%3A%20speed%2C%0A%20%20%20%20%20%20mousewheel%3A%20%7B%0A%20%20%20%20%20%20%20%20enabled%3A%20mousewheel%2C%0A%20%20%20%20%20%20%20%20forceToAxis%3A%20true%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20keyboard%3A%20%7B%0A%20%20%20%20%20%20%20%20enabled%3A%20true%2C%0A%20%20%20%20%20%20%20%20onlyInViewport%3A%20true%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20navigation%3A%20%7B%0A%20%20%20%20%20%20%20%20nextEl%3A%20component.querySelector(%22%5Bdata-slider%3D'next'%5D%20button%22)%2C%0A%20%20%20%20%20%20%20%20prevEl%3A%20component.querySelector(%22%5Bdata-slider%3D'previous'%5D%20button%22)%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20pagination%3A%20%7B%0A%20%20%20%20%20%20%20%20el%3A%20component.querySelector(%22.slider_bullet_list%22)%2C%0A%20%20%20%20%20%20%20%20bulletActiveClass%3A%20%22is-active%22%2C%0A%20%20%20%20%20%20%20%20bulletClass%3A%20%22slider_bullet_item%22%2C%0A%20%20%20%20%20%20%20%20bulletElement%3A%20%22button%22%2C%0A%20%20%20%20%20%20%20%20clickable%3A%20true%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20slideActiveClass%3A%20%22is-active%22%2C%0A%20%20%20%20%20%20slideDuplicateActiveClass%3A%20%22is-active%22%2C%0A%20%20%20%20%7D)%3B%0A%20%20%7D)%3B%0A%7D)%3B%0A%3C%2Fscript%3E"
      />
    </_Component>
  ) : null;
}
