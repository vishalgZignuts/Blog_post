 //GET (read)
import Post from "@models/post";
import { connectToDB } from "@utils/database"
export const GET = async (req,{params}) => {
    try {
        await connectToDB();

        const post = await Post.findById(params.id).populate('creator');
        if(!post) return new Response("Post not found", {status: 404})

        return new Response(JSON.stringify(post), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch all Posts", {status: 500})
    } 
}



 //PATCH (write)
export const PATCH = async (req,{params}) => {
    const {prompt,tag} = await req.json();

    try {
        await connectToDB();

        const existingPost = await Post.findById(params.id);

        if(!existingPost) return new Response("Post not found", {status: 404})
        existingPost.prompt = prompt;
        existingPost.tag = tag;

        await existingPost.save();

        return new Response(JSON.stringify(existingPost), {status: 200})
    } catch (error) {
        return new Response("Failed to update Post", {status: 500})
    }
}


 //DELETE (delete)
 export const DELETE = async (req, {params}) => {
    try {
        await connectToDB();

        await Post.findByIdAndDelete(params.id);

        return new Response("Post deleted successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to deleted Post", {status: 500})
    }
 }