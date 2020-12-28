const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing() * 3,
    marginRight: theme.spacing() * 3,
    [theme.breakpoints.up(400 + theme.spacing() * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
   
  },
  paper: {
    padding: `${theme.spacing() * 2}px ${theme.spacing() * 2}px ${theme.spacing() * 2}px`,
    position: 'absolute',
    width: '400px',
    top: '50px',
    left: 'calc(50% + 150px - 175px)',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing() * 3
  },
  errorText: {
    color: 'red',
    textAlign: 'center'
  },
  ol: {
    marginTop: 0,
    boxSizing: 'border-box',
    overflow: 'auto',
    height: '195px',
  },
   li: {
    padding: '10px 8px 10px 30px',
    background: '#eee',
    fontSize: '14px',
    transition: '0.2s'
   },
   liManager: {
    background: '#D3D3D3',
    fontSize: '14px',
    transition: '0.2s',
    padding: '10px 8px 10px 30px',
    
   },
   delete: {
    float: 'right',
    cursor: 'pointer'
  },
  btnAddUser: {
    cursor: 'pointer',
    position: 'absolute',
    right: '5px', 
    top: '5px', 
    width: '80',
    backgroundColor: 'white',
    color: 'black',
    border: '2px solid #008CBA'
  },
  btnExitGroup: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    backgroundColor: '#008CBA',
    color: 'white',
    border: '1px solid #008CBA',
    padding: '6px 18px'
  }
});

export default styles;