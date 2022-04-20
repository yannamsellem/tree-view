import * as utils from '../utils'
import { type Item } from '../types'

describe('Utils', () => {
  describe('flatten', () => {
    it('should return a array', () => {
      const input: Item[] = [
        { id: '1', children: [] },
        { id: '2', children: [] },
      ]
      const output = utils.flatten(input)
      expect(output).toBeInstanceOf(Array)
      expect(output).toHaveLength(input.length)
    })

    it('should flatten items a N level', () => {
      const input: Item[] = [
        {
          id: '1',
          children: [
            {
              id: '1.1',
              parent: '1.1',
              children: [{ id: '1.1.1', parent: '1.1', children: [] }],
            },
          ],
        },
        { id: '2', children: [] },
      ]

      const expected: Item[] = [
        {
          id: '1',
          children: [
            {
              id: '1.1',
              parent: '1.1',
              children: [{ id: '1.1.1', parent: '1.1', children: [] }],
            },
          ],
        },
        { id: '2', children: [] },
        {
          id: '1.1',
          parent: '1.1',
          children: [{ id: '1.1.1', parent: '1.1', children: [] }],
        },
        { id: '1.1.1', parent: '1.1', children: [] },
      ]

      expect(utils.flatten(input)).toEqual(expected)
    })
  })

  describe('composedPath', () => {
    it('should return an array', () => {
      const input: Item[] = []
      const actual = utils.composedPath(input)
      expect(actual).toBeInstanceOf(Array)
      expect(actual).toHaveLength(0)
    })

    it('should returns an array of ids', () => {
      const input: Item[] = [{ id: '1', children: [] }]
      const id = '1'
      const actual = utils.composedPath(input, id)
      expect(actual).toHaveLength(1)
      expect(actual[0]).toEqual(id)
    })

    it('should return an empty array if the id is not provided', () => {
      const input: Item[] = [{ id: '1', children: [] }]
      const actual = utils.composedPath(input)
      expect(actual).toHaveLength(0)
    })

    it('should return an empty array if the id is not in the items', () => {
      const input: Item[] = [{ id: '1', children: [] }]
      const id = '2'
      const actual = utils.composedPath(input, id)
      expect(actual).toHaveLength(0)
    })

    it('should return an array of sorted parents of the id', () => {
      const input: Item[] = [
        {
          id: '1',
          children: [
            {
              id: '1.1',
              parent: '1',
              children: [{ id: '1.1.1', parent: '1.1', children: [] }],
            },
          ],
        },
        { id: '2', children: [] },
      ]
      const id = '1.1.1'
      const actual = utils.composedPath(input, id)
      expect(actual).toHaveLength(3)
      expect(actual).toStrictEqual(['1', '1.1', '1.1.1'])
    })

    it('should throw an error if there is a cycle parent/children on depth 1', () => {
      const input: Item[] = [
        {
          id: '1',
          children: [],
          parent: '1',
        },
        { id: '2', children: [] },
      ]

      const expected = 'Cycle parent/children found for item: 1'
      expect(() => utils.composedPath(input, '1')).toThrowError(expected)
    })

    it('should throw an error if there is a cycle parent/children on depth N', () => {
      const input: Item[] = [
        {
          id: '1',
          children: [
            {
              id: '1.1',
              parent: '1',
              children: [{ id: '1.1.1', parent: '1.1', children: [] }],
            },
          ],
          parent: '1.1.1',
        },
        { id: '2', children: [] },
      ]

      const expected = 'Cycle parent/children found for item: 1'
      expect(() => utils.composedPath(input, '1.1.1')).toThrowError(expected)
    })
  })
})
