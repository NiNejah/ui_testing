// aux function ; 
const  getRowsFromDb =  async (dbClient , commend)=>{
    let res = await dbClient.query(commend);
    return res.rows ;
}

module.exports  = getRowsFromDb ;