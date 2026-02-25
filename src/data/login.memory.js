const bcrypt = require("bcryptjs");
const { use } = require("react");

const logins = [
    {

        id: 1,
        username: "Gustavo",
        role: "user",
        passwordHash: bcrypt.hashSync("123", 10)
        
    }, 

    {

        id: 2,
        username: "admin",
        role: "admin",
        passwordHash: bcrypt.hashSync("123", 10)
        
    }, 

];

function findByUsername(username){
    return logins.find(l => l.username === username);
}
    
module.exports = {findByUsername};


