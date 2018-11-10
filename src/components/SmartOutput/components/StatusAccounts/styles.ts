import { createStyles, Theme } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing.unit * 2,
    },
    body: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
    bodyTitle: {
      color: grey[300],
    },
    detailsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    amount: {
      color: theme.colors.number,
    },
    date: {
      color: theme.colors.date,
    },
    account: {
      color: theme.colors.account,
    },
  })
