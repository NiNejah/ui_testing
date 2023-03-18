const dbClient = require ("../config/db.js");

// aux function ; 
const  getRowsFromDb =  async (commend)=>{
    let res = await dbClient.query(commend);
    return res.rows ;
}

module.exports  = getRowsFromDb ;