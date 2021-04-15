import React from 'react';
import { Link } from '@reach/router';

export default function Questions(props) {
    const itemQuestions = props.items.map((element, index) =>
        <li key={index}>
            <Link to={"/Question/" + element.id}>{element.question}</Link>
        </li>
    );

    return (
        <>
            <h4>List of Titles</h4>
            <ol>
                {itemQuestions}
            </ol>
        </>
    )
}