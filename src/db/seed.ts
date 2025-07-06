import { reset } from "drizzle-seed";
import * as schema from "../db/schema";
import { db } from "./db";
import {
	languageSubmissionsTable,
	languagesTable,
	provinceSubmissionsTable,
	provincesTable,
	usersTable,
	wordSubmissionsTable,
	wordsTable,
} from "./schema";
import {
	seedLanguages,
	seedProvinces,
	seedUsers,
	seedWords,
} from "./seed-data";

async function main() {
	await reset(db, schema);

	// user seed
	for (const user of seedUsers) {
		const hashPassword = await Bun.password.hash(user.password, {
			algorithm: "bcrypt",
			cost: 4,
		});
		await db.insert(usersTable).values({
			id: user.id,
			username: user.username,
			email: user.email,
			password: hashPassword,
		});
	}
	const userIds = seedUsers.map((user) => user.id);

	// province seed
	await db.insert(provincesTable).values(seedProvinces);
	for (const province of seedProvinces) {
		await db.insert(provinceSubmissionsTable).values({
			submitById: userIds[Math.floor(Math.random() * userIds.length)],
			provinceId: province.id,
		});
	}

	// language seed
	await db.insert(languagesTable).values(seedLanguages);
	for (const language of seedLanguages) {
		await db.insert(languageSubmissionsTable).values({
			submitById: userIds[Math.floor(Math.random() * userIds.length)],
			languageId: language.id,
		});
	}

	// word seed
	await db.insert(wordsTable).values(seedWords);
	for (const word of seedWords) {
		await db.insert(wordSubmissionsTable).values({
			submitById: userIds[Math.floor(Math.random() * userIds.length)],
			wordId: word.id,
		});
	}

	console.log("seed done 🌱");
}

main();
