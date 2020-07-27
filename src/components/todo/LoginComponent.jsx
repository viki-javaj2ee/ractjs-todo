import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: 'viki',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    render(){
        return(
            <div className="LoginComponent">
                    <h1>Login</h1>
                    <div className="container">
                    {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} />
                    <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage} /> */}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}

                    {/* User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/> */}
                    
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                   <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                   </div>
            </div>
        )
    }

    // handleUsernameChange(event){
    //     console.log(event.target.value);
    //     this.setState({username: event.target.value})
    // }

    // handlePasswordChange(event){
    //     console.log(event.target.value);
    //     this.setState({password: event.target.value})
    // }

    handleChange(event){
        console.log(event.target.name);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClicked(){
        console.log(this.state)
        // if (this.state.username === 'viki' && this.state.password === 'dummy') {
        //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     //  console.log('Successful')
        //     //  this.setState({showSuccessMessage: true})
        //     //  this.setState({hasLoginFailed: false})
        // } else {     
        //     console.log('Failed')
        //     this.setState({showSuccessMessage: false})
        //     this.setState({hasLoginFailed: true})
        // }
        
        AuthenticationService
        .executeBasicAuthenticationService(this.state.username,this.state.password)
        .then(()=>{
            AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
        }).catch(
            ()=>{
                this.setState({showSuccessMessage: false})
                this.setState({hasLoginFailed: true})
            }
        )
    }
}

export default LoginComponent