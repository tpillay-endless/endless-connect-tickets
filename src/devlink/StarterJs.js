"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./StarterJs.module.css";

export function StarterJs({ as: _Component = _Builtin.HtmlEmbed }) {
  return (
    <_Component
      className={_utils.cx(_styles, "u-embed-js")}
      value="%3Cscript%3E%0Adocument.addEventListener(%22DOMContentLoaded%22%2C%20function%20()%20%7B%0A%20%20document.querySelectorAll(%22.your-section%22).forEach((element)%20%3D%3E%20%7B%0A%20%20%20%20if%20(element.dataset.scriptInitialized)%20return%3B%0A%20%20%20%20element.dataset.scriptInitialized%20%3D%20%22true%22%3B%0A%20%20%20%20%2F%2F%20run%20script%20here%0A%20%20%7D)%3B%0A%7D)%3B%0A%3C%2Fscript%3E"
    />
  );
}
