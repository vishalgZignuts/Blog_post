'use client'
import { useEffect, useState } from 'react';

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MyProfile = () => {

  const {data: session} = useSession();
  const [posts,setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }
    // console.log(posts);
    if(session?.user.id) fetchPosts();
},[session?.user.id])

  const handleDelete = async (post) => {
      const hasConfirmed = confirm(`Are you sure you want to delete this post??`)

      if(hasConfirmed){
        try {
          await fetch(`/api/post/${post._id.toString()}` , {
            method: 'DELETE'
          })

          const filteredPosts = myPosts.filter((item) => item._id !== post._id);

          setMyPosts(filteredPosts)
        } catch (error) {
          console.log(error)
        }
      }
    }
  const handleEdit = async (post) => {
      router.push(`/update-post?id=${post._id}`)
    }

    
  return (
    <Profile
        name="My"
        desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
        data={posts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
    />
  )
}

export default MyProfile;