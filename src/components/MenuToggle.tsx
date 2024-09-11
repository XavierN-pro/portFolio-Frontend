import * as React from "react";
import { motion } from "framer-motion";

// Typing the props for the Path component
const Path = (props: React.ComponentProps<typeof motion.path>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

// Typing the toggle function in MenuToggle
interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

export const MenuToggle : React.FC<MenuToggleProps> = ({ toggle, isOpen }) => (
  <button 
    onClick={toggle}
    className="lg:hidden"
  >
    <svg width="23" height="23" viewBox="0 0 23 23" className="text-white">
      <Path
        animate={isOpen ? "open" : "closed"}
        stroke ="currentColor"
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        animate={isOpen ? "open" : "closed"}
        d="M 2 9.423 L 20 9.423"
        stroke="currentColor"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        animate={isOpen ? "open" : "closed"}
        stroke="currentColor"
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
);
