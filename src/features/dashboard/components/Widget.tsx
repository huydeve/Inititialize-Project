import { Box, Typography } from '@mui/material';
import * as React from 'react';
import * as S from './Widget.styled';

export interface WidgetProps {
  title: string;
  children: React.ReactNode;
}

export default class Widget extends React.Component<WidgetProps> {
  public render() {
    const { title, children } = this.props;
    return (
      <S.Paper>
        <Typography variant='button'>{title}</Typography>
        <Box mt={2}>{children}</Box>
      </S.Paper>
    );
  }
}
