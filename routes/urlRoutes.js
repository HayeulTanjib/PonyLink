const express = require('express');
const { handleCreateUrl, handleGetUrl, handleGetAnalytics } = require('../controllers/urlController');

const urlRouter = express.Router();

urlRouter.post('/shorten', handleCreateUrl)
urlRouter.get('/:shortId', handleGetUrl)
urlRouter.get('/analytics/:shortId', handleGetAnalytics)


module.exports = urlRouter





