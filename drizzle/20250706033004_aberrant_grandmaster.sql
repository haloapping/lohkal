CREATE TABLE "languange_submissions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"language_id" text NOT NULL,
	"created_at" integer,
	"updated_at" integer,
	CONSTRAINT "languange_submissions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "province_submissions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"province_id" text NOT NULL,
	"created_at" integer,
	"updated_at" integer,
	CONSTRAINT "province_submissions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "word_submissions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"word_id" text NOT NULL,
	"created_at" integer,
	"updated_at" integer,
	CONSTRAINT "word_submissions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "languange_submissions" ADD CONSTRAINT "languange_submissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "languange_submissions" ADD CONSTRAINT "languange_submissions_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "province_submissions" ADD CONSTRAINT "province_submissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "province_submissions" ADD CONSTRAINT "province_submissions_province_id_provinces_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "word_submissions" ADD CONSTRAINT "word_submissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "word_submissions" ADD CONSTRAINT "word_submissions_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE no action ON UPDATE no action;