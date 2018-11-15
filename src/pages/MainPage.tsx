import {
  createStyles,
  CssBaseline,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core'
import * as React from 'react'
import { compose, pure, setDisplayName } from 'recompose'
import { SmartInput } from '../components/SmartInput'
import { SmartOutput } from '../components/SmartOutput'
import { withConnectedProps } from '../hoc/withConnectedProps'
import { App } from '../store/interface'

interface OutterProps {}

interface ConnectedProps {}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

type ViewProps = OutterProps & InnerProps & HandlerProps

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: theme.palette.background.default,
      paddingLeft: theme.spacing.unit * 20,
      paddingRight: theme.spacing.unit * 20,
    },
    logo: {
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Roboto',
      fontWeight: 100,
    },
    header: {
      padding: theme.spacing.unit * 4,
    },
    main: {
      flex: 1,
      overflow: 'auto',
    },
    footer: {
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4,
    },
  })

const View: React.SFC<ViewProps> = ({ classes }) => (
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

export const MainPage = compose<ViewProps, OutterProps>(
  withStyles(styles),
  withConnectedProps<ConnectedProps>(() => ({})),
  pure,
  setDisplayName('MainPage')
)(View)
