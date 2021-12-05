import type { NextPage } from 'next'
import { UploadForm } from '../components/pages/upload/UploadForm'
import { AuthContainer } from '../components/shared/containers/AuthContainer'

const UploadPage: NextPage = () => {
  return (
    <AuthContainer>
      <UploadForm />
    </AuthContainer>
  )
}

export default UploadPage
