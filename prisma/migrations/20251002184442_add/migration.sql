-- AlterTable
ALTER TABLE "RestaurantSettings" ADD COLUMN     "badgeText" TEXT DEFAULT 'Feito com amor',
ADD COLUMN     "imagemHighlight" TEXT,
ADD COLUMN     "subtitle" TEXT DEFAULT 'terminar o seu dia',
ALTER COLUMN "description" SET DEFAULT 'Doces caseiros feitos com amor e carinho. Sabores que despertam memórias e criam novos momentos especiais para toda família.',
ALTER COLUMN "themeColor" SET DEFAULT 'rose',
ALTER COLUMN "themeColorSecondary" SET DEFAULT 'amber',
ALTER COLUMN "title" SET DEFAULT 'O melhor jeito de';
