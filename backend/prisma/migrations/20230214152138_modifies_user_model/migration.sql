/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "nomeCompleto" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_nome_key" ON "User"("nome");
