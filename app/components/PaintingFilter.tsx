'use client'

import { useState, useEffect } from 'react'
import { FilterOptions, Painting } from '../../types/painting'
import FilterSection from './FilterSection'
import PaintingGrid from './PaintingGrid'
import PaintingModal from './PaintingModal'
import { motion, AnimatePresence } from 'framer-motion'

interface PaintingFilterProps {
  filterOptions: FilterOptions
}

export default function PaintingFilter({ filterOptions }: PaintingFilterProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [paintings, setPaintings] = useState<Painting[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null)

  const fetchPaintings = async () => {
    setIsLoading(true)
    const queryParams = new URLSearchParams()
    if (selectedColors.length > 0) queryParams.set('color', selectedColors.join(','))
    if (selectedMonths.length > 0) queryParams.set('month', selectedMonths.join(','))
    if (selectedSubjects.length > 0) queryParams.set('subject', selectedSubjects.join(','))

    try {
      const response = await fetch(`/api/db/filter?${queryParams.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch paintings')
      }
      const data = await response.json()
      setPaintings(data)
    } catch (error) {
      console.error('Error fetching paintings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPaintings()
  }, [])

  const handleFilter = () => {
    fetchPaintings()
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 sticky top-0 z-10 bg-black pb-4"
      >
        <FilterSection
          title="Colors"
          options={filterOptions.colors}
          selected={selectedColors}
          onChange={setSelectedColors}
        />
        <FilterSection
          title="Subjects"
          options={filterOptions.subjects}
          selected={selectedSubjects}
          onChange={setSelectedSubjects}
        />
        <FilterSection
          title="Months"
          options={filterOptions.months}
          selected={selectedMonths}
          onChange={setSelectedMonths}
          includeNoneOption={true}
        />
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleFilter}
        className="w-full bg-dark-secondary text-dark-bg font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
      >
        Filter Paintings
      </motion.button>
      <PaintingGrid
        paintings={paintings}
        isLoading={isLoading}
        onPaintingClick={setSelectedPainting}
      />
      <AnimatePresence>
        {selectedPainting && (
          <PaintingModal painting={selectedPainting} onClose={() => setSelectedPainting(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

