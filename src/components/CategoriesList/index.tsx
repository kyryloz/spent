import { List, ListItem, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { Categories } from '../../store/categories/interface'

interface Props {
  categories: Array<Categories.Category>
}

export const CategoriesList: React.SFC<Props> = ({ categories }) => (
  <div>
    <List component="nav">
      {categories.map(category => (
        <ListItem key={category.id}>
          <ListItemText primary={category.name} />
        </ListItem>
      ))}
    </List>
  </div>
)
