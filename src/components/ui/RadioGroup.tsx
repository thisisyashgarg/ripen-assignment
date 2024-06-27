import { forwardRef } from "react"
import { UseFormRegister } from "react-hook-form"

interface RadioGroupProps {
  label: string
  name: string
  options: { value: string; label: string }[]
  error?: string
  register: UseFormRegister<any>
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ label, name, options, error, register }, ref) => {
    return (
      <div className="space-y-2" ref={ref}>
        <label className="text-lg font-medium text-gray-700">{label}</label>
        <div className="flex gap-4">
          {options.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                value={option.value}
                {...register(name)}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    )
  }
)

RadioGroup.displayName = "RadioGroup"

export default RadioGroup
