import { useCallback, useMemo } from 'react'

import { type Item } from './types'
import { composedPath } from './utils'

import './Accordion.css'
import { useIsExpanded } from './ExpandContext'

interface Props<I extends Item> {
  items: I[]
  item: I
  onChangeRef: React.MutableRefObject<
    ((itemComposedPath: I['id'][], item: I) => void) | undefined
  >
  ItemComponent: React.ComponentType<{ item: I; expanded: boolean }>
}

export default function Accordion<I extends Item>({
  item,
  items,
  onChangeRef,
  ItemComponent,
}: Props<I>) {
  const { id, children } = item
  const isExpanded = useIsExpanded(id)

  const itemComposedPath = useMemo(() => composedPath(items, id), [items, id])

  const handleClick = useCallback(() => {
    const nextPath = isExpanded
      ? itemComposedPath.slice(0, -1)
      : itemComposedPath
    onChangeRef.current?.(nextPath, item)
  }, [isExpanded, itemComposedPath, onChangeRef, item])

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
          <ItemComponent item={item} expanded={isExpanded} />
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
              item={child}
              items={items}
              onChangeRef={onChangeRef}
              ItemComponent={ItemComponent}
            />
          ))}
        </section>
      )}
    </div>
  )
}
