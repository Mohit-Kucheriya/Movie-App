import {
  RiTvFill,
  RiFireFill,
  RiMovie2Fill,
  RiGroupFill,
  RiMagicFill,
  RiInformation2Fill,
  RiPhoneFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import SideNavLink from "../ui/SideNavLink";

export default function SideNav() {
  return (
    <aside className="col-span-1 row-span-2 border-r-1 border-zinc-600 p-8">
      <Link
        to="/"
        className="mb-4 flex items-center gap-2 text-2xl font-medium"
      >
        <RiTvFill className="text-purple-600" />
        <span>Movieverse</span>
      </Link>

      <nav>
        <h2 className="mt-6 mb-3 text-xl font-medium text-zinc-400">
          Latest Feed
        </h2>
        <div className="flex flex-col gap-3 text-zinc-300">
          <SideNavLink text="Trending" icon={<RiFireFill />} to="/trending" />
          <SideNavLink text="Popular" icon={<RiMagicFill />} />
          <SideNavLink text="Movies" icon={<RiMovie2Fill />} />
          <SideNavLink text="Tv Shows" icon={<RiTvFill />} />
          <SideNavLink text="People" icon={<RiGroupFill />} />
        </div>
        <h2 className="mt-6 mb-3 text-xl font-medium text-zinc-400">
          Website Information
        </h2>
        <div className="flex flex-col gap-3 text-zinc-300">
          <SideNavLink text="About Movieverse" icon={<RiInformation2Fill />} />
          <SideNavLink text="Contact Us" icon={<RiPhoneFill />} />
        </div>
      </nav>
    </aside>
  );
}
