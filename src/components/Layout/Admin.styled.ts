import { styled } from '@mui/system';
import Box from '@mui/material/Box';

export const Root = styled(Box)({
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh',
});

export const Header = styled(Box)(({ theme }) => ({
    gridArea: 'header',
}));

export const SideBar = styled(Box)(({ theme }) => ({
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
}));

export const Main = styled(Box)(({ theme }) => ({
    gridArea: 'main',
    padding: theme.spacing(2, 3)
}));

