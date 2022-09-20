import React, { Component } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Dashboard, PeopleAlt } from '@mui/icons-material';
import * as S from './SideBar.styled';

export default class SideBar extends Component {
  render() {
    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <S.Nav to="/admin/dashboard">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary="DashBoard" />
                </ListItemButton>
              </ListItem>
            </S.Nav>

            <S.Nav to="/admin/student">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleAlt />
                  </ListItemIcon>
                  <ListItemText primary="Students" />
                </ListItemButton>
              </ListItem>
            </S.Nav>
          </List>
        </nav>
      </Box>
    );
  }
}
