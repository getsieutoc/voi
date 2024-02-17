-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferences" JSONB NOT NULL DEFAULT '{}';
