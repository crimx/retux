import React, { FC, useState } from 'react'

type ActionType = 'INCREMENT' | 'DECREMENT'

export interface CounterProps {
  count: number
  title: string
  onClick: (
    type: ActionType,
    step: number,
    delay: number,
    thunk: boolean,
    promise: boolean
  ) => void
}

export const Counter: FC<CounterProps> = props => {
  const [type, setType] = useState<ActionType>('INCREMENT')
  const [step, setStep] = useState(1)
  const [delay, setDelay] = useState(1000)

  const [thunk, setThunk] = useState(true)
  const [promise, setPromise] = useState(false)

  return (
    <div className="card" style={{ maxWidth: 800, minWidth: 400, margin: 15 }}>
      <div className="card-content">
        <h4 className="label is-large">{props.title}</h4>
        <hr />
        <div className="field">
          <label className="label">Count</label>
          <div className="control">
            <input
              className="input"
              type="text"
              readOnly
              disabled
              value={props.count}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Action Type</label>
          <div className="control">
            <div className="select">
              <select
                value={type}
                onChange={e => setType(e.currentTarget.value as ActionType)}
              >
                <option value="INCREMENT">INCREMENT</option>
                <option value="DECREMENT">DECREMENT</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Step</label>
          <div className="control">
            <input
              className="input"
              type="number"
              value={step}
              onChange={e => setStep(Number(e.currentTarget.value) | 1000)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Delay</label>
          <div className="control has-icons-right">
            <input
              className="input"
              type="number"
              value={delay}
              onChange={e => setDelay(Number(e.currentTarget.value) | 1000)}
            />
            <span className="icon is-small is-right">ms</span>
          </div>
        </div>
        <div className="field">
          <label className="checkbox" style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={thunk}
              onChange={e => setThunk(e.currentTarget.checked)}
            />
            Thunk
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={promise}
              onChange={e => setPromise(e.currentTarget.checked)}
            />
            Promise
          </label>
        </div>
        <div className="field">
          <p className="control">
            <button
              className="button is-success"
              onClick={() => props.onClick(type, step, delay, thunk, promise)}
            >
              Send Action
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
