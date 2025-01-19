// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { pgTable, foreignKey, pgPolicy, uuid, timestamp, text, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const taskStatus = pgEnum("task_status", ['todo', 'in_progress', 'done'])


export const task = pgTable("task", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	projectId: uuid("project_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	title: text().notNull(),
	description: text(),
	status: taskStatus().default('todo').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [project.id],
			name: "task_project_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	pgPolicy("Allow project members to edit task", { as: "permissive", for: "update", to: ["authenticated"], using: sql`(( SELECT auth.uid() AS uid) IN ( SELECT project_member.user_id
   FROM project_member
  WHERE (project_member.project_id = task.project_id)))` }),
	pgPolicy("Allow project members to read tasks", { as: "permissive", for: "select", to: ["authenticated"] }),
]);

export const inviteToProject = pgTable("invite_to_project", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	senderProjectMemberId: uuid("sender_project_member_id").notNull(),
	targetEmail: text("target_email").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.senderProjectMemberId],
			foreignColumns: [projectMember.id],
			name: "invite_to_project_sender_project_member_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	pgPolicy("Allow any project member to insert a invite", { as: "permissive", for: "insert", to: ["authenticated"], withCheck: sql`( SELECT (count(*) > 0)
   FROM project_member
  WHERE (project_member.user_id = ( SELECT auth.uid() AS uid)))`  }),
	pgPolicy("Allow authenticated users to view their own invites", { as: "permissive", for: "select", to: ["authenticated"] }),
]);

export const project = pgTable("project", {
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: text().notNull(),
	id: uuid().defaultRandom().primaryKey().notNull(),
}, (table) => [
	pgPolicy("Enable read access for all users", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
]);

export const projectRole = pgTable("project_role", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
}, (table) => [
	pgPolicy("Enable read access for all users", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
]);

export const user = pgTable("user", {
	id: uuid().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.id],
			foreignColumns: [users.id],
			name: "user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	pgPolicy("Enable read access for all users", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
]);

export const projectMember = pgTable("project_member", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	projectId: uuid("project_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [project.id],
			name: "project_member_project_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "project_member_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	pgPolicy("Enable users to view their own data only", { as: "permissive", for: "select", to: ["authenticated"], using: sql`(( SELECT auth.uid() AS uid) = user_id)` }),
]);

export const projectMemberRoles = pgTable("project_member_roles", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	projectMemberId: uuid("project_member_id").notNull(),
	projectRoleId: uuid("project_role_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.projectMemberId],
			foreignColumns: [projectMember.id],
			name: "project_member_roles_project_member_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.projectRoleId],
			foreignColumns: [projectRole.id],
			name: "project_member_roles_project_role_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	pgPolicy("Enable read access for all users", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
]);

export const notification = pgTable("notification", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	targetUserId: uuid("target_user_id").notNull(),
	message: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.targetUserId],
			foreignColumns: [user.id],
			name: "notification_target_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	pgPolicy("Enable insert for users based on user_id", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`(( SELECT auth.uid() AS uid) = target_user_id)`  }),
	pgPolicy("Enable users to view their own data only", { as: "permissive", for: "select", to: ["authenticated"] }),
]);
