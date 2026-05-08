CREATE TABLE "hero" (
	"id" text PRIMARY KEY NOT NULL,
	"aya" text NOT NULL,
	"aya_source" text NOT NULL,
	"hadith" text NOT NULL,
	"hadith_source" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "likes" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"comment_id" text NOT NULL,
	"article_Id" text NOT NULL,
	"target_type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messageTable" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"message" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "namesComment" (
	"id" text PRIMARY KEY NOT NULL,
	"comment" text NOT NULL,
	"likes" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"nameId" text NOT NULL,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE "names" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"meaning" text NOT NULL,
	"meaning_source" text
);
--> statement-breakpoint
CREATE TABLE "sunnaComment" (
	"id" text PRIMARY KEY NOT NULL,
	"likes" integer DEFAULT 0,
	"comment" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"sunna" text NOT NULL,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE "sunna" (
	"id" text PRIMARY KEY NOT NULL,
	"sunna" text NOT NULL,
	"sunna_source" text NOT NULL,
	"tafsir" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"user_name" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"role" text DEFAULT 'user',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_user_name_unique" UNIQUE("user_name"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "wakafatComment" (
	"id" text PRIMARY KEY NOT NULL,
	"comment" text NOT NULL,
	"likes" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"wakafat_id" text NOT NULL,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE "wakafat" (
	"id" text PRIMARY KEY NOT NULL,
	"aya" text NOT NULL,
	"aya_source" text NOT NULL,
	"tafsir" text NOT NULL,
	"tafsir_source" text
);
--> statement-breakpoint
ALTER TABLE "namesComment" ADD CONSTRAINT "namesComment_nameId_names_id_fk" FOREIGN KEY ("nameId") REFERENCES "public"."names"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "namesComment" ADD CONSTRAINT "namesComment_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sunnaComment" ADD CONSTRAINT "sunnaComment_sunna_sunna_id_fk" FOREIGN KEY ("sunna") REFERENCES "public"."sunna"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sunnaComment" ADD CONSTRAINT "sunnaComment_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wakafatComment" ADD CONSTRAINT "wakafatComment_wakafat_id_wakafat_id_fk" FOREIGN KEY ("wakafat_id") REFERENCES "public"."wakafat"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wakafatComment" ADD CONSTRAINT "wakafatComment_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;