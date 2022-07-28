// const axios = require("axios");
const { publish } = require("../utils/fork_data");

async function get_initial_value() {
  return { data: "sadasdd" };
}

publish(get_initial_value);

module.exports = get_initial_value;
