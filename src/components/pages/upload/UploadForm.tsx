import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAsyncCall } from '../../../hooks/useAsyncCall'
import {
  apiCreateScreenshot,
  apiUploadImage,
} from '../../../services/api/routes/api-upload-screenshot'
import { Button } from '../../shared/buttons/Button'
import { MediumContainer } from '../../shared/containers/ContainerWithTitle'
import { TextInput } from '../../shared/form/TextInput'
import { ImageDrop } from './components/ImageDrop'
import { UploadRules } from './components/UploadRules'

type FormData = {
  originalName: string
  year: string
  alternativeNames: { value: string }[]
}

export const UploadForm = () => {
  // Image State
  const [image, setImage] = useState<File>()

  // Form State
  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      alternativeNames: [{ value: '' }, { value: '' }],
    },
  })
  const { fields, append } = useFieldArray({
    control,
    name: 'alternativeNames',
  })

  // Router
  const router = useRouter()

  const { onSubmit } = useAsyncCall(
    async (image: File, data: FormData) => {
      const { uuid } = await apiUploadImage(image)
      const { id } = await apiCreateScreenshot({
        imageId: uuid,
        originalName: data.originalName,
        alternativeNames: data.alternativeNames.map(({ value }) => value),
        year: parseInt(data.year, 10),
      })
      router.push(`/play/${id}`)
    },
    { toastMessages: { success: 'Screenshot added, now waiting for moderation!' } }
  )

  const handleOnSubmit = handleSubmit(async (data) => {
    if (!image) {
      return
    }
    onSubmit(image, data)
  })

  return (
    <div>
      <MediumContainer title="Upload Screenshot">
        <form onSubmit={handleOnSubmit} className="mt-3">
          <ImageDrop onDrop={setImage} onRemove={() => setImage(undefined)} image={image} />
          {!image ? (
            <UploadRules className="my-5" />
          ) : (
            <div>
              {/* ORIGINAL NAME */}
              <label>
                <p className="mt-3">Original full name of the game</p>
                <TextInput
                  {...register('originalName', { required: true })}
                  required
                  placeholder="Grand Theft Auto V"
                />
              </label>

              {/* ALTERNATIVE NAMES */}
              <p className="mt-3">
                Alternative names{' '}
                <small>
                  Players can score by typing the original name or one of the alternative
                </small>
              </p>
              {fields.map((field, index) => (
                <TextInput
                  key={field.id}
                  {...register(`alternativeNames.${index}.value`)}
                  placeholder={index === 0 ? 'GTAV' : index === 1 ? 'GTA5' : ''}
                />
              ))}
              <button
                type="button"
                onClick={() => append({ value: '' })}
                className="py-1 px-3 mt-1 rounded bg-gray-100 border"
              >
                <b>+</b> Add
              </button>

              {/* Year */}
              <label>
                <p className="mt-3">Year of game release</p>
                <TextInput
                  type="number"
                  {...register('year', {
                    required: true,
                    min: 1972,
                    max: new Date().getFullYear() + 3,
                  })}
                  min={1972}
                  max={new Date().getFullYear() + 3}
                  required
                />
              </label>

              <div className="text-center mt-5">
                <Button type="submit">Submit</Button>
              </div>
            </div>
          )}
        </form>
      </MediumContainer>
    </div>
  )
}
