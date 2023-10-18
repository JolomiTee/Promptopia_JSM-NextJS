"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter, } from "next/navigation"

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const pathName = usePathname()
    const [copy, setCopy] = useState("")
    const { data: session } = useSession()

    useEffect(() => {
        console.log(session)
        console.log(post)

    }, [])


    const handleCopy = () => {
        setCopy(port.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => setCopy(""), 3000);
    }
    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex-start items-center gap-3 cursor-pointer">
                    <Image
                        src={post?.creator?.image}
                        alt='user_image'
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                    />

                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-bold font-gray-900">
                            {post?.creator?.username}
                        </h3>
                        <p className="font-inter text-sm text-gray-500">
                            {post?.creator?.email}
                        </p>
                    </div>
                </div>
                <button type="button" className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={copy === post.prompt ? './assets/icons/tick.svg' : './assets/icons/copy.svg'}
                        width={12}
                        height={12}
                    />
                </button>
            </div>

            <p className="my-4 font-satoshi text-sm text-gray-700">
                {post.prompt}
            </p>
            <p
                className="font-inter text-sm blue_gradient cursor-pointer py-2 px-3 shadow-md w-fit rounded-[20px] font-bold"
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                #{post.tag}
            </p>

            {
                session?.user.id === post.creator._id && pathName === '/profile' && (
                    <div className=" flex gap-5 mt-5 flex-center border-t border-gray-100 pt-3">
                        <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>
                            Edit
                        </p>
                        <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleDelete}>
                            Delete
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default PromptCard