/*
  Warnings:

  - You are about to drop the column `uuid` on the `File` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "File_uuid_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "uuid";
