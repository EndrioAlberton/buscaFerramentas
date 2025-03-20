import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface CategorySelectProps {
    category: string;
    setCategory: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ category, setCategory }) => {
    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="category-select-label">Categoria</InputLabel>
            <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                label="Categoria"
                onChange={handleChange}
                sx={{
                    borderRadius: 2,
                }}
            >
                <MenuItem value="Todas">Todas</MenuItem>
                <MenuItem value="Apresentações">Apresentações</MenuItem>
                <MenuItem value="Colaboração">Colaboração</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Jogos">Jogos</MenuItem>
                <MenuItem value="Mapas">Mapas</MenuItem>
                <MenuItem value="Organização">Organização</MenuItem>
                <MenuItem value="Programação">Programação</MenuItem>
                <MenuItem value="Vídeos">Vídeos</MenuItem>
                <MenuItem value="Interatividade">Interatividade</MenuItem>
                <MenuItem value="Quiz">Quiz</MenuItem>
            </Select>
        </FormControl>
    );
};

export default CategorySelect;
