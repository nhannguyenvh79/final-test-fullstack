import { useContext, useState } from "react";
import { languageContext } from "../context/LanguageContextProvider";

const Form = (props) => {
  const { language } = useContext(languageContext);
  const [deadline, setDeadline] = useState("");
  const [name, setName] = useState("");

  const { tasks, setTasks, setDataRender } = props;
  const addTask = (task) => {
    const newTasks = [...tasks, task];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
    setDataRender(newTasks);
  };
  return (
    <form className="">
      <label className="form">
        <input
          id="deadline"
          name="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        {language === "eng" ? "Enter deadline" : "Chọn deadline"}
      </label>

      <div className="form">
        <input
          placeholder={language === "eng" ? "Enter task.." : "Nhập công việc.."}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            name && deadline && addTask({ deadline, name, done: false });
            name && deadline && setDeadline("");
            name && deadline && setName("");
          }}
        >
          {language === "eng" ? "Submit" : "Thêm"}
        </button>
      </div>
    </form>
  );
};

export default Form;
