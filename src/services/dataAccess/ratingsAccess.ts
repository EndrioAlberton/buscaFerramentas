import { db } from '../../firebaseConfig';
import { collection, doc, getDoc, addDoc, setDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { Rating, RatingStats, PedagogicalFeedback, PedagogicalFeedbackStats } from '../../types/rating';

const RATINGS_COLLECTION = 'ratings';
const RATING_STATS_COLLECTION = 'ratingStats';
const PEDAGOGICAL_FEEDBACK_COLLECTION = 'pedagogicalFeedbacks';
const PEDAGOGICAL_STATS_COLLECTION = 'pedagogicalStats';

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

// ============= PEDAGOGICAL FEEDBACK FUNCTIONS =============

export const getPedagogicalFeedbackStats = async (toolId: number | string): Promise<PedagogicalFeedbackStats | null> => {
  if (toolId === undefined || toolId === null) {
    console.error('ID da ferramenta não fornecido');
    return null;
  }

  try {
    const docRef = doc(db, PEDAGOGICAL_STATS_COLLECTION, toolId.toString());
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as PedagogicalFeedbackStats;
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar estatísticas de feedback pedagógico:', error);
    return null;
  }
};

export const getUserPedagogicalFeedback = async (toolId: number | string, userId: string): Promise<PedagogicalFeedback | null> => {
  try {
    const feedbacksRef = collection(db, PEDAGOGICAL_FEEDBACK_COLLECTION);
    const q = query(feedbacksRef, 
      where('toolId', '==', toolId.toString()),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as PedagogicalFeedback & { id: string };
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar feedback pedagógico do usuário:', error);
    return null;
  }
};

export const addPedagogicalFeedback = async (toolId: number | string, feedback: PedagogicalFeedback): Promise<void> => {
  if (toolId === undefined || toolId === null) {
    throw new Error('ID da ferramenta não fornecido');
  }

  try {
    // Verifica se já existe um feedback do usuário
    const existingFeedback = await getUserPedagogicalFeedback(toolId, feedback.userId!);
    let oldFeedback: PedagogicalFeedback | null = null;

    if (existingFeedback) {
      // Se existir, atualiza o feedback existente
      oldFeedback = existingFeedback;
      if (!existingFeedback.id) throw new Error('ID do feedback não encontrado');
      await setDoc(doc(db, PEDAGOGICAL_FEEDBACK_COLLECTION, existingFeedback.id), {
        toolId: toolId.toString(),
        ...feedback,
        updatedAt: new Date().toISOString()
      });
    } else {
      // Se não existir, cria um novo feedback
      await addDoc(collection(db, PEDAGOGICAL_FEEDBACK_COLLECTION), {
        toolId: toolId.toString(),
        ...feedback,
        createdAt: new Date().toISOString()
      });
    }

    // Atualiza as estatísticas
    await updatePedagogicalStats(toolId, feedback, oldFeedback);
  } catch (error) {
    console.error('Erro ao adicionar feedback pedagógico:', error);
    throw error;
  }
};

const updatePedagogicalStats = async (
  toolId: number | string, 
  novoFeedback: PedagogicalFeedback, 
  oldFeedback: PedagogicalFeedback | null
): Promise<void> => {
  const statsRef = doc(db, PEDAGOGICAL_STATS_COLLECTION, toolId.toString());
  const statsDoc = await getDoc(statsRef);

  // Busca os últimos comentários
  const feedbacksRef = collection(db, PEDAGOGICAL_FEEDBACK_COLLECTION);
  const q = query(
    feedbacksRef,
    where('toolId', '==', toolId.toString()),
    orderBy('createdAt', 'desc'),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  const comentarios = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      userName: data.userName || 'Anônimo',
      nivelEnsino: data.nivelEnsino,
      recomendacao: data.recomendacao,
      comentario: data.comentario,
      createdAt: data.createdAt || new Date().toISOString()
    };
  });

  if (!statsDoc.exists()) {
    // Criar novas estatísticas se não existirem
    const newStats: PedagogicalFeedbackStats = {
      mediaRecomendacao: novoFeedback.recomendacao,
      totalFeedbacks: 1,
      distribuicaoNiveis: { [novoFeedback.nivelEnsino]: 1 },
      comentarios
    };
    await setDoc(statsRef, newStats);
  } else {
    // Atualizar estatísticas existentes
    const stats = statsDoc.data() as PedagogicalFeedbackStats;
    
    // Calcula nova média
    let novaMedia: number;
    if (oldFeedback) {
      novaMedia = stats.mediaRecomendacao + (novoFeedback.recomendacao - oldFeedback.recomendacao) / stats.totalFeedbacks;
    } else {
      novaMedia = (stats.mediaRecomendacao * stats.totalFeedbacks + novoFeedback.recomendacao) / (stats.totalFeedbacks + 1);
    }

    // Atualiza distribuição de níveis
    const novaDistribuicao = { ...stats.distribuicaoNiveis };
    if (oldFeedback && oldFeedback.nivelEnsino !== novoFeedback.nivelEnsino) {
      novaDistribuicao[oldFeedback.nivelEnsino] = (novaDistribuicao[oldFeedback.nivelEnsino] || 1) - 1;
      if (novaDistribuicao[oldFeedback.nivelEnsino] <= 0) {
        delete novaDistribuicao[oldFeedback.nivelEnsino];
      }
    }
    novaDistribuicao[novoFeedback.nivelEnsino] = (novaDistribuicao[novoFeedback.nivelEnsino] || 0) + 1;

    const novasStats: PedagogicalFeedbackStats = {
      mediaRecomendacao: novaMedia,
      totalFeedbacks: oldFeedback ? stats.totalFeedbacks : stats.totalFeedbacks + 1,
      distribuicaoNiveis: novaDistribuicao,
      comentarios
    };
    await setDoc(statsRef, novasStats);
  }
}; 