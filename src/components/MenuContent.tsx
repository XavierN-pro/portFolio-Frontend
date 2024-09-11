import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { classNames } from '@/utils';

type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
  elements?: NavigationItem[]; // Optionnel pour inclure les sous-éléments
}

type MenuContentProps = {
  isMenuOpen: boolean;
  item: NavigationItem;
  [key: string]: any; // Pour d'autres props supplémentaires
};


export const MenuContent : React.FC<MenuContentProps> = ({item, isMenuOpen, ...rest}) => {
  return (
    <Menu >
    {({ open }) => (
      <>
        <MenuButton
          className={classNames(
            item.current ? 'bg-tertiary text-onPrimary' : 'text-gray-300 data-[hover]:bg-gray-700 data-[hover]:text-white data-[open]:bg-gray-700 data-[open]:text-white',
            "block w-full rounded-md px-3 py-2 font-medium font-courgette text-lg lg:text-2xl lg:text-center sm:text-left text-nowrap"
          )}
        >{`<${item.name}${!item.elements?'/':''}>`}</MenuButton>
        <AnimatePresence>
        {open && (
          <MenuItems 
            static
            as={motion.div}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            anchor={{to: isMenuOpen? "left start" : "bottom start", gap: '4px'}}
            className="bg-primary rounded-md "
          >
          {item.elements ? (
            item.elements.map((element: NavigationItem) => (
              <MenuItem key={element.name}>
                <Link
                  href={element.href}
                  className={classNames(
                    item.current ? 'bg-tertiary text-onPrimary' : 'text-gray-300 data-[focus]:bg-gray-700 data-[focus]:text-white',
                    "block w-full rounded-md px-3 py-2 font-medium font-courgette text-lg lg:text-2xl text-left text-nowrap"
                  )}
                >
                {`<${element.name}/>`}
                </Link>
              </MenuItem>
            )))
            : null
          }
          </MenuItems>
        )}
        </AnimatePresence>
      </>
    )}
    </Menu>
  )
}