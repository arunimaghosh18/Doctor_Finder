
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  doctors: Doctor[];
  onSearch: (term: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string[];
  experience: string;
  fees: string;
  consultation_type: string;
}

const SearchBar = ({ doctors, onSearch, searchTerm, setSearchTerm }: SearchBarProps) => {
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filteredSuggestions = doctors
        .filter((doctor) =>
          doctor.name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 3);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setSearchTerm(name);
    onSearch(name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          ref={inputRef}
          data-testid="autocomplete-input"
          type="text"
          placeholder="Search doctors by name..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() => searchTerm.trim() !== "" && suggestions.length > 0 && setShowSuggestions(true)}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionRef}
          className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              data-testid="suggestion-item"
              className="px-4 py-2 cursor-pointer hover:bg-blue-50"
              onClick={() => handleSuggestionClick(suggestion.name)}
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
