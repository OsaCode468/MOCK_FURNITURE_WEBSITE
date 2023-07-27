import {useRouter, useSearchParams} from "next/navigation";
export default function Products({params}) {

    return (<div>        
        <h1>Products {params.products}</h1>
    </div>)
}