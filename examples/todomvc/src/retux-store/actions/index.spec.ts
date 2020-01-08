import { action } from './index'

describe('todo actions', () => {
  describe('Generated Actions', () => {
    it('TodosAdd should create ADD_TODO action', () => {
      expect(action.TodosAdd('Use Redux')).toEqual({
        type: 'TodosAdd',
        payload: 'Use Redux'
      })
    })

    it('TodosDelete should create DELETE_TODO action', () => {
      expect(action.TodosDelete('1')).toEqual({
        type: 'TodosDelete',
        payload: '1'
      })
    })

    it('TodosEdit should create EDIT_TODO action', () => {
      expect(action.TodosEdit('1', 'Use Redux everywhere')).toEqual({
        type: 'TodosEdit',
        payload: {
          id: '1',
          text: 'Use Redux everywhere'
        }
      })
    })

    it('TodosComplete should create COMPLETE_TODO action', () => {
      expect(action.TodosComplete('1')).toEqual({
        type: 'TodosComplete',
        payload: '1'
      })
    })

    it('TodosCompleteAll should create COMPLETE_ALL action', () => {
      expect(action.TodosCompleteAll()).toEqual({
        type: 'TodosCompleteAll'
      })
    })

    it('TodosClearCompleted should create CLEAR_COMPLETED action', () => {
      expect(action.TodosClearCompleted()).toEqual({
        type: 'TodosClearCompleted'
      })
    })
  })
})
