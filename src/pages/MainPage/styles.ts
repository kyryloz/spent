import { createStyles, Theme } from '@material-ui/core'

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: theme.palette.background.default,
      paddingLeft: theme.spacing.unit * 20,
      paddingRight: theme.spacing.unit * 20,
    },
    logo: {
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Roboto',
      fontWeight: 100,
    },
    header: {
      padding: theme.spacing.unit * 4,
    },
    main: {
      flex: 1,
      overflow: 'auto',
    },
    section: {
      height: '100%',
      overflow: 'auto',
      border: '1px solid #aaaaaa20',
      borderRadius: 5,
    },
    footer: {
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4,
    },
  })
