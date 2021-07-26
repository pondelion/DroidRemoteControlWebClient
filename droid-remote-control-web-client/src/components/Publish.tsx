import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { PubSubHelper } from '../utils/PubSub';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    textAlign: 'left',
    width: '25ch',
  },
}));

type Props = {
}

const Publish: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [topic, setTopic] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');

  return (
    <div>
      <div style={{textAlign: 'left'}}>
        <TextField
          id="topic"
          label="TOPIC"
          placeholder="TOPIC"
          variant="outlined"
          className={classes.textField}
          onChange={(event: any) => { setTopic(event.target.value); }}
        />
      </div>
      <div>
        <TextField
          id="message"
          label="Message"
          style={{ margin: 8 }}
          placeholder="Message"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(event: any) => { setMessage(event.target.value); }}
        />
      </div>
      <div style={{textAlign: 'right'}}>
        <Button
          variant="contained"
          color="secondary"
          onClick={(event: any) => { 
            PubSubHelper.publish(topic, message);
          }}
        >
          SEND
        </Button>
      </div>
    </div>
  )

}

export default Publish;
