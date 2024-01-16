/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `TicketPriority` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `TicketStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Tags" ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "TicketPriority" ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "TicketStatus" ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid();

-- CreateIndex
CREATE UNIQUE INDEX "Comment_uid_key" ON "Comment"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_uid_key" ON "Tags"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_uid_key" ON "Ticket"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "TicketPriority_uid_key" ON "TicketPriority"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "TicketStatus_uid_key" ON "TicketStatus"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
