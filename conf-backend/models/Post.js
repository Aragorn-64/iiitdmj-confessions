const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String, //optional
  bodyText: {
    type: String,
    required: true
  }, //required
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   reactions: [{}],
  tag: String,
  status: {
    type: String,
    default: "pending"
  }
  //   reactions: [{likes : {type: Number, default: 0}}]
  //time, titke, text, reactions, tag, comments

});

module.exports = mongoose.model("Post", postSchema);