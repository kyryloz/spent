import { createStyles, Theme, withStyles } from '@material-ui/core'
import { SmartInput } from 'components/CliInput'
import { SmartOutput } from 'components/CliOutput'
import * as React from 'react'
import { Classes } from 'utils/styleUtils'

const styles = (theme: Theme) =>
  createStyles({
    main: {
      flex: 1,
      overflow: 'auto',
    },
    footer: {
      marginBottom: theme.spacing.unit * 4,
    },
  })

interface StyleProps {
  classes: Classes<typeof styles>
}

const TerminalPageCmp: React.SFC<StyleProps> = ({ classes }) => (
  <React.Fragment>
    <main className={classes.main}>
      <SmartOutput />
    </main>
    <footer className={classes.footer}>
      <SmartInput />
    </footer>
  </React.Fragment>
)

export const TerminalPage = withStyles(styles)(TerminalPageCmp)
