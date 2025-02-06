const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const urlRouter = require('./routes/urlRoutes');
const connectDB = require('./config/db');
const { handleGetUrl } = require('./controllers/urlController');

const app = express();
dotenv.config({ path: './config.env' });
const port = process.env.PORT || 5000;

//Api rate limit
const rateLimitar = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 15,
  message: 'Too many requests. please try againg later',
});


app.use(rateLimitar);
app.use(express.json());


app.use('/api/v1/url', urlRouter);
app.get('/:shortId', handleGetUrl);

app.all('*', (req, res, next) => {
  return res.status(404).json({
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.listen(port, async () => {
  console.log('Server running on port: ', port);
  await connectDB();
});
