import React from 'react'
import {TiMessages} from "react-icons/ti"


const Message = () => {
    const noChatSelected = false;

    return (
        <div className='chat chat-end'>
            {noChatSelected ? (
                <NoChatSelected />
            ) : (
                <>
                    <div className='chat-image avatar'>
                        <div className='w-10 rounded-full'>
                            <img src="" alt='Tailwind CSS chat bubble component' />
                        </div>
                    </div>
                    <div className={`chat-bubble text-white bg-blue-500`}>Hii! what is upp?</div>
                </>
            )}
        </div>
    )
}

const NoChatSelected = () => {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 Atishay ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};



export default Message
