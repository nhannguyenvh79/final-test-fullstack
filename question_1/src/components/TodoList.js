import { useContext } from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { languageContext } from "../context/LanguageContextProvider";

const TodoList = (props) => {
  const { language } = useContext(languageContext);
  const { tasks, setTasks, dataRender, setDataRender } = props;

  const handleCheckboxChange = (el) => {
    const index = tasks.findIndex((task) => task.name === el.name);
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;

    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
    setDataRender(newTasks);
  };

  const dueTo = (deadline) => {
    const currentDay = new Date();
    const dueToDay = new Date(deadline);

    const gap = dueToDay - currentDay;
    const days = gap / (1000 * 60 * 60 * 24);
    return days > 0 ? days.toFixed(1) : 0;
  };

  return (
    <div className="todo-list-container">
      {dataRender.map((el) => {
        return (
          <div
            key={el.name}
            className={`todo-item-container ${el.done ? "done" : ""}`}
          >
            <label
              className="item-title"
              style={{ display: "flex", gap: "10px" }}
            >
              <input
                name="check"
                type="checkbox"
                style={{ display: "none" }}
                checked={el.done}
                onChange={(e) => {
                  handleCheckboxChange(el);
                }}
              />

              {el.done ? (
                <FaRegCheckCircle
                  color="#9a9a9a"
                  className="item-done-button"
                />
              ) : (
                <FaRegCircle className="item-done-button" color="#9a9a9a" />
              )}

              <div>{el.name}</div>

              <div style={{ fontSize: "13px", fontWeight: "500" }}>
                {`${dueTo(el.deadline)} ${
                  language === "eng" ? "Days left" : "ngày còn lại"
                }`}
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
