export default function ToDoListComponent()
{
    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDay());

    const todos =
        [

            { id: 1, description: 'Learn AWS', done: false, targetDate: targetDate },
            { id: 2, description: 'Learn Full Stack Dev', done: false, targetDate: targetDate },
            { id: 3, description: 'Learn DevOps', done: false, targetDate: targetDate },
            { id: 4, description: 'Learn Kubernetes', done: false, targetDate: targetDate }

        ]

    return (
        <div>
            <h1>Things you would want to Do</h1>

            <div>
                <table>
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
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toDateString()}</td>
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