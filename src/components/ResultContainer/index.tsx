import React from 'react';
import { Grid } from '@mui/material';

interface ResultContainerProps {
  children: React.ReactNode;
}

const ResultContainer: React.FC<ResultContainerProps> = ({ children }) => {
  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center">
      {React.Children.map(children, (child, index) => (
        <Grid item xs={12} sm={4} md={4} key={index}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

export default ResultContainer;
