/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import TextInput from '../../../storybook/components/common/form/TextInput'
import Select from '../../../storybook/components/common/form/Select'
import Header from '../../../storybook/components/common/Header'
import ChangeProfilePicture from '../../../storybook/components/profile/ChangeProfilePicture'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { IonPage, IonContent } from '@ionic/react'
import OnboardingImageUploader from '../../../storybook/components/profile/OnboardingImageUploader'
import FAB from '../../../storybook/components/common/FAB'
import { getHeaders } from '../../../utils/util'
import axios from '../../../axios/axios'
import AWS from 'aws-sdk'
import { useHistory } from 'react-router'
import { completeProfile } from '../actions'

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
})
const s3 = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_BUCKET_NAME },
  region: 'ap-south-1'
})
const storageUrl = process.env.REACT_APP_STORAGE_URL

const CompleteProfile = props => {
  const [pp, setPp] = useState(props.pp)
  const [imgs, setImgs] = useState([])
  const [name, setName] = useState(props.name)
  const [dob, setDob] = useState('')
  const [city, setCity] = useState('City')
  const [gender, setGender] = useState('Gender')
  const userId = props.userId
  const mobile = props.mobile
  const history = useHistory()

  const upload = (key, body) => {
    if (!body) return
    const params = {
      Key: key,
      Body: Buffer.from(body.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      ContentType: 'image/jpeg',
      ContentEncoding: 'base64',
      ACL: 'public-read'
    }
    s3.upload(params, (err, data) => { if (err) { console.log(err) } else { console.log(data) } })
  }

  const uploadPhotos = (photos, path) => {
    if (!photos || !path) return
    for (const photo of photos) {
      const key = `${path}${photo.name}`
      upload(key, photo.body)
    }
  }

  const uploadPP = (photo, path) => {
    if (!photo || !path) return
    const name = 'pp'
    const extension = photo.name.split('.')[1]
    const key = `${path}${name}.${extension}`
    upload(key, photo.body)
  }

  const completeProfileHandler = async () => {
    uploadPhotos(imgs, `users/${userId}/photos/`)
    uploadPP(pp, `users/${userId}/pp/`)
    const profile = {
      id: userId,
      pp: `${storageUrl}users/${userId}/pp/${pp.name}`,
      photos: imgs.map(img => {
        return {
          userId: userId,
          src: `${storageUrl}users/${userId}/photos/${img.name}`
        }
      }),
      about: '',
      city,
      mobile,
      age: 24,
      gender,
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1],
      username: name.split(' ')[0] + (new Date()).getTime().toString().substr(5, 8)
    }
    await axios.post('/completeProfile', { profile }, { headers: getHeaders() })
    props.completeProfile()
    history.push('/newsfeed')
  }

  return (
    <IonPage>
    <IonContent>
      <Header
        icon="menu"
        headerTitle={'Complete profile'}
        headerSubtitle="Please provide the following details"
        onBack={() => {}}
      />
      <div className="fp-padding-medium">
        <ChangeProfilePicture
          onFileChange={pp => {
            setPp(pp)
          }}
          profileImgUrl={pp.src}
          userFullName={name}
        />
      </div>
      <div
        style={{
          padding: '15px'
        }}
      >
        <TextInput
          onChange={(e) => { setName(e.target.value) }}
          labelIcon="phone_android"
          labelText={props.name}
          placeholder={'Full Name'}
          value={props.name}
        />
      </div>
      <div
        style={{
          padding: '15px'
        }}
      >
        <TextInput
          onChange={(e) => { setDob(e.target.value) }}
          labelIcon="cake"
          labelText="Date of birth"
          placeholder={'DD-MM-YYYY'}
          value={dob}
        />
      </div>
      <div
        style={{
          padding: '15px'
        }}
      >
        <Select
          onChange={(e) => setCity(e.target.value)}
          labelIcon="location_on"
          labelText="City"
          value={city}
          options={[
            {
              label: 'Mumbai',
              value: 'Mumbai'
            },
            {
              label: 'Pune',
              value: 'Pune'
            },
            {
              label: 'Bangalore',
              value: 'Bangalore'
            }
          ]}
          placeholder="City"
        />
    </div>
    <div
        style={{
          padding: '15px'
        }}
      >
        <Select
          onChange={(e) => setGender(e.target.value)}
          labelIcon="wc"
          labelText="Gender"
          value={gender}
          options={[
            {
              label: 'Male',
              value: 'Male'
            },
            {
              label: 'Female',
              value: 'Female'
            }
          ]}
          placeholder="Gender"
        />
    </div>
    <div>
      <h3 className="fp-padding-top-medium fp-padding-left-medium fp-h3">Portfolio Pictures</h3>
      <p className="fp-padding-left-medium fp-p">Upload minimum 2 pictures</p>
      <div className="fp-padding-medium">
        <OnboardingImageUploader
          onImageUrlsChange={(imgs) => { setImgs(imgs) }}
          onRemoveImg={(imgs) => { setImgs(imgs) }}
          uploadProgress={[]}
        />
      </div>
    </div>
    <div
      style={{
        backgroundImage: 'linear-gradient(0deg, #ccc, #fff)',
        height: '12vh'
      }}
    >
      <FAB
        onClicked={completeProfileHandler}
        buttonText="Continue"
        iconName=""
      />
    </div>
    </IonContent>
    </IonPage>
  )
}

CompleteProfile.propTypes = {
  mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pp: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  completeProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    mobile: state.auth.mobile,
    pp: state.auth.pp,
    name: state.auth.name,
    userId: state.auth.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    completeProfile: () => dispatch(completeProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfile)
