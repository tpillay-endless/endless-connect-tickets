import { createElement, type JSX, type ReactNode } from 'react';

type HeadingFontStyle =
  | 'Inherit'
  | 'Text Small'
  | 'Text Main'
  | 'Text Large'
  | 'H6'
  | 'H5'
  | 'H4'
  | 'H3'
  | 'H2'
  | 'H1'
  | 'Display';

type ParagraphFontStyle =
  | 'Inherit'
  | 'Text Tiny'
  | 'Text Small'
  | 'Text Main'
  | 'Text Large'
  | 'H6'
  | 'H5'
  | 'H4'
  | 'H3'
  | 'H2'
  | 'H1'
  | 'Display';

type ClassValue = string | undefined;

const HEADING_VARIANTS: Record<HeadingFontStyle, string> = {
  Inherit: '',
  'Text Small': 'w-variant-3fbd0d32-5675-1947-73b3-abb16c1fb986',
  'Text Main': 'w-variant-9027c8ae-1ba5-f702-ea6e-4a1c3fca9f64',
  'Text Large': 'w-variant-74a3180a-e505-b452-032f-599c8e557249',
  H6: 'w-variant-823daff2-fd84-8da0-4ed1-92a39b869ad0',
  H5: 'w-variant-326a9562-3263-06da-e8ef-16981fd70f1c',
  H4: 'w-variant-7c7eb163-b37d-338d-2369-5eae7e6d458a',
  H3: 'w-variant-701c4b6c-37cf-de59-d80d-80a1822c4994',
  H2: 'w-variant-433d40c6-c261-f13f-c899-61d2cadf150f',
  H1: 'w-variant-792802b6-ccdb-f982-5023-5fa970cf03d0',
  Display: 'w-variant-41c609dc-9c80-9eef-75df-03bf0eea00b4',
};

const HEADING_TAG_MAP: Partial<Record<HeadingFontStyle, keyof JSX.IntrinsicElements>> = {
  Display: 'h1',
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
};

const PARAGRAPH_VARIANTS: Record<ParagraphFontStyle, string> = {
  Inherit: '',
  'Text Tiny': 'w-variant-934db1aa-3bd5-1086-088e-28381a543835',
  'Text Small': 'w-variant-4099173f-f581-635c-a5fe-cf4a89c62029',
  'Text Main': 'w-variant-61d538b2-709c-eb7a-4258-8c0890dc07fc',
  'Text Large': 'w-variant-fdb8e663-01e0-aae6-13eb-e6dfca16b689',
  H6: 'w-variant-b8555f10-fa7d-e9ba-e262-f9aa44c27c1c',
  H5: 'w-variant-5c484503-e2a0-ac99-680d-56013d859efa',
  H4: 'w-variant-93e8af18-8413-e3ac-0442-72629401a3db',
  H3: 'w-variant-ad482112-9d0e-852c-0f6e-ba1e5a3aee59',
  H2: 'w-variant-efb733fe-da83-69a3-ea4a-b3f2f89d0389',
  H1: 'w-variant-3ddfa43e-abc1-422e-6e6d-23dfb7da71f3',
  Display: 'w-variant-eee56f15-d7ce-d101-2f8c-83b3bbd55d4a',
};

function joinClasses(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}

function renderTextContent(
  text: ReactNode,
  fallbackTag: keyof JSX.IntrinsicElements,
): ReactNode {
  if (text === null || text === undefined || text === false) {
    return null;
  }

  if (typeof text === 'string' || typeof text === 'number') {
    return createElement(fallbackTag, null, text);
  }

  return text;
}

type TypographyHeadingProps = {
  fontStyle?: HeadingFontStyle;
  text?: ReactNode;
  classes?: string;
  id?: string;
  tag?: keyof JSX.IntrinsicElements;
};

export function TypographyHeading({
  fontStyle = 'H2',
  text,
  classes,
  id,
  tag,
}: TypographyHeadingProps) {
  const variantClass = HEADING_VARIANTS[fontStyle] ?? '';
  const HeadingTag = tag ?? HEADING_TAG_MAP[fontStyle] ?? 'div';
  return (
    <div id={id} className={joinClasses('c-heading', variantClass, 'w-richtext', classes)}>
      {renderTextContent(text, HeadingTag)}
    </div>
  );
}

type TypographyParagraphProps = {
  fontStyle?: ParagraphFontStyle;
  text?: ReactNode;
  classes?: string;
  id?: string;
  tag?: keyof JSX.IntrinsicElements;
};

export function TypographyParagraph({
  fontStyle = 'Inherit',
  text,
  classes,
  id,
  tag = 'p',
}: TypographyParagraphProps) {
  const variantClass = PARAGRAPH_VARIANTS[fontStyle] ?? '';
  return (
    <div id={id} className={joinClasses('c-paragraph', variantClass, 'w-richtext', classes)}>
      {renderTextContent(text, tag)}
    </div>
  );
}

type TypographyEyebrowProps = {
  text?: ReactNode;
  classes?: string;
  id?: string;
};

export function TypographyEyebrow({ text, classes, id }: TypographyEyebrowProps) {
  if (text === null || text === undefined || text === false) {
    return null;
  }

  return (
    <div id={id} className={joinClasses('eyebrow_wrap', classes)}>
      <div className="eyebrow_layout">
        <div className="eyebrow_text u-text-style-tiny u-text-transform-uppercase u-weight-medium">
          {text}
        </div>
      </div>
    </div>
  );
}
