CREATE TABLE "languages" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"region" text NOT NULL,
	"description" text,
	"created_at" integer,
	"updated_at" integer,
	CONSTRAINT "languages_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "provinces" (
	"id" text PRIMARY KEY NOT NULL,
	"languange_id" text NOT NULL,
	"name" text NOT NULL,
	"created_at" integer,
	"update_at" integer,
	CONSTRAINT "provinces_id_unique" UNIQUE("id")
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
CREATE TABLE "words" (
	"id" text PRIMARY KEY NOT NULL,
	"language_id" text NOT NULL,
	"word" text,
	"meaning" text,
	"created_at" integer,
	"update_at" integer,
	CONSTRAINT "words_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "provinces" ADD CONSTRAINT "provinces_languange_id_languages_id_fk" FOREIGN KEY ("languange_id") REFERENCES "public"."languages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "words" ADD CONSTRAINT "words_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE no action ON UPDATE no action;