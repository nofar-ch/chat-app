import React from 'react';
import ChatList from '../chatList/chatList'
import styles from './styles';
import {withStyles, Button} from '@material-ui/core';
import ChatView from '../chatView/chatView';
import ChatTextBox from '../chatTextBox/chatTaxtBox'
import NewChat from '../newChat/newChat'
import NewGroup from '../newGroup/newGroup'
import GroupList from '../groupList/groupList';

var firebase = require('firebase')

class Dashboard extends React.Component {

constructor() {
    super();
    this.state= {
        selectedChatIndex: null, //index
        newChatFormVisible: false,
        newGroupFormVisible: false,
        email: null,
        userName: null,
        chats: [],
        showGroupList: false,
        users: null
    };
}

componentDidMount = () => {
     firebase
    .auth()
    .onAuthStateChanged(async user => {
        if(!user) //user didn't login or don't exist
            this.props.history.push('/login'); 
        else {
            const ref = firebase.firestore();
            await ref.collection('chats')
            .where('users', 'array-contains', user.email)
            .onSnapshot(res => { //real time update 
                const chats = res.docs.map(doc => doc.data())
                 this.setState({
                    email: user.email,
                    chats: chats
                });
            })   
            await ref.collection('users')
            .onSnapshot(res => { //real time update
                const curUserName =  res.docs.map(curUser => curUser.data()).filter(curUser => curUser.email === user.email);
                const users =  res.docs.map(user => user.data())
                     this.setState({userName: curUserName[0].userName,
                                    users: users})
                })    
      }
    })
}

selectedChat = (chatIndex) => {
     this.setState({selectedChatIndex : chatIndex, newChatFormVisible: false, 
                         newGroupFormVisible: false, showGroupList: false}, () => this.MessageRead());
    
}

newChatBtnClicked = () => {
    this.setState({newChatFormVisible: true, selectedChatIndex: null, newGroupFormVisible : false});
}

newGroupBtnClicked = () => {
    this.setState({newGroupFormVisible: true});
}

signOut = () => firebase.auth().signOut();

clickedCheckWhereNotSender = (chatIndex) => {
    var messageLastIndex = this.state.chats[chatIndex].messages.length - 1;
    return this.state.chats[chatIndex].messages[messageLastIndex].sender !== this.state.email;
}

MessageRead = async () => {
    const selectedChatIndex = this.state.selectedChatIndex;
    const userFriend = this.state.chats[selectedChatIndex].users.filter(user => user !== this.state.email);

    if(this.clickedCheckWhereNotSender(this.state.selectedChatIndex)) //not a sender
    {
        if(this.state.chats[selectedChatIndex].type === 'private') { 
            const docKey = this.buildDocKey(userFriend[0]); //the user that not me
    
            await firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .update({
                receiverHasRead: true});
            }
        else //groop
            {
            const docKey = this.state.chats[selectedChatIndex].nameOfGroup; //the user that not me

            await firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .update({
                userIsRead: firebase.firestore.FieldValue.arrayUnion(
                    this.state.email)
            })

        }
        
    }
}
submitMessage = async (msg) => {
    const users = this.state.chats[this.state.selectedChatIndex]
    .users.filter(user => user !== this.state.email);
    var today = new Date();
    var now = today.getHours() + ":" + today.getMinutes()+'     '+today.getDate()+'/'+(today.getMonth()+1);

    if(this.state.chats[this.state.selectedChatIndex].type === 'private') {
        const docKey = this.buildDocKey(users[0]);

        await firebase
        .firestore().
        collection('chats')
        .doc(docKey)
        .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
            sender: this.state.email,
            message: msg,
            timestamp: now
        }),
        receiverHasRead: false
    });
    }
    else {
        const docKey = this.state.chats[this.state.selectedChatIndex].nameOfGroup;
        await firebase
        .firestore().
        collection('chats')
        .doc(docKey)
        .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
            sender: this.state.email,
            senderName: this.state.userName,
            message: msg,
            timestamp: now
        }),
        userIsRead: []
    })  
    }
}

buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

createNewChat = async (NewChatObj) => {
    var today = new Date();
    var now = today.getHours() + ":" + today.getMinutes()+'     '+today.getDate()+'/'+(today.getMonth()+1);

    const docKey = this.buildDocKey(NewChatObj.sendTo);
    console.log(docKey)
    await firebase
    .firestore()
    .collection('chats')
    .doc(docKey)
    .set({
        type: 'private',
        receiverHasRead: false,
        users: [this.state.email, NewChatObj.sendTo],
        usersNames: [this.state.userName, NewChatObj.sendToName],
        messages: [{
            message: NewChatObj.message,
            sender: this.state.email,
            timestamp: now
        }]
    });
    this.setState({newChatFormVisible : false});
    this.selectedChat(this.state.chats.length-1);
}

