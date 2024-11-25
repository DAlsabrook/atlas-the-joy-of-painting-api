import Image from 'next/image'
import { Painting } from '../../types/painting'
import { motion } from 'framer-motion'
import Masonry from 'react-masonry-css'

interface PaintingGridProps {
  paintings: Painting[]
  isLoading: boolean
  onPaintingClick: (painting: Painting) => void
}

export default function PaintingGrid({ paintings, isLoading, onPaintingClick }: PaintingGridProps) {
  if (paintings.length === 0 && !isLoading) {
    return (
      <div className="text-center text-dark-text mt-8">
        No paintings found. Try adjusting your filters.
      </div>
    )
  }

  return (
    <>
      <Masonry
        breakpointCols={{
          default: 4,
          1100: 3,
          700: 2,
          500: 1
        }}
        className="flex w-auto mt-4 -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {paintings.map((painting) => (
          <motion.div
            key={painting._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-surface rounded-lg shadow-md overflow-hidden mb-4 cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => onPaintingClick(painting)}
          >
            <Image
              src={painting.image}
              alt={painting.titles[0]}
              width={300}
              height={225}
              className="w-full h-auto object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 text-dark-primary">{painting.titles[0]}</h3>
              <p className="text-sm text-dark-text mb-2">{painting.season_episode}</p>
              <div className="flex flex-wrap gap-1">
                {painting.colors.slice(0, 5).map((color, index) => (
                  <span
                    key={color}
                    className="inline-block px-2 py-1 text-xs font-semibold rounded-full"
                    style={{
                      backgroundColor: painting.hexList[index],
                      color: getContrastColor(painting.hexList[index]),
                    }}
                  >
                    {color.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </Masonry>
      {isLoading && (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark-secondary"></div>
        </div>
      )}
    </>
  )
}

function getContrastColor(hexColor: string) {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'black' : 'white'
}

