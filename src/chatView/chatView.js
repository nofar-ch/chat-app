import React from 'react';
import styles from './styles';
import {withStyles, Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class ChatView extends React.Component {


    componentDidUpdate = async () => {
        const container = await document.getElementById('chatView-container');
        if(container)
            container.scrollTo(0, container.scrollHeight);
        }

    deleteChat = () => {
        this.props.deleteChatFn();
    }

    showGroupList = () => {
        this.props.showGroupListFn();
    }

    render(){
        const {classes, chat, userEmail}= this.props;

        if(chat === undefined) {
            return (<main className={classes.content}></main>)
        }
        else {
            return(<div>
                <div className={classes.chatHeader} style={{marginTop: '0px'}}>
                    { 
                        chat.type === 'private' ?
                        <div>
                            <div style={{position: 'absolute', left: 'auto', textAlign: 'center'}}>
                            <Button variant="contained" color="default" size="small" startIcon={<DeleteIcon/>} onClick={()=>this.deleteChat()}>delete </Button></div>
                            You are chatting with {chat.usersNames.filter(usr => usr !== this.props.userName)[0]}
                        </div>
                        :<div>
                            <div style={{position: 'absolute', left: 'auto', textAlign: 'center'}}>
                            <Button variant="contained" color="default" size="small"  onClick={()=>this.showGroupList()} style={{padding: '3px'}}>friends list</Button></div>
                            You are chatting with {chat.nameOfGroup}
                        </div>
                    }
                </div>
            
            <main id='chatView-container' className={classes.content}><br/><br/><br/>
                {
                    chat.messages.map((msg, index) => {                        
                    return (<div key={index} className={msg.sender === userEmail ? classes.userSent : classes.friendSent}>
                    {
                        msg.sender !== userEmail ?
                        <div className={classes.senderName}>{msg.senderName}</div> : null
                    }
                    <div className={classes.timestamp}>{msg.timestamp}</div>
                    {msg.message}</div>)})
                }
            </main>
            </div>)
        }
        
    }
}

export default withStyles(styles)(ChatView);