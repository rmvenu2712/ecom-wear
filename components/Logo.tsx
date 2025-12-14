"use client"
import React from 'react'
import logo from "@/public/logo.png"
import Image from 'next/image'

export const Logo = () => {
  return (
    <>
    <Image className='z-50 relative'  src={logo} alt='logo' />

    </>
  )
}
