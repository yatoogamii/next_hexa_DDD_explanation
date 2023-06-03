export type Article = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export type NewArticle = {
  title: string;
  content: string;
  authorId: string;
};
