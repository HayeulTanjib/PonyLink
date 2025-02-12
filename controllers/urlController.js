const shortid = require('shortid');
const Url = require('../models/urlModel');
const getExpiryDate = require('../utils/expiryDate');
const { isValidUrl, isValidAlias } = require('../utils/validators');
const logger = require('../utils/logger');

const handleCreateUrl = async (req, res) => {
  const { url, customAlias } = req.body;

  // Validate required fields
  if (!url) {
     logger.warn('URL is required')
    return res.status(400).json({
      status: 'fail',
      code: 400,
      message: 'Url is required',
    });
  }

  // Validate URL format
  // if (!isValidUrl(url)) {
  //   return res.status(400).json({
  //     status: 'fail',
  //     code: 400,
  //     message: 'Url is not valid',
  //   });
  // }

  // Validate custom alias format if provided
  if (customAlias && !isValidAlias(customAlias)) {
    return res.status(400).json({ message: 'Invalid custom alias format' });
  }

  try {
    // Check if custom alias is already taken
    if (customAlias) {
      const existingAlias = await Url.findOne({ shortId: customAlias });
      if (existingAlias) {
        return res.status(400).json({ message: 'Alias already taken' });
      }
    }

    // Generate short ID and set expiry date
    const expiryDate = getExpiryDate(1, 'hours');
    const shortId = customAlias || shortid.generate();

    // Create the URL record
    const data = await Url.create({
      shortId,
      redirectURL: url,
      visitHistory: [],
      expiresAt: expiryDate,
    });

    console.log(`${req.hostname}:5000/${data.shortId}`);

    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Data post successfully',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      code: 500,
      message: error,
    });
  }
};

const handleGetUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const entry = await Url.findOneAndUpdate(
      { shortId },
      {
        $push: { visitHistory: { timestamp: Date.now() } },
      },
      { new: true }
    );
    if (!entry) {
      return res.status(404).json({
        status: 'fail',
        code: 404,
        message: 'No url found',
      });
    }

    if (new Date() > entry.expiresAt) {
      return res.status(410).json({
        status: 'fail',
        code: 410,
        message: 'URL has expired!',
      });
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      code: 500,
      message: error.message,
    });
  }
};

const handleGetAnalytics = async (req, res) => {
  try {
    const { shortId } = req.params;
    const result = await Url.findOne({ shortId });
    return res.status(200).json({
      totalClicks: result?.visitHistory?.length,
      analytics: result?.visitHistory,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      code: 500,
      message: error.message,
    });
  }
};

module.exports = { handleCreateUrl, handleGetUrl, handleGetAnalytics };
