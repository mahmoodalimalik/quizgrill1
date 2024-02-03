import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { questions } from "./components/quizQuestion";
import ShowQuestions from "./components/showQuestions";
// import EditQuiz from "./components/editQuiz";


export default function App() {
const [questStatus,setQuestStatus]=useState(true);
 
return (
    <div>
      <h1 ml-15>Online Quiz Application : QUIZ GRILL</h1>
      {questStatus?(<ShowQuestions {...questions}/>):(<h1>Mahmood</h1>)}
      {/* <EditQuiz {...questions}/> */}
    </div>
  );
}
