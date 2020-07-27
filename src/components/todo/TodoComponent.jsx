import React, {Component} from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';

class TodosComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount(){

        if(this.state.id===-1){
            return
        } else{
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
        }
    }

    validate(values){
        let errors={}

        if(!values.description){
            errors.description = 'Enter a Ddcription.'
        }else if(values.description.length<5){
            errors.description = 'Enter atleast 5 characters in description.'
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter valid targetdate.'
        }

        return errors
    }

    onSubmit(values){
        let username = AuthenticationService.getLoggedInUserName()
        let todo = {
            id: this.state.id,
            description:values.description,
            targetDate: values.targetDate
        }

        if(this.state.id===-1){
            TodoDataService.addTodo(username,todo)
                .then(()=>{this.props.history.push(`/todos`)})
        } else{
            TodoDataService.updateTodo(username,this.state.id,todo)
                .then(()=>{this.props.history.push(`/todos`)})
        }
    }


    render(){

        // let description = this.state.description
        // let targetDate = this.state.targetDate
        let {description,targetDate} = this.state

        return (
            <>
            <h1>Todo</h1>
            <div className="container">
                <Formik 
                    initialValues = {{description,targetDate}} 
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnBlur={false}
                    validateOnChange={false}
                    enableReinitialize={true}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning" />
                            <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description"/>
                                
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field className="form-control" type="date" name="targetDate"/>
                            </fieldset>
                            <button className="btn btn-success" type="submit">Save</button>
                        </Form>                            
                    )

                }
                </Formik>                
            </div>
        </>
        )
    }

}

export default TodosComponent