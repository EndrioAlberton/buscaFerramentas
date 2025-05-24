import { db } from '../../firebaseConfig';
import { collection, doc, getDoc, addDoc, setDoc } from 'firebase/firestore';
import { Rating, RatingStats } from '../../types/rating';

const RATINGS_COLLECTION = 'ratings';
const RATING_STATS_COLLECTION = 'ratingStats';

export const getRatingStats = async (toolId: number | string): Promise<RatingStats | null> => {
  if (toolId === undefined || toolId === null) {
    console.error('ID da ferramenta não fornecido');
    return null;
  }

  try {
    const docRef = doc(db, RATING_STATS_COLLECTION, toolId.toString());
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as RatingStats;
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar estatísticas de avaliação:', error);
    return null;
  }
};

export const addRating = async (toolId: number | string, rating: Rating): Promise<void> => {
  if (toolId === undefined || toolId === null) {
    throw new Error('ID da ferramenta não fornecido');
  }

  try {
    // Primeiro, adicionar a avaliação individual
    await addDoc(collection(db, RATINGS_COLLECTION), {
      toolId: toolId.toString(),
      ...rating,
      createdAt: new Date().toISOString()
    });

    // Depois, atualizar as estatísticas
    const statsRef = doc(db, RATING_STATS_COLLECTION, toolId.toString());
    const statsDoc = await getDoc(statsRef);

    if (!statsDoc.exists()) {
      // Criar novas estatísticas se não existirem
      const newStats: RatingStats = {
        mediaGeral: calcularMediaGeral(rating),
        totalAvaliacoes: 1,
        detalhes: {
          usabilidade: rating.usabilidade,
          recursos: rating.recursos,
          design: rating.design,
          documentacao: rating.documentacao,
          gratuidade: rating.gratuidade
        }
      };
      await setDoc(statsRef, newStats);
    } else {
      // Atualizar estatísticas existentes
      const stats = statsDoc.data() as RatingStats;
      const novasStats: RatingStats = {
        mediaGeral: calcularNovaMedia(stats, rating),
        totalAvaliacoes: stats.totalAvaliacoes + 1,
        detalhes: {
          usabilidade: (stats.detalhes.usabilidade * stats.totalAvaliacoes + rating.usabilidade) / (stats.totalAvaliacoes + 1),
          recursos: (stats.detalhes.recursos * stats.totalAvaliacoes + rating.recursos) / (stats.totalAvaliacoes + 1),
          design: (stats.detalhes.design * stats.totalAvaliacoes + rating.design) / (stats.totalAvaliacoes + 1),
          documentacao: (stats.detalhes.documentacao * stats.totalAvaliacoes + rating.documentacao) / (stats.totalAvaliacoes + 1),
          gratuidade: (stats.detalhes.gratuidade * stats.totalAvaliacoes + rating.gratuidade) / (stats.totalAvaliacoes + 1)
        }
      };
      await setDoc(statsRef, novasStats);
    }
  } catch (error) {
    console.error('Erro ao adicionar avaliação:', error);
    throw error;
  }
};

const calcularMediaGeral = (rating: Rating): number => {
  return (
    (rating.usabilidade +
      rating.recursos +
      rating.design +
      rating.documentacao +
      rating.gratuidade) / 5
  );
};

const calcularNovaMedia = (stats: RatingStats, novaAvaliacao: Rating): number => {
  const mediaAtual = stats.mediaGeral;
  const totalAtual = stats.totalAvaliacoes;
  const mediaNovaAvaliacao = calcularMediaGeral(novaAvaliacao);
  
  return (mediaAtual * totalAtual + mediaNovaAvaliacao) / (totalAtual + 1);
}; 