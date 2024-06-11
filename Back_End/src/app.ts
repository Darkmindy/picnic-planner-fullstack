import express from 'express';

export const app = express();

//configure the middleware for body requests
//app.use(express.urlencoded({ extended: false })); // this middleware is used to analyse the http requests with url-encoded payload
app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'Server is online' });
});
