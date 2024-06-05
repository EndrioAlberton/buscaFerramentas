const data = [
    {
      id: 1,
      nome: "Khan Academy",
      descricao: "Plataforma de aprendizado gratuito para várias disciplinas.",
      categoria: "Geral",
      link: "https://www.khanacademy.org",
      imagem: "https://cdn.kastatic.org/images/khan-logo-dark-background.new.png"
    },
    {
      id: 2,
      nome: "GeoGebra",
      descricao: "Ferramenta de matemática dinâmica.",
      categoria: "Matemática",
      link: "https://www.geogebra.org",
      imagem: "https://www.geogebra.org/images/geogebra-logo.png"
    }
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
      const searchButton = document.getElementById('search-button');
      const categoryButtons = document.querySelectorAll('.category-button');
  
      searchButton.addEventListener('click', () => {
          const query = document.getElementById('search-input').value.toLowerCase();
          const filteredData = data.filter(tool => 
              tool.nome.toLowerCase().includes(query) ||
              tool.descricao.toLowerCase().includes(query)
          );
          displayResults(filteredData);
      });
  
      categoryButtons.forEach(button => {
          button.addEventListener('click', () => {
              const category = button.textContent;
              const filteredData = data.filter(tool => tool.categoria === category);
              displayResults(filteredData);
          });
      });
  
      function displayResults(results) {
          const resultsContainer = document.getElementById('results');
          resultsContainer.innerHTML = '';
          results.forEach(tool => {
              const toolElement = document.createElement('div');
              toolElement.classList.add('result-item');
              toolElement.innerHTML = `
                  <img src="${tool.imagem}" alt="${tool.nome}">
                  <h3>${tool.nome}</h3>
                  <p>${tool.descricao}</p>
                  <a href="${tool.link}" target="_blank">Acessar</a>
              `;
              resultsContainer.appendChild(toolElement);
          });
      }
  });
  