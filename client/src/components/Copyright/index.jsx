import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://www.beamery.com'>
        Beamery Graduates
      </Link>
      {'    '}
      {2019}
      {'.'}
    </Typography>
  );
};

export default Copyright;
