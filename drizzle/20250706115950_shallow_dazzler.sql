CREATE TABLE "languange_submissions" (
	"id" text PRIMARY KEY NOT NULL,
	"submit_by_id" text NOT NULL,
	"language_id" text NOT NULL,
	"created_at" integer,
	"updated_at" integer,
	CONSTRAINT "languange_submissions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"id" text PRIMARY KEY NOT NULL,
	"province_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" integer,
	"updated_at" integer,
	CONSTRAINT "languages_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "province_submissions" (
	"id" text PRIMARY KEY NOT NULL,
	"submit_by_id" text NOT NULL,
	"province_id" text NOT NULL,
	"created_at" integer,
	"updated_at" integer,
	CONSTRAINT "province_submissions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "provinces" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" integer,
	"updated_at" integer,
	CONSTRAINT "provinces_id_unique" UNIQUE("id"),
	CONSTRAINT "provinces_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"photo_profile" text,
	"created_at" integer,
	"update_at" integer,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "vote_words" (
	"id" text PRIMARY KEY NOT NULL,
	"vote_by_id" text NOT NULL,
	"word_id" text NOT NULL,
	"number_of_vote" integer DEFAULT 0,
	"created_at" integer,
	"updated_at" integer,
	CONSTRAINT "vote_words_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "word_submissions" (
	"id" text PRIMARY KEY NOT NULL,
	"submit_by_id" text NOT NULL,
	"word_id" text NOT NULL,
	"created_at" integer,
	"updated_at" integer,
	CONSTRAINT "word_submissions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "words" (
	"id" text PRIMARY KEY NOT NULL,
	"language_id" text NOT NULL,
	"word" text,
	"meaning" text,
	"created_at" integer,
	"updated_at" integer,
	CONSTRAINT "words_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "languange_submissions" ADD CONSTRAINT "languange_submissions_submit_by_id_users_id_fk" FOREIGN KEY ("submit_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "languange_submissions" ADD CONSTRAINT "languange_submissions_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "languages" ADD CONSTRAINT "languages_province_id_provinces_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "province_submissions" ADD CONSTRAINT "province_submissions_submit_by_id_users_id_fk" FOREIGN KEY ("submit_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "province_submissions" ADD CONSTRAINT "province_submissions_province_id_provinces_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vote_words" ADD CONSTRAINT "vote_words_vote_by_id_users_id_fk" FOREIGN KEY ("vote_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vote_words" ADD CONSTRAINT "vote_words_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "word_submissions" ADD CONSTRAINT "word_submissions_submit_by_id_users_id_fk" FOREIGN KEY ("submit_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "word_submissions" ADD CONSTRAINT "word_submissions_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "words" ADD CONSTRAINT "words_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE no action ON UPDATE no action;