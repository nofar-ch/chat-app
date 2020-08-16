import React from 'react';
import {Link} from 'react-router-dom'
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Logo from './edit.png';
import { firestore } from '../../node_modules/firebase';

const firebase = require("firebase");

class SignUp extends React.Component {

constructor() {
    super();
    this.state = {
        userName: null,
        email: null,
        password: null,
        passwordConf: null, 
        signupError: ''
    };
}
    submitSignUp = (e) => {
        e.preventDefault();
        if(!this.passwordIsConform()) //not conform
            this.setState({signupError: 'password not match'})
        else {
            if(this.state.password.length < 6)
            {
                this.setState({signupError: 'Password should be at least 6 characters'})
                return;

            }
            firebase
            .auth()  
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then( (authRes) => {
                const userObj = {
                    email: authRes.user.email,
                    userName: this.state.userName
                };
                firestore()
                .collection('users')
                .doc(this.state.email)
                .set(userObj)
                .then( () => {
                    this.props.history.push('/dashboard')
                }, dbError => {
                    //database error
                    this.setState({signupError : 'Failed to add user'});
                });
                },
                authError => {
                    //auth error
                    this.setState({signupError : 'Failed to add user'});
                });
    }
}
    
    userTyping = (type, e) => {
       if(e.target.value) {
            var input = e.target.value;
        switch(type) {
            case 'userName':
                this.setState({userName : input});
                break;
            case 'email':
                this.setState({email : input});
                break;
            case 'password':
                this.setState({password : input});
                break;
            case 'password-conformation':
                this.setState({passwordConf : input});
                break;
            default:
                break;
        }
        }
    }

    passwordIsConform = () => {
        return this.state.password === this.state.passwordConf;
    }

    render() {
    const {classes} = this.props;

        return (
            <main className={classes.main}>
            <CssBaseline></CssBaseline>
            <Paper className={classes.paper}>
    
    <Typography component='h1' variant='h4'>
        Sign Up!  
        <img src={Logo} style={{width: 30, marginLeft: 20}}/>
    </Typography>
    
    <form onSubmit={(e) => this.submitSignUp(e)} className={classes.form}>
    
    <FormControl required fullWidth margin='normal'>
    <InputLabel htmlFor='signup-name-input'>Enter your name</InputLabel>
    <Input type='text' autoFocus id='signup-name-input' onChange={(e) => this.userTyping('userName', e)}></Input>
    </FormControl>

    <FormControl required fullWidth margin='normal'>
    <InputLabel htmlFor='signup-email-input'>Enter your email</InputLabel>
    <Input autoComplete='email' onChange={(e) => this.userTyping('email', e)} id='signup-email-input'></Input>
    </FormControl>
   
    <FormControl required fullWidth margin='normal'>
    <InputLabel htmlFor='signup-password-input'>Create your password</InputLabel>
    <Input type='password' id='signup-password-input' onChange={(e) => this.userTyping('password', e)}></Input>
    </FormControl>

    <FormControl required fullWidth margin='normal'>
    <InputLabel htmlFor='signup-password-conformation-input'>Confirm your password</InputLabel>
    <Input type='password' id='signup-password-conformation-input' onChange={(e) => this.userTyping('password-conformation', e)}></Input>
    </FormControl>

<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Submit</Button>
    </form>
    {
        this.state.signupError ? //some error?
        <Typography className={classes.errorText} component='h5' variant='h6'>
            {this.state.signupError}
        </Typography>
        : null
    }
    <br/>
    <Typography component='h5' variant='h6' className={classes.hasAccountHeader}>Already has an account</Typography>
    <Link className={classes.logInLink} to='/login'>Log In!</Link>    </Paper>
    </main>
            
        )
    }
}

export default withStyles(styles)(SignUp);