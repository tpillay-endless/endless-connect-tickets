"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Logo } from "./Logo";
import * as _utils from "./utils";
import _styles from "./Footer.module.css";

export function Footer({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "footer_wrap")}
      tag="footer"
      grid={{
        type: "section",
      }}
    >
      <_Builtin.Heading
        className={_utils.cx(_styles, "footer_title", "u-sr-only")}
        tag="h2"
      >
        {"Footer"}
      </_Builtin.Heading>
      <_Builtin.Block
        className={_utils.cx(_styles, "footer_contain", "u-container")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "footer_layout", "u-grid-above")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "footer_content")}
            tag="div"
          >
            <_Builtin.Link
              className={_utils.cx(_styles, "footer_logo_wrap")}
              id={_utils.cx(
                _styles,
                "w-node-_29394d2f-cd0c-8059-7e15-66f9381499a5-3814999f"
              )}
              button={false}
              aria-label="Go to the homepage"
              block="inline"
              options={{
                href: "#",
              }}
            >
              <Logo />
            </_Builtin.Link>
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_social_wrap")}
              tag="div"
            >
              <_Builtin.Heading
                className={_utils.cx(
                  _styles,
                  "footer_social_title",
                  "u-text-style-h6",
                  "u-margin-bottom-4"
                )}
                tag="h3"
              >
                {"Follow us"}
              </_Builtin.Heading>
              <_Builtin.DOM
                className={_utils.cx(_styles, "footer_social_list")}
                tag="ul"
                slot=""
              >
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_social_item")}
                  tag="li"
                  slot=""
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_social_link")}
                    button={false}
                    aria-label="Facebook"
                    block="inline"
                    options={{
                      href: "#",
                      target: "_blank",
                    }}
                  >
                    <_Builtin.DOM
                      className={_utils.cx(_styles, "u-svg")}
                      tag="svg"
                      slot=""
                      width="100%"
                      viewBox="0 0 64 64"
                      aria-hidden="true"
                    >
                      <_Builtin.DOM
                        tag="path"
                        slot=""
                        fill="currentColor"
                        d="M24.92437,62V36H16V24h8.92437v-8.38004C24.92437,6.49153,30.70333,2,38.84651,2 c3.90067,0,7.25309,0.29041,8.23008,0.42022v9.53975l-5.64773,0.00257C37.00014,11.96253,36,14.06699,36,17.15515V24h12l-4,12h-8v26 H24.92437z"
                      />
                    </_Builtin.DOM>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_social_item")}
                  tag="li"
                  slot=""
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_social_link")}
                    button={false}
                    aria-label="Instagram"
                    block="inline"
                    options={{
                      href: "#",
                      target: "_blank",
                    }}
                  >
                    <_Builtin.DOM
                      className={_utils.cx(_styles, "u-svg")}
                      tag="svg"
                      slot=""
                      viewBox="0 0 56 56"
                      width="100%"
                      aria-hidden="true"
                    >
                      <_Builtin.DOM
                        tag="path"
                        slot=""
                        d="M55.84,16.46c-.05-2.33-.49-4.63-1.3-6.8-1.46-3.76-4.43-6.74-8.2-8.19-2.17-.81-4.47-1.25-6.8-1.3-2.98-.14-3.94-.17-11.54-.17s-8.55.03-11.54.17c-2.32.04-4.62.48-6.8,1.3C5.9,2.92,2.93,5.9,1.47,9.66.66,11.84.22,14.14.17,16.46c-.13,2.98-.17,3.94-.17,11.54s.04,8.56.17,11.54c.05,2.33.49,4.63,1.3,6.8,1.46,3.76,4.43,6.74,8.19,8.19,2.18.82,4.48,1.26,6.8,1.3,2.99.14,3.94.17,11.54.17s8.56-.03,11.55-.17c2.32-.04,4.62-.48,6.8-1.3,3.76-1.45,6.73-4.43,8.19-8.19.81-2.17,1.25-4.47,1.3-6.8.13-2.98.16-3.94.16-11.54s-.03-8.56-.16-11.54ZM28,42.38c-7.94,0-14.37-6.44-14.37-14.38s6.43-14.38,14.37-14.38c3.97,0,7.56,1.61,10.17,4.21,2.6,2.61,4.21,6.2,4.21,10.17,0,7.94-6.44,14.38-14.38,14.38ZM42.95,16.41c-1.86,0-3.36-1.5-3.36-3.36s1.5-3.36,3.36-3.36,3.36,1.51,3.36,3.36-1.5,3.36-3.36,3.36Z"
                        fill="currentColor"
                      />
                      <_Builtin.DOM
                        tag="path"
                        slot=""
                        d="M37.34,28c0,5.15-4.18,9.33-9.33,9.33h-.01c-5.15,0-9.33-4.18-9.33-9.33s4.18-9.33,9.33-9.33,9.34,4.18,9.34,9.33Z"
                        fill="currentColor"
                      />
                    </_Builtin.DOM>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_social_item")}
                  tag="li"
                  slot=""
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_social_link")}
                    button={false}
                    aria-label="Linked In"
                    block="inline"
                    options={{
                      href: "#",
                      target: "_blank",
                    }}
                  >
                    <_Builtin.DOM
                      className={_utils.cx(_styles, "u-svg")}
                      tag="svg"
                      slot=""
                      width="100%"
                      viewBox="0 0 46 46"
                      aria-hidden="true"
                    >
                      <_Builtin.DOM
                        tag="path"
                        slot=""
                        d="M11 5.5C11 8.6 8.6 11 5.5 11C2.4 11 0 8.5 0 5.5C0 2.5 2.5 0 5.5 0C8.5 0 11 2.5 11 5.5Z"
                        fill="currentColor"
                      />
                      <_Builtin.DOM
                        tag="path"
                        slot=""
                        d="M10.2998 15.1992H0.799805V45.6992H10.2998V15.1992Z"
                        fill="currentColor"
                      />
                      <_Builtin.DOM
                        tag="path"
                        slot=""
                        d="M45.8002 29V45.7H36.3002V30.9C36.3002 27.4 36.2002 22.8 31.4002 22.8C26.6002 22.8 25.7002 26.7 25.7002 30.6V45.7H16.2002V15.2H25.3002V19.4H25.4002C26.7002 17 29.8002 14.5 34.4002 14.5C44.0002 14.5 45.8002 20.8 45.8002 29Z"
                        fill="currentColor"
                      />
                    </_Builtin.DOM>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_social_item")}
                  tag="li"
                  slot=""
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_social_link")}
                    button={false}
                    aria-label="YouTube"
                    block="inline"
                    options={{
                      href: "#",
                      target: "_blank",
                    }}
                  >
                    <_Builtin.DOM
                      className={_utils.cx(_styles, "u-svg")}
                      tag="svg"
                      slot=""
                      width="100%"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <_Builtin.DOM
                        tag="path"
                        slot=""
                        fill="currentColor"
                        d="M47.5,14.4c0,0-0.5-3.3-1.9-4.8c-1.8-1.9-3.9-1.9-4.8-2C34.1,7.1,24,7.1,24,7.1h0c0,0-10.1,0-16.8,0.5 c-0.9,0.1-3,0.1-4.8,2c-1.4,1.5-1.9,4.8-1.9,4.8S0,18.3,0,22.2v3.6c0,3.9,0.5,7.8,0.5,7.8s0.5,3.3,1.9,4.8c1.8,1.9,4.2,1.9,5.3,2.1 c3.8,0.4,16.3,0.5,16.3,0.5s10.1,0,16.8-0.5c0.9-0.1,3-0.1,4.8-2c1.4-1.5,1.9-4.8,1.9-4.8s0.5-3.9,0.5-7.8v-3.6 C48,18.3,47.5,14.4,47.5,14.4z M19,30.2l0-13.5l13,6.8L19,30.2z"
                      />
                    </_Builtin.DOM>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_social_item")}
                  tag="li"
                  slot=""
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_social_link")}
                    button={false}
                    aria-label="X"
                    block="inline"
                    options={{
                      href: "#",
                      target: "_blank",
                    }}
                  >
                    <_Builtin.DOM
                      className={_utils.cx(_styles, "u-svg")}
                      tag="svg"
                      slot=""
                      width="100%"
                      viewBox="0 0 300 301"
                      aria-hidden="true"
                    >
                      <_Builtin.DOM
                        tag="path"
                        slot=""
                        d="M178.57 127.15L290.27 0H263.81L166.78 110.38L89.34 0H0L117.13 166.93L0 300.25H26.46L128.86 183.66L210.66 300.25H300M36.01 19.54H76.66L263.79 281.67H223.13"
                        fill="currentColor"
                      />
                    </_Builtin.DOM>
                  </_Builtin.Link>
                </_Builtin.DOM>
              </_Builtin.DOM>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "footer_nav")}
            tag="nav"
            aria-label="Directory"
            data-trigger="group"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_group_wrap")}
              tag="section"
            >
              <_Builtin.Heading
                className={_utils.cx(
                  _styles,
                  "footer_group_title",
                  "u-text-style-h6",
                  "u-margin-bottom-text"
                )}
                tag="h3"
              >
                {"Heading Text"}
              </_Builtin.Heading>
              <_Builtin.DOM
                className={_utils.cx(_styles, "footer_group_list")}
                tag="ul"
                slot=""
              >
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text Here"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text Goes Here"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text Goes Here"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text Here"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
              </_Builtin.DOM>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_group_wrap")}
              tag="section"
            >
              <_Builtin.Heading
                className={_utils.cx(
                  _styles,
                  "footer_group_title",
                  "u-text-style-h6",
                  "u-margin-bottom-text"
                )}
                tag="h3"
              >
                {"Heading"}
              </_Builtin.Heading>
              <_Builtin.DOM
                className={_utils.cx(_styles, "footer_group_list")}
                tag="ul"
                slot=""
              >
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text Here"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text Goes Here"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
              </_Builtin.DOM>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_group_wrap")}
              tag="section"
            >
              <_Builtin.Heading
                className={_utils.cx(
                  _styles,
                  "footer_group_title",
                  "u-text-style-h6",
                  "u-margin-bottom-text"
                )}
                tag="h3"
              >
                {"Heading Text"}
              </_Builtin.Heading>
              <_Builtin.DOM
                className={_utils.cx(_styles, "footer_group_list")}
                tag="ul"
                slot=""
              >
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text Goes Here"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text Here"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
              </_Builtin.DOM>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_group_wrap")}
              tag="section"
            >
              <_Builtin.Heading
                className={_utils.cx(
                  _styles,
                  "footer_group_title",
                  "u-text-style-h6",
                  "u-margin-bottom-text"
                )}
                tag="h3"
              >
                {"Heading"}
              </_Builtin.Heading>
              <_Builtin.DOM
                className={_utils.cx(_styles, "footer_group_list")}
                tag="ul"
                slot=""
              >
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text Here"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text Here"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "footer_group_item")}
                  tag="li"
                  slot=""
                  data-trigger="hover-other focus-other"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "footer_link_wrap")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "footer_link_text",
                        "u-text-style-small"
                      )}
                      tag="div"
                    >
                      {"Link Text Goes Here"}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.DOM>
              </_Builtin.DOM>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "footer_bottom_wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "footer_bottom_contain", "u-container")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "footer_bottom_layout")}
            tag="div"
          >
            <_Builtin.DOM
              className={_utils.cx(
                _styles,
                "footer_bottom_text",
                "u-text-style-small"
              )}
              tag="div"
              slot=""
            >
              <_Builtin.DOM tag="span" slot="">
                {"© "}
              </_Builtin.DOM>
              <_Builtin.DOM tag="span" slot="" data-dynamic-year=" ">
                {"{{year}}"}
              </_Builtin.DOM>
              <_Builtin.DOM tag="span" slot="">
                {"Copyright. All Rights Reserved."}
              </_Builtin.DOM>
            </_Builtin.DOM>
            <_Builtin.DOM
              className={_utils.cx(_styles, "footer_bottom_list")}
              tag="ul"
              slot=""
              data-trigger="group"
            >
              <_Builtin.DOM
                className={_utils.cx(_styles, "footer_bottom_item")}
                tag="li"
                slot=""
                data-trigger="hover-other focus-other"
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "footer_bottom_link_wrap")}
                  button={false}
                  block="inline"
                  options={{
                    href: "#",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "footer_bottom_link_text",
                      "u-text-style-small"
                    )}
                    tag="div"
                  >
                    {"Privacy Policy"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.DOM>
              <_Builtin.DOM
                className={_utils.cx(_styles, "footer_bottom_item")}
                tag="li"
                slot=""
                data-trigger="hover-other focus-other"
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "footer_bottom_link_wrap")}
                  button={false}
                  block="inline"
                  options={{
                    href: "#",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "footer_bottom_link_text",
                      "u-text-style-small"
                    )}
                    tag="div"
                  >
                    {"Terms & Conditions"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.DOM>
              <_Builtin.DOM
                className={_utils.cx(_styles, "footer_bottom_item")}
                tag="li"
                slot=""
                data-trigger="hover-other focus-other"
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "footer_bottom_link_wrap")}
                  button={false}
                  block="inline"
                  options={{
                    href: "#",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "footer_bottom_link_text",
                      "u-text-style-small"
                    )}
                    tag="div"
                  >
                    {"Site Map"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.DOM>
            </_Builtin.DOM>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "u-embed-js")}
        value="%3Cscript%3E%0Adocument.addEventListener(%22DOMContentLoaded%22%2C%20function%20()%20%7B%0A%20%20document.querySelectorAll(%22%5Bdata-dynamic-year%5D%22).forEach(function%20(el)%20%7B%0A%20%20%20%20el.textContent%20%3D%20new%20Date().getFullYear()%3B%0A%20%20%7D)%3B%0A%7D)%3B%0A%3C%2Fscript%3E"
      />
    </_Component>
  );
}
