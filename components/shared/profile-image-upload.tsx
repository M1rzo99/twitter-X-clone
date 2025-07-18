import Image from 'next/image';
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { IoMdDownload } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';

interface Props {
    profileImage:string;
    onChange:(profileImage:string)=>void
}

const ProfileImageUpload = ({profileImage,onChange}:Props) => {
    const [image, setImage] = useState(profileImage)

    const handleChange = useCallback(
            (coverImage:string) => {
                onChange(coverImage)
            },[onChange]
        );
    
        const handleDrop = useCallback(
            (files:any)=>{
                const  file = files[0]
                const reader = new FileReader();
                reader.onload = (e:any) => {
                    setImage(e.target.result)
                    handleChange(e.target.result)
                }
                reader.readAsDataURL(file)
            },[handleChange]
        );

          const {getRootProps, getInputProps} = useDropzone({
                maxFiles:1,
                onDrop:handleDrop,
                accept:{
                    "image/jpeg":[],
                    "image/png":[]
                }
            })


      return (
   <div {...getRootProps({
           className:"text-white text-center border-none rounded-md"
       })}>
       <input {...getInputProps()} />
       {image ?
       (
          <div className='relative -top-20 left-6 rounded-full transition cursor-pointer w-32 h-32 border-4 border-black'>
              <Image
                  src={image}
                  fill
                  alt="Upload Image"
                  style={{objectFit:"cover"}}
              />
              <div className='absolute inset-0 flex justify-center items-center rounded-full'>
                  <MdEdit size={24} className="text-black" />
              </div>
          </div>
       ) : 
       (
         <div className='relative -top-20 left-6'>
            <div className={`w-32 h-32 rounded-full border-4 border-black relative  cursor-pointer transition`}>
                <Image
                fill
                style={{objectFit:"cover", borderRadius:"100%"}}
                alt='Avatar'
                src={"/images/placeholder.png"}
                />
                <div className='absolute inset-0 flex justify-center  items-center rounded-full bg-white/40'>
                <IoMdDownload size={40} className={"text-gray-600"}/>
                </div>
            </div>
         </div>  
       )}
       </div>
  )
}

export default ProfileImageUpload