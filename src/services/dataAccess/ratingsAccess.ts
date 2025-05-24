import { db } from '../../firebaseConfig';
import { collection, doc, getDoc, addDoc, setDoc, query, where, getDocs } from 'firebase/firestore';
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

export const getUserRating = async (toolId: number | string, userId: string): Promise<Rating | null> => {
  try {
    const ratingsRef = collection(db, RATINGS_COLLECTION);
    const q = query(ratingsRef, 
      where('toolId', '==', toolId.toString()),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Rating & { id: string };
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar avaliação do usuário:', error);
    return null;
  }
};

export const addRating = async (toolId: number | string, rating: Rating): Promise<void> => {
  if (toolId === undefined || toolId === null) {
    throw new Error('ID da ferramenta não fornecido');
  }

  try {
    // Verifica se já existe uma avaliação do usuário
    const existingRating = await getUserRating(toolId, rating.userId!);
    let oldRating: Rating | null = null;

    if (existingRating) {
      // Se existir, atualiza a avaliação existente
      oldRating = existingRating;
      if (!existingRating.id) throw new Error('ID da avaliação não encontrado');
      await setDoc(doc(db, RATINGS_COLLECTION, existingRating.id), {
        toolId: toolId.toString(),
        ...rating,
        updatedAt: new Date().toISOString()
      });
    } else {
      // Se não existir, cria uma nova avaliação
      await addDoc(collection(db, RATINGS_COLLECTION), {
        toolId: toolId.toString(),
        ...rating,
        createdAt: new Date().toISOString()
      });
    }

    // Atualiza as estatísticas
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
        mediaGeral: calcularNovaMedia(stats, rating, oldRating),
        totalAvaliacoes: oldRating ? stats.totalAvaliacoes : stats.totalAvaliacoes + 1,
        detalhes: {
          usabilidade: calcularNovaMediaCriterio(stats, 'usabilidade', rating, oldRating),
          recursos: calcularNovaMediaCriterio(stats, 'recursos', rating, oldRating),
          design: calcularNovaMediaCriterio(stats, 'design', rating, oldRating),
          documentacao: calcularNovaMediaCriterio(stats, 'documentacao', rating, oldRating),
          gratuidade: calcularNovaMediaCriterio(stats, 'gratuidade', rating, oldRating)
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

const calcularNovaMedia = (stats: RatingStats, novaAvaliacao: Rating, oldRating: Rating | null): number => {
  const mediaAtual = stats.mediaGeral;
  const totalAtual = stats.totalAvaliacoes;
  const mediaNovaAvaliacao = calcularMediaGeral(novaAvaliacao);
  
  if (oldRating) {
    // Se está atualizando uma avaliação existente
    const mediaAntiga = calcularMediaGeral(oldRating);
    return mediaAtual + (mediaNovaAvaliacao - mediaAntiga) / totalAtual;
  } else {
    // Se é uma nova avaliação
    return (mediaAtual * totalAtual + mediaNovaAvaliacao) / (totalAtual + 1);
  }
};

const calcularNovaMediaCriterio = (
  stats: RatingStats, 
  criterio: 'usabilidade' | 'recursos' | 'design' | 'documentacao' | 'gratuidade',
  novaAvaliacao: Rating,
  oldRating: Rating | null
): number => {
  const valorAtual = stats.detalhes[criterio];
  const totalAtual = stats.totalAvaliacoes;
  const novoValor = novaAvaliacao[criterio];

  if (oldRating) {
    // Se está atualizando uma avaliação existente
    const valorAntigo = oldRating[criterio];
    return valorAtual + (novoValor - valorAntigo) / totalAtual;
  } else {
    // Se é uma nova avaliação
    return (valorAtual * totalAtual + novoValor) / (totalAtual + 1);
  }
}; 