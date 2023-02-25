"use client"
import { collection, orderBy, query } from 'firebase/firestore'
import { useSession, signOut } from 'next-auth/react'
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from '../firebase'
import ChatRow from './ChatRow'
import ModelSelection from './ModelSelection'
import NewChat from './NewChat'

export default function Sidebar() {
    const { data: session } = useSession()
    const [chats, loading, error] = useCollection(
        session && query(collection(db, 'users', session.user?.email!, 'chats'),
            orderBy('createdAt', 'asc')
        )
    );

    return (
        <div className='p-2 flex flex-col h-screen'>
            <div className='flex-1'>
                <div className='space-y-2'>
                    <NewChat />

                    <div className='hidden sm:inline'>
                        <ModelSelection />
                    </div>

                    <div className='flex flex-col space-y-2 my-2'>

                        {loading &&(
                            <div className='animate-pulse text-center text-white'>
                                <p>Loading Chats....</p>
                            </div>
                        )}

                        {/* Map throught the ChatRows */}
                        {chats?.docs.map(chat => (
                            <ChatRow key={chat.id} id={chat.id} />
                        ))}
                    </div>

                </div>
            </div>
            {session && (
                <img onClick={() => signOut()} className='rounded-full w-12 h-12 cursor-pointer mx-auto mb-2 hover:opacity-50' src={session.user?.image!} alt="profile-pic" />
            )}
        </div>
    )
}
