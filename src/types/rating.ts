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

type RatingDetails = {
  [K in keyof Omit<Rating, 'userId' | 'userEmail' | 'userName' >]: number;
};

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