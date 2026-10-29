'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Award, BookOpen, BriefcaseBusiness, CalendarDays, ChevronRight, Crown, GraduationCap, Search, ShieldCheck, Sparkles, UsersRound, X } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import './team.css';

type Group = 'leadership' | 'supervisor' | 'teachers' | 'clerical' | 'support';
type Staff = { id:string; nameEn:string; nameMr:string; roleEn:string; roleMr:string; group:Group; subjectEn?:string; subjectMr?:string; qualification?:string; experience?:string; classes?:string; bioEn?:string; bioMr?:string; photo?:string; verified?:boolean };

// Only the principal's identity is school-supplied. Remaining entries are clearly marked
// examples for layout demonstration, not claims about actual staff or their credentials.
const staff: Staff[] = [
 {id:'principal',nameEn:'Shri. Gaikwad Sir',nameMr:'श्री. गायकवाड सर',roleEn:'Principal',roleMr:'प्राचार्य',group:'leadership',bioEn:'School-provided principal name. Further qualifications, photograph and biography are awaiting confirmation.',bioMr:'शाळेने दिलेले प्राचार्यांचे नाव. शैक्षणिक पात्रता, छायाचित्र आणि परिचयाची पुष्टी बाकी आहे.',verified:true},
 {id:'vice-principal',nameEn:'Vice Principal — Profile Pending',nameMr:'उपप्राचार्य — माहिती प्रतीक्षेत',roleEn:'Vice Principal',roleMr:'उपप्राचार्य',group:'leadership'},
 {id:'supervisor',nameEn:'Supervisor — Profile Pending',nameMr:'पर्यवेक्षक — माहिती प्रतीक्षेत',roleEn:'Supervisor',roleMr:'पर्यवेक्षक',group:'supervisor'},
 {id:'english',nameEn:'English Teacher — Profile Pending',nameMr:'इंग्रजी शिक्षक — माहिती प्रतीक्षेत',roleEn:'Assistant Teacher',roleMr:'सहायक शिक्षक',group:'teachers',subjectEn:'English',subjectMr:'इंग्रजी'},
 {id:'maths',nameEn:'Mathematics Teacher — Profile Pending',nameMr:'गणित शिक्षक — माहिती प्रतीक्षेत',roleEn:'Assistant Teacher',roleMr:'सहायक शिक्षक',group:'teachers',subjectEn:'Mathematics',subjectMr:'गणित'},
 {id:'science',nameEn:'Science Teacher — Profile Pending',nameMr:'विज्ञान शिक्षक — माहिती प्रतीक्षेत',roleEn:'Assistant Teacher',roleMr:'सहायक शिक्षक',group:'teachers',subjectEn:'Science',subjectMr:'विज्ञान'},
 {id:'marathi',nameEn:'Marathi Teacher — Profile Pending',nameMr:'मराठी शिक्षक — माहिती प्रतीक्षेत',roleEn:'Assistant Teacher',roleMr:'सहायक शिक्षक',group:'teachers',subjectEn:'Marathi',subjectMr:'मराठी'},
 {id:'hindi',nameEn:'Hindi Teacher — Profile Pending',nameMr:'हिंदी शिक्षक — माहिती प्रतीक्षेत',roleEn:'Assistant Teacher',roleMr:'सहायक शिक्षक',group:'teachers',subjectEn:'Hindi',subjectMr:'हिंदी'},
 {id:'social',nameEn:'Social Science Teacher — Profile Pending',nameMr:'समाजशास्त्र शिक्षक — माहिती प्रतीक्षेत',roleEn:'Assistant Teacher',roleMr:'सहायक शिक्षक',group:'teachers',subjectEn:'Social Science',subjectMr:'समाजशास्त्र'},
 {id:'computer',nameEn:'Computer Science Teacher — Profile Pending',nameMr:'संगणक विज्ञान शिक्षक — माहिती प्रतीक्षेत',roleEn:'Assistant Teacher',roleMr:'सहायक शिक्षक',group:'teachers',subjectEn:'Computer Science',subjectMr:'संगणक विज्ञान'},
 {id:'physics',nameEn:'Physics Teacher — Profile Pending',nameMr:'भौतिकशास्त्र शिक्षक — माहिती प्रतीक्षेत',roleEn:'Junior College Teacher',roleMr:'कनिष्ठ महाविद्यालय शिक्षक',group:'teachers',subjectEn:'Physics',subjectMr:'भौतिकशास्त्र'},
 {id:'chemistry',nameEn:'Chemistry Teacher — Profile Pending',nameMr:'रसायनशास्त्र शिक्षक — माहिती प्रतीक्षेत',roleEn:'Junior College Teacher',roleMr:'कनिष्ठ महाविद्यालय शिक्षक',group:'teachers',subjectEn:'Chemistry',subjectMr:'रसायनशास्त्र'},
 {id:'biology',nameEn:'Biology Teacher — Profile Pending',nameMr:'जीवशास्त्र शिक्षक — माहिती प्रतीक्षेत',roleEn:'Junior College Teacher',roleMr:'कनिष्ठ महाविद्यालय शिक्षक',group:'teachers',subjectEn:'Biology',subjectMr:'जीवशास्त्र'},
 {id:'office',nameEn:'Office Staff — Profile Pending',nameMr:'कार्यालयीन कर्मचारी — माहिती प्रतीक्षेत',roleEn:'Clerical Staff',roleMr:'लिपिक कर्मचारी',group:'clerical'},
 {id:'accounts',nameEn:'Accounts Staff — Profile Pending',nameMr:'लेखा कर्मचारी — माहिती प्रतीक्षेत',roleEn:'Accounts',roleMr:'लेखा विभाग',group:'clerical'},
 {id:'support',nameEn:'Support Staff — Profile Pending',nameMr:'सहाय्यक कर्मचारी — माहिती प्रतीक्षेत',roleEn:'Support Staff',roleMr:'सहाय्यक कर्मचारी',group:'support'},
];
const sections: {key:Group; en:string; mr:string; noteEn:string; noteMr:string; icon:typeof Crown}[] = [
 {key:'leadership',en:'School Leadership',mr:'शालेय नेतृत्व',noteEn:'Vision  |  Guidance  |  Academic Excellence',noteMr:'दृष्टी  |  मार्गदर्शन  |  शैक्षणिक उत्कृष्टता',icon:Crown},
 {key:'supervisor',en:'Supervisor',mr:'पर्यवेक्षक',noteEn:'Academic Supervision  |  Classroom Support',noteMr:'शैक्षणिक पर्यवेक्षण  |  वर्ग सहाय्य',icon:ShieldCheck},
 {key:'teachers',en:'Teaching Staff',mr:'शिक्षकवृंद',noteEn:'Subject Experts  |  Mentoring  |  Student Success',noteMr:'विषय तज्ज्ञ  |  मार्गदर्शन  |  विद्यार्थी प्रगती',icon:UsersRound},
 {key:'clerical',en:'Clerical Staff',mr:'कार्यालयीन कर्मचारी',noteEn:'Administration  |  Records  |  Student Services',noteMr:'प्रशासन  |  नोंदी  |  विद्यार्थी सेवा',icon:BriefcaseBusiness},
 {key:'support',en:'Support Staff',mr:'सहाय्यक कर्मचारी',noteEn:'A Safe, Clean and Supportive School',noteMr:'सुरक्षित, स्वच्छ आणि सहायक शाळा',icon:Sparkles},
];

