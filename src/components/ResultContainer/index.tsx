import React from 'react';
import { Grid } from '@mui/material';

const ResultContainer: React.FC<{ cards: React.ReactNode[] }> = ({ cards }) => {
  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center">
      {cards.slice(0, 12).map((card, index) => (
        <Grid item xs={12} sm={4} md={4} key={index}>
          {card}
        </Grid>
      ))}
    </Grid>
  );
};

export default ResultContainer;
