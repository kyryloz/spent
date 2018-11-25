import { StyleRulesCallback } from '@material-ui/core'
import { CSSProperties, WithStyles } from '@material-ui/core/styles/withStyles'

export type Classes<
  T extends string | Record<string, CSSProperties> | StyleRulesCallback<string>
> = WithStyles<T>['classes']

type RC<P> = React.SFC<P> | React.ComponentClass<P>

type HOC<O, P> = (C: RC<O>) => RC<P>

// compose components from left to right
export const compose = <P>(C: RC<P>, ...hocs: HOC<any, any>[]): RC<P> =>
  hocs.reduce((g, f) => f(g), C)
