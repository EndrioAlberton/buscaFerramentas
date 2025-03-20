import React from "react";
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Buscar ferramentas..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      InputProps={{
        startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
      }}
    />
  );
};

export default SearchBar;