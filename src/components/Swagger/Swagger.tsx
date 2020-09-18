import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import definitions from './openapi.json';
import './style.css';
// test : url="https://petstore.swagger.io/v2/swagger.json"
export default () => <SwaggerUI spec={definitions} />;
