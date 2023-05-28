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
    line-height: 41px !important;
    font-weight: 500;
    font-size: 40px !important;
    line-height: 48px;
    color: #1e88e5;
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
