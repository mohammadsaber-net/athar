ALTER TABLE "names" ADD COLUMN "short_id" text;--> statement-breakpoint
ALTER TABLE "sunna" ADD COLUMN "short_id" text;--> statement-breakpoint
ALTER TABLE "wakafat" ADD COLUMN "short_id" text;--> statement-breakpoint
ALTER TABLE "names" ADD CONSTRAINT "names_short_id_unique" UNIQUE("short_id");--> statement-breakpoint
ALTER TABLE "sunna" ADD CONSTRAINT "sunna_short_id_unique" UNIQUE("short_id");--> statement-breakpoint
ALTER TABLE "wakafat" ADD CONSTRAINT "wakafat_short_id_unique" UNIQUE("short_id");