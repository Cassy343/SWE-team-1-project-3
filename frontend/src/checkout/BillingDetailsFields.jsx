import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const BillingDetailsFields = () => {
  return (
    <div style={{  textAlign: 'center',}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField fullWidth
            id="standard-basic" 
            variant="standard"
            type="text"
            label='Name'
            name='name'
            required
            inputProps={{ defaultValue: null }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth
            id="standard-basic" 
            variant="standard"
            type="email"
            label='Email'
            name='email'
            required
            inputProps={{ defaultValue: null }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth
            id="standard-basic" 
            variant="standard"
            type="text"
            label='Address'
            name='address'
            required
            inputProps={{ defaultValue: null }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth
            id="standard-basic" 
            variant="standard"
            type="text"
            label='City'
            name='city'
            required
            inputProps={{ defaultValue: null }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth
            id="standard-basic" 
            variant="standard"
            type="text"
            label='State'
            name='state'
            required
            inputProps={{ defaultValue: null }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth
            id="standard-basic" 
            variant="standard"
            type="text"
            label='Zip'
            name='zip'
            required
            inputProps={{ defaultValue: null }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BillingDetailsFields;