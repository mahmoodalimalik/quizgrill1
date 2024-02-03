import React from "react";
import { useState } from "react";

export default function ShowQuestions(props) {
  const [showQuiz, setShowquiz] = useState(0);
  const [selectedOptionindex, setSelectedOptionIndex] = useState(-1);
  const [scoreData, setScoreData] = useState([0]);
  const [userSelectedValue, setUserSelectedValue] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [result, setResult] = useState(true);
  let sampleArray={...props};
  const onOptionSelected = (selectedOptionindex) => {
    setSelectedOptionIndex(selectedOptionindex);
  };

  const nextQuestion = () => {
    if (selectedOptionindex === props[showQuiz].correctOptionIndex) {
      if (showQuiz === 0) {
        scoreData[showQuiz] = 1;
      } else {
        scoreData[showQuiz] = scoreData[showQuiz - 1] + 1;
      }
    } else {
      if (selectedOptionindex === -1 && showQuiz !== 0) {
        scoreData[showQuiz] = scoreData[showQuiz - 1] + 0;
      } else { 
        if (showQuiz !== 0) {
          scoreData[showQuiz] = scoreData[showQuiz - 1] + 0;
        } else scoreData[showQuiz] = 0;
      }
    }

    if (selectedOptionindex >= 0) {
      userSelectedValue[showQuiz] =
        props[showQuiz].Options[selectedOptionindex];
    } else {
      userSelectedValue[showQuiz] = "Skipped";
    }
    console.log(`Quiz Score ${scoreData}`);
    console.log(`Question # ${showQuiz}`);
    console.log(`user option ${userSelectedValue}`);
    console.log(`user Selected Index ${selectedOptionindex}`);
    showQuiz === 4 ? setResult(false) : setShowquiz(showQuiz + 1);
    setSelectedOptionIndex(-1);
    setTotalScore(scoreData[showQuiz]);
  };

  const previousQuestion = () => {
    if (showQuiz > 1 && showQuiz != 0) {
      setTotalScore(scoreData[showQuiz - 2]);
    } else {
      setTotalScore(0);
    }
    setSelectedOptionIndex(-1);
    // if(scoreData[showQuiz]){setTotalScore(totalScore-1);}
    //setScore(prevScore[showQuiz-2]);
    console.log(scoreData[showQuiz]);
    showQuiz === 0 ? setShowquiz(0) : setShowquiz(showQuiz - 1);
  };
  return (
    <>
      {result ? (
        <div className="container my-5">
          <div className="card mb-5" key={props[showQuiz]?.id}>
            <h4> Progress : {showQuiz + 1} / 5</h4>
            <div className="card-header">
              <b>
                {" "}
                {props[showQuiz]?.id}. {props[showQuiz]?.statement}
              </b>
            </div>

            <ul className="list-group list-group-flush">
              {props[showQuiz].Options.map((op, index) => (
                <li
                  className={
                    selectedOptionindex === index
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                  Key={index}
                  onClick={() => onOptionSelected(index)}
                >
                  {index + 1}. {op}
                </li>
              ))}
            </ul>
          </div>

          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={nextQuestion}
            >
              {" "}
              Next Question{" "}
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={previousQuestion}
            >
              Previous Question{" "}
            </button>
          </div>
        </div>
      ) : (
        <div className="container d-flex">
        <div className="col-md-4 mb-3">
          <br />
          
          <button type="button" className="btn btn-primary">
            Try Again
          </button>
          <br /> <br />
          <h4><b>Total Correct Answers : {totalScore}</b></h4>
         
          <br />
          
          {scoreData.map((index,count) => (
            <div className="card text-black bg-light mb-3">
              <div className="card-header">Question # {count + 1}</div>
              <div className="card-body bg-warning">
                <h5 className="card-title"><b>{props[count].statement}</b></h5>
                <li className="card-text">{props[count].Options[0]}</li>
                <li className="card-text">{props[count].Options[1]}</li>
                <li className="card-text">{props[count].Options[2]}</li>
                <li className="card-text">{props[count].Options[3]}</li> <br />
                <p>
                <b>Correct Answer:{" "}
                  {props[count].Options[props[count].correctOptionIndex]}</b>
                </p>
                <p><b>Your Selection: {userSelectedValue[count]}</b></p>
              </div>
            </div>
          ))}
        </div></div>
      )}
    </>
  );
}
