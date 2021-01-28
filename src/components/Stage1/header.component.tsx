import React from 'react';

interface Stage1HeaderProps {
  title: string;
  saved: boolean;
}

const tableHeader: React.FC<Stage1HeaderProps> = ({ title, saved }) => {
  const divStyle = {
    color: saved ? '#4feb34' : undefined,
  };
  return (
    <h3>
      <b style={divStyle}>
        Girone - <strong>{title}</strong>
      </b>
      {saved ? <small> - Salvataggio in corso...</small> : null}
    </h3>
  );
};

export default tableHeader;
