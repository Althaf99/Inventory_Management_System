import { css } from "@emotion/react";

const styles = () => {
  const head = css`
    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 2px;
    color: Black;
    border: solid;
    border-width: thin;
  `;

  const row = css`
    border: solid;
    border-width: thin;
  `;

  const cell = css`
    font-family: Nunito;
    border: solid;
    border-width: thin;
    font-style: normal;
    font-size: 12px;
    line-height: 2px;
    color: Black;
  `;

  const cellDeleted = css`
    font-family: Nunito;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    color: #878787;
  `;

  const textTruncate = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:last-child {
      text-align: right;
    },
  `;

  const textTruncateTextWrap = css`
    overflow: hidden;
    text-overflow: ellipsis;
    &:last-child {
      text-align: right;
    },
  `;
  const tableHeaderForSticky = css`
    position: sticky;
    z-index: 999;
  `;

  return {
    head,
    row,
    cell,
    cellDeleted,
    textTruncate,
    textTruncateTextWrap,
    tableHeaderForSticky,
  };
};

export default styles;
