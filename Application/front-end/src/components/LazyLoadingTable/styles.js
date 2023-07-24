import { css } from "@emotion/react";
import * as colors from "@mui/material/colors";

const styles = (theme) => {
  const head = css`
    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 5px;
    color: white;
    margin-bottom: 10px;
    background-color: #525fe1;
  `;

  const row = css`
    background-color: #f5eedc;

    &.selected {
      background-color: ${colors
        .blue[900]}; // Change the background color to indicate selection
    }
    &:nth-of-type(even) {
      background-color: #c0d8c0;
    }
  `;

  const hoveredCell = css`
    background-color: #e2d784;
  `;

  const cell = css`
    font-family: Nunito;
    font-style: normal;
    font-size: 16px;
    font-weight: bold;
    color: Black;
    padding: 4px;
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
    hoveredCell,
    textTruncate,
    textTruncateTextWrap,
    tableHeaderForSticky,
  };
};

export default styles;
