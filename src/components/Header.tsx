// import { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { t } from 'i18next';
import { useState } from "react";
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { LanguageSelector, ToggleTheme } from '@/components/';


// serialise react actions and others class attributs => Export to library ?
function classNames(...classes : string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Header = ()=> {
  const [selected, setSelected] = useState<String>("light");

  // navigation menu for test structure => replace by dinamics ellements from backend
  const navigation = [
    { name: t('nav.about'), href: '#', current: true },
    { name: t('nav.contact'), href: '#', current: false },
    { name: t('nav.skills'), href: '#', current: false },
    { name: t('nav.projects'), href: '#', current: false ,
      elements :[
        { name: t('nav.proj1'), href: '#', current: false },
        { name: t('nav.proj2'), href: '#', current: false },
      ]},
  ]

  return (
    <header className="px-10 fixed left-0 top-0 flex w-full items-center bg-slate-600 justify-between font-mono text-sm lg:flex">
      <div>
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
      <div className="w-2/3 flex justify-center">        
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            aria-current={item.current ? 'page' : undefined}
            className={classNames(
              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'rounded-md px-3 py-2 font-medium font-courgette text-2xl text-center self-center',
            )}
          >
            {`<${item.name}${!item.hasOwnProperty('elements')?'/':''}>`}
          </Link>
          // Add component pop sous-menu
        ))}
      </div>
      <div className="flex items-center justify-between">
        {/* Add toggle button to switch theme using icones bellow*/}

        <MoonIcon aria-hidden="true" className="hidden h-6 w-6" />
        <SunIcon aria-hidden="true" className="hidden h-6 w-6" />
        <ToggleTheme />
        <LanguageSelector />
      </div>
    </header>
  );
}