-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."task_status" AS ENUM('todo', 'in_progress', 'done');--> statement-breakpoint
CREATE TABLE "task" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"status" "task_status" DEFAULT 'todo' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "task" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "invite_to_project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"sender_project_member_id" uuid NOT NULL,
	"target_email" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "invite_to_project" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "project" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "project_role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project_role" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "project_member" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"project_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project_member" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "project_member_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"project_member_id" uuid NOT NULL,
	"project_role_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project_member_roles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "notification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"target_user_id" uuid NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "notification" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invite_to_project" ADD CONSTRAINT "invite_to_project_sender_project_member_id_fkey" FOREIGN KEY ("sender_project_member_id") REFERENCES "public"."project_member"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "project_member" ADD CONSTRAINT "project_member_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "project_member" ADD CONSTRAINT "project_member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "project_member_roles" ADD CONSTRAINT "project_member_roles_project_member_id_fkey" FOREIGN KEY ("project_member_id") REFERENCES "public"."project_member"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "project_member_roles" ADD CONSTRAINT "project_member_roles_project_role_id_fkey" FOREIGN KEY ("project_role_id") REFERENCES "public"."project_role"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE VIEW "public"."user_with_auth" WITH (security_invoker = on) AS (SELECT u.id, u.name, a.email, a.created_at FROM "user" u JOIN auth.users a ON u.id = a.id);--> statement-breakpoint
CREATE POLICY "Allow project members to edit task" ON "task" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((( SELECT auth.uid() AS uid) IN ( SELECT project_member.user_id
   FROM project_member
  WHERE (project_member.project_id = task.project_id))));--> statement-breakpoint
CREATE POLICY "Allow project members to read tasks" ON "task" AS PERMISSIVE FOR SELECT TO "authenticated";--> statement-breakpoint
CREATE POLICY "Allow any project member to insert a invite" ON "invite_to_project" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (( SELECT (count(*) > 0)
   FROM project_member
  WHERE (project_member.user_id = ( SELECT auth.uid() AS uid))));--> statement-breakpoint
CREATE POLICY "Allow authenticated users to view their own invites" ON "invite_to_project" AS PERMISSIVE FOR SELECT TO "authenticated";--> statement-breakpoint
CREATE POLICY "Enable read access for all users" ON "project" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Enable read access for all users" ON "project_role" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Enable read access for all users" ON "user" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Enable users to view their own data only" ON "project_member" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((( SELECT auth.uid() AS uid) = user_id));--> statement-breakpoint
CREATE POLICY "Enable read access for all users" ON "project_member_roles" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Enable insert for users based on user_id" ON "notification" AS PERMISSIVE FOR INSERT TO public WITH CHECK ((( SELECT auth.uid() AS uid) = target_user_id));--> statement-breakpoint
CREATE POLICY "Enable users to view their own data only" ON "notification" AS PERMISSIVE FOR SELECT TO "authenticated";
*/