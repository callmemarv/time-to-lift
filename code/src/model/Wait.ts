import { WidgetType } from 'model/WidgetType.ts'

export class Wait {
  private _id: string
  private _name: string
  private _isDone: boolean

  constructor(id: string, name: string) {
    this._id = id
    this._name = name
    this._isDone = false
  }

  copy(): Wait {
    const copy = new Wait(this._id, this.name)
    copy._isDone = this._isDone

    return copy
  }

  get type(): WidgetType {
    return 'wait'
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  start(): Wait {
    return this
  }

  continue(): Wait {
    const copy = this.copy()
    copy._isDone = true

    return copy
  }

  isDone(): boolean {
    return this._isDone
  }
}
