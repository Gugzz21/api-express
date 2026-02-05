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
    { id: 1, name: "Ana" },
    { id: 2, name: "João" },
    { id: 3, name: "Bruno" },
    { id: 4, name: "Maria" }

]

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    // Endpoint 1: healthcheck
    if (url === "/health") {
        return sendJson(res, 200, { status: "ok", timestamp: new Date().toISOString() });
    }


    else if (url === "/api/v1/users") {
        //Endpoint 2: Listar usuários
        if (method === "GET") {
            return sendJson(res, 200, users);
        }

        //Endpoint 3: Criar um novo usuário
        else if (method === "POST") {
            const body = await readJsonBody(req);

            users.push({ id: users.length + 1, name: body.name });
            return sendJson(res, 201, users[users.length - 1]);
        }

        //Endpoint 4: Atualizar Usuário 
        else if (method === "PUT" && url + "/:id") {
            try {
                const body = await readJsonBody(req);
                console.log(req)


            } catch (error) {
                console.log(error);
                return sendJson(res, 500, { error: "Erro ao atualizar usuário" });
            }

        }


    }



})


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));