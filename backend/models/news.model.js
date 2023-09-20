const mongoose = require('mongoose')
const Schema = mongoose.Schema
const multer = require('multer');
const path = require('path');

let newsSchema = new Schema(
  {
    title: {
      type: String, required: true
    },
    content: {
      type: String, required: true
    },
    date: {
      type: Date, required: true
    },
    language: {
      type: String, required: true,
      default: 'EN',
      enum: ['EN', 'DE', 'ES']
    },
    image: {
      type: String
    }
  },
  {
    collection: 'news',
  },
)



module.exports = mongoose.model('News', newsSchema)
