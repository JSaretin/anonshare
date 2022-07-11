


export interface Local {
    should_delete: boolean;
    delete_after: number;
    after_option: ('views' | 'days' | 'minutes' | 'hours' | 'weeks');
}

interface Server {
    delete_after_open: boolean;
    delete_after: number;
    after_option: ('views' | 'days' | 'minutes' | 'hours' | 'weeks');
}

export interface NewPost {
    post: string;
    can_react: boolean
    is_private: boolean
    is_protected: boolean;
    save_to_client: boolean;
    password: string;
    local: Local;
    server: Server

}

export interface Post extends NewPost {
    post: string;
    views: number;
    likes: number;
    created_at: number
}


export interface ReturnedPost extends Post {
    id: string
}

export interface Alert {
    msg: string;
    type: 'success' | 'warning' | 'danger';
}