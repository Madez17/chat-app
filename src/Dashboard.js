import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CTX} from './Store'


const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2),
        backgroundColor: '#00BFA8',
        color: '#FFF',
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
    },
    topicsWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey',
        backgroundColor: '#123045',
        color: '#FFFFFF',
        padding: '20px',
    },
    chatWindow: {
        width: '70%',
        height: '300px',
        backgroundColor: '#FFFFFF',
        color: '#0096A0',
        padding: '20px',
    },
    chatBox: {
        width: '85%',
        color: '#fff',
    },
    button: {
        width: '11%',
        backgroundColor: '#123045',
        color: '#fff',
        height: '48px',
        marginLeft: '17px',
    },
    buttonback: {
        color: '#fff',
        marginTop: '10px',
    },
    chip: {
        background: 'transparent',
        fontSize: '19px',
        color: '#00BFA8',
        fontWeight: '500',
    },
    message: {
        backgroundColor: '#00BFA861',
        color: '#123045',
        padding: '20px',
        borderRadius: '19px',
        fontWeight: '500',
    },
}));

export default function Dashboard() {
    const classes = useStyles();

    //CTX store
    const {allChats, sendChatAction} = React.useContext(CTX);
    const topics = Object.keys(allChats);

    //Local Store
    const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
    const [textValue, changeTextValue] = React.useState('');

    return (
        <div>
           <Paper className={classes.root}>
                <Typography variant="h4" component="h4">
                    Chat App
                </Typography>
                <Typography variant="h5" component="h5">
                    {activeTopic}
                </Typography>

                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem onClick={e => changeActiveTopic(e.target.innerText)} key={topic} button>
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                ))
                            }
                        </List> 
                    </div>

                    <div className={classes.chatWindow}>
                        {
                            allChats[activeTopic].map((chat, i) => (
                                <div className={classes.flex} key={i}>
                                    <Chip label={chat.from} className={classes.chip}/>
                                    <Typography variant="body1" gutterBottom className={classes.message}>{chat.msg}
                                    </Typography>
                                </div>
                            ))
                        }

                    </div>

                </div>
                <div className={classes.flex, classes.buttonback}>
                    <TextField
                      id="standard-name"
                      placeholder="Send a chat"
                      className={classes.chatBox}
                      value={textValue}
                      onChange={e => changeTextValue(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        color='' 
                        className={classes.button}
                        onClick={() => {
                            sendChatAction(textValue);
                            changeTextValue('');
                        }}
                    >
                        Send
                    </Button>
                </div>
            </Paper> 
        </div>
    )
}
