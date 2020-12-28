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

const firebase = require("firebase");

class Login extends React.Component {

constructor() {
    super();
    this.state = {
        email: null,
        password: null,
        loginError: null
    };
}
submitLogIn = async  (e) => {
    e.preventDefault();
    
    await firebase
    .auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
        this.props.history.push('/');
    }, error => {
        this.setState({loginError: 'Server error'});
    });
}

userTyping = (type, e) => {
    if(e.target.value) {
        var input = e.target.value;
        switch (type) {
            case 'email':  
                this.setState({email: input});
                break;
            case 'password':
                this.setState({password: input});
                break
            default:
                break;

            }
        }
}

    render() {
        const {classes} = this.props;

        return (
        <main className={classes.main}>
        <CssBaseline></CssBaseline>
            <Paper className={classes.paper}>
                <Typography component='h1' variant='h4'>Log In!
                <img src="https://img.icons8.com/cotton/64/000000/login-rounded-right--v1.png" style={{width: 30, marginLeft: 10}}/>
                </Typography>

            
            <form className={classes.form} onSubmit={(e) => this.submitLogIn(e)}>
            <FormControl required fullWidth margin='normal'>
            <InputLabel htmlFor='login-email-input'>Enter your email</InputLabel>
            <Input autoComplete='email' autoFocus id='login-email-input' onChange={(e) => this.userTyping('email', e)}></Input>
            </FormControl>

            <FormControl required fullWidth margin='normal'>
            <InputLabel htmlFor='login-password-input'>Enter your password</InputLabel>
            <Input type='password' id='login-password-input' onChange={(e) => this.userTyping('password', e)}></Input>
            </FormControl>

            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Log In</Button>           
            </form>
            {
                this.state.loginError ? //some error?
                <Typography className={classes.errorText} component='h5' variant='h6'>
                    Incorrect Login Information
                </Typography> 
                : null
            }
            <br/>
            <Typography component='h6' variant='h6' className={classes.noAccountHeader}>Don't Have An Account?</Typography>                
            <Link className={classes.signUpLink} to='/signup'>Sign Up!</Link>
                
      </Paper>
        </main>
        )
    }
}

export default withStyles(styles)(Login);