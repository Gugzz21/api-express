let users = [
    { id: 1, name: "Ana"},
    { id: 2, name: "João"},
    { id: 3, name: "Bruno"},
    { id: 4, name: "Maria"}
]

function getAll(){
    return users; 
}

function getById(id){
    return users.find(u => u.id === id) || null; 
}

function create(name){
    const maxId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { id: maxId, name};
    users.push(newUser);
    return newUser;
}


// Criar método de edição 

// Criar método de exclusão

module.exports = {getAll, getById, create}