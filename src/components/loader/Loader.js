import { Spinner } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <Spinner size="xl" color="blue.500" />
        </div>
    </>
   
  )
}

export default Loader