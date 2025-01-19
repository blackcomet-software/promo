import { relations } from "drizzle-orm/relations";
import { project, task, projectMember, inviteToProject, usersInAuth, user, projectMemberRoles, projectRole, notification } from "./schema";

export const taskRelations = relations(task, ({one}) => ({
	project: one(project, {
		fields: [task.projectId],
		references: [project.id]
	}),
}));

export const projectRelations = relations(project, ({many}) => ({
	tasks: many(task),
	projectMembers: many(projectMember),
}));

export const inviteToProjectRelations = relations(inviteToProject, ({one}) => ({
	projectMember: one(projectMember, {
		fields: [inviteToProject.senderProjectMemberId],
		references: [projectMember.id]
	}),
}));

export const projectMemberRelations = relations(projectMember, ({one, many}) => ({
	inviteToProjects: many(inviteToProject),
	project: one(project, {
		fields: [projectMember.projectId],
		references: [project.id]
	}),
	user: one(user, {
		fields: [projectMember.userId],
		references: [user.id]
	}),
	projectMemberRoles: many(projectMemberRoles),
}));

export const userRelations = relations(user, ({one, many}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [user.id],
		references: [usersInAuth.id]
	}),
	projectMembers: many(projectMember),
	notifications: many(notification),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	users: many(user),
}));

export const projectMemberRolesRelations = relations(projectMemberRoles, ({one}) => ({
	projectMember: one(projectMember, {
		fields: [projectMemberRoles.projectMemberId],
		references: [projectMember.id]
	}),
	projectRole: one(projectRole, {
		fields: [projectMemberRoles.projectRoleId],
		references: [projectRole.id]
	}),
}));

export const projectRoleRelations = relations(projectRole, ({many}) => ({
	projectMemberRoles: many(projectMemberRoles),
}));

export const notificationRelations = relations(notification, ({one}) => ({
	user: one(user, {
		fields: [notification.targetUserId],
		references: [user.id]
	}),
}));