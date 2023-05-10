import Post from "@models/post";
import { connectToDB } from "@utils/database"

export const GET = async (req, res) => {
    try {
        await connectToDB();

        const posts = await Post.find({}).populate('creator');

        return new Response(JSON.stringify(posts), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch all Posts", {status: 500})
    }
}