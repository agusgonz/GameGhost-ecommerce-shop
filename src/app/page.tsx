import CategorySection from "@/components/CategorySection"
import CircleContainer from "@/components/CategorySection/CircleContainer"
import IconsCarousel from "@/components/IconsCarousel"
import WelcomeUser from "@/components/WelcomeUser"
import { getAuthSession } from "@/libs/auth-options"
import {
	ChevronsDown,
	CornerRightDown,
	Gamepad2,
	Ghost,
	MoveUpRight,
	Plus,
	Sparkles,
} from "lucide-react"
import { Libre_Franklin } from "next/font/google"
import Link from "next/link"

const libreFranklin = Libre_Franklin({
	weight: ["400"],
	subsets: ["latin"],
})

export default function Home() {
	return (
		<div className="flex flex-col gap-12">
			<WelcomeUser className="xl:text-2xl " />

			<div className="grid md:grid-cols-2 py-4 ">
				<div className="flex flex-col gap-5  max-w-[330px] xl:max-w-[520px] md:mx-auto">
					<Link
						href={"/product/create"}
						className={`${libreFranklin.className} text-5xl xl:text-7xl italic  underline-offset-4  inline-block hover:underline 
					`}
					>
						<h1 className="">
							Sell you own product{" "}
							<MoveUpRight className="w-8 h-8 inline-block" />
						</h1>
					</Link>
					<p className="text-lg pl-2 xl:text-2xl">or</p>
					<h2
						className={`text-2xl xl:text-4xl ${libreFranklin.className}`}
					>
						See what others are selling
						<CornerRightDown className="ml-2 mt-2 w-5 h-5 inline-block" />
					</h2>
				</div>
				<div className="flex justify-center items-center w-0 h-0 md:w-auto md:h-auto overflow-hidden">
					<div className="w-[200px] h-[200px] xl:h-[256px] xl:w-[256px]">
						<IconsCarousel />
					</div>
				</div>
			</div>

			<hr className="border-b border-_green" />
			<CircleContainer />
			<hr className="border-b border-_green" />

			<CategorySection />
		</div>
	)
}
