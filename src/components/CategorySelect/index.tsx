import React from 'react';
import { CategoriesContainer, Select } from './styles';

interface CategorySelectProps {
    category: string;
    setCategory: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ category, setCategory }) => {
    return (
      <CategoriesContainer>
        <Select
          id="category-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="Língua Portuguesa">Língua Portuguesa</option>
          <option value="Matemática">Matemática</option>
          <option value="Biologia">Biologia</option>
          <option value="Física">Física</option>
          <option value="Química">Química</option>
          <option value="Artes">Artes</option>
          <option value="Educação Física">Educação Física</option>
          <option value="Língua Inglesa">Língua Inglesa</option>
          <option value="Filosofia">Filosofia</option>
          <option value="Geografia">Geografia</option>
          <option value="História">História</option>
          <option value="Sociologia">Sociologia</option>
        </Select>
      </CategoriesContainer>
    );
  };
  
  export default CategorySelect;
