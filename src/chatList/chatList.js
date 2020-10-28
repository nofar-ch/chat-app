import React from 'react';
import styles from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemIcon} from '@material-ui/core';
import Logo from './messenger.png';
import UnreadNotification from './unreadNotification.png';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AddCommentIcon from '@material-ui/icons/AddComment';

class ChatList extends React.Component {

    constructor(){
        super();
        this.state = ({isRead: false});

    }

    newChat = () => {
        this.props.newChatBtnFn();
    }

    selectChat = (index) => {
        this.props.selectedChatFn(index);
    }

    userIsSender = (chat) => {
        return chat.messages[chat.messages.length - 1].sender 
                    === this.props.userEmail;
    }
    newGroup = () => {
        this.props.newGroupBtnFn();

    }

    render(){

        const {classes, chats, userName} = this.props;
            if(chats != undefined) {
                return (<div>
                    <main className={classes.root}>
                    <h2>Hello {this.props.userName}!</h2>
                    <h1>Start To Chat!<img src={Logo} className={classes.img}/></h1>
                    <Button variant='contained' fullWidth color='primary' className={classes.newChatBtn}
                    onClick={this.newChat}>New Message <AddCommentIcon className={classes.icons}/></Button>
                    <Button variant='contained' fullWidth color='primary' className={classes.createGroupBtn}
                    onClick={this.newGroup}>New Group<GroupAddIcon className={classes.icons}/></Button>
                    {
                        chats.length > 0 ? 
                        <List>
                        {
                            chats.map((chat, index) => {
                                return (<div key={index}>
                                    <ListItem className={classes.listItem} onClick={() => this.selectChat(index)} selected={this.props.selectedChatIndex === index}
                                    alignItems='flex-start'>
                                    <ListItemAvatar>
                                    <Avatar className={classes.purple} alt='Remi Sharp'>
                                    {
                                        chat.type === 'private' ?
                                        chat.usersNames.filter(usr => usr !== userName)[0].split('')[0] 
                                        : chat.nameOfGroup.split('')[0]
                                    }
                                    {
                                    }</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={
                                        chat.type === 'private' ?
                                        chat.usersNames.filter(usr => usr !== userName)[0]
                                        : chat.nameOfGroup
                                    }
                                        secondary={
                                            <React.Fragment>
                                                <Typography component='span' color='textPrimary'>
                                                {
                                                    chat.messages[chat.messages.length - 1].message.substring(0, 30) //last message
                                                }
                                            </Typography>
                                            </React.Fragment>
                                        }>
                                    </ListItemText>
                                    {
                                        
                                        ((chat.receiverHasRead !== undefined && !chat.receiverHasRead && ! this.userIsSender(chat)) 
                                            || 
                                            (chat.userIsRead !== undefined && 
                                                ((chat.userIsRead.filter(user => user === this.props.userEmail)).length <= 0) && 
                                                ! this.userIsSender(chat))) ?
                                            <ListItemIcon>
                                                    <img className={classes.unreadMessage} src={UnreadNotification}/>
                                                </ListItemIcon>
                                                : null
                                    }
                                    </ListItem> 
                                    <Divider></Divider>
                                    </div>);
                            })
                        }
                        </List>
                        : null
                    }
                    </main>
                    
            
                    </div>)
            }
            else {
                return(
                <main className={classes.root}>
                    <Button variant='contained' fullWidth color='primary' className={classes.newChatBtn}
                    onClick={this.newChat}>New Message</Button>
                    <List></List>
                </main>);
            }
        }

} 
export default withStyles(styles)(ChatList);