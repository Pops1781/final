import { SearchIcon } from "lucide-react";
import { Input } from "./input";
import React from "react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search Anything", value, onChange, className }) => (
  <div className={`relative w-full ${className ?? ""}`}>
    <SearchIcon className="absolute w-[17px] h-[17px] top-[12px] left-[15px] z-10 text-blackmedium" />
    <Input
      className="h-[42px] bg-[#f0f1f2] pl-10 text-sm font-['Inter',Helvetica] text-blackmedium placeholder:text-blackmedium placeholder:opacity-[0.87]"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
); 