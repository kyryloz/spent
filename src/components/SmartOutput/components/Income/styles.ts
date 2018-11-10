import { createStyles, Theme } from '@material-ui/core'
import { grey, green, teal } from '@material-ui/core/colors'

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing.unit * 2,
    },
    rawContent: {
      fontSize: 16,
    },
    body: {
      border: `1px solid ${green[300]}`,
      borderRadius: 5,
      padding: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
    bodyTitle: {
      color: green[300],
    },
    detailsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    amount: {
      color: grey.A100,
    },
    date: {
      color: grey[700],
    },
    account: {
      color: teal[200],
    },
    line: {
      borderTop: `1px solid ${green[300]}`,
      margin: '8px 0 8px 0',
      opacity: 0.3,
    },
  })
