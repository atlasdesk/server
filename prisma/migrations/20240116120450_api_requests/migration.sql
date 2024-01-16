-- CreateTable
CREATE TABLE "ApiRequest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT,
    "endpoint" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "responseCode" INTEGER NOT NULL,

    CONSTRAINT "ApiRequest_pkey" PRIMARY KEY ("id")
);
