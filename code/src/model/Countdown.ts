import { currentTimeInEpochMillis } from 'utils/TimeUtils.ts'
import { WidgetType } from 'model/WidgetType.ts'

export class Countdown {
  private _id: string
  private _name: string
  private _timeInMillis: number
  private _startedAtInEpochMillis: number
  private _remainingTimeInMillis: number

  constructor(id: string, name: string, timeInSeconds: number) {
    this._id = id
    this._name = name
    this._timeInMillis = timeInSeconds * 1000
    this._startedAtInEpochMillis = 0
    this._remainingTimeInMillis = 0
  }

  copy(): Countdown {
    const copy = new Countdown(this._id, this.name, this._timeInMillis / 1000)
    copy._startedAtInEpochMillis = this._startedAtInEpochMillis
    copy._remainingTimeInMillis = this._remainingTimeInMillis

    return copy
  }

  get type(): WidgetType {
    return 'countdown'
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get timeInMillis(): number {
    return this._timeInMillis
  }

  get remainingTimeInMillis(): number {
    const targetTimeInEpochMillis = this._startedAtInEpochMillis + this._timeInMillis
    const nowInEpochMillis = currentTimeInEpochMillis()
    this._remainingTimeInMillis = targetTimeInEpochMillis - nowInEpochMillis
    return this._remainingTimeInMillis
  }

  start(lagInMillis = 0): Countdown {
    const copy = this.copy()
    copy._startedAtInEpochMillis = currentTimeInEpochMillis() - lagInMillis

    return copy
  }

  continue(): Countdown {
    const copy = this.copy()
    const passedTimeInMillis = this._timeInMillis - this._remainingTimeInMillis
    copy._startedAtInEpochMillis = currentTimeInEpochMillis() - passedTimeInMillis

    return copy
  }

  isDone(): boolean {
    return this.remainingTimeInMillis <= 0
  }
}
