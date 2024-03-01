"use client"

import { ChangeEvent } from "react"

export function Input({
  label,
  onChange,
  ...rest
}: {
  label: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
} & Omit<React.HTMLProps<HTMLInputElement>, "onChange">) {
  return (
    <div className="flex flex-row gap-1 border-b w-full items-center">
      <label htmlFor={rest.id} className="font-medium basis-1/4 text-base">
        {label}
      </label>
      <input
        className="appearance-none w-full px-3 py-3 leading-tight focus:outline-none basis-3/4 text-base"
        style={{ background: "none" }}
        onChange={onChange}
        {...rest}
      />
    </div>
  )
}

export function TextArea({
  label,
  onChange,
  ...rest
}: {
  label: string
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
} & Omit<React.HTMLProps<HTMLTextAreaElement>, "onChange">) {
  return (
    <div className="flex flex-row gap-1 border-b  w-full items-center text-base">
      <label htmlFor={rest.id} className="font-medium basis-1/4">
        {label}
      </label>
      <textarea
        {...rest}
        className="appearance-none w-full px-3 py-3 leading-tight focus:outline-none basis-3/4 text-base"
        style={{ background: "none" }}
      />
    </div>
  )
}
