import { css } from '@emotion/react';

const styles = (theme) => {
  const dialogBox = css`
    margin: 0;
    position: absolute;
    padding: 0px;
    text-align: center;
    align-content: center;
    align-items: center;
    font-family: Nunito;
    line-height: 20px;
  `;

  const dialogPaper = css`
    border-radius: 10px;
    padding: 10px;
    min-width: 400px;
  `;

  const dialogAction = css`
    justify-content: center;
    margin-top: 22px;
  `;

  const icon = css`
    align-self: center;
    width: 42px;
    height: 42px;
    position: absolute;
    margin-top: 25px;
    color: #FF7C7C;
  `;

  const titleBox = css`
    h6 {
      font-weight: 600;
      font-size: 1.125rem;
    }

    padding: 0;
    margin-top: 80px;
    text-align: center;
    align-self: center;
    color: ${theme.palette.common.blue};
    font-weight: 600;
  `;

  const contentText = css`
    margin-top: 8px;
    text-align: center;
    align-self: center;
    color: ${theme.palette.common.blue};
    font-size: 1rem;
    font-weight: 400;
    font-family: Nunito;
    line-height: 20px;
    max-width: 450px;
    padding: 0px 5px;
  `;

  const cancelButton = css`
    padding: 0;
    width: 155px;
    height: 40px;
    background-color: #FFFFFF;
    border: 1px solid #626799;
    border-radius: 4px;
    color: #626799;
    margin: 0 25px;
    margin-top: 10px;
    margin-bottom: 15px;
    letter-spacing: 0.5px;
    &:hover {
      background-color: #FFFFFF !important;
      border: 2px solid #626799;
    }
  `;

  const confirmButton = css`
    padding: 0;
    width: 155px;
    height: 40px;
    background-color: #FF7C7C;
    border-radius: 4px;
    margin: 0 25px;
    margin-top: 10px;
    margin-bottom: 15px;
    letter-spacing: 0.5px;
    &:hover {
      background-color: #FF7C7C !important;
      border: 2px solid #626799;
    }
  `;

  return {
    dialogBox, 
    dialogPaper, 
    titleBox,
    dialogAction,
    icon,
    contentText,
    cancelButton,
    confirmButton
  };
}


export default styles;