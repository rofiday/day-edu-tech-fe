import { useState, useEffect } from "react";

const AutoComplete = ({
  apiEndpoint,
  onChangeSuggestions = () => {},
  setQueryData = "", // Default to empty string
  mode,
}) => {
  const [query, setQuery] = useState(setQueryData || ""); // Ensure query is always a string
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Update query when setQueryData changes
  useEffect(() => {
    setQuery(setQueryData || ""); // Ensure query is always a string
  }, [setQueryData]);

  // Fetch suggestions when query changes
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiEndpoint}?q=${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const json = await response.json();
        setSuggestions(json.data || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query, apiEndpoint]);

  // Handle selection of a suggestion
  const handleSelectSuggestion = (suggestion) => {
    let targetValue = ""; // Default to empty string
    if (mode === "curriculum") {
      targetValue = suggestion.title + " - " + suggestion.course.name;
    } else if (mode === "section") {
      targetValue = suggestion.name;
    }
    setQuery(targetValue); // Set query to a string
    setSuggestions([]);
    onChangeSuggestions(suggestion);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query} // query is always a string
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      />
      {loading && (
        <div className="absolute right-2 top-2 text-gray-500">Loading...</div>
      )}
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => handleSelectSuggestion(suggestion)}
            >
              {mode === "curriculum"
                ? suggestion.title + " - " + suggestion.course.name
                : suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
