
const styles = theme => ({

    content: {
      height: 'calc(100vh - 18%)',
      overflow: 'auto',
      padding: '2%',
      marginLeft: '20%',
      boxSizing: 'border-box',
      top: '50px',
      width: '80%',
      position: 'absolute',
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
        width: '80%',
        height: '50px',
        backgroundColor: '#344195',
        position: 'fixed',
        right: '0',
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