"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  isCompact?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery = "",
  onSearch,
  placeholder = "Search perfumes, jewellery, handbags...",
  className = "",
  isCompact = false,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center border border-neutral-200 bg-white/80 backdrop-blur-md focus-within:border-neutral-900 transition-colors ${
        isCompact ? "h-9 px-3 text-xs" : "h-11 px-4 text-sm"
      } ${className}`}
    >
      <Search className="w-4 h-4 text-neutral-400 shrink-0 mr-2" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-neutral-900 placeholder:text-neutral-400 placeholder:font-light focus:outline-none tracking-wide"
      />
      {query.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="text-neutral-400 hover:text-neutral-700 ml-1 p-0.5"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  );
};
