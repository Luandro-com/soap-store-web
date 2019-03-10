import { Mutation } from 'react-apollo'
import Button from './Button'
import UPLOAD_FILE from '../queries/uploadFile.gql'

const Upload = ({
  required,
  multiple,
  accept,
  handleUpload,
}) => (
  <div>
    <Mutation
      mutation={UPLOAD_FILE}
    >
      {upload => (
        <input
          accept={accept || "*"}
          multiple={multiple}
          required={required}
          type="file"
          onChange={({
            target: {
              validity,
              files: [file]
            }
          }) => {
            validity.valid
            upload({ variables: { file } })
              .then(res => {
                if (res && res.data.uploadFile) {
                  handleUpload(res.data.uploadFile)
                }
              })
          }}
        />
      )}
    </Mutation>
    <style jsx>{`
      input {
        appearance: none;
        // position: absolute;
        // top: -9999px;
        // left: -9999px;
      }
    `}</style>
  </div>
)

export default Upload

