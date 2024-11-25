import { motion } from 'framer-motion'
import Image from 'next/image'
import { Painting } from '../../types/painting'

interface PaintingModalProps {
  painting: Painting
  onClose: () => void
}

export default function PaintingModal({ painting, onClose }: PaintingModalProps) {

  const getEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  const embedUrl = getEmbedUrl(painting.video);
  console.log(embedUrl)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-dark-surface rounded-lg shadow-xl w-full max-w-4xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 z-10 bg-dark-surface p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-dark-primary">{painting.titles[0]}</h2>
            <button
              onClick={onClose}
              className="text-dark-text hover:text-dark-primary focus:outline-none"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <div className="relative aspect-video mb-4">
              <Image
                src={painting.image}
                alt={painting.titles[0]}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <p className="text-dark-text mb-4">{painting.season_episode}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            <div>
              <h3 className="text-lg font-semibold mb-2 text-dark-secondary">Watch the Episode</h3>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
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

