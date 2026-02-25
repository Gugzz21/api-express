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
function update(id, name){
    const user = getById(id);

    if(user == null) return null; 
    
    const index = users.findIndex(u => u.id === id);
    users[index].name = name.trim();
    return user; 
}

// Criar método de exclusão
function remove(id){
    const user = getById

    if(user == null) return null;
     
    const index = users.findIndex(u => u.id === id);
    users.splice(index, 1);

    return true; 

}

module.exports = {getAll, getById, create, update, remove};