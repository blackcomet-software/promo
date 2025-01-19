import { relations } from "drizzle-orm/relations";
import { sessionsInAuth, refreshTokensInAuth, project, task, projectMember, inviteToProject, usersInAuth, user, projectMemberRoles, projectRole, notification, mfaFactorsInAuth, mfaChallengesInAuth, identitiesInAuth, ssoProvidersInAuth, ssoDomainsInAuth, mfaAmrClaimsInAuth, samlProvidersInAuth, flowStateInAuth, samlRelayStatesInAuth, oneTimeTokensInAuth } from "./schema";

export const refreshTokensInAuthRelations = relations(refreshTokensInAuth, ({one}) => ({
	sessionsInAuth: one(sessionsInAuth, {
		fields: [refreshTokensInAuth.sessionId],
		references: [sessionsInAuth.id]
	}),
}));

export const sessionsInAuthRelations = relations(sessionsInAuth, ({one, many}) => ({
	refreshTokensInAuths: many(refreshTokensInAuth),
	usersInAuth: one(usersInAuth, {
		fields: [sessionsInAuth.userId],
		references: [usersInAuth.id]
	}),
	mfaAmrClaimsInAuths: many(mfaAmrClaimsInAuth),
}));

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
	mfaFactorsInAuths: many(mfaFactorsInAuth),
	identitiesInAuths: many(identitiesInAuth),
	sessionsInAuths: many(sessionsInAuth),
	oneTimeTokensInAuths: many(oneTimeTokensInAuth),
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

export const mfaFactorsInAuthRelations = relations(mfaFactorsInAuth, ({one, many}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [mfaFactorsInAuth.userId],
		references: [usersInAuth.id]
	}),
	mfaChallengesInAuths: many(mfaChallengesInAuth),
}));

export const mfaChallengesInAuthRelations = relations(mfaChallengesInAuth, ({one}) => ({
	mfaFactorsInAuth: one(mfaFactorsInAuth, {
		fields: [mfaChallengesInAuth.factorId],
		references: [mfaFactorsInAuth.id]
	}),
}));

export const identitiesInAuthRelations = relations(identitiesInAuth, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [identitiesInAuth.userId],
		references: [usersInAuth.id]
	}),
}));

export const ssoDomainsInAuthRelations = relations(ssoDomainsInAuth, ({one}) => ({
	ssoProvidersInAuth: one(ssoProvidersInAuth, {
		fields: [ssoDomainsInAuth.ssoProviderId],
		references: [ssoProvidersInAuth.id]
	}),
}));

export const ssoProvidersInAuthRelations = relations(ssoProvidersInAuth, ({many}) => ({
	ssoDomainsInAuths: many(ssoDomainsInAuth),
	samlProvidersInAuths: many(samlProvidersInAuth),
	samlRelayStatesInAuths: many(samlRelayStatesInAuth),
}));

export const mfaAmrClaimsInAuthRelations = relations(mfaAmrClaimsInAuth, ({one}) => ({
	sessionsInAuth: one(sessionsInAuth, {
		fields: [mfaAmrClaimsInAuth.sessionId],
		references: [sessionsInAuth.id]
	}),
}));

export const samlProvidersInAuthRelations = relations(samlProvidersInAuth, ({one}) => ({
	ssoProvidersInAuth: one(ssoProvidersInAuth, {
		fields: [samlProvidersInAuth.ssoProviderId],
		references: [ssoProvidersInAuth.id]
	}),
}));

export const samlRelayStatesInAuthRelations = relations(samlRelayStatesInAuth, ({one}) => ({
	flowStateInAuth: one(flowStateInAuth, {
		fields: [samlRelayStatesInAuth.flowStateId],
		references: [flowStateInAuth.id]
	}),
	ssoProvidersInAuth: one(ssoProvidersInAuth, {
		fields: [samlRelayStatesInAuth.ssoProviderId],
		references: [ssoProvidersInAuth.id]
	}),
}));

export const flowStateInAuthRelations = relations(flowStateInAuth, ({many}) => ({
	samlRelayStatesInAuths: many(samlRelayStatesInAuth),
}));

export const oneTimeTokensInAuthRelations = relations(oneTimeTokensInAuth, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [oneTimeTokensInAuth.userId],
		references: [usersInAuth.id]
	}),
}));