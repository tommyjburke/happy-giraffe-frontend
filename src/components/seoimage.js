import * as React from 'react'

import featuredImage from '../media/background5.png'

export const FeaturedImage = (props) => {
   ;<>
      {props.customImage ? (
         <meta
            property='og:image'
            content={props.customImage}
         />
      ) : (
         <meta
            name='og:image'
            content={'happygiraffe.co.uk' + featuredImage}
         />
      )}
   </>
}

export default FeaturedImage
