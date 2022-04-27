const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB.'))
  .catch((error) => console.log('Error connecting to MongoDB:', error.message));

const schema = new mongoose.Schema(
  {
    name: String,
    number: String,
  },
  {
    toJSON: {
      transform: (_doc, obj) => {
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
      },
    },
  }
);

module.exports = mongoose.model('Person', schema);
