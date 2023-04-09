import { css } from "@emotion/react";

const styles = (theme) => {
  const headingTitle = css`
    marginbottom: 1%;
    font-weight: 600;
    font-style: normal;
    font-size: 30px;
    line-height: 41px;
  `;
  const tableContainer = css`
    flex: 1;
  `;
  const backdrop = css`
    zindex: 1%;
    color: #ffff;
  `;

  const btn = css`
    min-width: 8.3125em;
  `;

  return {
    headingTitle,
    tableContainer,
    backdrop,
    btn,
  };
};

export default styles;
