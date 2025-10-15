export interface Rating {
  id?: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  usabilidade: number;
  recursos: number;
  design: number;
  documentacao: number;
  gratuidade: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PedagogicalFeedback {
  id?: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  niveisEnsino: string[]; 
  recomendacao: number; 
  comentario?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RatingStats {
  mediaGeral: number;
  totalAvaliacoes: number;
  detalhes: {
    usabilidade: number;
    recursos: number;
    design: number;
    documentacao: number;
    gratuidade: number;
  };
}

export interface PedagogicalFeedbackStats {
  mediaRecomendacao: number;
  totalFeedbacks: number;
  distribuicaoNiveis: Record<string, number>;
  comentarios: Array<{
    userName: string;
    niveisEnsino: string[];
    recomendacao: number;
    comentario?: string; 
    createdAt: string;
  }>;
} 