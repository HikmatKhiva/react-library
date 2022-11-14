import React from 'react'
const UploadLoading = ({uploadProgress}) => {
    return (
        <div className='flex items-center bottom-24 fixed justify-center h-96 flex-col gap-4'>
            <span className='w-14 h-14 border-2 border-t-blue-500 animate-spin rounded-full'></span>
            <span className='text-2xl'>Uploading  {uploadProgress}</span>
        </div>
    )
}

export default UploadLoading