import { createStyles, Theme } from '@material-ui/core'

export const styles = (theme: Theme) =>
  createStyles({
    body: {
      border: `1px solid ${theme.colors.expense}`,
      borderRadius: 5,
      padding: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
    bodyTitle: {
      color: theme.colors.expense,
    },
    amount: {
      color: theme.colors.number,
    },
    account: {
      color: theme.colors.account,
    },
    category: {
      color: theme.colors.category,
    },
    line: {
      borderTop: `1px solid ${theme.colors.expense}`,
      margin: '8px 0 8px 0',
      opacity: 0.3,
    },
  })
