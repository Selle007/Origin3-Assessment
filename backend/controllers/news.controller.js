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

// Get filtered news articles
router.get('/news', async (req, res) => {
  const { searchQuery, sortOption, articlesPerPage, languageFilter, page } = req.query;
  let query = NewsModel.find();

  if (searchQuery) {
    query = query.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { content: { $regex: searchQuery, $options: 'i' } },
      ],
    });
  }
  
  if (languageFilter !== 'All') {
    query = query.where('language').equals(languageFilter);
  }

  const sortOrder = sortOption === 'newest' ? -1 : 1;
  query = query.sort({ date: sortOrder });
  
  const startIndex = (page - 1) * articlesPerPage;
  const endIndex = page * articlesPerPage;
  
  try {
    const articles = await query.skip(startIndex).limit(articlesPerPage).exec();

    const totalArticles = await NewsModel.countDocuments(query._conditions).exec();

    res.json({
      articles,
      currentPage: page,
      totalArticles:totalArticles,
      totalPages: Math.ceil(totalArticles / articlesPerPage),
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
    const latestArticles = await NewsModel.find()
      .sort({ date: -1 })
      .limit(3);

    res.json(latestArticles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router
