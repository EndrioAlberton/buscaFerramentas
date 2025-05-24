export interface Rating {
  usabilidade: number;
  recursos: number;
  design: number;
  documentacao: number;
  gratuidade: number;
  userId?: string;
  userEmail?: string;
  userName?: string;
}

type RatingDetails = {
  [K in keyof Omit<Rating, 'userId' | 'userEmail' | 'userName'>]: number;
};

export interface RatingStats {
  mediaGeral: number;
  totalAvaliacoes: number;
  detalhes: RatingDetails;
} 