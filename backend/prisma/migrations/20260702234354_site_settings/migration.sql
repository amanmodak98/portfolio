-- CreateTable
CREATE TABLE "site_settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "fullName" TEXT NOT NULL DEFAULT 'Your Name',
    "role" TEXT NOT NULL DEFAULT 'Full-Stack Developer',
    "tagline" TEXT NOT NULL DEFAULT 'I build things for the web.',
    "bio" TEXT NOT NULL DEFAULT '',
    "location" TEXT,
    "email" TEXT NOT NULL DEFAULT 'you@example.com',
    "github_url" TEXT,
    "linkedin_url" TEXT,
    "twitter_url" TEXT,
    "resume_url" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);
