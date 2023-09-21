import React from 'react';
import hero from "./assets/hero.png";
import './Hero.css';
export const Hero = () => {
  return (
    <div className='flex justify-evenly items-center w-fit'>
        <div className='pr-12'>
            <p className='mb-4 welcome work text-gray-500'>WELCOME TO</p>
            <p className='bebas redtext'>THIS <br/> CHALLANGE </p>
            <br/>
            <p className='textdown work'>Lorem ipsum dolor sit amet, consectetur adipiscing <br/> elit. Sed vestibulum nec tortor ac tristique.</p>
        </div>
        <div>
            <img src={hero} alt='hero' width={727
            }  height={556}/>
        </div>
        
    </div>
  )
}
