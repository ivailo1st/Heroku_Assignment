import { useState } from "react";
import { Link } from '@reach/router';

function AddQuestion(props){
    
    const [question, setQuestion] = useState("");

    return(
        <>
            <input type="text" placeholder="Write your question here" onChange={ (event) =>{
                setQuestion(event.target.value)
            }}/>
            
            <button onClick={(event)=>props.AddQuestions(question)}><Link to="../Questions">Add Question</Link></button>
        </>
    );
}

export default AddQuestion;