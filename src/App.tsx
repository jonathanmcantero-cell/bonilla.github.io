/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, createContext, useContext, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Fence, 
  Construction, 
  Droplets, 
  Gamepad2, 
  Leaf, 
  Scissors, 
  Trees, 
  Waves, 
  Gem, 
  BrickWall,
  ArrowRight,
  Instagram,
  Facebook,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Context ---

type Language = 'en' | 'es';

interface Content {
  nav: {
    home: string;
    services: string;
    contact: string;
    about: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  services: {
    title: string;
    items: {
      name: string;
      icon: React.ElementType;
    }[];
  };
  about: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    phone: string;
    message: string;
    send: string;
    callNow: string;
    whatsapp: string;
  };
  footer: {
    rights: string;
  };
}

const translations: Record<Language, Content> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      contact: 'Contact',
      about: 'About',
    },
    hero: {
      title: 'Professional Landscaping Services',
      subtitle: 'Quality work you can trust',
      cta: 'Call Now',
    },
    services: {
      title: 'Our Services',
      items: [
        { name: 'Fences', icon: Fence },
        { name: 'Concrete', icon: Construction },
        { name: 'Drain', icon: Droplets },
        { name: 'Playground', icon: Gamepad2 },
        { name: 'Mulch', icon: Leaf },
        { name: 'Trim', icon: Scissors },
        { name: 'Yard', icon: Trees },
        { name: 'Pressure Washing', icon: Waves },
        { name: 'Stone', icon: Gem },
        { name: 'Brick, Etc.', icon: BrickWall },
      ],
    },
    about: {
      title: 'About Us',
      description: 'We provide reliable and professional landscaping services, ensuring quality work and customer satisfaction.',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Get a free estimate today',
      name: 'Name',
      phone: 'Phone',
      message: 'Message',
      send: 'Send Message',
      callNow: 'Call Now',
      whatsapp: 'WhatsApp',
    },
    footer: {
      rights: 'All rights reserved',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      contact: 'Contacto',
      about: 'Nosotros',
    },
    hero: {
      title: 'Servicios Profesionales de Jardinería',
      subtitle: 'Trabajo de calidad en el que puedes confiar',
      cta: 'Llamar Ahora',
    },
    services: {
      title: 'Nuestros Servicios',
      items: [
        { name: 'Cercas', icon: Fence },
        { name: 'Concreto', icon: Construction },
        { name: 'Drenaje', icon: Droplets },
        { name: 'Área de juegos', icon: Gamepad2 },
        { name: 'Mantillo', icon: Leaf },
        { name: 'Poda', icon: Scissors },
        { name: 'Jardín / Patio', icon: Trees },
        { name: 'Lavado a presión', icon: Waves },
        { name: 'Piedra', icon: Gem },
        { name: 'Ladrillo, etc.', icon: BrickWall },
      ],
    },
    about: {
      title: 'Sobre Nosotros',
      description: 'Ofrecemos servicios de jardinería confiables y profesionales, garantizando calidad y satisfacción del cliente.',
    },
    contact: {
      title: 'Contáctenos',
      subtitle: 'Obtenga un presupuesto gratuito hoy',
      name: 'Nombre',
      phone: 'Teléfono',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
      callNow: 'Llamar Ahora',
      whatsapp: 'WhatsApp',
    },
    footer: {
      rights: 'Todos los derechos reservados',
    },
  },
};

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: Content;
}>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
});

const useLanguage = () => useContext(LanguageContext);

// --- Components ---

