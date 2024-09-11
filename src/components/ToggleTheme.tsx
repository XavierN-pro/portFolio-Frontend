import { Switch } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@/components';
import { classNames } from '@/utils';
import { useTranslation } from 'react-i18next';

export const ToggleTheme = (): JSX.Element => {
  const [enabled, setEnabled] = useState<boolean>(false); 
  const { t } = useTranslation();

  useEffect(()=>{
    const htmlClassList = document.documentElement.classList;
    // Check if LocalStorage is set (not in server)
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('color-theme'); // Theme in localStorage
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; // Theme Windows prefered

      if (storedTheme === 'dark-theme' || (!storedTheme && prefersDark)) {
        setEnabled(true);
        htmlClassList.add('dark-theme');
        htmlClassList.remove('light-theme');
      } else {
        setEnabled(false);
      }
    }
  }, [])

  const changeTheme = (value : boolean) => {
    setEnabled(value)
    if (value){
      localStorage.setItem('color-theme', 'dark-theme');
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    }
    else {
      localStorage.setItem('color-theme', 'light-theme');
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }    
  }

  return (
    <div className="relative group p-1.5 rounded-md hover:bg-gray-600">
      <Tooltip text={enabled ? t('themeOff') : t('themeOn')} />
      {/* Switch Button */}
      <Switch
        checked={enabled}
        onChange={(e)=>changeTheme(e)}
        className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'bg-yellow-500' : 'bg-black' ,
            "flex items-center justify-center text-center pointer-events-none size-5 translate-x-0 rounded-full ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7 "
          )}
            >
          {enabled ? (
              <SunIcon aria-hidden="true" className="h-4 w-4 text-black" />
            ) : (
              <MoonIcon aria-hidden="true" className="h-4 w-4 text-white" />
          )}
        </span>
      </Switch>
    </div>
  )
}