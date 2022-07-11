import { db } from "$lib/firebase";
import type { Post } from "$lib/structure";
import type { RequestHandler } from "@sveltejs/kit";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const post: RequestHandler = async ({ params, request }) => {
    const { liked } = await request.json()
    const path = doc(db, 'posts', params.post_id)
    const query = await getDoc(path)

    if (!query.exists()) return {
        status: 404
    }

    const post: Post = Object(query.data())

    let likes = post.likes
    if (liked) likes++
    else likes--

    await updateDoc(path, { likes })
    return {
        status: 200,
        body: {
            post: {
                id: params.post_id,
                ...post
            }
        }
    }

}