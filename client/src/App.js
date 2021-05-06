import Question from "./Question";
import Questions from "./Questions";

import { Link, Router } from '@reach/router';
import AddQuestion from "./addQuestions";

import { useEffect, useState } from "react";
const API_URL = process.env.REACT_APP_API;

function App() {
  const [questions, setQuestion] = useState("No data :(");
  const [runEffect, setRunEffect] = useState(true);


  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/Question`;
      const response = await fetch(url);
      const data = await response.json();
      setQuestion(data);
    }
    getData();
    setRunEffect(false);
  }, [runEffect]);

  console.log(API_URL);

  function voteAnswer(type, data) {
    if (type == "upvote") {
      fetch(`${API_URL}/Question/Upvote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setRunEffect(true);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    else if (type == "downvote") {
      fetch(`${API_URL}/Question/Downvote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setRunEffect(true);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  function answerQuestion(data) {
    fetch(`${API_URL}/Question/Answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setRunEffect(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function createNewQuestions(data) {
    fetch(`${API_URL}/Question/Add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function getQuestion(id) {
    let filteredQuestion = questions.filter(question => question.id == id)
    return filteredQuestion[0];
  }
  // function filterRecipies(filterType, filter) {
  //   if (filterType == "ingredient") {
  //     return recipies.filter(recipe=> recipe.ingredients != undefined).filter(recipe => recipe.ingredients.includes(filter));
  //   }
  //   else if(filterType == "submitter"){
  //     return recipies.filter(recipe=> recipe.submitter != undefined).filter(recipe =>recipe.submitter.includes(filter));
  //   }
  // }
  function AddQuestions(question) {
    const newQuestion = {
      id: questions[questions.length - 1].id + 1,
      question: question,
      answer: [""],
      upvotes: 0
    };
    createNewQuestions(newQuestion);
    setRunEffect(true);
  }
  console.log(questions);
  return (
    <>
      <div className="App">
        <h1>Hello</h1>
        <nav>
          <p><Link to="Questions">To List of Questions</Link></p>
          <p><Link to="addQuestions">Add a new question</Link></p>
        </nav>

      </div>
      <Router>
        <AddQuestion path="addQuestions" AddQuestions={AddQuestions} />
        <Questions path="Questions" items={questions} />
        {/* <Questions path="Questions/:filterType/:filter" filteredItems={filterRecipies} /> */}
        <Question path="Question/:id" getQuestion={getQuestion} answerQuestion={answerQuestion} voteAnswer={voteAnswer} />
      </Router>
    </>
  );
}

export default App;