const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg shadow-lg">
            <Trees className="text-white w-6 h-6" />
          </div>
          <h1 className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-primary' : 'text-white'}`}>
            BONILLA <span className={isScrolled ? 'text-accent' : 'text-white/90'}>LANDSCAPING</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className={`font-medium hover:text-primary transition-colors ${isScrolled ? 'text-stone-700' : 'text-white'}`}
            >
              {item.name}
            </a>
          ))}
          <div className="flex items-center bg-stone-100 rounded-full p-1 ml-4 shadow-inner">
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-primary text-white shadow-sm' : 'text-stone-500'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('es')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'es' ? 'bg-primary text-white shadow-sm' : 'text-stone-500'}`}
            >
              ES
            </button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="flex items-center bg-stone-100 rounded-full p-1 shadow-inner">
            <button 
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-primary text-white' : 'text-stone-500'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('es')}
              className={`px-2 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'es' ? 'bg-primary text-white' : 'text-stone-500'}`}
            >
              ES
            </button>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${isScrolled ? 'text-stone-800' : 'text-white'}`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-stone-100 md:hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-stone-800 hover:text-primary border-b border-stone-50 pb-2"
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="tel:3463899435"
                className="mt-4 bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg"
              >
                <Phone size={20} />
                346-389-9435
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=2000" 
          alt="Lush green garden" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-stone-900/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-block bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Houston & Surrounding Areas
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            {t.hero.title}
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-xl">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="tel:3463899435"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl transition-all flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95"
            >
              <Phone size={24} />
              {t.hero.cta}: 346-389-9435
            </a>
            <a 
              href="#services"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {t.nav.services}
              <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&q=80&w=1000" 
              alt="Landscaping work" 
              className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl border border-stone-100 hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircle2 className="text-primary w-8 h-8" />
                </div>
                <div>
                  <p className="text-stone-500 text-sm font-medium">Satisfaction</p>
                  <p className="text-stone-900 font-bold text-xl">100% Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">{t.nav.about}</h3>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-8 leading-tight">
              {t.about.title}
            </h2>
            <p className="text-xl text-stone-600 mb-10 leading-relaxed">
              {t.about.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { en: 'Professional Team', es: 'Equipo Profesional' },
                { en: 'Quality Materials', es: 'Materiales de Calidad' },
                { en: 'Reliable Service', es: 'Servicio Confiable' },
                { en: 'Free Estimates', es: 'Presupuestos Gratis' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <CheckCircle2 className="text-primary w-5 h-5" />
                  </div>
                  <span className="font-semibold text-stone-800">
                    {useLanguage().lang === 'en' ? item.en : item.es}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">{t.nav.services}</h3>
          <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6">
            {t.services.title}
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {t.services.items.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 text-center group transition-all hover:shadow-2xl hover:border-primary/20"
            >
              <div className="bg-stone-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                <service.icon className="text-primary w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-stone-800 group-hover:text-primary transition-colors">
                {service.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { t, lang } = useLanguage();
  const [formState, setFormState] = useState({ name: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formState);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormState({ name: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-stone-900 text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2">
            <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">{t.nav.contact}</h3>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {t.contact.title}
            </h2>
            <p className="text-xl text-stone-400 mb-12">
              {t.contact.subtitle}
            </p>

            <div className="space-y-8 mb-12">
              <a 
                href="tel:3463899435" 
                className="flex items-center gap-6 group"
              >
                <div className="bg-primary/20 p-4 rounded-2xl group-hover:bg-primary transition-colors">
                  <Phone className="text-primary group-hover:text-white w-8 h-8" />
                </div>
                <div>
                  <p className="text-stone-500 text-sm font-bold uppercase tracking-wider">{t.contact.callNow}</p>
                  <p className="text-2xl font-bold">346-389-9435</p>
                </div>
              </a>

              <a 
                href="https://wa.me/13463899435" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-6 group"
              >
                <div className="bg-green-500/20 p-4 rounded-2xl group-hover:bg-green-500 transition-colors">
                  <MessageSquare className="text-green-500 group-hover:text-white w-8 h-8" />
                </div>
                <div>
                  <p className="text-stone-500 text-sm font-bold uppercase tracking-wider">{t.contact.whatsapp}</p>
                  <p className="text-2xl font-bold">346-389-9435</p>
                </div>
              </a>
            </div>

            <div className="flex gap-4">
              <a href="#" className="bg-stone-800 p-3 rounded-xl hover:bg-primary transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="bg-stone-800 p-3 rounded-xl hover:bg-primary transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="bg-stone-800 p-3 rounded-xl hover:bg-primary transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-stone-800/50 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-stone-700 shadow-2xl">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-primary w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {lang === 'en' ? 'Thank You!' : '¡Gracias!'}
                  </h3>
                  <p className="text-stone-400">
                    {lang === 'en' ? 'We will get back to you shortly.' : 'Nos pondremos en contacto con usted pronto.'}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-stone-400 text-sm font-bold mb-2 ml-1">{t.contact.name}</label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-stone-900/50 border border-stone-700 rounded-xl px-5 py-4 focus:outline-none focus:border-primary transition-colors"
                      placeholder={t.contact.name}
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 text-sm font-bold mb-2 ml-1">{t.contact.phone}</label>
                    <input 
                      type="tel" 
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-stone-900/50 border border-stone-700 rounded-xl px-5 py-4 focus:outline-none focus:border-primary transition-colors"
                      placeholder={t.contact.phone}
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 text-sm font-bold mb-2 ml-1">{t.contact.message}</label>
                    <textarea 
                      rows={4} 
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-stone-900/50 border border-stone-700 rounded-xl px-5 py-4 focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder={t.contact.message}
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-5 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {t.contact.send}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-white py-12 border-t border-stone-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Trees className="text-primary w-6 h-6" />
            <h1 className="text-xl font-bold tracking-tight">
              BONILLA <span className="text-white/60">LANDSCAPING</span>
            </h1>
          </div>
          
          <div className="text-stone-500 text-sm font-medium">
            &copy; {year} BONILLA LANDSCAPING. {t.footer.rights}.
          </div>

          <div className="flex items-center gap-2 text-stone-300 font-bold">
            <Phone size={18} className="text-primary" />
            346-389-9435
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <div className="font-sans text-stone-900 bg-white selection:bg-primary/30">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Contact />
        </main>
        <Footer />
        
        {/* Floating Call Button for Mobile */}
        <a 
          href="tel:3463899435"
          className="md:hidden fixed bottom-6 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-2xl animate-bounce"
        >
          <Phone size={28} />
        </a>
      </div>
    </LanguageContext.Provider>
  );
}
