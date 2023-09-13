import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { languageContext } from "../context/LanguageContextProvider";

const Header = (props) => {
  const { language } = useContext(languageContext);
  const { tasks, dataRender, setDataRender } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const withDone = searchParams.get("withDone");
  const [status, setStatus] = useState(withDone);

  const goingTasks = tasks.filter((el) => el.done === false);

  //0:notFinish 1:all 2:Finish
  const hanldeFilter = () => {
    if (parseInt(status) === 0) {
      const notfinishedTask = tasks.filter((el) => el.done === false);
      return setDataRender(notfinishedTask);
    }

    if (parseInt(status) === 1) {
      return setDataRender(tasks);
    }

    if (parseInt(status) === 2) {
      const finishedTask = tasks.filter((el) => el.done === true);
      return setDataRender(finishedTask);
    }
  };

  const handleReorder = () => {
    const coypyTasks = dataRender.slice();
    const reorderTasks = coypyTasks.reverse();
    setDataRender(reorderTasks);
  };

  useEffect(() => {
    hanldeFilter();
  }, [status]);

  return (
    <div className="header">
      {language === "eng"
        ? `You have ${goingTasks.length} tasks left!`
        : `Bạn còn ${goingTasks.length} công việc!`}

      <label style={{ marginLeft: "20px" }}>
        {language === "eng" ? "Not finish only" : "Hiện chưa hoàn thành"}{" "}
        <input
          type="checkbox"
          defaultValue={false}
          onChange={(e) => {
            e.target.checked ? setStatus(0) : setStatus(1);
          }}
        />
      </label>

      <button style={{ marginLeft: "15px" }} onClick={handleReorder}>
        Reorder List
      </button>
    </div>
  );
};

export default Header;
