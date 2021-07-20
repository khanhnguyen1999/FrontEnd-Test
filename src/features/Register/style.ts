import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    form: {
      display: "flex",
      flexDirection: 'column',
      width: '100%',
      marginTop: theme.spacing(3),
    },
    formContainer: {
      display: 'flex',
      justifyContent: 'center'
    },
    submitButton: {
      marginTop: "10px"
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    selectionForm: {
      width: "100%",
      padding: "0px 30px"
    },
    login: {
      fontSize: "12px",
      marginTop: "10px",
      float: "right",
      marginRight: "20px"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    root: {
      maxWidth: '450px',
      display: 'block',
      margin: '0 auto',
    },
    textField: {
      '& > *': {
        width: '100%',
      },
    },
    title: { textAlign: 'center' },
    successMessage: { color: 'green' },
    errorMessage: { color: 'red' },
  })
);

export default useStyles