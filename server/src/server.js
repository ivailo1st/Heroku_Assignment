/**** Node.js libraries *****/
const path = require('path');

/**** External libraries ****/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const mongoose = require("mongoose");


/**** Configuration ****/
const app = express();
const Mongo_URL = process.env.MONGO_DB || 'mongodb://localhost/q&a';
function createServer() {
  mongoose.connect(Mongo_URL, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("DB Connected")).catch(err => console.log(err));
  const questionSchema = new mongoose.Schema({
    id: Number,
    question: String,
    answer: Array,
    upvotes: Number
  });

  const questionModel = mongoose.model("QuestionsAssignment", questionSchema);

  const routes = require("./routes")();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined'));
  app.use(cors());
  app.use(express.static(path.resolve('..', 'client', 'build')));

  /**** Add routes ****/
  app.use("/api", routes);

  app.get("/api/Question", async (req, res) => {
    const allQuestions = await questionModel.find();
    console.log(allQuestions);
    res.json(allQuestions);
  });
  app.post("/api/Question/Add", async (req, res) => {
    // const newQuestion = req.body;
    // questionArray.push(newQuestion);

    const newQuestion = req.body;
    let newAddition = new questionModel({
      id: newQuestion.id,
      question: newQuestion.question,
      answer: newQuestion.answer,
      upvotes: newQuestion.upvotes
    });

    try {
      const saveQuestion = await newAddition.save();
      console.log("savedQuestion", saveQuestion);
    }
    catch (error) {
      console.error(error);
    }

    res.json({ "Response": "Question added" });
  });

  app.post("/api/Question/Answer", async (req, res) => {
    let answerQuestion = await questionModel.findOne({ id: req.body.id });
    answerQuestion.answer.push(" " + req.body.answer + ";");
    await answerQuestion.save();

    res.json({ "Response": "Answer Added" });
  });

  app.post("/api/Question/Upvote", async (req, res) => {
    let upvoteQuestion = await questionModel.findOne({ id: req.body.id });
    upvoteQuestion.upvotes ++;
    await upvoteQuestion.save();

    res.json({ "Response": "Upvoted" });
  });

  app.post("/api/Question/Downvote", async (req, res) => {
    let downvoteQuestion = await questionModel.findOne({ id: req.body.id });
    downvoteQuestion.upvotes --;
    await downvoteQuestion.save();

    res.json({ "Response": "Downvoted" });
  });

  // "Redirect" all non-API GET requests to React's entry point (index.html)
  // app.get('*', (req, res) =>
  //   res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
  // );



  return app;
}

module.exports = createServer;