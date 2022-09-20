import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, SideBar } from '../Common';

import * as S from './Admin.styled';

class Admin extends Component {
  render() {
    return (
      <S.Root>
        <S.Header>
          <Header />
        </S.Header>
        <S.SideBar>
          <SideBar />
        </S.SideBar>
        <S.Main>
          <Outlet />
        </S.Main>
      </S.Root>
    );
  }
}

export default Admin;
