CREATE TABLE "mentions" (
	"id" text PRIMARY KEY NOT NULL,
	"comment_id" text NOT NULL,
	"mentioned_user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "wakafatComment" ALTER COLUMN "comment" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "namesComment" ADD COLUMN "parent_comment_id" text;--> statement-breakpoint
ALTER TABLE "sunnaComment" ADD COLUMN "parent_comment_id" text;--> statement-breakpoint
ALTER TABLE "wakafatComment" ADD COLUMN "parent_comment_id" text;--> statement-breakpoint
ALTER TABLE "mentions" ADD CONSTRAINT "mentions_comment_id_wakafatComment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."wakafatComment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentions" ADD CONSTRAINT "mentions_mentioned_user_id_users_id_fk" FOREIGN KEY ("mentioned_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;