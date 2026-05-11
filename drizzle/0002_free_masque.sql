ALTER TABLE "commentsTable" DROP CONSTRAINT "commentsTable_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "commentsTable" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "article_id" text;--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "article_type" text;--> statement-breakpoint
ALTER TABLE "commentsTable" ADD CONSTRAINT "commentsTable_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;