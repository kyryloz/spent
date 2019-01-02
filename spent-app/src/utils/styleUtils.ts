import { StyleRulesCallback } from '@material-ui/core'
import { CSSProperties, WithStyles } from '@material-ui/core/styles/withStyles'

export type Classes<
  T extends string | Record<string, CSSProperties> | StyleRulesCallback<string>
> = WithStyles<T>['classes']
