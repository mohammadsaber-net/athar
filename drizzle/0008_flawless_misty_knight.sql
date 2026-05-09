ALTER TABLE "users" ALTER COLUMN "display_name" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "display_name" SET NOT NULL;