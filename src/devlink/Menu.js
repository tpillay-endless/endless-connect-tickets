"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonMain } from "./ButtonMain";
import * as _utils from "./utils";
import _styles from "./Menu.module.css";

export function Menu({
  as: _Component = _Builtin.Block,
  variant = "Mobile",
  buttonMainStyle = null,
}) {
  const _styleVariantMap = {
    Mobile: "",
    Desktop: "w-variant-23049969-09ac-2789-520b-3c6ae895bbc6",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={_utils.cx(_styles, "nav_links_component", _activeStyleVariant)}
      tag="nav"
      aria-label="Main"
    >
      <_Builtin.List
        className={_utils.cx(_styles, "nav_links_wrap", _activeStyleVariant)}
        tag="ul"
        unstyled={true}
      >
        <_Builtin.ListItem
          className={_utils.cx(_styles, "nav_links_item", _activeStyleVariant)}
        >
          <_Builtin.Link
            className={_utils.cx(
              _styles,
              "nav_links_link",
              _activeStyleVariant
            )}
            button={false}
            block="inline"
            options={{
              href: "#",
            }}
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "nav_links_text",
                _activeStyleVariant
              )}
              tag="div"
            >
              {"About"}
            </_Builtin.Block>
          </_Builtin.Link>
        </_Builtin.ListItem>
        <_Builtin.ListItem
          className={_utils.cx(_styles, "nav_links_item", _activeStyleVariant)}
        >
          <_Builtin.Link
            className={_utils.cx(
              _styles,
              "nav_links_link",
              _activeStyleVariant
            )}
            button={false}
            block="inline"
            options={{
              href: "#",
            }}
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "nav_links_text",
                _activeStyleVariant
              )}
              tag="div"
            >
              {"Agenda"}
            </_Builtin.Block>
          </_Builtin.Link>
        </_Builtin.ListItem>
        <_Builtin.ListItem
          className={_utils.cx(_styles, "nav_links_item", _activeStyleVariant)}
        >
          <_Builtin.Link
            className={_utils.cx(
              _styles,
              "nav_links_link",
              _activeStyleVariant
            )}
            button={false}
            block="inline"
            options={{
              href: "#",
            }}
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "nav_links_text",
                _activeStyleVariant
              )}
              tag="div"
            >
              {"Speakers"}
            </_Builtin.Block>
          </_Builtin.Link>
        </_Builtin.ListItem>
        <_Builtin.ListItem
          className={_utils.cx(_styles, "nav_links_item", _activeStyleVariant)}
        >
          <_Builtin.Link
            className={_utils.cx(
              _styles,
              "nav_links_link",
              _activeStyleVariant
            )}
            button={false}
            block="inline"
            options={{
              href: "#",
            }}
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "nav_links_text",
                _activeStyleVariant
              )}
              tag="div"
            >
              {"Venue"}
            </_Builtin.Block>
          </_Builtin.Link>
        </_Builtin.ListItem>
      </_Builtin.List>
      <_Builtin.List
        className={_utils.cx(_styles, "nav_actions_wrap", _activeStyleVariant)}
        tag="ul"
        unstyled={true}
      >
        <_Builtin.ListItem
          className={_utils.cx(
            _styles,
            "nav_buttons_item",
            _activeStyleVariant
          )}
        >
          <ButtonMain
            style={buttonMainStyle}
            text="Register"
            link={{
              href: "#",
            }}
          />
        </_Builtin.ListItem>
      </_Builtin.List>
    </_Component>
  );
}
