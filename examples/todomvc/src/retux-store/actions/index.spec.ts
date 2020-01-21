import { action } from './index'

describe('todo actions', () => {
  describe('Generated Actions', () => {
    it('TODOS$ADD should create ADD_TODO action', () => {
      expect(action.TODOS$ADD('Use Redux')).toEqual({
        type: 'TODOS$ADD',
        payload: 'Use Redux'
      })
    })

    it('TODOS$DELETE should create DELETE_TODO action', () => {
      expect(action.TODOS$DELETE('1')).toEqual({
        type: 'TODOS$DELETE',
        payload: '1'
      })
    })

    it('TODOS$EDIT should create EDIT_TODO action', () => {
      expect(action.TODOS$EDIT('1', 'Use Redux everywhere')).toEqual({
        type: 'TODOS$EDIT',
        payload: {
          id: '1',
          text: 'Use Redux everywhere'
        }
      })
    })

    it('TODOS$COMPLETE should create COMPLETE_TODO action', () => {
      expect(action.TODOS$COMPLETE('1')).toEqual({
        type: 'TODOS$COMPLETE',
        payload: '1'
      })
    })

    it('TODOS$COMPLETE_ALL should create COMPLETE_ALL action', () => {
      expect(action.TODOS$COMPLETE_ALL()).toEqual({
        type: 'TODOS$COMPLETE_ALL'
      })
    })

    it('TODOS$CLEAR_COMPLETED should create CLEAR_COMPLETED action', () => {
      expect(action.TODOS$CLEAR_COMPLETED()).toEqual({
        type: 'TODOS$CLEAR_COMPLETED'
      })
    })
  })
})
