import { CssBaseline, Typography } from '@material-ui/core'
import * as React from 'react'
import { ViewProps } from '.'
import { SmartInput } from '../../components/SmartInput'
import { SmartOutput } from '../../components/SmartOutput'

export const MainPageView: React.SFC<ViewProps> = ({ classes }) => (
  <div className={classes.root}>
    <CssBaseline />
    <header className={classes.header}>
      <Typography className={classes.logo} variant="h2" noWrap>
        Spent
      </Typography>
    </header>
    <main className={classes.main}>
      <div className={classes.section}>
        <SmartOutput />
      </div>
    </main>
    <footer className={classes.footer}>
      <SmartInput />
    </footer>
  </div>
)
