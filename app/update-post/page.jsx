'use client'

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Form from '@components/Form';

const EditPost = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const postId = searchParams.get('id');

    const[submitting, setIsSubmitting] = useState(false)
    const [post,setPost] = useState({
        prompt: '',
        tag: '',
    });
 
    useEffect(() => {
        const getPostDetails = async () => {
            const response = await fetch(`/api/post/${postId}`)
            const data = await response.json();
            console.log(data)
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if(postId) getPostDetails();
    },[postId])

    const updatePost = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

        if(!postId) return alert('Post ID not found')

      try {
        const response  = await fetch(`/api/post/${postId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag
          })
        })
        if(response.ok){
          router.push('/')
        }
      } catch (error) {
        console.log(error);
      } finally{
        setIsSubmitting(false);
      }
    }

  return (
    <Form 
        type= "Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePost}

    />
  )
}

export default EditPost