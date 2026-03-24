CREATE TABLE "wakafatComment" (
	"id" text PRIMARY KEY NOT NULL,
	"comment" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"wakafat_id" text NOT NULL,
	"user_id" text
);
--> statement-breakpoint
ALTER TABLE "wakafatComment" ADD CONSTRAINT "wakafatComment_wakafat_id_wakafat_id_fk" FOREIGN KEY ("wakafat_id") REFERENCES "public"."wakafat"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wakafatComment" ADD CONSTRAINT "wakafatComment_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;