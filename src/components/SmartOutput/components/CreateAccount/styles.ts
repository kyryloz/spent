import { createStyles, Theme } from '@material-ui/core'

export const styles = (theme: Theme) =>
  createStyles({
    bodyTitle: {
      color: theme.colors.info,
    },
    account: {
      color: theme.colors.account,
    },
  })
