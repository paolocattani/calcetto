import React from 'react';

type propsType = {
  title: string;
};

const tableHeader: React.FC<propsType> = ({ title }: propsType) => {
  return <h2>{title}</h2>;
};

export default tableHeader;
