import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: any
}

export function Input({ register, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      {...register}
      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
    />
  )
}
