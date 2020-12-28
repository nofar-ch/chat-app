const styles = theme => ({
    popup: {  
        position: 'fixed', 
        width: '100%', 
        height: '100%',  
        top: '0',  
        left: '0',  
        right: '0',  
        bottom: '0', 
        margin: 'auto',  
        backgroundColor: 'rgba(0,0,0, 0.5)'
      },
      popupInner: {  
        position: 'absolute',  
        left: '25%',
        right: '25%', 
        top: '25%',  
        bottom: '25%',
        margin: 'auto',
        borderRadius: '20px',  
        background: 'white',
        overflow: 'auto'
      },
      iconAddThisUser:{
          cursor: 'pointer',
          position: 'absolute',
          right: '5px', 
      },
      userList: {
        position: 'relative',
        width: '100%',
        overflow: 'auto',
        height: '150px',
      }, 
      li: {
        padding: '8px',
        margin: '8px',
        backgroundColor: '#E6E6FA'
      }
    });
    
    export default styles;