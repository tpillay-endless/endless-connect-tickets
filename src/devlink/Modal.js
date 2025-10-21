"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonClose } from "./ButtonClose";
import * as _utils from "./utils";
import _styles from "./Modal.module.css";

export function Modal({
  as: _Component = _Builtin.DOM,
  modalId = "modal-1",
  slot,
  showInDesigner = "false",
  size = "Small",
}) {
  const _styleVariantMap = {
    Small: "",
    "Full Screen": "w-variant-abed2e46-044e-db8d-e420-f41a8503c278",
  };

  const _activeStyleVariant = _styleVariantMap[size];

  return (
    <_Component
      className={_utils.cx(_styles, "modal_dialog", _activeStyleVariant)}
      tag="dialog"
      slot=""
      data-modal-target={modalId}
      data-show-in-designer={showInDesigner}
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "u-embed-css", _activeStyleVariant)}
        value="%3Cstyle%3E%0A.modal_dialog%3A%3Abackdrop%20%7B%20opacity%3A%200%3B%20%7D%0A.wf-design-mode%20%5Bdata-show-in-designer%3D%22true%22%5D%20%7B%0A%09display%3A%20block%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "modal_inner", _activeStyleVariant)}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "modal_backdrop", _activeStyleVariant)}
          tag="div"
          data-modal-close=""
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "modal_content", _activeStyleVariant)}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "modal_scroll", _activeStyleVariant)}
            tag="div"
            data-modal-scroll=""
            data-lenis-prevent=" "
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "modal_close", _activeStyleVariant)}
              tag="div"
            >
              <ButtonClose
                attribute1Name="data-modal-close"
                attribute1Value=" "
                attribute2Name="autofocus"
                attribute2Value=" "
              />
            </_Builtin.Block>
            <_Builtin.NotSupported _atom="Slot" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "u-embed-js", _activeStyleVariant)}
        value="%3Cscript%3E%0Adocument.addEventListener(%22DOMContentLoaded%22%2C%20function%20()%20%7B%0A%09const%20modalSystem%20%3D%20((window.lumos%20%3F%3F%3D%20%7B%7D).modal%20%3F%3F%3D%20%7B%0A%09%09list%3A%20%7B%7D%2C%20open(id)%20%7B%20this.list%5Bid%5D%3F.open%3F.()%3B%20%7D%2C%20closeAll()%20%7B%20Object.values(this.list).forEach((m)%20%3D%3E%20m.close%3F.())%3B%20%7D%2C%0A%09%7D)%3B%0A%09function%20createModals()%20%7B%0A%09%09document.querySelectorAll(%22.modal_dialog%22).forEach(function%20(modal)%20%7B%0A%09%09if%20(modal.dataset.scriptInitialized)%20return%3B%0A%09%09modal.dataset.scriptInitialized%20%3D%20%22true%22%3B%0A%0A%09%09const%20modalId%20%3D%20modal.getAttribute(%22data-modal-target%22)%3B%0A%09%09let%20lastFocusedElement%3B%0A%0A%09%09if%20(typeof%20gsap%20!%3D%3D%20%22undefined%22)%20%7B%0A%09%09%09gsap.context(()%20%3D%3E%20%7B%0A%09%09%09%09let%20tl%20%3D%20gsap.timeline(%7B%20paused%3A%20true%2C%20onReverseComplete%3A%20resetModal%20%7D)%3B%0A%09%09%09%09tl.fromTo(modal%2C%20%7B%20opacity%3A%200%20%7D%2C%20%7B%20opacity%3A%201%2C%20duration%3A%200.3%2C%20ease%3A%20%22power1.out%22%20%7D)%3B%0A%09%09%09%09tl.from(%22.modal_content%22%2C%20%7B%20y%3A%20%226rem%22%2C%20duration%3A%200.3%2C%20ease%3A%20%22power1.out%22%20%7D%2C%20%22%3C%22)%3B%0A%09%09%09%09modal.tl%20%3D%20tl%3B%0A%09%09%09%7D%2C%20modal)%3B%0A%09%09%7D%0A%0A%09%09function%20resetModal()%20%7B%0A%09%09%09typeof%20lenis%20!%3D%3D%20%22undefined%22%20%26%26%20lenis.start%20%3F%20lenis.start()%20%3A%20(document.body.style.overflow%20%3D%20%22%22)%3B%0A%09%09%09modal.close()%3B%0A%20%09%09%09if%20(lastFocusedElement)%20lastFocusedElement.focus()%3B%0A%09%09%09window.dispatchEvent(new%20CustomEvent(%22modal-close%22%2C%20%7B%20detail%3A%20%7B%20modal%20%7D%20%7D))%3B%0A%09%09%7D%0A%09%09function%20openModal()%20%7B%0A%09%09%09typeof%20lenis%20!%3D%3D%20%22undefined%22%20%26%26%20lenis.stop%20%3F%20lenis.stop()%20%3A%20(document.body.style.overflow%20%3D%20%22hidden%22)%3B%0A%09%09%09lastFocusedElement%20%3D%20document.activeElement%3B%0A%09%09%09modal.showModal()%3B%0A%09%09%09if%20(typeof%20gsap%20!%3D%3D%20%22undefined%22)%20modal.tl.play()%3B%0A%09%09%09modal.querySelectorAll(%22%5Bdata-modal-scroll%5D%22).forEach((el)%20%3D%3E%20(el.scrollTop%20%3D%200))%3B%0A%09%09%09window.dispatchEvent(new%20CustomEvent(%22modal-open%22%2C%20%7B%20detail%3A%20%7B%20modal%20%7D%20%7D))%3B%0A%09%09%7D%0A%09%09function%20closeModal()%20%7B%0A%09%09%09typeof%20gsap%20!%3D%3D%20%22undefined%22%20%3F%20modal.tl.reverse()%20%3A%20resetModal()%3B%0A%09%09%7D%0A%0A%09%09if%20(new%20URLSearchParams(location.search).get(%22modal-id%22)%20%3D%3D%3D%20modalId)%20openModal()%2C%20history.replaceState(%7B%7D%2C%20%22%22%2C%20((u)%20%3D%3E%20(u.searchParams.delete(%22modal-id%22)%2C%20u))(new%20URL(location.href)))%3B%0A%09%09modal.addEventListener(%22cancel%22%2C%20(e)%20%3D%3E%20(e.preventDefault()%2C%20closeModal()))%3B%0A%09%09modal.addEventListener(%22click%22%2C%20(e)%20%3D%3E%20e.target.closest(%22%5Bdata-modal-close%5D%22)%20%26%26%20closeModal())%3B%0A%09%09document.addEventListener(%22click%22%2C%20(e)%20%3D%3E%20e.target.closest(%22%5Bdata-modal-trigger%3D'%22%20%2B%20modalId%20%2B%20%22'%5D%22)%20%26%26%20openModal())%3B%0A%09%09%09modalSystem.list%5BmodalId%5D%20%3D%20%7B%20open%3A%20openModal%2C%20close%3A%20closeModal%20%7D%3B%0A%09%09%7D)%3B%0A%09%7D%0A%09createModals()%3B%0A%7D)%3B%0A%3C%2Fscript%3E"
      />
    </_Component>
  );
}
