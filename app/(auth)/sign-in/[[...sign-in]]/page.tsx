import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SingIn = () => {
  return (
    <main className='flex h-screen items-center justify-center'>
      <SignIn/>
    </main>
  )
}

export default SingIn
