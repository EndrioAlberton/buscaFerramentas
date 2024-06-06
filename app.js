document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const categorySelect = document.getElementById('category-select');
    
    // Carregar dados do arquivo JSON
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados carregados:', data); // Verificação de dados carregados
            // Exibe todos os recursos inicialmente
            displayResults(data);

            searchButton.addEventListener('click', () => {
                const query = document.getElementById('search-input').value.toLowerCase();
                const category = categorySelect.value;
                const filteredData = data.filter(tool => {
                    const inCategory = category === 'Todas' || (tool.categorias && tool.categorias.includes(category));
                    const inQuery = tool.nome.toLowerCase().includes(query) || tool.descricao.toLowerCase().includes(query);
                    return inCategory && inQuery;
                });
                displayResults(filteredData);
            });

            categorySelect.addEventListener('change', () => {
                const category = categorySelect.value;
                const query = document.getElementById('search-input').value.toLowerCase();
                const filteredData = data.filter(tool => {
                    const inCategory = category === 'Todas' || (tool.categorias && tool.categorias.includes(category));
                    const inQuery = tool.nome.toLowerCase().includes(query) || tool.descricao.toLowerCase().includes(query);
                    return inCategory && inQuery;
                });
                displayResults(filteredData);
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
        })
        .catch(error => console.error('Erro ao carregar dados:', error));
});
