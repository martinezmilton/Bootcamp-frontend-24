import { useContext } from "react";
import LanguageContext from "./Context/LanguageContext";

function MainSection() {
    const { favoriteLanguage, toggleLanguage } = useContext(LanguageContext);

    return (
        <div>
            <p id="favoriteLanguage">favorite programing language: {favoriteLanguage}</p>
            <button id="changeFavorite" onClick={toggleLanguage}>toggle language</button>
        </div>
    )
}

export default MainSection;