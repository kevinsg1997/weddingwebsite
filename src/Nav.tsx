import './styles/Nav.css';
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Missão", href: "/mission" },
  { label: "Mercador", href: "/merchant" },
  { label: "Informações", href: "/informations" }
];

function Nav() {
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
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full z-50 max-h-[10%]">
      <nav className="bg-[#403c37] shadow-md rounded-bl-2xl rounded-br-2xl">
        <ul className="flex flex-wrap justify-center gap-4 p-4">
          <li ref={activeRef} className="active"></li>
          {navItems.map((item, index) => (
            <li
              key={item.label}
              className="hover:text-red-700"
              style={{fontFamily: "serif"}}
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
            >
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
