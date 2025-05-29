export interface Metadata {
  title: string;
  description: string;
  keywords: string;
  robots: string;
  alternates: {
    canonical: string;
  };
  openGraph: {
    title: string;
    description: string;
    type: string;
    image: string;
    url: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
  author: string;
}

export const metadata: Metadata = {
  title: "Edu Tools - Ferramentas Educacionais Digitais",
  description: "Sistema de apoio a professores da Educação Básica em Tecnologias Digitais Educacionais. Desenvolvido como parte do projeto de Inovação Pedagógica na Educação Básica do IFRS.",
  keywords: "ferramentas educacionais, educação básica, tecnologia educacional, IFRS, inovação pedagógica, recursos digitais, ensino, apoio pedagógico, tecnologias digitais, educação, professores, ensino básico, recursos educacionais, plataforma educacional",
  robots: "all, max-image-preview:standard",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Edu Tools - Ferramentas Educacionais Digitais",
    description: "Sistema de apoio a professores da Educação Básica em Tecnologias Digitais Educacionais.",
    type: "website",
    image: "/edu.png",
    url: "/"
  },
  twitter: {
    card: "summary",
    title: "Edu Tools - Ferramentas Educacionais Digitais",
    description: "Sistema de apoio a professores da Educação Básica em Tecnologias Digitais Educacionais.",
    image: "/edu.png"
  },
  author: "IFRS - Instituto Federal do Rio Grande do Sul"
}; 