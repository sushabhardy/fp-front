import React, { useState } from 'react'
import FAB from '../../../storybook/components/common/FAB'
import TextInput from '../../../storybook/components/common/form/TextInput'
import PropTypes from 'prop-types'
import Header from '../../../storybook/components/common/Header'
import HorizontalChecklist from '../../../storybook/components/common/HorizontalChecklist'
import { useHistory } from 'react-router'
import { IonPage } from '@ionic/react'
import { verifyMobile } from '../actions'
import { connect } from 'react-redux'

const Signup = props => {
  const [mobile, setMobile] = useState('')
  const [currentActive, setCurrentActive] = useState(1)
  const history = useHistory()

  const verifyMobileHandler = () => {
    if (!mobile) return
    if (mobile && mobile.length < 13) return
    setCurrentActive(2)
    props.verifyMobile(mobile)
    currentActive === 2 && history.push('/complete-profile')
  }

  return (
    <IonPage>
     <Header
        icon="menu"
        headerTitle={`Hey ${localStorage.getItem('name').split(' ')[0]}`}
        goBackTo="/"
        headerSubtitle="Your account was successfully created. Please follow the next steps"
        imgNode={localStorage.getItem('pp')}
        onBack={() => {}}
      />
      <HorizontalChecklist
        items= {[
          { itemName: 'Signup with Google' },
          { itemName: 'Verify Mobile' },
          { itemName: 'Complete profile' }
        ]}
        currentlyActive={currentActive}
      />
      {currentActive === 1
        ? (<div
      style={{
        padding: '24px'
      }}
    >
      <TextInput
        onChange={(e) => setMobile(e.target.value)}
        labelIcon="phone_android"
        labelText="Mobile number"
        placeholder=""
      />
    </div>)
        : <p className="ion-text-center fp-color-blueblack fp-p">Click continue to complete your <br />profile in next page</p>
    }
      <div
        style={{
          backgroundImage: 'linear-gradient(0deg, #ccc, #fff)',
          height: '200vh'
        }}
      >
        <FAB
          onClicked={verifyMobileHandler}
          buttonText="Continue"
          iconName=""
        />
      </div>
    </IonPage>
  )
}

Signup.propTypes = {
  verifyMobile: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    verifyMobile: (mobile) => dispatch(verifyMobile(mobile))
  }
}

export default connect(null, mapDispatchToProps)(Signup)
