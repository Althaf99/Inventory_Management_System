import { css } from "@emotion/react";

const styles = () => {
  const head = css`
    border-bottom: 0px;
    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 22px;
    color: White;
    background-color: #354247;
    margin-bottom: 10px;
  `;

  const row = css`
    box-shadow: 0px 1px 8px rgb(219, 191, 250);
    border-radius: 10px;
    height: 50px !important;
  `;

  const cell = css`
    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 19px;
    line-height: 18px;
    color: Black;
    background-color: #eef3fc;
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
