import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  title: React.Component | string;
  saved: boolean;
}
const Header: React.FC<HeaderProps> = ({ title, saved }) => {
  const divStyle = {
    color: saved ? '#4feb34' : undefined,
  };
  const { t } = useTranslation(['common']);
  return (
    <h3>
      <b style={divStyle}>{typeof title === 'string' ? t(title) : title}</b>
      {saved ? <small> {`- ${t('common:saving')}...`} </small> : null}
    </h3>
  );
};

export default Header;
