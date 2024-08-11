import { createContext } from "react";

const LanguageContext = createContext({
    favoriteLanguage: '',
    toggleLanguage: () => { }
});

export default LanguageContext;