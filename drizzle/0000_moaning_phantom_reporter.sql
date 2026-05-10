CREATE TABLE "commentsTable" (
	"id" text PRIMARY KEY NOT NULL,
	"comment" text NOT NULL,
	"parent_comment_id" text,
	"likes" integer DEFAULT 0,
	"target_type" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"target_id" text NOT NULL,
	"user_id" text
);
--> statement-breakpoint
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
CREATE TABLE "mentions" (
	"id" text PRIMARY KEY NOT NULL,
	"comment_id" text NOT NULL,
	"mentioned_user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now()
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
CREATE TABLE "names" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"meaning" text NOT NULL,
	"meaning_source" text
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" text PRIMARY KEY NOT NULL,
	"receiver_id" text NOT NULL,
	"sender_id" text,
	"type" text NOT NULL,
	"content_id" text,
	"content_type" text,
	"content" text,
	"is_read" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
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
	"display_name" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"role" text DEFAULT 'user',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_user_name_unique" UNIQUE("user_name"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
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
ALTER TABLE "commentsTable" ADD CONSTRAINT "commentsTable_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_comment_id_commentsTable_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."commentsTable"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentions" ADD CONSTRAINT "mentions_comment_id_commentsTable_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."commentsTable"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentions" ADD CONSTRAINT "mentions_mentioned_user_id_users_id_fk" FOREIGN KEY ("mentioned_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_receiver_id_users_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;