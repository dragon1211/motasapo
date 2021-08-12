// typescript設定
export type Post = {
    id: string;
    type: string;
    account_id: string;
    text: string;
    limit_at: Date;
    created_at: Date;
    updated_at: Date;
    post_images: Array<any>
    post_likes: Array<any>
    post_tags: Array<any>
    account: any
};
