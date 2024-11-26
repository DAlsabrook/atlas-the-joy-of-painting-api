'use client'

import { useState, useEffect } from 'react'
import { FilterOptions, Painting } from '../../types/painting'
import FilterSection from './FilterSection'
import PaintingGrid from './PaintingGrid'
import PaintingModal from './PaintingModal'
import { motion, AnimatePresence } from 'framer-motion'
import { useCallback } from 'react';
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

  const fetchPaintings = useCallback(async () => {
    setIsLoading(true);
    const queryParams = new URLSearchParams();
    if (selectedColors.length > 0) queryParams.set('color', selectedColors.join(','));
    if (selectedMonths.length > 0) queryParams.set('month', selectedMonths.join(','));
    if (selectedSubjects.length > 0) queryParams.set('subject', selectedSubjects.join(','));

    try {
      const response = await fetch(`/api/db/filter?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch paintings');
      }
      const data = await response.json();
      setPaintings(data);
    } catch (error) {
      console.error('Error fetching paintings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedColors, selectedMonths, selectedSubjects]);

  useEffect(() => {
    fetchPaintings();
  }, [fetchPaintings]);

  // const handleFilter = () => {
  //   fetchPaintings()
  // }

  const handleRemoveFilter = (filterType: string, value: string) => {
    switch (filterType) {
      case 'color':
        setSelectedColors(selectedColors.filter(color => color !== value))
        break
      case 'subject':
        setSelectedSubjects(selectedSubjects.filter(subject => subject !== value))
        break
      case 'month':
        setSelectedMonths(selectedMonths.filter(month => month !== value))
        break
    }
  }

  const clearAllFilters = () => {
    setSelectedColors([]);
    setSelectedSubjects([]);
    setSelectedMonths([]);
  };

  const renderSelectedFilters = () => {
    const allFilters = [
      ...selectedColors.map(color => ({ type: 'color', value: color })),
      ...selectedSubjects.map(subject => ({ type: 'subject', value: subject })),
      ...selectedMonths.map(month => ({ type: 'month', value: month }))
    ]

    return (
      <div className="flex flex-wrap items-center mb-4">
        {allFilters.map(({ type, value }) => (
          <motion.span
            key={`${type}-${value}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="inline-flex items-center bg-dark-primary text-dark-bg rounded-full px-3 py-1 text-sm mr-2 mb-2"
          >
            {value.replace('_', ' ')}
            <button
              onClick={() => handleRemoveFilter(type, value)}
              className="ml-2 focus:outline-none"
              aria-label={`Remove ${value} filter`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.span>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:grid md:grid-cols-3 gap-4 md:sticky top-0 z-10 bg-black pb-4"
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
        <div className="flex flex-wrap items-center justify-between col-span-3">
          <div className="flex-1 mr-4">
            {renderSelectedFilters()}
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAllFilters}
              className="bg-dark-primary text-dark-bg font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            >
              Clear All
            </motion.button>
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFilter}
              className="bg-dark-secondary text-dark-bg font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            >
              Apply Filters
            </motion.button> */}
          </div>
        </div>
      </motion.div>

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

