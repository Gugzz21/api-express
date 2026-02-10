const http = require("http");

function readJsonBody(req) {
    return new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (chunk) => (data += chunk));
        req.on("end", () => {
            if (!data)
                return resolve(null);

            else
                try {
                    resolve(JSON.parse(data));
                } catch (err) {
                    reject(new Error("JSON Inválido!"));
                }
        })
    })
}


function sendJson(res, statusCode, payload) {
    res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(payload));
}

let users = [
    { id: 1, name: "Ana", idade: 12 },
    { id: 2, name: "João", idade: 13 },
    { id: 3, name: "Bruno", idade: 14 },
    { id: 4, name: "Maria", idade: 15 }

]

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    // Endpoint 1: healthcheck
    if (url === "/health") {
        return sendJson(res, 200, { status: "ok", timestamp: new Date().toISOString() });
    }

    // 1. ROTA GERAL
    else if (url === "/api/v1/users") {
        //Endpoint 2: Listar usuários
        if (method === "GET") {
            return sendJson(res, 200, users);
        }

        //Endpoint 3: Criar um novo usuário
        else if (method === "POST") {
            const body = await readJsonBody(req);

            users.push({ id: users.length + 1, name: body.name, idade: body.idade });
            return sendJson(res, 201, users[users.length - 1]);
        }
    }
    

   
    // 2. ROTA COM ID
    else if (url.startsWith("/api/v1/users/")) {
        const parts = url.split("/");
        const id = Number(parts[parts.length - 1]);

        //Endpoint 4: Listar por id
        if (method === "GET") { 
            
            const user = users.find((u) => u.id === id );
            if (!user){ 
            return sendJson(res, 404, {error: "Usuário não encontrado."});
            }
            return sendJson(res, 200, user);
            
        }


        //Endpoint 5: Atualizar todos os atributos de um usuário
        else if (method === "PUT") {
            const body = await readJsonBody(req);
            const user = users.find((u) => u.id === id );
            
            if (user){ 
                user.name = body.name; 
                user.idade = body.idade;
                return sendJson(res, 201, user);
            }

            else 
                return sendJson(res, 404, {error: "Usuário não encontrado."});

        }

        //Endpoint 6: Atualizar um dos atributos de um usuário
        else if (method === "PATCH") {
            const body = await readJsonBody(req);
            const user = users.find((u) => u.id === id );
            
            if (user){ 
                user.name = body.name; 
                user.idade = body.idade;
                return sendJson(res, 201, user);
            }

            else 
                return sendJson(res, 404, {error: "Usuário não encontrado."});

        }


         else if (method === "DELETE"){
            const user = users.find((u) => u.id === id );


            if (!user){ 
                return sendJson(res, 404, {error: "Usuário não encontrado."});
            }

            const index = users.findIndex((u) => u.id === id );
            users.splice(index, 1);
            res.writeHead(204);
            res.end();
        
        }
    }

    else 
        return sendJson(res, 404, {error: "Rota não encontrada !" });
    
    })


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));