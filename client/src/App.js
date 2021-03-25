import React, {useState, useEffect} from 'react'
import { addTodo, getAllTodos, deleteTodo, updateTodo, markComplete } from './helper/todosHelper'
import './App.css';

const Todos = () => {

  const [values, setValues] = useState({
    todo: "",
    todosList: [],
    flip: true,
    error: "",
    update: false,
    currentTodoId: null,
  })

  const {todo, todosList, flip, error, update, currentTodoId} = values

  const handleChange = event => {
    setValues({
      ...values,
      todo: event.target.value 
    })
  }

  useEffect(() => {
    getAllTodos()
      .then(todosList => {
        setValues({
          ...values,
          todosList: todosList
        })
      })
      .catch(err => console.log(err))
      console.log(todosList)
  }, [flip])


  const addMyTodo = (todo) => {
    console.log("TODO", todo )
    addTodo(todo)
    .then(data => {
      console.log("DATA", data)
      if(data.error){
        setValues({
          ...values,
          error: data.error
        })
        console.log("ERROR", error)
      } else {
        console.log("TODO ADDED")
        setValues({
          ...values,
          flip: !flip,
          todo: ''
        })
      }
    }
    )}

  const removeTodo = (id) => {
    deleteTodo(id)
      .then( data => {
        console.log("DELETE", data)
        setValues({
          ...values,
          flip: !flip
        })
      })
  }

  const updateThisTodo = (id, todo) => {
    updateTodo(id, todo)
      .then(data => {
        if(data.error){
          console.log("DATA.ERROR", error)
          setValues({
            ...values,
            error: data.error
          })
        } else {
          setValues({
            ...values,
            flip: !flip,
            todo: '',
            update: false,
            currentTodoId: null,
          })
        }
        
      })
      .catch(err => console.log("UPDATE ERROR",err))
  }

  const markThisComplete = (id) => {
    markComplete(id)
      .then(data => {
        if(data.error){
          setValues({
            ...values,
            error: data.error
          })
          console.log("MARK COMPLETE", error)
        } else {
          setValues({
            ...values,
            flip: !flip,
          })
        }
      })
  }
  
  return(
    <div className="container">
      <div className="header mb-3 mt-3"> 
        <h1 className="text-center text-light heading display-4">TODO APP</h1>
        <span></span>
      </div>
      <div className="addTodos text-center mt-3 row">   
      <div className="input-group input-group-lg d-flex justify-content-center col-6 offset-3">
      <input 
            type="text" 
            className="form-control font-weight-bold w-75 todo-input text-dark"
            placeholder="Enter Todo"
            onChange={handleChange}
            value={todo}
          />
      <div className="input-group-append text-center">
      <button className="btn btn-primary" type="button" onClick={(e) => {
        e.preventDefault()
            if(update){
              updateThisTodo(currentTodoId, todo);
            } else {
              addMyTodo(todo)
            }
          }}>{update ? "Update" : "Add"}</button>
          <button className={`btn btn-primary ${update ? '' : 'd-none'}`} onClick={() => {
            setValues({
              ...values,
              todo: '',
              update: false,
            })
          }}>Cancel</button>
      </div>
      </div>        
        </div>
        <div className="todosList d-flex justify-content-center text-center mt-3">
          <ul className="list-group text-center w-50 list-style-none">
            {todosList?.map((t) => {
              return(
              <li className={`list-group-item ${t.isCompleted ? 'text-success' : 'text-primary'}`} key={t._id}>
              <div className="form-check">
              <input
              type="checkbox"
              className="float-left checkbox"
              onClick={() => {
                markThisComplete(t._id)
              }}
              checked={t.isCompleted ? true : false}
              />
              <label className="form-check-label h4 todo">
                {t.todo}
              </label>
              <button className="btn btn-danger float-right mx-1" onClick={() => removeTodo(t._id)} disabled={update ? true : false}>Delete</button>
              <button className="btn btn-info float-right mx-1" onClick={() => {
                setValues({
                  ...values,
                  todo: t.todo,
                  update: true,
                  currentTodoId: t._id,
                })                
              }}
              disabled={update ? true : false}
              >Edit</button>  
              </div>
                
                
                
              
              </li>
              )
            })}
          </ul>
        </div>
      </div>
  )
}

export default Todos;

// class Todos extends React.Component{
//   constructor(props){
//     super(props);

//     this.state = {
//       todo: '',
//       todosList: [],
//       todoId: '',
//     }

//     this.onTextBoxChange = this.onTextBoxChange.bind(this)
//     this.addTodo = this.addTodo.bind(this)
//     this.deleteTodo = this.deleteTodo.bind(this)
//     this.doneTodo = this.doneTodo.bind(this)
//   }

//   componentDidMount(){
//     const {todosList} = this.state
//     fetch("http://localhost:5000/api/todos")
//       .then(res => res.json())
//       .then(json => {
//         json.forEach((item, index) => {
//           this.setState({
//             todosList: [...this.state.todosList, item],
//             todo: ''
//           })
//         })
//       }
//     )
//   }

//   onTextBoxChange(event){
//     this.setState({
//       todo: event.target.value
//     })
//   }

//   addTodo(){
//     const {todo, todosList} = this.state
//     if(!todo){
//       console.log("error");
//     } else {
//       fetch("http://localhost:5000/api/add",
//       { method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           todo: todo,
//         })

//       }).then(res => res.json())
//         .then(json => {
//           if(json.success){
//             this.setState({
//               todosList: [...this.state.todosList, json],
//               todo: ''
//             })
//           }
//         })
//     }
  
//   }
  
//   deleteTodo(id){
//     const {todosList} = this.state
//     fetch('http://localhost:5000/api/delete/'+id, {
//       method: "GET"
//     })
//     .then(res => res.json)
//     .then(json => {
//       const newList = todosList.filter((todo) => todo._id !== id)
//       this.setState({
//         todosList: newList
//       })
//     }) 
//     .catch(err=> console.log(err))
    
//   }

//   doneTodo(){
    
//   }

//   render(){
//     const {todo, todosList} = this.state
    
//     const listItems = todosList.map((todo) =>{
//       return (
//       <li className="list-group-item" key={todo._id}>
//         <span>{todo.todo}</span>
//         <button className="float-right btn  btn-sm btn-primary mx-1" onClick={() => this.deleteTodo(todo._id)}>Delete</button>
//         <button className="float-right btn btn-sm btn-primary mx-1" onClick={this.doneTodo}>Done</button>
//       </li>
    
//       )
//       })
    
//     return(
//       <div className="container">
//         <div className="header mb-3"> 
//           <h1 className="text-center">TODO APP</h1>
//     <span></span>
//         </div>
//         <div className="addTodos text-center mt-3">
//           <input 
//             type="text" 
//             placeholder="Enter Todo"
//             onChange={this.onTextBoxChange}
//             value={todo}
//           />
//           <button className="btn btn-primary" onClick={this.addTodo}>Add</button>
//         </div>
//         <div className="todosList d-flex justify-content-center text-center mt-3">
//           <ul className="list-group text-center w-50 list-style-none">
//           {listItems}
//           </ul>
//         </div>
//       </div>
//     )
//   }
// }

