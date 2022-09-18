interface FieldMessageProps {
  text?: string
}

export function FieldMessage({ text }: FieldMessageProps) {
  return <span className="text-red-400">{text}</span>
}
