import { TiArrowBack } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900">
      <h1 className="text-4xl font-bold">404 Not Found</h1>
      <Link
        to="/"
        className="mt-4 flex items-center gap-2 text-base font-medium text-zinc-400 transition-colors hover:text-white"
      >
        <TiArrowBack className="text-base" />
        Back to Home
      </Link>
    </div>
  );
}
