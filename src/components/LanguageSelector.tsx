import React, {useState} from "react";
import i18n from '../i18n';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { t } from 'i18next';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip } from '@/components/';
import { classNames } from '@/utils';

/**
 * LanguageSelector Component
 * 
 * Features:
 * - Tooltip: Displays an informative message when hovering over the selector button.
 * - Menu: Shows a list of languages defined in the `i18n` configuration.
 * - State Management: Tracks and updates the selected language using React's useState hook.
 * 
 * Tooltip Text: The text for the tooltip is fetched via the `useTranslation` hook and can be localized 
 * in various languages.
 * 
 * Menu Options: The list of available languages is dynamically generated from the `i18n.options.resources` object, 
 * and each language option is displayed as a button. The currently selected language is highlighted.
 * 
 * @returns {JSX.Element} The LanguageSelector component.
 */

export const LanguageSelector = (): JSX.Element => {    
  const [selectedLanguage, setSelectedLanguage] = useState<String>(i18n.language); // i18n.language contains the language assigned to lng in i18n.js file.

  const availableLanguages: string[] = Object.keys(i18n.options.resources|| {}); //i18n.options.resources contains traductions for each languauges

  // Handle language selection
  const chooseLanguage = (lang : string) => {
    i18n.changeLanguage(lang);   // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
    setSelectedLanguage(lang);
  }

  return (    
    <div className="group flex relative items-center justify-center text-right">
      <Tooltip text={t('language.tooltip')} />
      {/* Menu */}
      <Menu>
      {({ open }) => (
        <>
        <MenuButton className="group inline-flex items-center gap-2 rounded-md p-1.5 text-sm/5 font-semibold text-white focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          <GlobeAltIcon aria-hidden="true" className="h-7 w-7" />
        </MenuButton>
        <AnimatePresence>
            {open && (
        <MenuItems
          static
          as={motion.div}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          anchor="bottom end"
          className="w-30 origin-top-right rounded-xl border bg-gray-700 border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {availableLanguages.map((lang: string) => (
            <MenuItem key={lang}>
              <button
                onClick={() => chooseLanguage(lang)}
                className={classNames(
                  selectedLanguage === lang ? 'bg-blue-500' : 'bg-slate-400',
                  "group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                )}
              >
                {t(`language.${lang}`)}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      )}
          </AnimatePresence>
        </>
      )}
      </Menu>
    </div>  
  );
};