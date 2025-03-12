import { db } from '../../firebaseConfig';
import data from '../tools.json'; 

const toolsCollection = db.collection('tools');

export const addTools = async () => {
  const existingToolsMap = new Map();
  
  const snapshot = await toolsCollection.get();
  snapshot.forEach(doc => {
    const toolData = doc.data();
    existingToolsMap.set(toolData.nome.toLowerCase(), doc.id);
  });

  let added = 0;
  let skipped = 0;

  for (const tool of data) {
    try {
      const normalizedName = tool.nome.toLowerCase();
      
      if (!existingToolsMap.has(normalizedName)) {
        await toolsCollection.add({
          ...tool,
          createdAt: new Date().toISOString()
        });
        existingToolsMap.set(normalizedName, true);
        added++;
        console.log(`Adicionado: ${tool.nome}`);
      } else {
        skipped++;
        console.log(`Pulado (já existe): ${tool.nome}`);
      }
    } catch (error) {
      console.error(`Erro ao adicionar ${tool.nome}:`, error);
    }
  }

  console.log(`Resumo: ${added} ferramentas adicionadas, ${skipped} puladas`);
};

export const readTools = async () => {
  const snapshot = await toolsCollection.get();
  const tools: any[] = [];
  
  snapshot.forEach(doc => {
    tools.push({ id: doc.id, ...doc.data() });
  });
  
  tools.sort((a, b) => a.nome.localeCompare(b.nome));
  
  return tools;
};

export const resetTools = async () => {
  try {
    const snapshot = await toolsCollection.get();
    const batch = db.batch();
    
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log('Coleção limpa com sucesso');
    
    for (const tool of data) {
      await toolsCollection.add(tool);
    }
    console.log('Novas ferramentas adicionadas');
  } catch (error) {
    console.error('Erro ao resetar ferramentas:', error);
  }
};

