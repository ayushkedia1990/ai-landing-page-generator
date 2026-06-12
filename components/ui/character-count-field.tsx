"use client";

import { useState } from "react";

type CharacterCountFieldProps = {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  maxLength: number;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
};

const fieldClassName =
  "w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

export function CharacterCountField({
  id,
  name,
  label,
  defaultValue = "",
  maxLength,
  required = false,
  multiline = false,
  rows = 3,
}: CharacterCountFieldProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative mt-2">
        {multiline ? (
          <textarea
            id={id}
            name={name}
            required={required}
            rows={rows}
            maxLength={maxLength}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className={`${fieldClassName} min-h-[96px] resize-y pb-8`}
          />
        ) : (
          <input
            id={id}
            name={name}
            type="text"
            required={required}
            maxLength={maxLength}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className={`${fieldClassName} pb-8`}
          />
        )}
        <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-slate-400">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
