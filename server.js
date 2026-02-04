const http = require("http");

function readJsonBody(req){
    return new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (chunk) => (data += chunk));
        req.on("end", () => {
            if(!data)
            return resolve(null);

            else
                try {
                    resolve(JSON.parse(data));
                } catch(err){
                     reject(new Error("JSON Inválido!"));
                }
        })
    })
}


function sendJson(res, statusCode, payload){
    res.writeHead(statusCode, {"Content-Type": "application/json; charset=utf-8"});
    res.end(JSON.stringify(payload));
}

let users = [
    {id: 1, name: "Ana"},
    {id: 2, name: "João"},
    {id: 3, name: "Bruno"},
    {id: 4, name: "Maria"}

]

const server = http.createServer(async (req, res) => { 
    const {method, url} = req; 

    // Endpoint 1: healthcheck
     if(method === "GET" && url === "/health"){
        return sendJson(res, 200, {status: "ok", timestamp: new Date().toISOString()});
     } 

    //Endpoint 2: Listar usuários
    if(method === "GET" && url === "/api/v1/users"){
        return sendJson(res, 200, users);
     } 


})


const PORT = process.env.PORT || 3000; 
server.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));