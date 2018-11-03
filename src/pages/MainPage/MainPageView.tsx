import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Mail, MoveToInbox } from '@material-ui/icons'
import * as React from 'react'
import { ViewProps } from '.'
import { AccountsList } from '../../components/AccountsList'
import { CategoriesList } from '../../components/CategoriesList'
import { RecentTransactionList } from '../../components/RecentTransactionList'
import { SmartInput } from '../../components/SmartInput'

export const MainPageView: React.SFC<ViewProps> = ({
  transactions,
  accounts,
  categories,
  classes,
}) => (
  <div className={classes.root}>
    <CssBaseline />
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5" color="inherit" noWrap>
          Spent
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <MoveToInbox /> : <Mail />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <MoveToInbox /> : <Mail />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <SmartInput />
        </Grid>
        <Grid item xs={4}>
          <RecentTransactionList transactions={transactions} />
        </Grid>
        <Grid item xs={4}>
          <AccountsList accounts={accounts} />
        </Grid>
        <Grid item xs={4}>
          <CategoriesList categories={categories} />
        </Grid>
      </Grid>
    </main>
  </div>
)
