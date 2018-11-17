import {
  createStyles,
  CssBaseline,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core'
import * as React from 'react'
import { SmartInput } from '../components/SmartInput'
import { SmartOutput } from '../components/SmartOutput'

namespace Component {
  export interface Props {}

  export interface State {}

  export type ViewProps = Props & State & WithStyles<typeof styles>
}

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

const View = withStyles(styles)(({ classes }: Component.ViewProps) => (
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
))

export class MainPage extends React.PureComponent<Component.State, Component.Props> {
  render() {
    return <View {...this.props} />
  }
}
