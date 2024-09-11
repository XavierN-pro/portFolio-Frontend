import Image from "next/image";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import { Bars4Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageSelector, ToggleTheme, MenuContent } from '@/components/';
import { classNames } from '@/utils';

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
  elements?: NavigationItem[]; // Optionnel pour inclure les sous-éléments
}

export const Header = () : JSX.Element => {  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      // Ferme le menu lorsque l'utilisateur redimensionne la fenêtre
      setIsMenuOpen(false);
    };

    // Écoute les événements de redimensionnement de la fenêtre
    window.addEventListener('resize', handleResize);

    // Nettoyage de l'écouteur lorsque le composant est démonté
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // navigation menu for test structure => replace by dinamics ellements from backend
  const navigation : NavigationItem[] = [
    { name: t('nav.about'), href: '#', current: true },
    { name: t('nav.contact'), href: '#', current: false },
    { name: t('nav.skills'), href: '#', current: false },
    { name: t('nav.private'), href: '#', current: false },
    { name: t('nav.projects'), href: '#', current: false ,
      elements :[
        { name: t('nav.proj1'), href: '#', current: false },
        { name: t('nav.proj2'), href: '#', current: false },
      ]},
  ]

  return (
    <header className="px-10 fixed left-0 top-0 flex w-full items-center bg-primary justify-between font-mono text-sm lg:flex">
      {/* Logo => link to home */}
      <div className="flex-shrink-0 ">
        <Link href="/" title="Home">
          <Image
            src="/LoupLogo.png"
            alt="Loup Logo"
            width={572}
            height={696}
            layout="intrinsic"
            className="!h-[100px] w-auto object-contain "
          />
        </Link>
      </div>
      
      {/* Navigation links */}
      <nav
        className={classNames(
          "lg:flex lg:items-center rounded-md justify-center absolute lg:static right-0 top-full w-auto max-w-[250px] bg-primary lg:bg-transparent",
          isMenuOpen ? "block" : "hidden lg:block"
        )}
      >
        <div
        className="flex flex-col lg:flex-row lg:space-x-4 items-start"
        >
          {navigation.map((item: NavigationItem) => (
              <MenuContent item={item} isMenuOpen={isMenuOpen}/>
          ))}
        </div>
        {/* Theme and Language selectors visible on small screens */}
        {isMenuOpen && (
          <div className="lg:hidden mt-1 py-1 flex justify-around items-center border-t border-gray-600">
            <ToggleTheme />
            <LanguageSelector />
          </div>
        )}
      </nav>
      {/* Mobile menu button */}
      <button
        className="lg:hidden text-white ml-auto"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ?
          <XMarkIcon className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"/>
          :          
          <Bars4Icon className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"/>
        }
      </button>
      {/* Theme and Language selectors visible on large screens */}
      <div className="hidden lg:flex items-center space-x-4">
        <ToggleTheme />
        <LanguageSelector />
      </div>
    </header>
  );
}