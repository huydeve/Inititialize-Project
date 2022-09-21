import { SxProps, Theme } from "@mui/material"
import theme from "../../../theme"

export const root: SxProps<Theme> = (theme) => ({
    position: 'relative',
    padding: theme.spacing(1)
})
export const loading: SxProps<Theme> = {
    position: 'absolute',
    width: '100%',
    top: theme.spacing(-1)
}
export const titleContainer: SxProps<Theme> = [(theme) => ({
    display: 'flex',
    flexGrow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4)
})]

export const containerPagination = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

}

