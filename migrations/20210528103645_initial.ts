import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", table => {
      table.increments("id").primary().unsigned();
      table.string("username", 30).notNullable().unique();
      table.string("password", 255).notNullable();
      table.timestamp("created_at").nullable();
      table.timestamp("updated_at").nullable();
    })
    .createTable("companies", table => {
      table.increments("id").primary().unsigned();
      table.string("name", 255).notNullable().unique();
      table.timestamp("created_at").nullable();
      table.timestamp("updated_at").nullable();
    })
    .createTable("employment_types", table => {
      table.increments("id").primary().unsigned();
      table.string("name", 255).notNullable().unique();
      table.timestamp("created_at").nullable();
      table.timestamp("updated_at").nullable();
    })
    .createTable("levels", table => {
      table.increments("id").primary().unsigned();
      table.string("name", 255).notNullable().unique();
      table.timestamp("created_at").nullable();
      table.timestamp("updated_at").nullable();
    })
    .createTable("skills", table => {
      table.increments("id").primary().unsigned();
      table.string("name", 255).notNullable().unique();
      table.timestamp("created_at").nullable();
      table.timestamp("updated_at").nullable();
    })
    .createTable("job_functions", table => {
      table.increments("id").primary().unsigned();
      table.string("name", 255).notNullable().unique();
      table.timestamp("created_at").nullable();
      table.timestamp("updated_at").nullable();
    })
    .createTable("jobs", table => {
      table.increments("id").primary().unsigned();
      table.integer("creator_id").notNullable().unsigned();
      table.integer("company_id").notNullable().unsigned();
      table.integer("employment_type_id").notNullable().unsigned();
      table.integer("level_id").notNullable().unsigned();
      table.integer("job_function_id").notNullable().unsigned();
      table.string("title", 255).notNullable();
      table.text("description").notNullable();
      table.string("location", 255).notNullable();
      table.timestamp("closed_at").nullable();
      table.timestamp("created_at").nullable();
      table.timestamp("updated_at").nullable();

      table.foreign("creator_id").references("users.id");
      table.foreign("company_id").references("companies.id");
      table.foreign("employment_type_id").references("employment_types.id");
      table.foreign("level_id").references("levels.id");
      table.foreign("job_function_id").references("job_functions.id");
    })
    .createTable("job_skill", table => {
      table.increments("id").primary().unsigned();
      table.integer("job_id").notNullable().unsigned();
      table.integer("skill_id").notNullable().unsigned();
      table.timestamp("created_at").nullable();
      table.timestamp("updated_at").nullable();

      table.foreign("job_id").references("jobs.id");
      table.foreign("skill_id").references("skills.id");
      table.unique(["job_id", "skill_id"]);
    })
    .createTable("countries", table => {
      table.increments("id").primary().unsigned();
      table.specificType("iso_code", "char(2)").notNullable().unique()
      table.specificType("iso3_code", "char(3)").notNullable().unique()
      table.integer("phone_code", 5).notNullable().unsigned()
      table.string("name", 80).notNullable()
    })
    .createTable("job_applications", table => {
      table.increments("id").primary().unsigned();
      table.string("first_name", 255).notNullable();
      table.string("last_name", 255).notNullable();
      table.integer("job_id").notNullable().unsigned();
      table.string("email", 255).notNullable();
      table.integer("phone_id").notNullable().unsigned();
      table.string("phone_number", 20).notNullable();
      table.string("address", 255).notNullable();
      table.string("city", 30).notNullable();
      table.string("province", 30).nullable();
      table.string("postal_code", 30).notNullable();
      table.integer("country_id").notNullable().unsigned();
      table.timestamp("created_at").nullable();
      table.timestamp("updated_at").nullable();

      table.foreign("phone_id").references("countries.id");
      table.foreign("country_id").references("countries.id");
      table.foreign("job_id").references("jobs.id");
    })
}


export async function down(knex: Knex): Promise<void> {
  const schemaBuilder = knex.schema;

  const jobSkillExists = await schemaBuilder.hasTable("job_skill")
  const jobsExists = await schemaBuilder.hasTable("jobs")
  const jobFunctionsExists = await schemaBuilder.hasTable("job_functions")
  const skillsExists = await schemaBuilder.hasTable("skills")
  const employmentTypesExists = await schemaBuilder.hasTable("employment_types")
  const companiesExists = await schemaBuilder.hasTable("companies")
  const levelsExists = await schemaBuilder.hasTable("levels")
  const usersExists = await schemaBuilder.hasTable("users")
  const jobAppExists = await schemaBuilder.hasTable("job_applications")
  const countryExists = await schemaBuilder.hasTable("countries")

  if (jobAppExists) {
    schemaBuilder.table("job_applications", table => {
      table.dropForeign(["phone_id"]);
      table.dropForeign(["country_id"]);
      table.dropForeign(["job_id"]);
    })
    schemaBuilder.dropTable("job_applications");
  }

  if (jobSkillExists) {
    schemaBuilder.table("job_skill", table => {
      table.dropForeign(["job_id"]);
      table.dropForeign(["skill_id"]);
      table.dropUnique(["job_id", "skill_id"]);
    })
    schemaBuilder.dropTable("job_skill");
  }

  if (jobsExists) {
    schemaBuilder.table("jobs", table => {
      table.dropForeign(["creator_id"]);
      table.dropForeign(["employment_type_id"]);
      table.dropForeign(["level_id"]);
      table.dropForeign(["job_function_id"]);
    })
    schemaBuilder.dropTable("jobs");
  }

  if (jobFunctionsExists) {
    schemaBuilder.dropTable("job_functions");
  }

  if (skillsExists) {
    schemaBuilder.dropTable("skills");
  }

  if (employmentTypesExists) {
    schemaBuilder.dropTable("employment_types");
  }

  if (companiesExists) {
    schemaBuilder.dropTable("companies");
  }

  if (levelsExists) {
    schemaBuilder.dropTable("levels");
  }

  if (usersExists) {
    schemaBuilder.dropTable("users");
  }

  if (countryExists) {
    schemaBuilder.dropTable("countries");
  }

  return schemaBuilder;
}
