//https://github.com/motdotla/dotenv/blob/master/examples/typescript/src/lib/env.ts
import { resolve } from 'path';
import { config } from 'dotenv';

config({
  path: resolve(__dirname, '../../.env'),
  encoding: 'utf8',
  //debug: false,
});
