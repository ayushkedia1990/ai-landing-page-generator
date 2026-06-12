"use client";

import { useEffect, useId, useRef, useState } from "react";

export type SearchableSelectOption = {
  value: string;
  label: string;
};

type SearchableSelectProps = {
  name: string;
  label: string;
  options: SearchableSelectOption[];
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  fontPreview?: boolean;
};

export function SearchableSelect({
  name,
  label,
  options,
  defaultValue = "",
  placeholder = "Select an option",
  required = false,
  fontPreview = false,
}: SearchableSelectProps) {
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(defaultValue);

  const selectedOption = options.find((option) => option.value === selected);
  const filtered = options.filter((option) =>
    option.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={selected} required={required} />
      <label htmlFor={listId} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <button
        id={listId}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className="mt-2 flex w-full items-center justify-between rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-left text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        style={fontPreview && selectedOption ? { fontFamily: selectedOption.value } : undefined}
      >
        <span className={selectedOption ? "text-slate-900" : "text-slate-500"}>
          {selectedOption?.label ?? placeholder}
        </span>
        <svg
          className={`h-4 w-4 text-slate-400 transition ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open ? (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
          <div className="border-b border-slate-100 p-3">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-2">
              <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  ×
                </button>
              ) : null}
            </div>
          </div>

          <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
            {filtered.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected === option.value}
                  onClick={() => {
                    setSelected(option.value);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full px-4 py-2.5 text-left text-sm transition hover:bg-slate-50 ${
                    selected === option.value
                      ? "bg-slate-100 font-medium text-slate-900"
                      : "text-slate-700"
                  }`}
                  style={fontPreview ? { fontFamily: option.value } : undefined}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-end border-t border-slate-100 p-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
