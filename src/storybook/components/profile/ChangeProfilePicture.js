/* eslint-disable react/prop-types */
import { Avatar, CircularProgress } from '@material-ui/core'
import Link from '../common/Link'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

function ChangeProfilePicture (props) {
  const [profileImgUrl, setUrl] = useState(props.profileImgUrl)

  const onDrop = useCallback(acceptedFiles => {
    var reader = new FileReader()
    reader.onload = function () {
      console.log(acceptedFiles)
      setUrl(reader.result)
      props.onFileChange({ blob: reader.result, name: acceptedFiles[0].name, type: acceptedFiles[0].type })
    }
    reader.readAsDataURL(acceptedFiles[0])
  }, [])

  useEffect(() => {
    setUrl(props.profileImgUrl)
  }, [props.profileImgUrl])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
        <div className={'fp-change-profile-picture-wrapper ' + (props.uploading ? 'fp-change-profile-picture-wrapper--uploading' : '')} {...getRootProps()}>
            <div className="fp-change-profile-picture-avatar-wrapper">
                <Avatar src={profileImgUrl}>{props.userFullName[0]}</Avatar>
                {props.uploading && <CircularProgress className="fp-avatar-upload-progress" size={68}/>}
            </div>
            <div className="fp-margin-left-small">
                <div>
                    <span className="fp-body-text fp-font-weight-medium">Your profile picture</span>
                </div>
                <div>
                    <Link>Tap to change</Link>
                </div>
            </div>
            <input {...getInputProps()} />
            {
                isDragActive
                  ? <p></p>
                  : <p></p>
            }
        </div>
  )
}

export default ChangeProfilePicture
