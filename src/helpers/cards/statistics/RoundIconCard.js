import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project-imports
import MainCard from 'componentss/organisms/mainCard/MainCard';
import Avatar from 'components/@extended/Avatar';

// ============================|| STATISTICS - ROUND ICON CARD ||============================ //

const RoundIconCard = ({ primary, secondary, content, iconPrimary, color, bgcolor }) => {
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary /> : null;

  return (
    <MainCard>
      <Grid container alignItems="center" spacing={0} justifyContent="space-between">
        <Grid item>
          <Stack spacing={1}>
            <Typography variant="h5" color="inherit">
              {primary}
            </Typography>
            <Typography variant="h4">{secondary}</Typography>
            <Typography variant="subtitle2" color="inherit">
              {content}
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Avatar variant="rounded" sx={{ bgcolor, color }} size="lg">
            {primaryIcon}
          </Avatar>
        </Grid>
      </Grid>
    </MainCard>
  );
};

RoundIconCard.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  content: PropTypes.string,
  iconPrimary: PropTypes.object,
  color: PropTypes.string,
  bgcolor: PropTypes.string
};

export default RoundIconCard;
