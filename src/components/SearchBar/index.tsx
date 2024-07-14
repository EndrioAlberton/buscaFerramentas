import { SearchBarContainer, SearchInput } from "./styles";

interface SearchBarProps {
    query: string;
    setQuery: (query: string) => void;
  }
  
  const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
    return (
      <SearchBarContainer>
        <SearchInput
          id="search-input"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </SearchBarContainer>
    );
  };
  
  export default SearchBar;