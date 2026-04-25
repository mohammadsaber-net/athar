CREATE TABLE "messageTable" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	CONSTRAINT "messageTable_email_unique" UNIQUE("email")
);
