import React from 'react'
import "../../App.css";

const HelpInfo = () => {
    return (
        <>
            <div className="p-4 col-span-3 flex flex-col justify-center border border-black-400 rounded-lg bg-[var(--light-blue)]">
                <h1 className="text-lg font-bold">Title</h1>
                <hr className='m-2' />
                <h1 className="text-lg font-bold">Description</h1>
                <hr className='m-2' />
                <h1 className="text-lg font-bold">Category</h1>
                <hr className='m-2' />
                <h1 className="text-lg font-bold">Pincode</h1>
                <hr className='m-2' />
                <h1 className="text-lg font-bold">Location</h1>
                <hr className='m-2' />
                <h1 className="text-lg font-bold">Help Date</h1>
                <hr className='m-2' />
                <h1 className="text-lg font-bold">Meena</h1>
                <hr className='m-2' />

                <button className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                    Apply
                </button>
            </div>
        </>
    )
}

export default HelpInfo
