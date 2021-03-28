/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react'
import { Icon, CircularProgress } from '@material-ui/core'
import { useDropzone } from 'react-dropzone'

function OnboardingImageUploader (props) {
  const [imgs, setImgs] = useState([])

  const onDrop = useCallback(acceptedFiles => {
    var promises = []
    for (var i = 0; i < acceptedFiles.length; i++) {
      promises.push(readFile(acceptedFiles[i]))
    }

    Promise.all(promises).then(result => {
      console.log(imgs)
      const x = imgs.concat(result)
      console.log(x)
      setImgs(x)
      props.onImageUrlsChange(x.map((blob, index) => { return { body: blob, name: acceptedFiles[index].name, type: acceptedFiles[index].type } }))
    })
  }, [])

  const removeImg = (i) => {
    imgs.splice(i, 1)
    setImgs([...imgs])
    props.onRemoveImg(i)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
        <div className="fp-onboarding-img-uploader-wrapper" >
            <div className="fp-onboarding-img-uploader-upload-button" {...getRootProps()}>
                <div className="fp-text-align-center">
                    <div className="fp-opacity-20"><Icon>add</Icon></div>
                    <div className="fp-opacity-40"><span className="fp-body-tiny-text">Upload</span></div>
                </div>
                <input {...getInputProps()} />
            </div>
            {
                imgs.map((img, i) => {
                  return (
                        <div className="fp-onboarding-img-uploader-img-wrapper">
                            <img src={img}/>
                            {props.uploadProgress[i] && <CircularProgress className="fp-img-upload-progress" size={40} variant="determinate" value={props.uploadProgress[i]}/>}
                            <div className="fp-img-delete" onClick={() => removeImg(i)}>
                                <Icon>add_circle</Icon>
                            </div>
                        </div>
                  )
                })
            }
        </div>
  )
}

export default OnboardingImageUploader

function readFile (file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader()

    reader.onload = function () {
      resolve(reader.result)
    }

    reader.onerror = function (error) {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}
