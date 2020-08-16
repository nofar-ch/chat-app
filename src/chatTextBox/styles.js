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
      bottom: '15px',
      left: '315px',
      boxSizing: 'border-box',
      overflow: 'auto',
      width: 'calc(100% - 300px - 50px)'
    },
  
    chatTextBox: {
      width: 'calc(100% - 25px)'
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