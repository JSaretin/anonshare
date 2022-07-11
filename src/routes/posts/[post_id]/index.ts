
import { db } from "$lib/firebase";
import type { Post } from "$lib/structure";
import type { RequestHandler } from "@sveltejs/kit";
import { collection, doc, setDoc, addDoc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { parse, serialize } from 'cookie'

export const get: RequestHandler = async ({ params, request, url }) => {
    const postCookie = parse(request.headers.get('cookie') || "")[params.post_id]
    if (postCookie) {
        return {
            status: 200,
            body: {
                status: 404
            }
        }
    }


    const path = doc(db, 'posts', params.post_id)
    const query = await getDoc(path)
    const data = query.data()
    if (!query.exists() || data === undefined) return {
        status: 200,
        body: {
            status: 404
        }
    }

    const post: Post = Object(data);
    let headers: { [key: string]: string } = {}

    if (post.save_to_client) {
        headers['Set-Cookie'] = serialize(params.post_id, 'true', {
            // maxAge: 0,
            path: url.pathname,
            secure: false,
            httpOnly: false,
        })
    }

    const newViews = post.views++;

    if (post.server.delete_after_open && post.server.after_option === "views" && post.server.delete_after >= newViews) {
        await deleteDoc(path);
        return {
            status: 200,
            body: {
                post
            }
        }
    }

    if (post.server.delete_after_open && post.server.after_option !== "views" && post.created_at >= new Date().getTime()) {
        await deleteDoc(path);
        return {
            status: 200,
            body: {
                post
            }
        }
    }

    await updateDoc(path, { views: newViews })
    // delete post.ser
    return {
        status: 200,
        headers,
        body: {
            post
        }
    }
}


// export const del: RequestHandler = async ({request, params})=>{
//     const postCookie = parse(request.headers.get('cookie') || "")[params.post_id]

//     const path = doc(db, 'posts', params.post_id)
//     await deleteDoc(path);
//     return {
//         status: 200
//     }
// }