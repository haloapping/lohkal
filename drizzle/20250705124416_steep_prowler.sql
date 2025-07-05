ALTER TABLE "languages" RENAME COLUMN "region" TO "province_id";--> statement-breakpoint
ALTER TABLE "provinces" DROP CONSTRAINT "provinces_languange_id_languages_id_fk";
--> statement-breakpoint
ALTER TABLE "languages" ADD CONSTRAINT "languages_province_id_provinces_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provinces" DROP COLUMN "languange_id";