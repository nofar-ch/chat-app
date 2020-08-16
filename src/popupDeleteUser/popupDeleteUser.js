import React from 'react'; 
import styles from './styles'; 
import {withStyles} from '@material-ui/core';
 
const PopupDeleteUser = ({text, userToDelete, yesToDeleteFn, NoToDeleteFn}) => {
  return (  
  <div className='popup'>  
  <div className='popupInner'>  
  <h3 style={{color: 'SeaGreen'}}>{text+ ": "+ userToDelete}?</h3>
  {
    
  }  
  <button onClick={(e) => yesToDeleteFn(e)}>Yes</button>  
  <button onClick={NoToDeleteFn}>No</button>
  </div>  
  </div>  
);  
}  

export default withStyles(styles)(PopupDeleteUser);