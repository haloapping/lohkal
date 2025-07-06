type seedUserType = {
	id: string;
	username: string;
	email: string;
	password: string;
};

export const seedUsers: seedUserType[] = [
	{
		id: "01H5Z7XQ4J3V8G2T6K9P0R1M4",
		username: "budi",
		email: "budi@example.com",
		password: "s3cretP4ssw0rd!",
	},
	{
		id: "01H5Z7XQ4J3V8G2T6K9P0R1M5",
		username: "santi",
		email: "santi@example.com",
		password: "s3cretP4ssw0rd!",
	},
	{
		id: "01H5Z7XQ4J3V8G2T6K9P0R1M6",
		username: "joko",
		email: "joko@example.com",
		password: "s3cretP4ssw0rd!",
	},
	{
		id: "01H5Z7XQ4J3V8G2T6K9P0R1M7",
		username: "rahel",
		email: "rahel@example.com",
		password: "s3cretP4ssw0rd!",
	},
	{
		id: "01H5Z7XQ4J3V8G2T6K9P0R1M8",
		username: "anton",
		email: "anton@example.com",
		password: "s3cretP4ssw0rd!",
	},
];

type seedProvinceType = {
	id: string;
	name: string;
};

export const seedProvinces: seedProvinceType[] = [
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M6W", name: "Aceh" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M6X", name: "Sumatera Utara" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M6Y", name: "Sumatera Barat" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M6Z", name: "Riau" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M70", name: "Kepulauan Riau" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M71", name: "Jambi" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M72", name: "Sumatera Selatan" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M73", name: "Bangka Belitung" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M74", name: "Bengkulu" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M75", name: "Lampung" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M76", name: "DKI Jakarta" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M77", name: "Jawa Barat" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M78", name: "Banten" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M79", name: "Jawa Tengah" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7A", name: "DI Yogyakarta" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7B", name: "Jawa Timur" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7C", name: "Bali" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7D", name: "Nusa Tenggara Barat" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7E", name: "Nusa Tenggara Timur" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7F", name: "Kalimantan Barat" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7G", name: "Kalimantan Tengah" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7H", name: "Kalimantan Selatan" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7J", name: "Kalimantan Timur" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7K", name: "Kalimantan Utara" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7M", name: "Sulawesi Utara" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7N", name: "Gorontalo" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7P", name: "Sulawesi Tengah" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7Q", name: "Sulawesi Barat" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7R", name: "Sulawesi Selatan" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7S", name: "Sulawesi Tenggara" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7T", name: "Maluku" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7V", name: "Maluku Utara" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7W", name: "Papua" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7X", name: "Papua Barat" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7Y", name: "Papua Selatan" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M7Z", name: "Papua Tengah" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M80", name: "Papua Pegunungan" },
	{ id: "01HXYZ0V80G2B7X9Z3KP5F1M81", name: "Papua Barat Daya" },
];

type seedLanguageType = {
	id: string;
	provinceId: string;
	name: string;
};

export const seedLanguages: seedLanguageType[] = [
	// Aceh
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M6W",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6W",
		name: "Acehnese",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M6X",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6W",
		name: "Gayo",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M6Y",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6W",
		name: "Aneuk Jamee",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M6Z",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6W",
		name: "Batak",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M70",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6W",
		name: "Minangkabau",
	},

	// Sumatera Utara
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M71",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6X",
		name: "Melayu",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M72",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6X",
		name: "Batak Toba",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M73",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6X",
		name: "Batak Karo",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M74",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6X",
		name: "Nias",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M75",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6X",
		name: "Mandailing",
	},

	// Sumatera Barat
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M76",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6Y",
		name: "Minangkabau",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M77",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6Y",
		name: "Mentawai",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M78",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6Y",
		name: "Melayu",
	},

	// Riau
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M79",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6Z",
		name: "Melayu",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M7A",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6Z",
		name: "Minangkabau",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M7B",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M6Z",
		name: "Bugis",
	},

	// Kepulauan Riau
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M7C",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M70",
		name: "Melayu",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M7D",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M70",
		name: "Tionghoa",
	},

	// Jambi
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M7E",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M71",
		name: "Melayu",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M7F",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M71",
		name: "Kerinci",
	},

	// Sumatera Selatan
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M7G",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M72",
		name: "Melayu",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M7H",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M72",
		name: "Komering",
	},

	// Bangka Belitung
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M7J",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M73",
		name: "Melayu",
	},

	// Bali
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M7K",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M7C",
		name: "Bali",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M7M",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M7C",
		name: "Sasak",
	},

	// Papua
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M7N",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M7W",
		name: "Dani",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M7P",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M7W",
		name: "Asmat",
	},
	{
		id: "01HXYZ1V80G2B7X9Z3KP5F1M7Q",
		provinceId: "01HXYZ0V80G2B7X9Z3KP5F1M7W",
		name: "Biak",
	},
];

type seedWordType = {
	id: string;
	languageId: string;
	word: string;
	meaning: string;
};

export const seedWords: seedWordType[] = [
	// Acehnese
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M6W",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M6W",
		word: "peugah",
		meaning: "berkata",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M6X",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M6W",
		word: "jih",
		meaning: "dia",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M6Y",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M6W",
		word: "rumoh",
		meaning: "rumah",
	},

	// Gayo
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M6Z",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M6X",
		word: "kune",
		meaning: "makan",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M70",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M6X",
		word: "muneri",
		meaning: "minum",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M71",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M6X",
		word: "beruh",
		meaning: "rumah",
	},

	// Batak Toba
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M72",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M72",
		word: "hamu",
		meaning: "kamu",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M73",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M72",
		word: "dongan",
		meaning: "teman",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M74",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M72",
		word: "sai",
		meaning: "pergi",
	},

	// Minangkabau
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M75",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M76",
		word: "denai",
		meaning: "saya",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M76",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M76",
		word: "kawan",
		meaning: "teman",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M77",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M76",
		word: "makan",
		meaning: "makan",
	},

	// Bali
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M78",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M7K",
		word: "tiang",
		meaning: "saya",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M79",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M7K",
		word: "meme",
		meaning: "ibu",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M7A",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M7K",
		word: "bapa",
		meaning: "ayah",
	},

	// Dani
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M7B",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M7N",
		word: "eke",
		meaning: "ibu",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M7C",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M7N",
		word: "ogalek",
		meaning: "air",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M7D",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M7N",
		word: "wam",
		meaning: "rumah",
	},

	// Asmat
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M7E",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M7P",
		word: "ow",
		meaning: "air",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M7F",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M7P",
		word: "ndet",
		meaning: "mata",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M7G",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M7P",
		word: "byop",
		meaning: "orang",
	},

	// Biak
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M7H",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M7Q",
		word: "su",
		meaning: "saya",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M7J",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M7Q",
		word: "war",
		meaning: "air",
	},
	{
		id: "01HXYZ2V80G2B7X9Z3KP5F1M7K",
		languageId: "01HXYZ1V80G2B7X9Z3KP5F1M7Q",
		word: "rum",
		meaning: "rumah",
	},
];
