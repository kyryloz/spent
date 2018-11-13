import { createStyles, Theme } from '@material-ui/core'

export const styles = (theme: Theme) =>
  createStyles({
    amount: {
      color: theme.colors.number,
    },
    category: {
      color: theme.colors.category,
    },
  })
