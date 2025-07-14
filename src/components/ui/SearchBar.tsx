import { useState, useCallback, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import debounce from "lodash/debounce";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  initialValue?: string;
}

export const SearchBar = ({ 
  className = "", 
  placeholder = "Search for products...",
  initialValue = ""
}: SearchBarProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const navigate = useNavigate();

  // Debounced search handler for future live search implementation
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      // This will be used for live search suggestions
      console.log("Searching for:", term);
    }, 300),
    []
  );

  const handleSearch = (term: string) => {
    const trimmedTerm = term.trim();
    if (trimmedTerm) {
      navigate(`/search?q=${encodeURIComponent(trimmedTerm)}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    } else if (e.key === "Escape") {
      setSearchTerm("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5ec401] focus:border-transparent"
      />
      <Search className="absolute left-3 w-5 h-5 text-gray-400" />
    </div>
  );
}; 