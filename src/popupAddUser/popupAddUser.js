import React from 'react'; 
import styles from './styles'; 
import {withStyles} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
 
const PopupAddUser = ({classes, chat, users, addThisUserFn}) => {
  return (  
  <div className='popup'>  
  <div className='popupInner'>  
  <h2 style={{color: 'SeaGreen'}}>Add Users</h2>
  <ol>
  {
    users.map((item, index) => {
        if(!chat.users.includes(item.email))
            return <li key={index}>{item.email}
            <AddCircleOutlineIcon className={classes.iconAddThisUser} 
            onClick={(e) => addThisUserFn(e, item.email)}/>
              </li>
    })
  }
  </ol>
  </div>  
  </div>  
);  
}  

export default withStyles(styles)(PopupAddUser);