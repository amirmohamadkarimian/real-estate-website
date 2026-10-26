import { useEffect } from 'react'
import { CloseIcon } from './Icons.jsx'

// Sample clip stands in for the brand film; replace with the real asset when it exists.
const STORY_VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

export default function VideoModal({ open, onClose, poster }) {
  useEffect(() => {
    if (!open) return

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Our story"
      className="fixed inset-0 z-[60] grid place-items-center bg-ink/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full border border-cream/40 text-cream transition duration-300 hover:bg-cream hover:text-ink"
        >
          <CloseIcon size={18} />
        </button>
        <div className="overflow-hidden rounded-card border border-cream/15 bg-black">
          <video className="aspect-video w-full" controls autoPlay playsInline poster={poster}>
            <source src={STORY_VIDEO} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )
}
