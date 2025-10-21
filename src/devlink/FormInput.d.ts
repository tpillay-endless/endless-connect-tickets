import * as React from "react";
import * as Types from "./types";

declare function FormInput(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  /** Field label shown on page*/
  displayLabel?: React.ReactNode;
  /** Field label shown in form submission backend*/
  submissionLabel?: Types.Builtin.Text;
  /** text, email, password, tel, url, search, number, date*/
  type?: Types.Builtin.Text;
  placeholderText?: Types.Builtin.Text;
  /** Add a space to make the field required*/
  required?: Types.Builtin.Text;
  defaultValue?: Types.Builtin.Text;
  /** on, off, name, given-name, family-name, email, tel, organization-title, organization, street-address, address-line1, country, country-name, postal-code, gender, birthday, bday-year, language, photo, url, home, work, mobile*/
  autoComplete?: Types.Builtin.Text;
  /** Touch device keyboard type: none, text, decimal, numeric, tel, search, email, url*/
  inputMode?: Types.Builtin.Text;
  inputAttributeName?: Types.Builtin.Text;
  inputAttributeValue?: Types.Builtin.Text;
}): React.JSX.Element;
