'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PaintingFilter from './components/PaintingFilter'
import LandingPage from './components/LandingPage'
import { FilterOptions } from '../types/painting'

// These would ideally come from your API or be stored in a constants file
const filterOptions: FilterOptions = {
  colors: ['black_gesso', 'bright_red', 'burnt_umber',
              'cadmium_yellow', 'dark_sienna', 'indian_red', 'indian_yellow',
              'liquid_black', 'liquid_clear', 'midnight_black', 'phthalo_blue',
              'phthalo_green', 'prussian_blue', 'sap_green', 'titanium_white',
              'van_dyke_brown', 'yellow_ochre', 'alizarin_crimson'],
  subjects: ['apple_frame','aurora_borealis','barn','beach',
              'boat','bridge','building','bushes','cabin','cactus','circle_frame',
              'cirrus','cliff','clouds','conifer','cumulus','deciduous','diane_andre',
              'dock','double_oval_frame','farm','fence','fire','florida_frame','flowers',
              'fog','framed','grass','guest','half_circle_frame','half_oval_frame','hills',
              'lake','lakes','lighthouse','mill','moon','mountain','mountains','night',
              'ocean','oval_frame','palm_trees','path','person','portrait',
              'rectangle_3d_frame','rectangular_frame','river','rocks','seashell_frame',
              'snow','snowy_mountain','split_frame','steve_ross','structure','sun','tomb_frame',
              'tree','trees','triple_frame','waterfall','waves','windmill','window_frame',
              'winter','wood_framed'],
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

