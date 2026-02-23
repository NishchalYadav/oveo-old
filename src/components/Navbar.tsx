import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/engage", label: "Engage" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-1 px-2 py-2 rounded-full border border-border bg-background/80 backdrop-blur-xl">
        <Link
          to="/"
          className="px-4 py-2 font-mono-heading text-sm font-bold tracking-tight text-foreground mr-2"
        >
          Ovéo
        </Link>
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full"
            >
              {isActive && (
                <motion.span
                  layoutId="navbar-bubble"
                  className="absolute inset-0 bg-foreground rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-200 ${
                  isActive ? "text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navbar;
