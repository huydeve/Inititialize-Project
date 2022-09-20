import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';

export const Nav = styled(NavLink)(({ theme }) => (
    {
        color: 'inherit',
        textDecoration: 'none',
        '&.active > li': {
            backgroundColor: theme.palette.action.selected
        },
    }
))