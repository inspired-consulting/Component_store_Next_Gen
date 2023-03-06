exports.up = async (knex) => {
    await knex.raw(`
        DROP TABLE IF EXISTS "public"."component_version";
        CREATE TABLE "public"."component_version" (
            "id" bigint NOT NULL,
            "uuid" uuid NOT NULL,
            "component_id" bigint NOT NULL,
            "version" character varying NOT NULL,
            "information" text,
            "entry_file" character varying NOT NULL,
            "publisher" text,
            FOREIGN KEY ("component_id") REFERENCES component ("id"),
            PRIMARY KEY ("id")
        );
    `);
};

exports.down = async (knex) => {
    await knex.raw(`
        DROP TABLE IF EXISTS "public"."component_version";
    `);
};