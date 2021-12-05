/* eslint-disable @next/next/no-img-element */

import Dropzone from 'react-dropzone'
import toast from 'react-hot-toast'

interface ImageDropProps {
  onDrop: (file: File) => void
  onRemove: () => void
  image?: File
}
export const ImageDrop = ({ onDrop, onRemove, image }: ImageDropProps) => {
  const handleDrop = ([file]: File[]) => {
    onRemove()
    if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
      toast.error('File needs to be format JPEG or PNG')
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error('Image is too big (4Mo max)')
      return
    }
    onDrop(file)
  }

  return (
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <section>
          <div
            {...getRootProps()}
            style={{ height: 350 }}
            className="p-1 border-2 border-dashed flex justify-center items-center cursor-pointer"
          >
            <input {...getInputProps({ multiple: false })} />

            {isDragActive ? (
              <p>Drop the image...</p>
            ) : image ? (
              <img
                src={URL.createObjectURL(image)}
                style={{ height: 340, objectFit: 'contain' }}
                alt={image.name}
                title="Click to replace"
              />
            ) : (
              <p className="text-center">
                Drag &apos;n&apos; drop your image here
                <br />
                or <u>use file picker</u>
              </p>
            )}
          </div>
          {image ? (
            <p className="text-center mt-1">
              {image.name} -{' '}
              <button type="button" className="underline text-red-500" onClick={onRemove}>
                Cancel
              </button>
            </p>
          ) : null}
        </section>
      )}
    </Dropzone>
  )
}
