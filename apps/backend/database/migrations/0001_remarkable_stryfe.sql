CREATE TABLE "achievements" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"icon" varchar(50) NOT NULL,
	"color" varchar(20) DEFAULT '#4285F4' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_achievements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"achievement_id" varchar(50) NOT NULL,
	"unlocked" boolean DEFAULT false NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"unlocked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "uq_user_achievement" UNIQUE("user_id","achievement_id")
);
--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "color" varchar(20) DEFAULT '#4285F4' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "title" varchar(150) DEFAULT 'Student · KAU' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "theme" varchar(20) DEFAULT 'Light' NOT NULL;--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievement_id_achievements_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;