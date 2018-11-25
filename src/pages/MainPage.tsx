import { createStyles, CssBaseline, Theme, Typography, withStyles } from '@material-ui/core'
import { SmartInput } from 'components/SmartInput'
import { SmartOutput } from 'components/SmartOutput'
import * as React from 'react'
import { Classes } from 'utils/styleUtils'

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
    main: {
      flex: 1,
      overflow: 'auto',
    },
    footer: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 4,
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
    <main className={classes.main}>
      <SmartOutput />
    </main>
    <footer className={classes.footer}>
      <SmartInput />
    </footer>
  </div>
)

export const MainPage = withStyles(styles)(MainPageCmp)
