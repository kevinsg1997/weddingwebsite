import './styles/Nav.css';
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Informações", href: "/informations" },
  { label: "Presentes", href: "/merchant" }
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
    <div className="relative top-0 w-screen z-50 max-h-[10%] max-w-full">
      <nav className="">
        <ul className="flex flex-wrap justify-self-center gap-4 p-4">
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
