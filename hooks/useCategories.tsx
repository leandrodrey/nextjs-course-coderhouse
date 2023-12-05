import useSWR from "swr";
import {fetcher} from "@/helpers/SwrFetcher";

const UseCategories = () => {

    const {data, error, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API_CATEGORIES_URL}`, fetcher)

    return {
        data,
        isLoading,
        isError: error
    }
}

export default UseCategories;
