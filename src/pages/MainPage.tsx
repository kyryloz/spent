import { createStyles, CssBaseline, Theme, Typography, withStyles } from '@material-ui/core'
import * as React from 'react'
import { Classes } from 'utils/styleUtils'
import { TerminalPage } from './TerminalPage'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingLeft: '10%',
      paddingRight: '10%',
    },
    logo: {
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Roboto',
      fontWeight: 100,
    },
    header: {
      padding: theme.spacing.unit * 2,
    },
  })

interface StyleProps {
  classes: Classes<typeof styles>
}

const MainPageCmp: React.SFC<StyleProps> = ({ classes }) => (
  <div className={classes.root}>
    <CssBaseline />
    <header className={classes.header}>
      <Typography className={classes.logo} variant="h2" noWrap>
        Spent
      </Typography>
    </header>
    <TerminalPage />
  </div>
)

export const MainPage = withStyles(styles)(MainPageCmp)
