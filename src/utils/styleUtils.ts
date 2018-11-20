import { StyleRulesCallback, withStyles } from '@material-ui/core'
import { StyleRules } from '@material-ui/core/styles'
import { CSSProperties, WithStyles, WithStylesOptions } from '@material-ui/core/styles/withStyles'

export const createStyled = <
  ClassKey extends string,
  Options extends WithStylesOptions<ClassKey> = {}
>(
  styles: StyleRulesCallback<ClassKey> | StyleRules<ClassKey>,
  options?: Options
) => {
  const Styled = (props: any) => {
    const { children, classes, theme } = props

    return children(classes, theme)
  }

  return withStyles(styles, options)(Styled)
}

export type Classes<
  T extends string | Record<string, CSSProperties> | StyleRulesCallback<string>
> = WithStyles<T>['classes']
