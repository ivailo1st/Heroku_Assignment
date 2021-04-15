import { Link } from '@reach/router';
import React, { useState } from 'react';

export default function Recipe(props) {
    const question = props.getQuestion(props.id);

    const [answer, setAnswer] = useState("");

    return (
        <>
            <h4>A Question and Answer</h4>
            <ol>
                <li><strong>ID:</strong> {question.id}</li>
                <li><strong>Question:</strong> {question.question}</li>
                <li><strong>Answer:</strong> {question.answer}</li>
                <li><strong>Upvotes:</strong> {question.upvotes}</li>
            </ol>
            <button onClick={(event) => {
                let x = document.getElementById("answerField");
                let y = document.getElementById("answerBtn");
                if (x.style.display == "none" && y.style.display == "none") {
                    x.style.display = "block";
                    y.style.display = "block";
                } else {
                    x.style.display = "none";
                    y.style.display = "none";
                }
            }}>Want to answer the question or change the answer?</button>
            <input id="answerField" style={{display:"none"}} type="text" placeholder="Write your Answer here" onChange={(event) => {
                setAnswer(event.target.value)
            }} />
            <button onClick={(event) => {
                props.answerQuestion({ id: props.id, answer: answer });
            }} id="answerBtn" style={{display:"none"}}><Link to="/Questions">Answer Question</Link></button>
            <button onClick={(event) => {props.voteAnswer("upvote",{id:props.id})}}><Link to="/Questions">Upvote</Link></button>
            <button onClick={(event) => {props.voteAnswer("downvote",{id:props.id})}}><Link to="/Questions">Downvote</Link></button>
        </>
    );
}