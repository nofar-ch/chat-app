import React from 'react';
import styles from './styles';
import {FormControl, InputLabel, Input, Paper, withStyles, CssBaseline, Typography, Button} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import GroupIcon from '@material-ui/icons/Group';

var firebase = require('firebase')


class NewGroup extends React.Component {


    constructor() {
        super();
        this.state = {nameOfGroup: null,
                        manager: null,
                        friends: [],
                        users: [],
                        errorExistName: false,
                        errorUsersLength: false
        };
    }  

    componentDidMount = async () => {
        this.setState({manager: this.props.userEmail})
        await firebase
        .auth()
        .onAuthStateChanged(async user => {
        await firebase
        .firestore()
        .collection('users')
        .onSnapshot(async res => { //real time update
        const friends = res.docs.map((friend, index) => {
            if (friend.data().email !== user.email){
                
                return <div key={index}><Checkbox
                onChange={(e) => this.marked(e, friend.data().email)}
                inputProps={{ 'aria-label': 'primary checkbox' }}>
                </Checkbox>
                {friend.data().email}
                </div>
            }
            });
        this.setState({friends: friends});
        })
        })
}

    marked = (e, friendEmail) => {
        if(e.target.checked) { //chosen
            var addFriends = this.state.users;
            addFriends.push(friendEmail);
           this.setState({users: addFriends});
        }
        else 
        {
            var removeFriends = this.state.users;
            removeFriends = removeFriends.filter(friend => friend !== friendEmail);
            this.setState({users: removeFriends});
        }
    }

    userTyping = (e) => {
      this.setState({nameOfGroup: e.target.value});
    }

    createNewGroup = (groupObj) => {
        this.props.createNewGroupFn(groupObj)
    }

    submitNewGroup = (e) => {
        e.preventDefault();
        if(this.state.users.length < 2){
             this.setState({errorUsersLength : true});
        }
        else {
            var addManager = this.state.users;
            addManager.push(this.state.manager);
            this.setState({users: addManager});
            var groupObj = { nameOfGroup: this.state.nameOfGroup,
                                manager: this.state.manager,
                                users: this.state.users
                    };
            this.props.createNewGroupFn(groupObj);
        }
    }

    groupName = () => {
        this.setState({errorExistName: true})
    }

    render() {

        const {classes} = this.props;
        
        return (<main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
            <Typography component='h1' variant='h5'>Create A New Group! <GroupIcon style={{width: '35'}}/></Typography>
            <form className={classes.form} onSubmit={(e)=> this.submitNewGroup(e)}>
            <FormControl fullWidth>
                <InputLabel htmlform='name-of-group'>
                    Name Of The Group
                </InputLabel>
                <Input id='name-of-group' required className={classes.input} autoFocus 
                onChange={(e) => this.userTyping(e)}></Input>
            </FormControl>
            {
                this.state.friends
            }
            <Button type='submit' fullWidth className={classes.submit} variant='contained' color='primary'>
                    Add Group!
            </Button>
            </form>
            {
                this.state.errorExistName ?
                <div className={classes.errorText}>{this.state.errorExistName}</div> : null
            }
            {
                this.state.errorUsersLength ?
                <div className={classes.errorText}>To open a new group you need to select at least 2 friends</div> : null
            }
            </Paper>
            </main>)
    }
}
export default withStyles(styles)(NewGroup);