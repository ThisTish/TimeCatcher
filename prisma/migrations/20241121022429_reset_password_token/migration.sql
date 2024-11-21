-- CreateTable
CREATE TABLE "resetPasswordToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "resetPasswordToken_pkey" PRIMARY KEY ("id","token")
);
