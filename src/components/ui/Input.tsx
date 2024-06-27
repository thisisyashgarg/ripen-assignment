import { ComponentProps, forwardRef } from "react"
import clsx from "clsx"

type Props = {
  label: string
  name: string
  error?: string
} & ComponentProps<"input">

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, name, error, ...rest }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-lg font-medium text-gray-700">{label}</label>
        <input
          name={name}
          ref={ref}
          className={clsx(
            rest.type === "file"
              ? "mt-1 p-0 border-0 shadow-none w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              : "w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          )}
          {...rest}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
