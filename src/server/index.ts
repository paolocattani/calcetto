import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
//Routes will go here
app.listen('3000', () => {
    console.log('listening on PORT 3000!')
})