'use client';
import {createContext,useContext,useEffect,useState} from 'react';
export type Notice={id:string;title:string;body:string;created:string};
type Ctx={notices:Notice[];add:(title:string,body:string)=>void;remove:(id:string)=>void};
const C=createContext<Ctx|null>(null);
export function NoticesProvider({children}:{children:React.ReactNode}){
 const [notices,setNotices]=useState<Notice[]>([]);
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem('rhs-notices-demo')||'[]');if(Array.isArray(saved))setNotices(saved)}catch{}},[]);
 function persist(next:Notice[]){setNotices(next);localStorage.setItem('rhs-notices-demo',JSON.stringify(next));}
 return <C.Provider value={{notices,add:(title,body)=>persist([{id:crypto.randomUUID(),title,body,created:new Date().toLocaleDateString()},...notices]),remove:id=>persist(notices.filter(n=>n.id!==id))}}>{children}</C.Provider>;
}
export function useNotices(){const c=useContext(C);if(!c)throw Error('Missing NoticesProvider');return c;}
