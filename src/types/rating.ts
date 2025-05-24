export interface Rating {
  usabilidade: number;
  recursos: number;
  design: number;
  documentacao: number;
  gratuidade: number;
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