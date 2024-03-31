import { useEffect, useState } from "react";
import { retrieveAllTodosforUserName } from "../api/ToDoApiService";
import { useAuth } from "../security/AuthContext";

export default function ToDoListComponent()
{
    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDay());

    const authContext = useAuth();
    const userName = authContext.currUser;

    const [todos, setTodos] = useState([]);

    //Tell React that your component needs to do something after render.
    useEffect(
        () => refreshTodos()
    )

    function refreshTodos()
    {
        retrieveAllTodosforUserName(userName)
            .then(response => 
            {
                console.log(response)
                setTodos(response.data._embedded.todoList)
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

    return (
        <div className="container">
            <h1>Things you would want to Do</h1>

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Description</td>
                            <td>Is Done?</td>
                            <td>Target Date</td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            todos && todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        {/* <td>{todo.targetDate.toDateString()}</td> */}
                                        <td>{todo.targetDate.toString()}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}