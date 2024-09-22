import React from 'react'
import ImageSlider from './ImageSlider';
import HorizontalSlider from './HorizontalSlider';

export default function Home() {
  return (
    <div className='w-100 h-100 mx-5'>
      <ImageSlider/>
      <HorizontalSlider />
    </div>
  )
}
