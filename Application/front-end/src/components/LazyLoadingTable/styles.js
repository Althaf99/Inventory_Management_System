import { css } from "@emotion/react";

const styles = () => {
  const head = css`
    border-bottom: 0px;
    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 19px;
    line-height: 22px;
    color: #2596be;
    margin-bottom: 10px;
  `;

  const row = css`
    box-shadow: 0px 1px 8px rgba(20, 46, 110, 0.1);
    border-radius: 10px;
    height: 50px !important;
  `;

  const cell = css`
    font-family: Nunito;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;
    color: #283032;
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

  return {
    head,
    row,
    cell,
    cellDeleted,
    textTruncate,
    textTruncateTextWrap,
  };
};

export default styles;
