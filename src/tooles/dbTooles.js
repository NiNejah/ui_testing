// aux function ; 
const  getCommand =  async (dbClient , commend)=>{
    let res = await dbClient.query(commend);
    return res.rows ;
}

module.exports  = getCommand ;