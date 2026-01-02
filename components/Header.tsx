import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";

const Header = async ({ user }: { user: any }) => {
    const initialStocks = await searchStocks();

    return (
        <header className="sticky top-0 header z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container header-wrapper flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    {/* Replaced branding */}
                    {/* Assuming we might want to use a different logo or the same one for now */}
                    <div className="relative h-10 w-10 overflow-hidden rounded-md">
                        <Image src="/finverse.png" alt="FinVerse logo" fill className="object-cover" />
                    </div>
                    <span className="text-2xl font-bold text-white">FinVerse</span>
                </Link>
                <nav className="hidden sm:block">
                    <NavItems initialStocks={initialStocks} />
                </nav>

                <UserDropdown user={user} initialStocks={initialStocks} />
            </div>
        </header>
    )
}
export default Header
