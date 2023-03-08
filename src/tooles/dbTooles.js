// aux function ; 
export const  getCommand =  async (dbClient , commend)=>{
    let res = await dbClient.query(commend);
    return res.rows ;
}

