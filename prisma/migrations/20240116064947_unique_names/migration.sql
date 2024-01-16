/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `TicketPriority` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `TicketStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TicketPriority_name_key" ON "TicketPriority"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TicketStatus_name_key" ON "TicketStatus"("name");
