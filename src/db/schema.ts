import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

export const usersTable = pgTable("users", {
	id: text()
		.primaryKey()
		.unique()
		.notNull()
		.$defaultFn(() => ulid()),
	username: text().notNull().unique(),
	email: text().notNull(),
	password: text().notNull(),
	photoProfile: text(),
	createdAt: integer().$defaultFn(() => Math.floor(Date.now() / 1000.0)),
	updateAt: integer(),
});

export const provincesTable = pgTable("provinces", {
	id: text()
		.primaryKey()
		.unique()
		.notNull()
		.$defaultFn(() => ulid()),
	name: text().notNull().unique(),
	createdAt: integer().$defaultFn(() => Math.floor(Date.now() / 1000.0)),
	updatedAt: integer(),
});

export const languagesTable = pgTable("languages", {
	id: text()
		.primaryKey()
		.unique()
		.notNull()
		.$defaultFn(() => ulid()),
	provinceId: text()
		.notNull()
		.references(() => provincesTable.id),
	name: text().notNull(),
	description: text(),
	createdAt: integer().$defaultFn(() => Math.floor(Date.now() / 1000.0)),
	updatedAt: integer(),
});

export const wordsTable = pgTable("words", {
	id: text()
		.primaryKey()
		.unique()
		.notNull()
		.$defaultFn(() => ulid()),
	languageId: text()
		.notNull()
		.references(() => languagesTable.id),
	word: text(),
	meaning: text(),
	createdAt: integer().$defaultFn(() => Math.floor(Date.now() / 1000.0)),
	updatedAt: integer(),
});

export const provinceSubmissionsTable = pgTable("province_submissions", {
	id: text()
		.primaryKey()
		.unique()
		.notNull()
		.$defaultFn(() => ulid()),
	submitById: text()
		.notNull()
		.references(() => usersTable.id),
	provinceId: text()
		.notNull()
		.references(() => provincesTable.id),
	createdAt: integer().$defaultFn(() => Math.floor(Date.now() / 1000.0)),
	updatedAt: integer(),
});

export const languageSubmissionsTable = pgTable("languange_submissions", {
	id: text()
		.primaryKey()
		.unique()
		.notNull()
		.$defaultFn(() => ulid()),
	submitById: text()
		.notNull()
		.references(() => usersTable.id),
	languageId: text()
		.notNull()
		.references(() => languagesTable.id),
	createdAt: integer().$defaultFn(() => Math.floor(Date.now() / 1000.0)),
	updatedAt: integer(),
});

export const wordSubmissionsTable = pgTable("word_submissions", {
	id: text()
		.primaryKey()
		.unique()
		.notNull()
		.$defaultFn(() => ulid()),
	submitById: text()
		.notNull()
		.references(() => usersTable.id),
	wordId: text()
		.notNull()
		.references(() => wordsTable.id),
	createdAt: integer().$defaultFn(() => Math.floor(Date.now() / 1000.0)),
	updatedAt: integer(),
});

export const voteWordsTable = pgTable("vote_words", {
	id: text()
		.primaryKey()
		.unique()
		.notNull()
		.$defaultFn(() => ulid()),
	voteById: text()
		.notNull()
		.references(() => usersTable.id),
	wordId: text()
		.notNull()
		.references(() => wordsTable.id),
	numberOfVote: integer().default(0),
	createdAt: integer().$defaultFn(() => Math.floor(Date.now() / 1000.0)),
	updatedAt: integer(),
});
