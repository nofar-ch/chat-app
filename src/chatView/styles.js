
const styles = theme => ({

    mainContainerChatView: {
      position: 'relative',
      width: '80%',
      float: 'right',
      height: 'calc(100vh - 70px)'
  },
    content: {
      position: 'absulote',
      height: 'calc(100% - 50px)',
      overflow: 'auto',
      padding: '2%',
      boxSizing: 'border-box',
      top: '50px',
      width: '100%'
    },
  
    userSent: {
      float: 'left',
      clear: 'both',
      padding: '2%',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
      marginTop: '2%',
      backgroundColor: '#ADD8E6',
      color: 'black',
      width: '20%',
      borderRadius: '10px',
    },
  
    friendSent: {
      float: 'right',
      clear: 'both',
      padding: '2%',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
      marginTop: '2%',
      backgroundColor: '#E6E6FA',
      color: 'black',
      width: '20%',
      borderRadius: '10px', 
    },
  
    chatHeader: {
      position: 'absulote',
        width: '100%',
        height: '50px',
        backgroundColor: '#344195',
        right: '0',
        top: '2px',
        fontSize: '18px',
        textAlign: 'center',
        color: 'white',
        paddingTop: '10px',
        boxSizing: 'border-box'
      },

      timestamp: {
        fontSize: '10px',
        textAlign: 'right',
      
      },

      senderName: {
        color: 'blue',
        fontSize: '10px',
        float: 'left' 
      },
      btn: {
        position: 'absolute',
        left: '1%',
        textAlign: 'center',
      }
      
  });
  
  export default styles;