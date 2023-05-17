import { css } from "@emotion/react";

const styles = (theme) => {
  const gridContainer = css`
    flex-direction: column;
    flex-wrap: nowrap;
  `;
  const headingTitle = css`
    font-family: Nunito !important;
    font-weight: 600 !important;
    font-style: normal !important;
    font-size: 30px !important;
    line-height: 41px !important;
    color: #813d4d;
  `;
  const helperTextSection = css`
    padding-top: 15px;
  `;
  const section = css`
    padding-top: 30px;
  `;

  return {
    gridContainer,
    headingTitle,
    helperTextSection,
    section,
  };
};

export default styles;
