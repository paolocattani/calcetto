import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import definitions from './api/openapi.json';

import './style.css';
import 'swagger-ui-react/swagger-ui.css';

// test : url="https://petstore.swagger.io/v2/swagger.json"
export default () => <SwaggerUI spec={definitions} />;
