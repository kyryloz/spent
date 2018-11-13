import { createStyles, Theme } from '@material-ui/core'

export const styles = (theme: Theme) =>
  createStyles({
    amount: {
      color: theme.colors.number,
    },
    account: {
      color: theme.colors.account,
    },
  })
