import Icon from "feather-icons-react"
import Image from "next/image"

export function GeneratedImage() {
  return (
    <div className="flex flex-col gap-4">
      <Image
        src="/generated-image.jpg"
        width={500}
        height={500}
        alt="player generated image"
        className="aspect-square w-full sm:size-64"
      />
      <div className="flex flex-row gap-2">
        <Icon icon="hexagon" size={16} />
        <span className="text-xs leading-snug">
          This image is unique to you and was generated based on your game
          library analysis.
        </span>
      </div>
    </div>
  )
}
