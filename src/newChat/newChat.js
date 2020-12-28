import React from 'react';
import styles from './styles';
import {FormControl, InputLabel, Input, Paper, withStyles, CssBaseline, Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
var firebase = require('firebase');

class NewChat extends React.Component {


    constructor(){
        super();
        this.state={
            userEmail: null,
            message: null,
            error: false,
            sendToName: null
        };
    }

    userTyping(type, e){
        switch(type){
            case 'userEmail':
                this.setState({userEmail: e.target.value})
                break;
            case 'message':
                this.setState({message: e.target.value})
                break;
            default:
                break;
        }
    }

    submitNewChat = async (e) => {
        e.preventDefault();
        const userExist = await this.userExist();
        if(userExist){
            const chatExist = await this.chatExist();
            chatExist ?
            this.goToChat() : this.createChat()
        }
        else {
            this.setState({error : true});
        }
    }

    sendDetailsNewChat = (name) => {
        this.props.createNewChatFn({
            sendTo: this.state.userEmail,
            message: this.state.message,
            sendToName: name
            });  
    }

    createChat = async () => {
        const user = await firebase
        .firestore()
        .collection('users').doc(this.state.userEmail);

        user.get().then((doc) => {
            if (doc.exists) {
                this.sendDetailsNewChat(doc.data().userName);  
            } 
            else {
                //user does not exist
            }       
        });        
    }

    goToChat = () => {
        this.props.goToChatFn(this.buildDocKey(), this.state.message);
    }

    buildDocKey = () => {
        return [firebase.auth().currentUser.email, this.state.userEmail].sort().join(':');
        
    }

    chatExist = async () => {
        const docKey = await this.buildDocKey();
        const chat = await firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .get();

        return chat.exists;
    }

    userExist = async () => {
        const userSnapShot = await firebase
        .firestore()
        .collection('users')
        .get();

        const exist = userSnapShot.docs.map(doc => doc.data().email)
        .includes(this.state.userEmail);
        const notMyUser = exist && (this.state.userEmail !== firebase.auth().currentUser.email); //also not my user email
        return notMyUser; 
}



    render(){

        const {classes} = this.props;
        return(
        <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
            <Typography component='h1' variant='h5'>Send A Message!</Typography>
            <form className={classes.form} onSubmit={(e)=> this.submitNewChat(e)}>
            
            <FormControl fullWidth>
                <InputLabel htmlform='new-chat-user-email'>
                    Enter Your Friends Email
                </InputLabel>
                <Input id='new-chat-user-email' required className={classes.input} autoFocus 
                onChange={(e) => this.userTyping('userEmail', e)}></Input>
            </FormControl>

             <FormControl fullWidth>
             <InputLabel htmlform='enter-your-message'>
                    Enter Your Message
                </InputLabel>
                <Input id='enter-your-message' required className={classes.input} 
                onChange={(e) => this.userTyping('message', e)}></Input>
                </FormControl><br/>
                {
                    this.state.error ?
                    <div className={classes.errorText}>this user does not exist</div> :
                    null
                }

                <Button type='submit' fullWidth className={classes.submit} variant='contained' color='primary'>
                    Submit
                </Button>
        </form>
        </Paper>
        
        
        </main>)
    }
}
export default withStyles(styles)(NewChat);