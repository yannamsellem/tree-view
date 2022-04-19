import { useCallback, useMemo } from 'react'

import { type Item } from './types'
import { composedPath } from './utils'

import './Accordion.css'

interface Props<I extends Item = Item> {
  expandedItems?: I['id'][]
  items: I[]
  item: I
  onChange?: (itemComposedPath: I['id'][], item: I) => void
  renderItem?: (item: I, expanded: boolean) => React.ReactNode
}

export default function Accordion<I extends Item = Item>({
  expandedItems,
  item,
  items,
  onChange,
  renderItem,
}: Props<I>) {
  const { id, children } = item
  const isExpanded = useMemo(
    () => Boolean(expandedItems?.includes(id)),
    [expandedItems, id],
  )
  const itemComposedPath = useMemo(() => composedPath(items, id), [items, id])

  const handleClick = useCallback(() => {
    const nextPath = isExpanded
      ? itemComposedPath.slice(0, -1)
      : itemComposedPath
    onChange?.(nextPath, item)
  }, [onChange, itemComposedPath, isExpanded, item])

  const isExpandable = Boolean(children.length)

  return (
    <div className="Accordion__container">
      <header className="Accordion__header">
        <button
          className="Accordion__trigger"
          type="button"
          aria-expanded={isExpanded}
          onClick={handleClick}
          id={`${id}-trigger`}
          aria-controls={`${id}-section`}
        >
          {renderItem?.(item, isExpanded)}
        </button>
      </header>
      {isExpanded && isExpandable && (
        <section
          id={`${id}-section`}
          className="Accordion__section"
          aria-labelledby={`${id}-trigger`}
        >
          {children.map(child => (
            <Accordion
              key={child.id}
              expandedItems={expandedItems}
              item={child}
              items={items}
              onChange={onChange}
              renderItem={renderItem}
            />
          ))}
        </section>
      )}
    </div>
  )
}

Accordion.defaultProps = {
  expandedItems: [],
  onChange: null,
  renderItem: null,
}
