import { useEffect, useState } from "react";
import { deleteTodoforUserNameByIdApi, retrieveAllTodosforUserNameApi } from "../api/ToDoApiService";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ToDoListComponent()
{
    //const today = new Date();
    //const targetDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDay());

    const authContext = useAuth();
    const userName = authContext.currUser;

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState();

    //useNavigate Hook to Redirect to different component
    const navigate = useNavigate();

    //Tell React that your component needs to do something after render.
    useEffect(() => { refreshTodos() }, [])

    function refreshTodos()
    {
        retrieveAllTodosforUserNameApi(userName)
            .then(response => 
            {
                //IF REsponse Payload is not Bound with Data - Set Blank ToDos - REinitialize
                if (response.data._embedded === undefined)
                {
                    setMessage(
                        <div>
                            To Dos List is  <strong>empty</strong> for <strong>{userName}</strong>!
                        </div>)
                    setTodos([])
                }
                else
                {
                    //Set from REsponse Embedded Node
                    setTodos(response.data._embedded.todoList)
                }

            })
            .catch(error => console.log(error))

        // retrieveAllTodosforUserNameSimple(userName)
        //     .then(response => 
        //     {
        //         console.log(response)
        //         setTodos(response.data)
        //     })
        //     .catch(error => console.log(error))
    }



    // const todos =
    //     [

    //         { id: 1, description: 'Learn AWS', done: false, targetDate: targetDate },
    //         { id: 2, description: 'Learn Full Stack Dev', done: false, targetDate: targetDate },
    //         { id: 3, description: 'Learn DevOps', done: false, targetDate: targetDate },
    //         { id: 4, description: 'Learn Kubernetes', done: false, targetDate: targetDate }

    //     ]

    function deleteTodo(userName, id)
    {

        deleteTodoforUserNameByIdApi(userName, id)
            .then(
                //1. display Message
                //2. Update To Dos table
                () => 
                {
                    setMessage(
                        <div>
                            Delete of todo with id = <strong>{id}</strong> is successful
                        </div>)

                    refreshTodos()


                }
            )
            .catch(error => console.log(error))

    }

    function addNewTodo()
    {
        navigate(`/todo/-1`)
    }

    function updateTodo(id)
    {
        navigate(`/todo/${id}`);
    }
    return (
        <div className="container">
            <h1>Things you would want to Do</h1>
            {message && <div className="alert alert-warning ">{message}</div>}
            <div style={{ margin: '10px', marginTop: '20px' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            todos && todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        {/* <td>{todo.targetDate.toDateString()}</td> */}
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button
                                            type="button"
                                            className="btn btn-warning"
                                            onClick={() => deleteTodo(userName, todo.id)}
                                        >
                                            Delete
                                        </button>
                                        </td>
                                        <td><button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() => updateTodo(todo.id)}
                                        >
                                            Update
                                        </button>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div className="btn btn-success m-5" onClick={addNewTodo}> Add New Todo</div>
        </div>
    )
}