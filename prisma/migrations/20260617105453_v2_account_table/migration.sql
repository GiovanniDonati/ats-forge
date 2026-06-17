-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "token_type" TEXT,
    "scope" TEXT,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "provider_providerAccountId_idx" ON "Account"("provider", "provider_account_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
