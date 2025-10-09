import Main from "./Main";
import SideNav from "./SideNav";

export default function Home() {
  return (
    <div className="grid h-screen grid-cols-[22rem_1fr] grid-rows-[auto_1fr]">
      <SideNav />
      <Main />
    </div>
  );
}
