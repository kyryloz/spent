import { createStyles, Theme } from '@material-ui/core'
import { amber, grey } from '@material-ui/core/colors'

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
    line: {
      borderTop: `1px solid ${amber[300]}`,
      margin: '8px 0 8px 0',
      opacity: 0.3,
    },
    category: {
      color: amber[200],
    },
  })
