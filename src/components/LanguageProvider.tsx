'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Lang, messages } from '@/lib/school';
type Context = {lang:Lang; setLang:(lang:Lang)=>void; t:typeof messages.en | typeof messages.mr};
const LanguageContext=createContext<Context | null>(null);
export function LanguageProvider({children}:{children:React.ReactNode}){
 const [lang,setLang]=useState<Lang>('en');
 useEffect(()=>{document.documentElement.lang=lang;},[lang]);
 return <LanguageContext.Provider value={{lang,setLang,t:messages[lang]}}>{children}</LanguageContext.Provider>;
}
export function useLanguage(){const c=useContext(LanguageContext);if(!c)throw Error('Missing LanguageProvider');return c;}
