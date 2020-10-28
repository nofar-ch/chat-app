const styles = theme => ({

    sendBtn: {
      color: 'blue',
      cursor: 'pointer',
      '&:hover': {
        color: 'gray'
      }
    },
  
    chatTextBoxContainer: {
      position: 'absolute',
      bottom: '2px',
      height: '65px',
      left: '20%',
      boxSizing: 'border-box',
      overflow: 'auto',
      width: '80%'
    },
  
    chatTextBox: {
      width: '95%'
    },

    emojiButton: {
      cssFloat: "right",
      border: "none",
      margin: 0,
      cursor: "pointer"
    },

    emojiMenu: {
      position: "absolute",
      bottom: 15,
      right: 0,
      cssFloat: "right",
      marginLeft: "200px"
    }
  });
  
  export default styles;