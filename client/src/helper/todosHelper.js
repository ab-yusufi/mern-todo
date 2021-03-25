
export const addTodo = (todo) => {
    return fetch(`/api/add`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            todo: todo
        })
    }).then(res => {
        return res;    
    })
    .catch(err => console.log(err))
}

export const getAllTodos = () => {
    return fetch(`/api/todos`, {
        method: "GET"
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const deleteTodo = (id) => {
    return fetch(`/api/delete/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const updateTodo = (id, todo) => {
    return fetch(`/api/update/${id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            todo: todo
        })
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const markComplete = (id) => {
    return fetch(`/api/mark/${id}`, {
        method: "PUT"
    }).then(res => res.json())
    .catch(err => console.log(err))
} 