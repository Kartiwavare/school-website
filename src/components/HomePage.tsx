'use client';

import { useState } from 'react';
import { ArrowRight, Bell, BookOpen, ChevronDown, GraduationCap, Grid3X3, Heart, Mail, MapPin, Menu, Phone, Search, Sun, UsersRound, X, Accessibility, Moon, ExternalLink } from 'lucide-react';
import SchoolLogo from './SchoolLogo';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Academics', href: '#academics' },
  { label: 'Our Team', href: '#team' },
  { label: 'Notices', href: '#notices' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];
const highlights = [
  { number: '350+', label: 'Students', icon: UsersRound, style: 'blue' },
  { number: '12', label: 'Dedicated Teachers', icon: GraduationCap, style: 'green' },
  { number: '100%', label: 'Learning Focus', icon: BookOpen, style: 'gold' },
  { number: 'Safe & Inclusive', label: 'School Environment', icon: Heart, style: 'red' },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [fontScale, setFontScale] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [dark, setDark] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const results = links.filter(link => link.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <main id="home" className={`site-shell ${highContrast ? 'high-contrast' : ''} ${dark ? 'dark-mode' : ''}`} style={{ '--font-scale': fontScale } as React.CSSProperties}>
      <div className="utility-bar">
        <div className="utility-inner">
          <div className="contact-info">
            <span><MapPin size={19}/> Shevgaon, Ahilyanagar, Maharashtra</span>
            <a href="mailto:schoolname@example.com"><Mail size={19}/> schoolname@example.com</a>
            <a href="tel:+919876543210"><Phone size={18} fill="currentColor"/> +91 98765 43210</a>
          </div>
          <div className="utility-actions">
            <a href="#students">Student</a><span className="pipe">|</span><a href="#parents">Parent</a><span className="pipe">|</span><a href="#teachers">Teacher</a>
            <span className="separator"/>
            <button title="Toggle high contrast" aria-label="Toggle high contrast" onClick={() => setHighContrast(!highContrast)}><Accessibility size={23}/></button>
            <button aria-label="Increase text size" onClick={() => setFontScale(s => Math.min(1.2, +(s + .05).toFixed(2)))}>A+</button>
            <button aria-label="Reset text size" onClick={() => setFontScale(1)}>A</button>
            <button aria-label="Decrease text size" onClick={() => setFontScale(s => Math.max(.9, +(s - .05).toFixed(2)))}>A-</button>
            <span className="separator"/>
            <button title="Toggle dark mode" aria-label="Toggle dark mode" onClick={() => setDark(!dark)}>{dark ? <Moon size={23}/> : <Sun size={23}/>}</button>
          </div>
        </div>
      </div>

      <header className="main-header">
        <div className="header-inner">
          <a className="brand" href="/" aria-label="ZP Primary School home">
            <img src="/images/school-logo.png" alt="School emblem" className="school-real-logo"/>
            <span className="brand-text"><strong>RESIDENTIAL HIGHSCHOOL & JUNIOR COLLEGE OF SCIENCE, SHEVGAON</strong><small>ज्ञान <b>•</b> शिस्त <b>•</b> प्रगती</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link, i) => <a key={link.label} className={i === 0 ? 'active' : ''} href={link.href}>{link.label}</a>)}
          </nav>
          <div className="header-controls">
            <button className="search-button" aria-label="Search site" onClick={() => setSearchOpen(v => !v)}><Search size={23}/></button>
            <div className="quick-wrap">
              <button className="quick-button" aria-expanded={quickOpen} onClick={() => setQuickOpen(v => !v)}><Grid3X3 size={18}/><span>Quick Links</span><ChevronDown size={16}/></button>
              {quickOpen && <div className="quick-menu"><a href="#notices" onClick={() => setQuickOpen(false)}>Latest notices</a><a href="#academics" onClick={() => setQuickOpen(false)}>Academics</a><a href="#contact" onClick={() => setQuickOpen(false)}>Contact office</a></div>}
            </div>
            <button className="mobile-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X/> : <Menu/>}</button>
          </div>
        </div>
        {searchOpen && <div className="search-panel"><label htmlFor="site-search">Search pages</label><input id="site-search" autoFocus placeholder="Search the website..." value={query} onChange={e => setQuery(e.target.value)}/><div className="search-results">{results.length ? results.map(r => <a key={r.href} href={r.href} onClick={() => setSearchOpen(false)}>{r.label}<ArrowRight size={15}/></a>) : <span>No matching pages</span>}</div></div>}
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}</nav>}
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-visual" role="img" aria-label="Modern school building from the supplied design reference"/>
        <div className="hero-shade"/>
        <div className="hero-arc"/>
        <div className="hero-content">
          <div className="eyebrow">LEARN <span>•</span> GROW <span>•</span> BELONG <i/></div>
          <h1 id="hero-title">Building Brighter<br/><em>Futures Together</em></h1>
          <p>A nurturing and inclusive learning environment where every child discovers their potential, develops values, and prepares for a brighter tomorrow.</p>
          <div className="hero-buttons"><a className="primary-cta" href="/about">Explore Our School <ArrowRight size={19}/></a><button className="secondary-cta" onClick={() => setNoticeOpen(true)}><Bell size={18} fill="currentColor"/> View Notices</button></div>
        </div>
        <div className="stats-grid" aria-label="School highlights">
          {highlights.map((item, index) => { const Icon = item.icon; return <a href={['#students', '#team', '#academics', '#about'][index]} className="stat-card" key={item.label}><span className={`stat-icon ${item.style}`}><Icon size={33} strokeWidth={2.2}/></span><span className="stat-copy"><strong>{item.number}</strong><small>{item.label}</small></span><span className="stat-arrow"><ArrowRight size={21}/></span></a>; })}
        </div>
      </section>

      <section className="below-fold" id="about"><span className="section-kicker">WELCOME TO OUR SCHOOL</span><h2>Where every child has room to shine.</h2><p>We believe in learning with curiosity, kindness, and confidence. Explore our school community and the opportunities we create for every learner.</p><a href="#contact">Get in touch <ArrowRight size={17}/></a></section>
      <section className="mini-sections" aria-label="Explore school"><article id="academics"><BookOpen/><h3>Academics</h3><p>A strong foundation for lifelong learning.</p></article><article id="team"><GraduationCap/><h3>Our Team</h3><p>Dedicated educators who care.</p></article><article id="notices"><Bell/><h3>Latest Notices</h3><p>Important school announcements will appear here.</p></article><article id="gallery"><UsersRound/><h3>Gallery</h3><p>Moments from school life and activities.</p></article></section>
      <footer id="contact"><strong>RESIDENTIAL HIGHSCHOOL & JUNIOR COLLEGE OF SCIENCE, SHEVGAON</strong><span>Shevgaon, Ahilyanagar, Maharashtra</span><span>Contact details shown are placeholders; replace before publishing.</span><small>© {new Date().getFullYear()} Residential Highschool & Junior College of Science, Shevgaon. All rights reserved.</small></footer>
      {noticeOpen && <div className="modal-backdrop" onClick={() => setNoticeOpen(false)}><div className="notice-modal" role="dialog" aria-modal="true" aria-labelledby="notice-title" onClick={e => e.stopPropagation()}><button className="modal-close" aria-label="Close notices" onClick={() => setNoticeOpen(false)}><X/></button><span className="modal-icon"><Bell/></span><h2 id="notice-title">School Notices</h2><p>No official notices have been added yet. Connect this section to your school announcements before publishing.</p><button className="modal-done" onClick={() => setNoticeOpen(false)}>Close <ExternalLink size={16}/></button></div></div>}
    </main>
  );
}
