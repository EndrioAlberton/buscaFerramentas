import { db } from '../../firebaseConfig';
import data from '../tools.json'; 

const toolsCollection = db.collection('tools');

export const addTools = async () => {
  for (const tool of data) {
    try {
      const querySnapshot = await toolsCollection.where('id', '==', tool.id).get();
      
      if (querySnapshot.empty) {
        await toolsCollection.add(tool);
        console.log(`Documento adicionado: ${tool.nome}`);
      } else {
        console.log(`Documento já existente: ${tool.nome}`);
      }
    } catch (error) {
      console.error(`Erro ao adicionar documento: ${error}`);
    }
  }
};


export const readTools = async () => {
  const snapshot = await toolsCollection.get();
  const tools: any[] = [];
  snapshot.forEach(doc => {
    tools.push({ id: doc.id, ...doc.data() });
  });
  return tools;
};
