import './styles/Nav.css';
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavProps {
  openModal: () => void;
}

const navItems = [
  { label: "Início", href: "/" },
  { label: "Informações", href: "/informations" },
  { label: "Presentes", href: "/merchant" }
];

function Nav({ openModal }: NavProps) {
  const activeRef = useRef<HTMLLIElement>(null);
  const itemRefs = useRef<HTMLLIElement[]>([]);
  const location = useLocation();

  useEffect(() => {
    const index = navItems.findIndex(item => item.href === location.pathname);
    if (index >= 0 && activeRef.current && itemRefs.current[index]) {
      const currentItem = itemRefs.current[index];
      activeRef.current.style.left = `${currentItem.offsetLeft}px`;
      activeRef.current.style.width = `${currentItem.offsetWidth}px`;
    }
  }, [location.pathname]);

  return (
<div className="relative top-0 w-screen z-50 max-h-[10%] max-w-full">
  <nav className="bg-[rgba(165,121,0,0.65)] backdrop-blur-md border-b border-gray-200 shadow-md rounded-b-2xl">
    <ul className="flex flex-wrap justify-center items-center w-full gap-4 p-4">
      <li ref={activeRef} className="active"></li>
      {navItems.map((item, index) => (
        <li
          key={item.label}
          style={{ fontFamily: "serif" }}
          ref={(el) => {
            if (el) itemRefs.current[index] = el;
          }}
        >
          <Link to={item.href}>{item.label}</Link>
        </li>
      ))}
      <li>
        <button
          onClick={openModal}
          style={{ fontFamily: "serif" }}
        >
          Confirmar Presença
        </button>
      </li>
    </ul>
  </nav>
</div>
  );
}

export default Nav;
