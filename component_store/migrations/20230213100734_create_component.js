exports.up = async (knex) => {
    await knex.raw(`
        DROP TABLE IF EXISTS "public"."component";
        CREATE TABLE "public"."component" (
            "id" bigint NOT NULL,
            "uuid" uuid NOT NULL,
            "name" character varying NOT NULL,
            "website" text,
            PRIMARY KEY ("id")
        );
    `);
};

exports.down = async (knex) => {
    await knex.raw(`
        DROP TABLE IF EXISTS "public"."component";
    `);
};