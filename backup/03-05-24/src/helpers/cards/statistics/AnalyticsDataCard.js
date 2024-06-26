import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Stack, Typography } from '@mui/material';

// project-imports
import MainCard from 'componentss/organisms/mainCard/MainCard';

// assets
import { TrendDown, TrendUp } from 'iconsax-react';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticsDataCard = ({ color = 'primary', title, count, percentage, isLoss, children }) => (
  <MainCard content={false}>
    <Box sx={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography variant="h4" color="inherit">
            {count}
          </Typography>
          {percentage && (
            <Chip
              variant="combined"
              color={color}
              icon={
                <>
                  {!isLoss && <TrendUp variant="Bold" />}
                  {isLoss && <TrendDown variant="Bold" />}
                </>
              }
              label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 0.5, borderRadius: 1 }}
              size="small"
            />
          )}
        </Stack>
      </Stack>
    </Box>
    {children}
  </MainCard>
);

AnalyticsDataCard.propTypes = {
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.node
};

export default AnalyticsDataCard;
