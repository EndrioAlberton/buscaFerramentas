import React from 'react';
import { CategoriesContainer, Select } from './styles';

interface CategorySelectProps {
    category: string;
    setCategory: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ category, setCategory }) => {
    return (
        <Select
          id="category-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="Apresentações">Apresentações</option>
          <option value="Colaboração">Colaboração</option>
          <option value="Design">Design</option>
          <option value="Jogos">Jogos</option>
          <option value="Organização">Organização</option>
          <option value="Programação">Programação</option>
          <option value="Vídeos">Vídeos</option>
          <option value="Interatividade">Interatividade</option>
          <option value="Quiz">Quiz</option>
        </Select>
    );
  };
  
  export default CategorySelect;
