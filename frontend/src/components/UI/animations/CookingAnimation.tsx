import React, { useEffect } from 'react'
import Lottie from 'react-lottie'
import cookingAnim from '../../../assets/animations/CookingAnim.json'

function CookingAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cookingAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const ref = React.useRef(null)

  return <Lottie options={defaultOptions} ref={ref} isClickToPauseDisabled />
}

export default CookingAnimation
