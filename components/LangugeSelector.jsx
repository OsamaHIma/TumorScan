"use client";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Translate, useLanguage } from "translate-easy";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage, handleChangeLanguage, languages } = useLanguage();

  const handleLanguageClick = (languageCode) => {
    handleChangeLanguage(languageCode);
  };

  return (
    <div className={`relative inline-block mx-2`}>
      <button
        className={`rounded-full flex items-center gap-3 text-slate-50 bg-indigo-500 px-3 py-1.5`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="ltr:mr-2 rtl:ml-2">
          <Translate translations={{ ar: "العربية" }}>
            {selectedLanguage.name}
          </Translate>
        </span>

        <div>
          <ChevronDownIcon />
        </div>
      </button>
      {isOpen && (
        <ul
          className={`LanguageSelectorMenu absolute ltr:right-0 rtl:left-0 max-h-48 overflow-scroll md:right-0 z-10 mt-2 w-48 rounded-md shadow-xl bg-stone-200 dark:bg-stone-900`}
          dir="ltr"
        >
          {languages.length &&
            languages.map((language, index) => (
              <li
                key={index}
                className={`block w-full cursor-pointer z-50 px-4 py-2 text-left text-stone-800 dark:text-stone-100 transition-all hover:bg-indigo-500/60 ${
                  selectedLanguage.code === language.code
                    ? "border border-dashed border-gray-100 dark:border-gray-300 rounded-md bg-indigo-500"
                    : ""
                }`}
                onClick={() => {
                  handleLanguageClick(language.code);
                }}
              >
                {language.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
