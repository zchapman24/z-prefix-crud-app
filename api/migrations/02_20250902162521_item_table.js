/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("item", (table) => {
    table.increments("id").primary().notNullable();
    table.integer("userid").references("users.id").notNullable();
    table.string("item_name").notNullable();
    table.string("description").notNullable();
    table.integer("quantity").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("item");
};
