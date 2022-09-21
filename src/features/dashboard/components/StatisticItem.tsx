import { connect } from 'react-redux';
import React, { Component, ReactElement } from 'react';
import * as S from './StatisticItem.styled';
import { Box, Typography } from '@mui/material';

type Props = {
  icon: ReactElement;
  label: string;
  value: string | number;
};

type State = {};

export class StatisticItem extends Component<Props, State> {
  state = {};

  render() {
    const { icon, label, value } = this.props;
    return (
      <S.PaperRoot>
        <Box>{icon}</Box>
        <Box>
          <Typography variant='h5' align='right'>{value}</Typography>
          <Typography variant='caption'>{label}</Typography>
        </Box>
      </S.PaperRoot>
    );
  }
}

export default connect()(StatisticItem);
