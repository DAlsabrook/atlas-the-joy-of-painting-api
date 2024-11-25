'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PaintingFilter from './components/PaintingFilter'
import LandingPage from './components/LandingPage'
import { FilterOptions } from '../types/painting'

// These would ideally come from your API or be stored in a constants file
const filterOptions: FilterOptions = {
  colors: ['bright_red', 'cadmium_yellow', 'titanium_white', 'phthalo_blue', 'sap_green'],
  subjects: ['bushes', 'cabin', 'conifer', 'lake', 'mountain', 'trees', 'waterfall'],
  months: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
}

export default function Home() {
  const [showMainContent, setShowMainContent] = useState(false)

  return (
    <main className="min-h-screen bg-black">
      <AnimatePresence>
        {!showMainContent && (
          <LandingPage onEnter={() => setShowMainContent(true)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showMainContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <PaintingFilter filterOptions={filterOptions} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

