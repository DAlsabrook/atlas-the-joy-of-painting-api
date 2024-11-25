import { useState } from 'react'
import { motion } from 'framer-motion'

interface FilterSectionProps {
  title: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  singleSelect?: boolean
  includeNoneOption?: boolean
}


export default function FilterSection({
  title,
  options,
  selected,
  onChange,
  includeNoneOption = false,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = (option: string) => {
    if (option === 'None') {
      onChange([])
    } else {
      const updatedSelection = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option]
      onChange(updatedSelection)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-surface rounded-lg shadow-md p-4"
    >
      <button
        className="w-full text-left font-semibold text-lg mb-2 focus:outline-none text-dark-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title} {isOpen ? '▲' : '▼'}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? '20vh' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="h-full overflow-y-auto pr-2 space-y-2">
          {includeNoneOption && (
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.length === 0}
                onChange={() => handleToggle('None')}
                className="form-checkbox h-5 w-5 text-dark-secondary bg-dark-bg border-dark-text"
              />
              <span className="text-dark-text">None (All Months)</span>
            </label>
          )}
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => handleToggle(option)}
                className="form-checkbox h-5 w-5 text-dark-secondary bg-dark-bg border-dark-text"
              />
              <span className="capitalize text-dark-text">{option.replace('_', ' ')}</span>
            </label>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

