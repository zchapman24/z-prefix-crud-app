/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("item").del();
  await knex("item").insert([
    {
      userid: 1,
      item_name: "electric guitar",
      description: "gibson",
      quantity: 10,
    },
    {
      userid: 2,
      item_name: "electric guitar",
      description: "fender",
      quantity: 20,
    },
    {
      userid: 3,
      item_name: "acoustic guitar",
      description: "taylor",
      quantity: 30,
    },
  ]);
};
