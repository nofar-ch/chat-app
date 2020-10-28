import React from 'react';
import styles from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send';

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class ChatTextBox extends React.Component {

    constructor() {
        super();
        this.state = {
            chatText: "",
            showEmojisMenu: false
        }
    }

    userTyping = (e) => {
        e.keyCode === 13 ?
        this.submitMessage() : this.setState({chatText : e.target.value})
    }

    messageValid = (text) => text && 
         text.replace(/\s/g, '').length; // check if text is't just spaces
    
    typingFocus = () => {
        this.props.MessageReadFn();
    }
    submitMessage = () => {
        if(this.messageValid(this.state.chatText)){
            this.props.submitMessageFn(this.state.chatText);
            document.getElementById('chatTextBox').value = ''; //clear the text box
        }
        this.setState({showEmojisMenu: false})
    }

    addEmoji = (e) => {
        let emoji = e.native;
        this.setState({chatText: this.state.chatText + emoji});
        document.getElementById('chatTextBox').value = document.getElementById('chatTextBox').value + emoji;
      }

      showEmojisMenu = () => {
          this.setState({showEmojisMenu : true},
            () => document.addEventListener("click", (e) => this.closeEmojisMenu(e)))
      }

      closeEmojisMenu = (e) => {
       const textBox =  document.getElementById('chatTextBox')
       if(textBox !== null && textBox.contains(e.target)) {
            this.setState({showEmojisMenu: false});
      }
    }

    render(){
        const {classes} = this.props;
        return (<div className={classes.chatTextBoxContainer}>
        {
            this.state.showEmojisMenu ?
            <span className={classes.emojiMenu}>
                <Picker onSelect={this.addEmoji} emojiTooltip={true}/>
            </span> : null
        }
        <div>
        <TextField placeholder='Typing your message...'
        onKeyUp={(e) => this.userTyping(e)}
            id='chatTextBox'
            className={classes.chatTextBox}
            onFocus={this.typingFocus}
        ></TextField>
        <SendIcon className={classes.sendBtn} onClick={this.submitMessage}></SendIcon>
        <p className={classes.emojiButton} onClick={(e) => this.showEmojisMenu(e)}>
            {String.fromCodePoint(0x1f60a)}
        </p>
        </div>
        </div>)
    }
}

export default withStyles(styles)(ChatTextBox);