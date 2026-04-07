import React from 'react'
import { Link, Menu, User } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@base-ui/react'

type Props = {}

const LandingPageNavBar = (props: Props) => {
  return (
    <div className='flex w-full justify-between items-center' >
        <div className='text-3xl font-semibold flex items-center gap-x-3'>
            <Menu className=' w-6 h-6' /> 
            <Image
            src="/logo.png"
            alt = "logo"
            width={32}
            height={32}
            />
            Capture AI
        </div>
        <div className='flex items-center gap-x-4'>
            <Link
            href='/'
            className='flex items-center gap-x-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors'
            >
                <span>Home</span>
            </Link>
            <Link
            href='/'
            className='flex items-center gap-x-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors'
            >
                <span>Pricing</span>
            </Link>
            <Link
            href='/'
            className='flex items-center gap-x-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors'
            >
                <span>Contact</span>
            </Link>

        </div>
        <Link
        href='/auth/sign-in'>
            <Button className="text-based flex gap-x-2"> 
                <User fill='#000'/>
                Login </Button>
        </Link>
    </div>
  )
}

export default LandingPageNavBar
