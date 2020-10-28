import {deepPurple} from '@material-ui/core/colors';

const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: '100%',
      position: 'absolute',
      left: '0',
      width: '20%',
      boxShadow: '0px 0px 2px black',
      overflow: 'auto'
    },
    listItem: {
      cursor: 'pointer'
    },
    newChatBtn: {
      borderRadius: '1px',
      border: '1px solid'
    },
    createGroupBtn: {
      borderRadius: '1px',
      border: '1px solid'
    },
    unreadMessage: {
      width: '30px',
      position: 'absolute',
      top: '0',
      right: '5px'
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    img: {
      width: '10%',
      marginLeft: '2%'
    },
    icons: {
      marginLeft: '4%'
    }
  });
  
  export default styles;