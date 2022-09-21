import { Paper as MUIPaper } from "@mui/material";
import { styled } from "@mui/system";

export const Paper = styled(MUIPaper)(({ theme }) => (
    {
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`
    }
))