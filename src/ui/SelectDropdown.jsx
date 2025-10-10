export default function SelectDropdown({ value, onChangeSelect, options }) {
  return (
    <div className="relative select-none">
      <select
        value={value}
        onChange={(e) => onChangeSelect(e.target.value)}
        className="cursor-pointer appearance-none rounded-lg border-0 bg-zinc-800 px-4 py-2 pr-10 text-sm text-zinc-100 transition-all duration-200 outline-none hover:bg-zinc-700 focus:bg-zinc-700 focus:ring-0 "
        style={{
          WebkitAppearance: "none",
          MozAppearance: "none",
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>

      {/* custom dropdown arrow */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
