import Link from "next/link";
const Navbar = () => {
    return (
        <div className="bg-orange-200 h-28 flex">
            <label className="text-3xl font-bold flex justify-center items-center ml-auto mr-auto"><input type="search" placeholder="Search" /></label>
            <ul className="flex gap-6 items-center ml-auto p-8">
                <li><Link href="/Home">Home</Link></li>
                <li><Link href = "products">Products</Link></li>
                <li>Cart</li>
                <li>Sign In</li>
            </ul>
        </div>
    )
}

export default Navbar;
