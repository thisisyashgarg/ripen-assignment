import React, { forwardRef } from "react"

type Props = {
  label: string
  name: string
  options: { value: string; label: string }[]
  error?: string
} & React.ComponentProps<"select">

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, name, options, error, ...rest }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-lg font-medium text-gray-700">{label}</label>
        <select
          {...rest}
          name={name}
          ref={ref}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    )
  }
)

Select.displayName = "Select"

export default Select
