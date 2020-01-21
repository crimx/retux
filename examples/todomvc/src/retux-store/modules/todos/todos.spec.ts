import { createReducer, Action } from 'retux'
import { actionHandlers, ActionCatalog } from './index'
import { state } from './state'

const todos = createReducer(state, actionHandlers)

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(todos(undefined, {} as Action<ActionCatalog>)).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: expect.stringMatching(/^\d+$/)
      }
    ])
  })

  it('should handle ADD_TODO', () => {
    expect(
      todos([], {
        type: 'TODOS$ADD',
        payload: 'Run the tests'
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: expect.stringMatching(/^\d+$/)
      }
    ])

    expect(
      todos(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: '0'
          }
        ],
        {
          type: 'TODOS$ADD',
          payload: 'Run the tests'
        }
      )
    ).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: '0'
      },
      {
        text: 'Run the tests',
        completed: false,
        id: expect.stringMatching(/^\d+$/)
      }
    ])

    expect(
      todos(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: '0'
          },
          {
            text: 'Run the tests',
            completed: false,
            id: '1'
          }
        ],
        {
          type: 'TODOS$ADD',
          payload: 'Fix the tests'
        }
      )
    ).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: '0'
      },
      {
        text: 'Run the tests',
        completed: false,
        id: '1'
      },
      {
        text: 'Fix the tests',
        completed: false,
        id: expect.stringMatching(/^\d+$/)
      }
    ])
  })

  it('should handle DELETE_TODO', () => {
    expect(
      todos(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: '0'
          },
          {
            text: 'Run the tests',
            completed: false,
            id: '1'
          }
        ],
        {
          type: 'TODOS$DELETE',
          payload: '1'
        }
      )
    ).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: '0'
      }
    ])
  })

  it('should handle EDIT_TODO', () => {
    expect(
      todos(
        [
          {
            text: 'Run the tests',
            completed: false,
            id: '1'
          },
          {
            text: 'Use Redux',
            completed: false,
            id: '0'
          }
        ],
        {
          type: 'TODOS$EDIT',
          payload: {
            text: 'Fix the tests',
            id: '1'
          }
        }
      )
    ).toEqual([
      {
        text: 'Fix the tests',
        completed: false,
        id: '1'
      },
      {
        text: 'Use Redux',
        completed: false,
        id: '0'
      }
    ])
  })

  it('should handle COMPLETE_TODO', () => {
    expect(
      todos(
        [
          {
            text: 'Run the tests',
            completed: false,
            id: '1'
          },
          {
            text: 'Use Redux',
            completed: false,
            id: '0'
          }
        ],
        {
          type: 'TODOS$COMPLETE',
          payload: '1'
        }
      )
    ).toEqual([
      {
        text: 'Run the tests',
        completed: true,
        id: '1'
      },
      {
        text: 'Use Redux',
        completed: false,
        id: '0'
      }
    ])
  })

  it('should handle COMPLETE_ALL_TODOS', () => {
    expect(
      todos(
        [
          {
            text: 'Run the tests',
            completed: true,
            id: '1'
          },
          {
            text: 'Use Redux',
            completed: false,
            id: '0'
          }
        ],
        {
          type: 'TODOS$COMPLETE_ALL'
        }
      )
    ).toEqual([
      {
        text: 'Run the tests',
        completed: true,
        id: '1'
      },
      {
        text: 'Use Redux',
        completed: true,
        id: '0'
      }
    ])

    // Unmark if all todos are currently completed
    expect(
      todos(
        [
          {
            text: 'Run the tests',
            completed: true,
            id: '1'
          },
          {
            text: 'Use Redux',
            completed: true,
            id: '0'
          }
        ],
        {
          type: 'TODOS$COMPLETE_ALL'
        }
      )
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: '1'
      },
      {
        text: 'Use Redux',
        completed: false,
        id: '0'
      }
    ])
  })

  it('should handle CLEAR_COMPLETED', () => {
    expect(
      todos(
        [
          {
            text: 'Run the tests',
            completed: true,
            id: '1'
          },
          {
            text: 'Use Redux',
            completed: false,
            id: '0'
          }
        ],
        {
          type: 'TODOS$CLEAR_COMPLETED'
        }
      )
    ).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: '0'
      }
    ])
  })

  it('should not generate duplicate ids after CLEAR_COMPLETED', () => {
    expect(
      [
        {
          type: 'TODOS$COMPLETE',
          payload: '0'
        } as const,
        {
          type: 'TODOS$CLEAR_COMPLETED'
        } as const,
        {
          type: 'TODOS$ADD',
          payload: 'Write more tests'
        } as const
      ].reduce(todos, [
        {
          id: '0',
          completed: false,
          text: 'Use Redux'
        },
        {
          id: '1',
          completed: false,
          text: 'Write tests'
        }
      ])
    ).toEqual([
      {
        text: 'Write tests',
        completed: false,
        id: '1'
      },
      {
        text: 'Write more tests',
        completed: false,
        id: expect.stringMatching(/^\d+$/)
      }
    ])
  })
})
