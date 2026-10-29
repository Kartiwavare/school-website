import type { Metadata } from 'next';
import './globals.css';
import './school.css';
import {LanguageProvider} from '@/components/LanguageProvider';
import {NoticesProvider} from '@/components/NoticesProvider';
import SiteChrome from '@/components/SiteChrome';
export const metadata: Metadata={title:{default:'Residential Highschool & Junior College of Science, Shevgaon',template:'%s | Residential Highschool Shevgaon'},description:'Residential Highschool & Junior College of Science, Miri Road, Shevgaon, Maharashtra. Established 1960.',robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><LanguageProvider><NoticesProvider><SiteChrome>{children}</SiteChrome></NoticesProvider></LanguageProvider></body></html>}
