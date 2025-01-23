import React from 'react'
import { useAppSelector } from '../../../Redux Toolkit/Store'
import UserAddressCard from './UserAddressCard'

const Addresses = () => {
    const  user  = useAppSelector(state => state.user)
    return (
        <>
            <div className='space-y-3'>
                {user.user?.addresses?.map((item, index) =>
                    <UserAddressCard
                        key={item.id}
                        item={item} />)}
                        
            </div>
        </>
    )
}

export default Addresses