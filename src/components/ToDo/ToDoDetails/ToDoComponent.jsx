import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from 'moment';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTodoforUserNameApi, retrieveTodoforUserNameByIdApi, updateTodoforUserNameByIdApi } from "../api/ToDoApiService";
import { useAuth } from "../security/AuthContext";

export default function ToDoComponent() 
{

    const { id } = useParams();
    const authContext = useAuth();
    const userName = authContext.currUser;
    //useNavigate Hook to Redirect to different component
    const navigate = useNavigate();

    const minDate = new Date();
    // const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDay() -1 );

    const [description, setDescription] = useState('');
    const [done, setDone] = useState('');
    const [targetDate, setTargetDate] = useState(minDate);

    useEffect(
        () => retrieveToDo4UserById(), [id]
    )


    function retrieveToDo4UserById()
    {
        if (id != -1)
        {
            retrieveTodoforUserNameByIdApi(userName, id)
                .then(response => 
                {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                    setDone(response.data.done)
                })
                .catch(error => console.log(error))

        }
    }

    function onSubmit(values)
    {
        console.log(values);
        const todo =
        {
            id: id,
            username: userName,
            description: values.description,
            targetDate: values.targetDate,
            done: values.done
        }

        console.log(todo);

        if (id != -1) //For an Update Scenario
        {
            console.log('update triggered');
            updateTodoforUserNameByIdApi(userName, id, todo)
                .then(response => 
                {
                    navigate('/todos')
                })
                .catch(error => console.log(error))
        }
        else //For the create Scenario
        {
            console.log('create triggered');
            createTodoforUserNameApi(userName, todo)
                .then(response => 
                {
                    navigate('/todos')
                })
                .catch(error => console.log(error))
        }

    }

    function validate(values)
    {
        let errors = {}

        if (values.description.length < 5)
        {
            errors.description = 'Enter atleast 5 characters'
        }

        if (moment(values.targetDate).isBefore(moment(minDate)) || (values.targetDate === ''))
        {
            console.log('Target Date: ' + moment(values.targetDate).format('l'))
            console.log('Today\'s Date: ' + moment(minDate).format('l'))
            errors.targetDate = 'Target Date should on or after today'
        }
        return errors;
    }


    return (
        <div className="container">
            <h1>Enter Todo Details!</h1>
            <div>
                <Formik initialValues={{ description, targetDate, done }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate" />
                                </fieldset>

                                <fieldset className="form-group" >
                                    <label>Is Done?</label>
                                    <Field type="checkbox" name="done" />
                                </fieldset>

                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-success m-5" >
                                        Save
                                    </button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>

        </div >
    )
}