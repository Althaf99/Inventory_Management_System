import { css } from "@emotion/react";

const styles = (theme) => {
  const container = css`
    display: flex;
    flex-direction: column;
    flex: 1;
  `;
  const label = css``;
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
