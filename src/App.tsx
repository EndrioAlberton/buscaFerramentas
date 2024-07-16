import React, { useEffect, useState } from 'react';
import { AppContainer, GlobalStyles, Main, ResultsContainer, Search } from './GlobalStyles';

import SearchBar from './components/SearchBar';
import SearchButton from './components/SearchButton';
import CategorySelect from './components/CategorySelect';
import ToolCard from './components/ToolCard';
import { HeaderContainer } from './components/Header/styles';

interface Tool {
  id: number; 
  nome: string;
  descricao: string;
  link: string;
  imagem: string;
  categorias: string[];
}

const App: React.FC = () => {
  const [data, setData] = useState<Tool[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [filteredData, setFilteredData] = useState<Tool[]>([]);

  useEffect(() => {
    const tools: Tool[] = [
      {
        id: 1,
        nome: "Khan Academy",
        descricao: "Plataforma de aprendizado gratuito para várias disciplinas.",
        categorias: ["Geral"],
        link: "https://www.khanacademy.org",
        imagem: "https://i.pcmag.com/imagery/reviews/07AxdIVbQ63OEkJoPgCybXt-19.fit_scale.size_1028x578.v1594914797.png"
      },
      {
        id: 2,
        nome: "GeoGebra",
        descricao: "Ferramenta de matemática dinâmica.",
        categorias: ["Matemática"],
        link: "https://www.geogebra.org",
        imagem: "https://s.cafebazaar.ir/images/icons/org.geogebra-9f3fdf85-2dc0-40b8-926b-00d1ca7271b2_512x512.png?x-img=v1/format,type_webp,lossless_false/resize,h_256,w_256,lossless_false/optimize"
      },
      {
        id: 3,
        nome: "Duolingo",
        descricao: "Aplicativo para aprender idiomas de forma divertida.",
        categorias: ["Língua Inglesa"],
        link: "https://www.duolingo.com",
        imagem: "https://i.pinimg.com/originals/52/b4/20/52b42001bcc7a0cb013c97eeb3ead223.jpg"
      },
      {
        id: 4,
        nome: "PhET Interactive Simulations",
        descricao: "Simulações interativas para ensinar ciências e matemática.",
        categorias: ["Física", "Química", "Biologia", "Matemática"],
        link: "https://phet.colorado.edu",
        imagem: "https://i.pinimg.com/564x/57/a1/89/57a18926de3e6a4d7c2320ade35e0367.jpg"
      },
      {
        id: 5,
        nome: "Quizlet",
        descricao: "Ferramenta de estudo com flashcards e jogos de aprendizado.",
        categorias: ["Geral"],
        link: "https://quizlet.com",
        imagem: "https://i.pinimg.com/564x/79/f9/fa/79f9fa04f11e55f76e59f9b0a5f84711.jpg"
      }
    ];
    setData(tools);
    setFilteredData(tools);
  }, []);

  useEffect(() => {
    const filterData = () => {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = data.filter(tool => {
        const inCategory = category === 'Todas' || tool.categorias.includes(category);
        const inQuery = tool.nome.toLowerCase().includes(lowerCaseQuery) || tool.descricao.toLowerCase().includes(lowerCaseQuery);
        return inCategory && inQuery;
      });
      setFilteredData(filtered);
    };
    filterData();
  }, [query, category, data]);

  return (
    <AppContainer>
      <HeaderContainer />
      <GlobalStyles />
      <Main>
        <Search>
          <SearchBar query={query} setQuery={setQuery} />
          <CategorySelect category={category} setCategory={setCategory} />
          <SearchButton onClick={() => setQuery(query)} />
        </Search>
        <ResultsContainer id="results">
          {filteredData.map(tool => (
            <ToolCard key={tool.nome} tool={tool} />
          ))}
        </ResultsContainer>
      </Main>
    </AppContainer>
  );
};

export default App;
