import { Link } from "react-router-dom";

export default function SideNavLink({ icon, text, to }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 rounded p-3 transition-colors duration-300 hover:bg-purple-600 hover:text-zinc-50"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
