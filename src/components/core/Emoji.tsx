import React from 'react';

type propsType = {
  label: string;
  symbol: string;
};
const Emoji: React.FC<propsType> = ({ label, symbol }: propsType) => (
  <span className="emoji" role="img" aria-label={label ? label : ''} aria-hidden={label ? 'false' : 'true'}>
    {symbol}
  </span>
);
export default Emoji;
