import { createStyles, Theme } from '@material-ui/core'
import { grey, teal } from '@material-ui/core/colors'

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing.unit * 2,
    },
    rawContent: {
      fontSize: 16,
    },
    body: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
    bodyTitle: {
      color: grey[500],
    },
    detailsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    date: {
      color: grey[700],
    },
    account: {
      color: teal[200],
    },
  })
