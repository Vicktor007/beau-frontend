import {  useAppSelector } from '../../../Redux Toolkit/Store'
import WishlistProductCard from './WishlistProductCard';

const Wishlist = () => {
    const  wishlist  = useAppSelector(state => state.wishlist);


    console.log("wishlist", wishlist)
    return (
        <div className='h-[85vh] p-5 lg:p-20'>
            {wishlist.wishlist?.products.length ?
                <section>
                    <h1><strong>My Wishlist</strong> {wishlist.wishlist.products.length} items</h1>
                    <div className='pt-10 flex flex-wrap gap-5'>

                        {wishlist.wishlist?.products?.map((item) => <WishlistProductCard item={item} />)}

                    </div>
                </section> :
                <div className="h-full flex justify-center items-center flex-col">
                    <div className="text-center py-5">
                        <h1 className="text-lg font-medium">hay its feels so light!</h1>
                        <p className="text-gray-500 text-sm">
                            there is nothing in your wishlist, lets add some items
                        </p>
                    </div>

                </div>}
        </div>
    )
}

export default Wishlist