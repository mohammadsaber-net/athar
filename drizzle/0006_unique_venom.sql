CREATE TABLE "sunnaComment" (
	"id" text PRIMARY KEY NOT NULL,
	"comment" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"sunna" text NOT NULL,
	"user_id" text
);
--> statement-breakpoint
ALTER TABLE "sunnaComment" ADD CONSTRAINT "sunnaComment_sunna_sunna_id_fk" FOREIGN KEY ("sunna") REFERENCES "public"."sunna"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sunnaComment" ADD CONSTRAINT "sunnaComment_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;