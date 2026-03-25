CREATE TABLE "namesComment" (
	"id" text PRIMARY KEY NOT NULL,
	"comment" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"nameId" text NOT NULL,
	"user_id" text
);
--> statement-breakpoint
ALTER TABLE "namesComment" ADD CONSTRAINT "namesComment_nameId_names_id_fk" FOREIGN KEY ("nameId") REFERENCES "public"."names"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "namesComment" ADD CONSTRAINT "namesComment_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;