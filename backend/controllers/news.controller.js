const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

let NewsModel = require('../models/news.model')

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage });

// Create news article
router.post('/news', upload.single('newsImage'), async (req, res) => {
  const { title, content, date, language} = req.body;
  const imagePath = req.file.path;

  try {
    const news = new NewsModel({
      title,
      content,
      date,
      language,
      image: imagePath
    });
    await news.save();
    res.json({ message: 'News created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//Get all news
// Get news articles with filtering, sorting, and pagination
router.get('/news', async (req, res) => {
  try {
    // Define query parameters
    const { searchTitle, language, sortBy, sortOrder, page, perPage } = req.query;

    // Build the filter criteria
    const filter = {};
    if (searchTitle) {
      filter.title = { $regex: searchTitle, $options: 'i' }; // Case-insensitive title search
    }
    if (language) {
      filter.language = language;
    }

    // Build the sort options
    const sort = {};
    if (sortBy && sortOrder) {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    } else {
      // Default sorting by date in descending order (latest first)
      sort.date = -1;
    }

    // Parse pagination parameters
    const parsedPage = parseInt(page) || 1;
    const parsedPerPage = parseInt(perPage) || 10; // Default to 10 posts per page

    // Calculate skip value for pagination
    const skip = (parsedPage - 1) * parsedPerPage;

    // Query the news articles based on the filter, sort, and pagination
    const newsArticles = await NewsModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parsedPerPage);

    // Count the total number of matching news articles
    const totalNewsCount = await NewsModel.countDocuments(filter);

    // Calculate total pages
    const totalPages = Math.ceil(totalNewsCount / parsedPerPage);

    res.json({
      newsArticles,
      totalNewsCount,
      totalPages,
      currentPage: parsedPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Get news article details
router.route('/news/:id').get((req, res, next) => {
  NewsModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Get the latest 3 news articles
router.get('/suggested-articles', async (req, res) => {
  try {
    // Find the latest 3 news articles based on the date
    const latestArticles = await NewsModel.find()
      .sort({ date: -1 }) // Sort by date in descending order (latest first)
      .limit(3); // Limit to 3 articles

    res.json(latestArticles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router
