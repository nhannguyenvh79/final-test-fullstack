import React, { createContext, useState } from "react";

export const languageContext = createContext();
const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState("eng");
  return (
    <languageContext.Provider value={{ language, setLanguage }}>
      {children}
    </languageContext.Provider>
  );
};

export default LanguageContextProvider;
