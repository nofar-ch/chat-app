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
      right: 0,
      bottom: '20px',
    }
  });
  
  export default styles;