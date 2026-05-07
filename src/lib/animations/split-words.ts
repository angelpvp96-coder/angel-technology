import type { ReactElement } from "react";
import { createElement, Fragment } from "react";

/**
 * Splits a string into <span class="word">…</span> tokens with display:inline-block
 * so palabras fluyen horizontalmente y NO se apilan vertical.
 */
export function splitWordsRender(
  text: string,
  className = "word",
): ReactElement {
  const tokens = text.split(/(\s+)/);
  return createElement(
    Fragment,
    null,
    tokens.map((tok, i) => {
      if (/^\s+$/.test(tok)) {
        return createElement(Fragment, { key: i }, " ");
      }
      return createElement(
        "span",
        {
          key: i,
          className,
          style: {
            display: "inline-block",
            willChange: "transform, opacity",
          },
        },
        tok,
      );
    }),
  );
}
