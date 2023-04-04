const keyControl =[];

keyControl.isAuthorized= async(req, res, next)=>{
    const key = req.params.keysecret
    let iduser = req.params.admin
 
    if(key == process.env.AWS_TKN_PRIVATE){if(iduser==1 || iduser==9 || iduser==87) { next()}}
}
module.exports = keyControl;