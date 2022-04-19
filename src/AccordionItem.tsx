import { type Item } from './lib'

interface Props<I extends Item = Item> {
  item: I
  expanded: boolean
}

function ExpandIcon({
  isExpanded,
  size,
}: {
  isExpanded: boolean
  size: number
}) {
  const d = isExpanded ? 'm7 10 5 5 5-5z' : 'm10 17 5-5-5-5v10z'
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" height={size} width={size}>
      <path d={d} />
    </svg>
  )
}

export default function AccordionItem<I extends Item = Item>({
  item,
  expanded,
}: Props<I>) {
  const isExpandable = Boolean(item.children.length)

  return (
    <div
      style={{
        position: 'relative',
        height: 38,
        display: 'flex',
        alignItems: 'center',
        cursor: isExpandable ? 'pointer' : 'default',
      }}
    >
      {isExpandable ? <ExpandIcon isExpanded={expanded} size={18} /> : null}
      {item.id}
    </div>
  )
}
