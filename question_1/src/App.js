import "./App.css";
import { Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import Form from "./components/Form";
import Footer from "./components/Footer";
import Header from "./components/TodoListHeader";
import { useState } from "react";
import mockdata from "./components/mockdata";
import LanguageContextProvider from "./context/LanguageContextProvider";

export default function App() {
  return (
    <LanguageContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </LanguageContextProvider>
  );
}

const Home = () => {
  const data = JSON.parse(localStorage.getItem("tasks"));
  const [tasks, setTasks] = useState(data || mockdata || []);
  const [dataRender, setDataRender] = useState(data || mockdata || []);

  const props = {
    tasks,
    setTasks,
    dataRender,
    setDataRender,
  };

  return (
    <div className="App">
      <div className="container">
        <Header {...props} />
        <TodoList {...props} />
        <Form {...props} />
      </div>
      <Footer {...props} />
    </div>
  );
};
