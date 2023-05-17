import React from "react";
import { Trans } from "react-i18next";
import LinkOpenInNew from "components/LinkOpenInNew";

const ContextualHelp = ({ path, text }) => {
  const link = `${process.env.REACT_APP_DIRECTOR_DOCS_URL}/${path}`;
  return (
    <Trans defaults={text}>
      <LinkOpenInNew url={link}>anchor</LinkOpenInNew>
    </Trans>
  );
};

export default ContextualHelp;
