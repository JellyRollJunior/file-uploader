-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(32) NOT NULL,
    "password" VARCHAR(64) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
