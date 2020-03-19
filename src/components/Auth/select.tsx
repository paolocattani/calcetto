import React, { Component, useState, useEffect } from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { IUser } from './types';

const UserSelect: React.FC = _ => {
  const [input, setInput] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/v1/auth/list');
      const users = await response.json();
      console.log('loadOptions : ', users);
      setUserList(users);
    })();
  });

  const handleInputChange = (newValue: any) => {
    console.log('handleInputChange : ', newValue);

    return newValue;
  };

  console.log('rendere select : ', userList);
  return (
    <Select options={userList} components={makeAnimated()} isSearchable isClearable onInputChange={handleInputChange} />
  );
};

export default UserSelect;
