// typescript設定
export type Shop = {
    id: string;
    account_id: string;
    tel: number;
    url: string;
    detail: string;
    hour: string;
    created_at: Date;
    updated_at: Date;
    account: {
        id: string;
        email: string;
        account: string;
        type: string;
        name: string;
        profile: string;
    }
};
