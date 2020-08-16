import React from 'react'; 
import styles from './styles'; 
import {withStyles} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const PopupReaplaceManager = ({classes, text, users, currentManager, newManager, newManagerSelectedFn, doneNewManagerSelectedFn}) => {
  return (  
  <div className='popup'>  
  <div className='popupInner'>  
  <h3 style={{color: 'SeaGreen'}}>{text}</h3> 
  <ol>
     {
        users.filter(usr => usr != currentManager).map((item, index) => <li key={index}>{item}
        {
         newManager !== item ?
         <CheckCircleOutlineIcon className={classes.iconSelect} onClick={(e)=>newManagerSelectedFn(e, item)}/>
         : <CheckCircleOutlineIcon className={classes.newManagerSelected}/>
        }
        </li>)
        
     }
  </ol>
  <button onClick={(e) => doneNewManagerSelectedFn(e)}>Done</button>
  </div>  
  </div>  
);  
}  

export default withStyles(styles)(PopupReaplaceManager);