goToChat = (docKey, message) => {
    const userSeperate = docKey.split(':');
    const findChat = this.state.chats.find(chat => userSeperate.every(user => chat.users.includes(user)));
    this.setState({newChatFormVisible : false});
    const findChatIndex = this.state.chats.indexOf(findChat);
    this.selectedChat(findChatIndex);
    this.submitMessage(message);
}

createNewGroup = async (NewGroupObj) => {
    var today = new Date();
    var now = today.getHours() + ":" + today.getMinutes()+'     '+today.getDate()+'/'+(today.getMonth()+1);
    await firebase
    .firestore()
    .collection('chats')
    .doc(NewGroupObj.nameOfGroup)
    .set({
        type: 'group',
        nameOfGroup: NewGroupObj.nameOfGroup,
        manager: NewGroupObj.manager,
        users: NewGroupObj.users,
        messages: [{sender: NewGroupObj.manager,
                    senderName: this.state.userName,
                    timestamp: now,
                    message: 'welcome!'}]
    });
    this.setState({newGroupFormVisible : false});
    this.selectedChat(this.state.chats.length-1); // go to the group
}

deleteChat = async () => {
    const docKey = this.buildDocKey(this.state.chats[this.state.selectedChatIndex].
        users.filter(usr => usr != this.state.email))
    await firebase
    .firestore()
    .collection('chats')
    .doc(docKey)
    .delete();
}

showGroupList = () => {
    if(!this.state.showGroupList)
        this.setState({showGroupList: true})
}

delelteUserFromGroupList = async (userToDelete) => {
    const groupList = this.state.chats[this.state.selectedChatIndex].users.filter(usr => usr !== userToDelete)
    await firebase
    .firestore()
    .collection('chats')
    .doc(this.state.chats[this.state.selectedChatIndex].nameOfGroup)
    .update({
        users: groupList
    });
}

doneReplaceMananger = async (newManager) => {
    const docKey = this.state.chats[this.state.selectedChatIndex].nameOfGroup

    await firebase
    .firestore()
    .collection('chats')
    .doc(docKey)
    .update({
        manager: newManager
    })
    this.setState({showGroupList: false})
}

addUserToGroup = async (user) => {
    const docKey = this.state.chats[this.state.selectedChatIndex].nameOfGroup
    const groupList = this.state.chats[this.state.selectedChatIndex].users
    groupList.push(user)
    await firebase
    .firestore()
    .collection('chats')
    .doc(docKey)
    .update({
        users: groupList
    });
}

exitGroup = async () => {
    this.setState({showGroupList: false})
    const docKey = this.state.chats[this.state.selectedChatIndex].nameOfGroup
    const groupList = this.state.chats[this.state.selectedChatIndex].users
    const filterUser = groupList.filter(usr => usr != this.state.email)
    await firebase
    .firestore()
    .collection('chats')
    .doc(docKey)
    .update({
        users: filterUser
    });
    this.setState({showGroupList: false})
}

    render() 
    {
        const {classes} = this.props;

        return (<div>
        <ChatList history={this.props.history}
        newChatBtnFn={this.newChatBtnClicked}
        newGroupBtnFn={this.newGroupBtnClicked}
        selectedChatFn={this.selectedChat}
        chats={this.state.chats}
        userEmail={this.state.email}
        userName={this.state.userName}
        selectedChatIndex={this.state.selectedChatIndex}
        />

        {
            this.state.newChatFormVisible ||  this.state.newGroupFormVisible ? 
            null :
            <ChatView userEmail={this.state.email}
                chat={this.state.chats[this.state.selectedChatIndex]}
                chatIndex={this.state.selectedChatIndex}
                userName={this.state.userName}
                deleteChatFn={this.deleteChat}
                showGroupListFn={this.showGroupList}
            />
        }
        {
            this.state.selectedChatIndex !== null && ! this.state.newChatFormVisible ?
            <ChatTextBox submitMessageFn={this.submitMessage} MessageReadFn={this.MessageRead}/> : null

        }
        {
            this.state.newChatFormVisible ?
            <NewChat createNewChatFn={this.createNewChat} goToChatFn={this.goToChat}/> : null
        }
        {
            this.state.newGroupFormVisible ?
            <NewGroup userEmail={this.state.email} createNewGroupFn={this.createNewGroup}/> : null
        }
        {
            this.state.showGroupList ? 
            <GroupList chat={this.state.chats[this.state.selectedChatIndex]} 
                userEmail={this.state.email}
                users={this.state.users}
                delelteUserFromGroupListFn={this.delelteUserFromGroupList}
                doneReplaceManangerFn={this.doneReplaceMananger}
                addUserToGroupFn={this.addUserToGroup}
                exitGroupFn={this.exitGroup}
            /> : null
        }

        <Button className={classes.signOutBtn} onClick={this.signOut}>Sign Out</Button>
        </div>)
    }
}

export default withStyles(styles)(Dashboard);