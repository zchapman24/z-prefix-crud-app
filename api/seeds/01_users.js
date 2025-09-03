/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      first_name: "robert",
      last_name: "downey Jr",
      username: "rdj",
      password: "iron man",
    },
    {
      id: 2,
      first_name: "chris",
      last_name: "evans",
      username: "steverodgers",
      password: "captain america",
    },
    {
      id: 3,
      first_name: "paul",
      last_name: "rudd",
      username: "ant",
      password: "antman",
    },
  ]);
};