export default function TeamPage(){
 const {lang}=useLanguage(); const mr=lang==='mr';
 const [selected,setSelected]=useState<Staff|null>(null); const [query,setQuery]=useState(''); const [subject,setSubject]=useState('all');
 const closeRef=useRef<HTMLButtonElement>(null); const lastTrigger=useRef<HTMLElement|null>(null);
 const subjects=Array.from(new Set(staff.filter(x=>x.group==='teachers').map(x=>x.subjectEn).filter((x):x is string=>!!x)));
 const open=(person:Staff)=>{lastTrigger.current=document.activeElement as HTMLElement;setSelected(person)};
 const close=()=>{setSelected(null);requestAnimationFrame(()=>lastTrigger.current?.focus())};
 useEffect(()=>{if(!selected)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';closeRef.current?.focus();const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')close();if(e.key==='Tab'){const modal=document.querySelector<HTMLElement>('.team-dialog');if(!modal)return;const els=Array.from(modal.querySelectorAll<HTMLElement>('button,a[href],input,select,[tabindex]:not([tabindex="-1"])'));if(!els.length)return;const first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}};document.addEventListener('keydown',onKey);return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',onKey)}},[selected]);
 const shown=(p:Staff)=>{const q=query.trim().toLowerCase();return (!q||[p.nameEn,p.nameMr,p.roleEn,p.roleMr,p.subjectEn,p.subjectMr].some(v=>v?.toLowerCase().includes(q)))&&(p.group!=='teachers'||subject==='all'||p.subjectEn===subject)};
 const name=(p:Staff)=>mr?p.nameMr:p.nameEn; const role=(p:Staff)=>mr?p.roleMr:p.roleEn;
 return <main className="team-page">
  <section className="team-banner"><div className="team-banner-photo"/><div className="team-banner-wash"/><div className="rhs-container team-banner-inner"><nav className="team-breadcrumb"><Link href="/">{mr?'मुख्यपृष्ठ':'Home'}</Link><ChevronRight size={13}/><span>{mr?'आमचा संघ':'Our Team'}</span></nav><h1>{mr?'आमचा ': 'Our '}<span>{mr?'संघ':'Team'}</span></h1><p>{mr?'विद्यार्थ्यांच्या सर्वांगीण विकासासाठी समर्पित शिक्षक आणि कर्मचारी.':'Dedicated educators and support staff working together to inspire, guide and empower every student.'}</p></div></section>
  <div className="rhs-container team-main">
   <div className="team-info"><ShieldCheck size={18}/><span>{mr?'ही प्रोफाइल मांडणीचे नमुने आहेत. प्राचार्यांचे नाव शाळेकडून मिळाले आहे; इतर कर्मचाऱ्यांची खरी माहिती अद्याप भरायची आहे.':'Staff cards are layout examples. Only the principal’s name was supplied by the school; other staff details must be confirmed before publishing.'}</span></div>
   <div className="team-toolbar"><div className="team-search"><Search size={19}/><input aria-label={mr?'कर्मचारी शोधा':'Search staff'} placeholder={mr?'नाव किंवा विषय शोधा...':'Search by name, role or subject...'} value={query} onChange={e=>setQuery(e.target.value)}/></div><select aria-label={mr?'विषय निवडा':'Filter by subject'} value={subject} onChange={e=>setSubject(e.target.value)}><option value="all">{mr?'सर्व विषय':'All subjects'}</option>{subjects.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
   {sections.map(section=>{const items=staff.filter(p=>p.group===section.key&&shown(p));if(!items.length)return null;const Icon=section.icon;return <section key={section.key} className={'team-section team-'+section.key}><header className="team-section-head"><div><Icon size={29}/><h2>{mr?section.mr:section.en}</h2><span className="team-count">{items.length}</span></div><p>{mr?section.noteMr:section.noteEn}</p></header><div className={'team-cards '+(section.key==='leadership'?'team-cards-leadership':'')}>{items.map(person=><button key={person.id} type="button" className="team-card" onClick={()=>open(person)} aria-label={(mr?'प्रोफाइल पहा: ':'View profile: ')+name(person)}><span className="team-avatar"><GraduationCap size={34}/></span><span className="team-card-info"><strong>{name(person)}</strong><small>{role(person)}</small>{person.subjectEn&&<span className="team-subject"><BookOpen size={13}/>{mr?person.subjectMr:person.subjectEn}</span>}<span className="team-card-note">{person.verified?(mr?'शाळेने दिलेले नाव':'School-provided name'):(mr?'नमुना प्रोफाइल':'Sample profile')}</span></span><span className="team-card-action">{mr?'प्रोफाइल पहा':'View profile'} <ChevronRight size={15}/></span></button>)}</div></section>})}
   {staff.every(p=>!shown(p))&&<p className="team-empty">{mr?'जुळणारे कर्मचारी सापडले नाहीत.':'No matching staff profiles.'}</p>}
  </div>
  {selected&&<div className="team-modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)close()}}><section className="team-dialog" role="dialog" aria-modal="true" aria-labelledby="team-dialog-name"><button ref={closeRef} type="button" className="team-modal-close" onClick={close} aria-label={mr?'बंद करा':'Close profile'}><X size={23}/></button><div className="team-dialog-cover"><span className="team-dialog-avatar"><GraduationCap size={58}/></span></div><div className="team-dialog-content"><span className="team-dialog-kicker"><Award size={16}/>{mr?'कर्मचारी परिचय':'STAFF PROFILE'}</span><h2 id="team-dialog-name">{name(selected)}</h2><p className="team-dialog-role">{role(selected)}</p><div className="team-dialog-facts"><div><BookOpen size={19}/><span><small>{mr?'विभाग':'Department'}</small><strong>{mr?sections.find(s=>s.key===selected.group)?.mr:sections.find(s=>s.key===selected.group)?.en}</strong></span></div>{selected.subjectEn&&<div><GraduationCap size={19}/><span><small>{mr?'विषय':'Subject'}</small><strong>{mr?selected.subjectMr:selected.subjectEn}</strong></span></div>}{selected.qualification&&<div><Award size={19}/><span><small>{mr?'पात्रता':'Qualification'}</small><strong>{selected.qualification}</strong></span></div>}{selected.experience&&<div><CalendarDays size={19}/><span><small>{mr?'अनुभव':'Experience'}</small><strong>{selected.experience}</strong></span></div>}</div><h3>{mr?'परिचय':'About'}</h3><p>{mr?(selected.bioMr||'या कर्मचाऱ्याची अधिकृत माहिती अद्याप उपलब्ध नाही. शाळेकडून पुष्टी झाल्यावर ती येथे दाखवली जाईल.'):(selected.bioEn||'This is a sample profile. The official name, photograph, qualifications and biography will appear here after school verification.')}</p><div className="team-dialog-foot"><ShieldCheck size={17}/>{selected.verified?(mr?'शाळेने पुरवलेले नाव':'Name supplied by the school'):(mr?'नमुना — प्रत्यक्ष कर्मचारी माहिती नाही':'Demonstration only — not a real staff record')}</div></div></section></div>}
 </main>;
}
