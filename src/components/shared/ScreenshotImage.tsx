/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react'
import { useWindowFocus } from '../../hooks/useWindowFocus'

interface ScreenshotImageProps {
  className: string
}
export const ScreenshotImage = ({ className = '' }: ScreenshotImageProps) => {
  const isWindowsFocused = useWindowFocus()

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }
    const base_image = new Image()
    base_image.src = '/images/7664c515-da15-478f-a9d3-eafd22ae0d9a.jpg'
    base_image.onload = function () {
      ctx.drawImage(base_image, 84, 83)
      ctx.rotate((-15 * Math.PI) / 180)
      ctx.drawImage(base_image, -Math.sin((15 * Math.PI) / 180) * 720 - 84, -83)
    }
  }, [isWindowsFocused])

  return isWindowsFocused ? (
    <canvas
      style={{ transform: 'scaleY(-1)', filter: 'invert(1)' }}
      className={className}
      onContextMenu={(e) => e.preventDefault()}
      width={1280}
      height={720}
    />
  ) : (
    <img width={1280} height={720} alt="Screenshot" />
  )
}
