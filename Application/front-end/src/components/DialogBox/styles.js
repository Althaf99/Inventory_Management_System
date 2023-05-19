import { css } from "@emotion/react";

const randoliBlue2 = "#0f5ef7";

const styles = (theme, props) => {
  const dialog = css`
    height: ${props.height ? props.height : "520px"};
  `;
  const labelTitle = css`
    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    margin-top: 14px;
    margin-bottom: 5px;
  `;

  const closeIcon = css`
    padding: 0px;
    padding-right: 13px;
    padding-left: 13px;
  `;
  const subLabel = css`
    font-family: Nunito;
    font-style: normal;
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 5px;
  `;
  const backButton = css`
     width: 185px;
    height: 40px;
    font-weight: bold;
    background-color: #FFFFFF;
    color: Black;
    border: 1px solid #626799;
    &:hover {
      background-color: #FFFFFF !important;
      border: 2px solid #626799;
    },
  `;
  const saveButton = css`
    width: 185px;
    height: 40px;
    font-weight: bold;
    border: 1px solid ${randoliBlue2};
    &:hover {
      border: 2px solid #35478c;
      background-color: ${randoliBlue2};
    }
    background-color: ${randoliBlue2};
  `;
  return {
    dialog,
    labelTitle,
    closeIcon,
    subLabel,
    backButton,
    saveButton,
  };
};
export default styles;
