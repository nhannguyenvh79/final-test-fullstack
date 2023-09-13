import { useContext } from "react";
import { languageContext } from "../context/LanguageContextProvider";

const Footer = () => {
  const { language, setLanguage } = useContext(languageContext);
  return (
    <div>
      {language === "eng" ? (
        <h3>Made by MindX 🔥</h3>
      ) : (
        <h3>Tạo bởi MindX 🔥</h3>
      )}
      <div>
        {language === "eng" ? (
          <span>Available on:</span>
        ) : (
          <span>Ngôn ngữ:</span>
        )}

        <span
          className={
            language === "vie"
              ? "languague-picker selected"
              : "languague-picker"
          }
          onClick={() => setLanguage("vie")}
        >
          🇻🇳
        </span>
        <span
          className={
            language === "eng"
              ? "languague-picker selected"
              : "languague-picker"
          }
          onClick={() => setLanguage("eng")}
        >
          🇺🇸
        </span>
      </div>
    </div>
  );
};

export default Footer;
