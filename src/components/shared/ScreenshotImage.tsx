/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react'
import { useWindowFocus } from '../../hooks/useWindowFocus'
import { ImageTransformationsType } from '../../types/ImageTransformations.type'

interface ScreenshotImageProps {
  screenshot: {
    transformedUuid: string
    transformations: ImageTransformationsType
  }
  className?: string
}
export const ScreenshotImage = ({ screenshot, className = '' }: ScreenshotImageProps) => {
  const isWindowsFocused = useWindowFocus()

  useEffect(() => {
    const { transformedUuid, transformations } = screenshot
    const canvas = document.querySelector('canvas')
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }
    ctx.resetTransform()
    const base_image = new Image()
    base_image.src = `${process.env.NEXT_PUBLIC_GTG_URL?.slice(
      0,
      -3
    )}/uploads/${transformedUuid}.transformed.jpg`
    base_image.onload = function () {
      ctx.drawImage(base_image, transformations.left, transformations.top)
      ctx.rotate((-transformations.angle * Math.PI) / 180)
      ctx.drawImage(
        base_image,
        -Math.sin((transformations.angle * Math.PI) / 180) * 720 - transformations.left,
        -transformations.top
      )
    }
  }, [isWindowsFocused, screenshot])

  return isWindowsFocused ? (
    <canvas
      style={{
        transform: screenshot.transformations.flipY ? 'scaleY(-1)' : '',
        filter: screenshot.transformations.invert ? 'invert(1)' : '',
      }}
      className={className}
      onContextMenu={(e) => e.preventDefault()}
      width={1280}
      height={720}
    />
  ) : (
    <img
      style={{ backgroundColor: '#e8e8e8' }}
      width={1280}
      height={720}
      className={className}
      alt="Sorry, image hidden to prevent cheating"
    />
  )
}
