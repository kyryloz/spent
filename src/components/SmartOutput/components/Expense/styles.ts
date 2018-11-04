import { createStyles, Theme } from '@material-ui/core'
import { grey, red, teal, amber } from '@material-ui/core/colors'

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit * 2,
    },
    rawContent: {
      fontSize: 16,
    },
    body: {
      border: `1px solid ${red[300]}`,
      borderRadius: 5,
      padding: theme.spacing.unit,
    },
    bodyTitle: {
      color: red[300],
    },
    detailsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    },
    amount: {
      color: grey.A100,
    },
    date: {
      color: grey[700],
    },
    account: {
      color: teal[200]
    },
    category: {
      color: amber[200]
    },
  })
