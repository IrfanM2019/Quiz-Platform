import MyQuiz from "./components/MyQuiz";
import PlayQuiz from "./components/PlayQuiz";
import Home from "./components/Home";
import CreateQuiz from "./components/CreateQuiz";
import Pagenotfound from "./components/Pagenotfound";
import Result from "./components/Result";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from "../src/components/Update";
import QuizCards from "./components/QuizCards";
import ShowQuestion from "./components/ShowQuestion";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="MyQuiz" element={<MyQuiz />} />
          <Route path="PlayQuiz" element={<PlayQuiz />} />
          <Route path="CreateQuiz" element={<CreateQuiz />} />
          <Route path="Result" element={<Result />} />
          <Route path="/edit/:id" element={<Update />} />
          <Route path="QuizCards" element={<QuizCards />} />
          <Route path="ShowQuestion" element={<ShowQuestion />} />

          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// ChatGPT test
