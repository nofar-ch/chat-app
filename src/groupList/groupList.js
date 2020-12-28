import React from 'react';
import styles from './styles';
import {withStyles, CssBaseline, Paper, Typography, FormControl} from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PopupDeleteUser from '../popupDeleteUser/popupDeleteUser';
import PopupReaplaceManager from '../popupReplaceManager/popupReplaceManager';
import PopupAddUser from '../popupAddUser/popupAddUser';

class GroupList extends React.Component {

    constructor(){
        super();
        this.state = ({popupDeleteUser: false, 
                        popupReplaceManager: false, 
                        popupAddUser: false,
                        userToDelete: null,
                        newManager: null,
                        })

    }

    deleteUser = (e, item) => {
        this.setState({popupDeleteUser: true, userToDelete: item, 
            popupReplaceManager: false,
            popupAddUser: false});

    }

    yesToDelete = (e) => {
        e.preventDefault();
        this.setState({popupDeleteUser: false})
        this.props.delelteUserFromGroupListFn(this.state.userToDelete)
        
    }

    noToDelete = () => {
        this.setState({popupDeleteUser: false})
    }

    replaceManager = () => {
        this.setState({popupReplaceManager: true, popupDeleteUser: false, popupAddUser: false, newManager: null});
    }

    newManagerSelected = (e, item) => {
        this.setState({newManager: item})
    }

    doneNewManagerSelected = (e) => {
        e.preventDefault();
        this.props.doneReplaceManangerFn(this.state.newManager);
    }
    addUser = (e) => {
        e.preventDefault();
        this.setState({popupAddUser: true, popupReplaceManager: false, popupDeleteUser: false})
    }

    addThisUser = (e, user) => {
        this.props.addUserToGroupFn(user);
    }

    exitGroup = () => {
        this.props.exitGroupFn();
    }

    render() {
            const {classes, chat, userEmail, users} = this.props;
            if(chat === null || chat === undefined) // chat hasn't been updated yet
            return <div></div>
            else {
            const manager = chat.manager;
            const groupListSort = chat.users.sort();
            const groupList = groupListSort.map((item, index) => {
                return <div key={index}>
                {
                    userEmail !== manager && item !== manager? 
                    <li className={classes.li}>{item}</li> 
                    : 
                    userEmail !== manager && item === manager? 
                    <li className={classes.li}>{item} - Manager</li> 
                    :       
                    userEmail === manager && item !== manager? // just the manager can delete a user
                    <li className={classes.li}>{item}
                    <HighlightOffIcon className={classes.delete} onClick={(e) => this.deleteUser(e, item)}/> </li>
                    :  <li className={classes.liManager}>{manager} - Manager 
                        <HighlightOffIcon className={classes.delete} onClick={(e) => this.replaceManager(e, manager)}/></li>    
                }
                </div>
            })

            return (<main className={classes.main}>
            <CssBaseline></CssBaseline>
            <Paper className={classes.paper}>
                <Typography component='h1' variant='h5'>Group List of {chat.nameOfGroup}<GroupIcon style={{width: '35'}}/></Typography>
                <form className={classes.form} onSubmit={(e)=> this.submitNewGroup(e)}>
                <FormControl fullWidth>
                </FormControl>
                {
                    userEmail === manager ?
                    <button className={classes.btnAddUser} onClick={(e) => this.addUser(e)}>Add Users</button>
                    : null
                }
                {
                    <ol className={classes.ol}>
                        {groupList}
                    </ol>
                }
                {
                    this.state.popupDeleteUser ?
                    <PopupDeleteUser text="Are you sure to delete" userToDelete={this.state.userToDelete}
                        yesToDeleteFn={(e)=>this.yesToDelete(e)} NoToDeleteFn={this.noToDelete}
                    />
                    : null
                }
                {
                    this.state.popupReplaceManager ?
                    <PopupReaplaceManager text="Please select another manager" users={chat.users}
                    newManagerSelectedFn={(e, item) => this.newManagerSelected(e, item)}
                    doneNewManagerSelectedFn={(e) => this.doneNewManagerSelected(e)}
                    newManager={this.state.newManager}
                    currentManager={manager}
                    />
                    : null
                }
                {
                    this.state.popupAddUser ?
                    <PopupAddUser chat={chat} users={users} addThisUserFn={(e, item) => this.addThisUser(e, item)}/>
                    : null
                }
                </form>
                {
                    manager !== userEmail ? // not a manager
                <button className={classes.btnExitGroup} onClick={this.exitGroup}>Exit this group</button> 
                : null
                }  
                </Paper>
            </main>)
        }
    }
    }

export default withStyles(styles)(GroupList);