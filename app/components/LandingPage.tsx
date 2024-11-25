'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface LandingPageProps {
  onEnter: () => void
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [showVideo, setShowVideo] = useState(false)

  const handleEnter = () => {
    setShowVideo(true)
    setTimeout(() => {
      onEnter()
    }, 12 * 1000) // 5 seconds for the video to play
  }

  return (
    <AnimatePresence>
      {!showVideo ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src="/images/signature.png"
              alt="Bob Ross Logo"
              width={300}
              height={200}
              className="mb-8"
            />
          </motion.div>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={handleEnter}
            className="bg-dark-primary text-black font-bold py-2 px-6 rounded-full text-lg hover:bg-dark-secondary transition duration-300"
          >
            Enter
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black flex items-center justify-center"
        >
          <iframe
            style={{ width: '100%', height: '56.25%' }}
            src="https://www.youtube.com/embed/gqdzXNsL_2o?si=VJK5tI5mHd0RJCMk&controls=0&autoplay=1"
            title="Bob Ross Welcome Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

