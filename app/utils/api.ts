export const API = {
    index: {
        get_start_data: process.env.NEXT_PUBLIC_BACKEND + '/start'
    },
    category: {
        get_all: process.env.NEXT_PUBLIC_BACKEND + `/category/all`,
        get_category_by_slug: process.env.NEXT_PUBLIC_BACKEND + `/category/get`,
    },
    works: {
        get_by_category_id: process.env.NEXT_PUBLIC_BACKEND + `/works/get`
    }

}
