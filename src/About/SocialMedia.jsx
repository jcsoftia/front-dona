import React from 'react'

import "./SocialMedia.css"

const SocialMedia = () => {
  return (
    <ul className="sm__container">
      <li className="sm__item"><a href="https://linkedin.com"><img src="../../svg/linkedin.svg" alt="linkedin"/></a></li>
      <li className="sm__item"><a href="https://github.com"><img src="../../svg/github.svg" alt="github"/></a></li>
      <li className="sm__item"><a href="https://instagram.com"><img src="../../svg/instagram.svg" alt="instagram"/></a></li>
      <li className="sm__item"><a href="https://twitter.com"><img src="../../svg/twitter.svg" alt="twitter"/></a></li>
    </ul>
  )
}

export default SocialMedia
