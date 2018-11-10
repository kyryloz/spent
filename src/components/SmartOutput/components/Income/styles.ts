import { createStyles, Theme } from '@material-ui/core'

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing.unit * 2,
    },
    rawContent: {
      fontSize: 16,
    },
    body: {
      border: `1px solid ${theme.colors.income}`,
      borderRadius: 5,
      padding: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
    bodyTitle: {
      color: theme.colors.income,
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
    line: {
      borderTop: `1px solid ${theme.colors.income}`,
      margin: '8px 0 8px 0',
      opacity: 0.3,
    },
  })
