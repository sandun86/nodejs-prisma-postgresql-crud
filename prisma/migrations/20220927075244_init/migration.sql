-- CreateTable
CREATE TABLE "Users" (
    "cognitoId" TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" VARCHAR(100) NOT NULL,
    "gender" TEXT NOT NULL,
    "mobileCountryCode" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "occupation" VARCHAR(100) NOT NULL,
    "userProcessStatus" JSONB NOT NULL,
    "userQuestions" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_cognitoId_key" ON "Users"("cognitoId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
