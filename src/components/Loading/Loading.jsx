import React from 'react'

const Loading = () => {
    return (
        <div className='flex items-center justify-center h-screen flex-col gap-4'>
            <span className='w-14 h-14 border-2 border-t-blue-500 animate-spin rounded-full'></span>
            <span className='text-2xl'>Loading</span>
        </div>
  )
}

export default Loading