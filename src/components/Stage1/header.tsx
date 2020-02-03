import React from 'react';

type propsType = {
  title: string;
};

const tableHeader: React.FC<propsType> = ({ title }: propsType) => {
  return (
    <h2>
      <b>
        <strong>{`Girone - ${title}`}</strong>
      </b>
    </h2>
  );
};

export default tableHeader;
