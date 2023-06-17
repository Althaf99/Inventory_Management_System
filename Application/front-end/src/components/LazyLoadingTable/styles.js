import { css } from "@emotion/react";
import * as colors from '@mui/material/colors';


const styles = (theme) => {
  const head = css`
    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 5px;
    color: white;
    margin-bottom: 10px;
    background-color:#058540;
  `;

  const row = css`
  background-color: ${colors.grey[800]};
  
  &:nth-of-type(even) {
    background-color: ${colors.grey[900]};
  }
  
  &.selected {
    background-color: ${colors.blue[900]}; // Change the background color to indicate selection
  }
`;


const hoveredCell = css`
  background-color: ${colors.blue[900]};
`;



  const cell = css`
    font-family: Nunito;
    font-style: normal;
    font-size: 16px;
    font-weight: bold;
    color: white;
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
