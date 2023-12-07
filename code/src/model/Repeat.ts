import { WidgetType } from 'model/WidgetType.ts'

export class Repeat {
  private _id: string
  private _name: string
  private _times: number

  constructor(id: string, name: string, times: number) {
    this._id = id
    this._name = name
    this._times = times
  }

  copy(): Repeat {
    return new Repeat(this._id, this.name, this._times)
  }

  get type(): WidgetType {
    return 'repeat'
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get times(): number {
    return this._times
  }

  // TODO: Remove this
  start(): Repeat {
    return this
  }

  // TODO: Remove this
  continue(): Repeat {
    return this
  }

  // TODO: Remove this
  isDone(): boolean {
    return false
  }
}
