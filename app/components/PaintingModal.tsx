import { motion } from 'framer-motion'
import Image from 'next/image'
import { Painting } from '../../types/painting'

interface PaintingModalProps {
  painting: Painting
  onClose: () => void
}

export default function PaintingModal({ painting, onClose }: PaintingModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-dark-surface rounded-lg shadow-xl max-w-4xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <Image
            src={painting.image}
            alt={painting.titles[0]}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-dark-primary">{painting.titles[0]}</h2>
          <p className="text-dark-text mb-4">{painting.season_episode}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-dark-secondary">Colors</h3>
              <div className="flex flex-wrap gap-2">
                {painting.colors.map((color) => (
                  <span
                    key={color}
                    className="inline-block px-2 py-1 text-xs font-semibold rounded-full"
                    style={{
                      backgroundColor: painting.hexList[painting.colors.indexOf(color)],
                      color: getContrastColor(painting.hexList[painting.colors.indexOf(color)]),
                    }}
                  >
                    {color.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-dark-secondary">Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {painting.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-dark-primary text-dark-bg"
                  >
                    {subject.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-dark-secondary">Watch the Episode</h3>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={painting.video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function getContrastColor(hexColor: string) {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'black' : 'white'
}

