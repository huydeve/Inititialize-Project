import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

export const loading: SxProps<Theme> = [
    { position: 'absolute' },
    (theme) => ({ top: theme.spacing(-1), width: '100%' }),
]

export const container: SxProps<Theme> = [
    { position: 'relative' },
    (theme) => ({ paddingTop: theme.spacing(1) }),
]