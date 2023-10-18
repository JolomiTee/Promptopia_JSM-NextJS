'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile = () => {
    const { data: session } = useSession()
    const router = useRouter()

    const [posts, setPosts] = useState([])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })

                const filteredPosts = posts.filter((p) => p._id !== post._id)

                setPosts(filteredPosts)

            } catch (error) {
                console.log(error)
            }
        }

    }

    const fetchPost = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`)

        const data = await response.json();

        setPosts(data)
    }

    useEffect(() => {
        if (session?.user.id) fetchPost()
    }, [])

    return (
        <Profile
            name="My"
            desc="Welcome to your profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}

        />
    )
}

export default MyProfile