export namespace SmartInputModel {
  export interface State {
    readonly input: string
    readonly dirty: boolean
    readonly focus: boolean
    readonly history: Array<string>
    readonly historyPointer: number
  }
}
