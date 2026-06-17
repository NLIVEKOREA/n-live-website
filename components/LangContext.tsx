"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { UILang, t as translate } from "@/lib/i18n";

type Ctx = { lang: UILang; setLang: (l: UILang) => void; t: (key: string) => string };
const LangCtx = createContext<Ctx>({ lang: "ko", setLang: () => {}, t: (k) => k });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<UILang>("ko");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nlive_lang") as UILang | null;
      if (saved && ["ko", "en", "zh", "zh-Hant", "ja"].includes(saved)) setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.className = document.body.className.replace(/lang-\w+/, "") + ` lang-${lang}`;
  }, [lang]);

  const setLang = (l: UILang) => {
    setLangState(l);
    try { localStorage.setItem("nlive_lang", l); } catch {}
  };

  return (
    <LangCtx.Provider value={{ lang, setLang, t: (key) => translate(lang, key) }}>
      {children}
    </LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);
