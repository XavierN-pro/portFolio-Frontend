import { Switch } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@/components';
import { classNames } from '@/utils';
import { t } from 'i18next';

export const ToggleTheme = () => {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(()=>{
    // Check if LocalStorage is set (not in server)
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('color-theme'); // Theme in localStorage
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; // Theme Windows prefered

      if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        setEnabled(true);
      }
    }
  }, [])

  const changeTheme = (e : boolean) => {
    setEnabled(e)
    if (e){
      localStorage.setItem('color-theme', 'dark');
    }
    else {
      localStorage.setItem('color-theme', 'light');
    }    
  }

  return (
    <div className="relative group py-0.5">
      <Tooltip text={enabled ? t('themeOff') : t('themeOn')}/>    
      {/* Switch Button */}
      <Switch
        checked={enabled}
        onChange={(e)=>changeTheme(e)}
        className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
      >
        <span
          aria-hidden="true"
          className={classNames(enabled ? 'bg-yellow-500' : 'bg-black' ,"flex items-center justify-center text-center pointer-events-none size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7 data-[checked]:bg-black"
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