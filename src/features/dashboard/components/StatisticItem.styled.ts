import { styled } from "@mui/system";
import Paper from '@mui/material/Paper';
export const PaperRoot = styled(Paper)(({theme}) => (
    {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`
    }
))

// export const PaperRoot = styled(Paper)(({theme}) => (
//     {

//     }
// ))

// export const PaperRoot = styled(Paper)(({theme}) => (
//     {

//     }
// ))

// export const PaperRoot = styled(Paper)(({theme}) => (
//     {

//     }
// ))