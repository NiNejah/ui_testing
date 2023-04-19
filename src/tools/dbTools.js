const dbClient = require ("../config/db.js");

/**
 * Executes the specified SQL command on the database and returns the result rows.
 * @param {string} command The SQL command to execute.
 * @return {!Promise} A promise that will be resolved with the result rows.
 */
const getRowsFromDb = async (command) => {
    // Execute the specified SQL command on the database and return the result rows
    let result = await dbClient.query(command);
    return result.rows;
};

module.exports  = getRowsFromDb ;