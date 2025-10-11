// tailwind.config.js (ESM)
import scrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [
    // nocompatible: true exposes the modern utilities like `scrollbar-thin`
    scrollbar({ nocompatible: true }),
  ],
};
