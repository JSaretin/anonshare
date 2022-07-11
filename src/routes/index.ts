import { db } from "$lib/firebase";
import type { NewPost, Post } from "$lib/structure";
import type { RequestHandler } from "@sveltejs/kit";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";


export const post: RequestHandler = async ({ request }) => {
    const json: NewPost = await request.json()
    const newPost: Post = {
        ...json,
        views: 0,
        likes: 0,
        created_at: new Date().getTime()
    }

    const req = await addDoc(collection(db, 'posts'), newPost);

    return {
        status: 200,
        body: {
            post: { id: req.id, ...newPost }
        }
    }
}


export const get: RequestHandler = async ({ request }) => {
    const posts: ({ id: string } & Post)[] = []
    const results = await getDocs(query(collection(db, 'posts'), where('is_private', '==', false), orderBy('created_at', 'desc')));
    results.forEach(p => {
        posts.push({ id: p.id, ...p.data() })
    })
    return {
        status: 200,
        body: {
            returnedPost: posts
        }
    }
}