import { css } from "@emotion/react";

const styles = (theme) => {
  const container = css`
    display: flex;
    flex-direction: column;
    flex: 1;
  `;
  const label = css`
    color: rgba(0, 24, 71, 1);
    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 0.875rem;
    padding-bottom: 14px;
  `;
  const error = css`
    padding-left: 4px;
    color: red;
  `;
  const section = css`
    flex-direction: row;
  `;
  return {
    container,
    label,
    error,
    section,
  };
};

export default styles;
