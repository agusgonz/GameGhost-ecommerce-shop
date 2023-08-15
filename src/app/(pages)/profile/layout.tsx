"use client"
import React from "react"
import { useSession } from "next-auth/react"
import Loading from "@/components/Loading"
import UnauthenticatedFrame from "@/components/UnauthenticatedFrame"
import AvatarIcon from "@/components/AvatarIcon"
import Link from "next/link"
import OnActiveUnderline from "@/components/OnActiveUnderline"
import ProfileInfo from "@/components/ProfileInfo"
import FadeInAnimation from "@/components/FadeInAnimation"

export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { data: session, status } = useSession()

	if (status == "authenticated") {
		return (
			<div className="flex flex-col gap-12 md:grid md:grid-cols-3 md:gap-2 my-2">
				<FadeInAnimation>
					<div className="w-40  mx-auto flex flex-col gap-12">
						<ProfileInfo
							image={session.user.image}
							name={session.user.name}
							email={session.user.email}
						/>
						<div className="flex flex-col gap-2">
							<OnActiveUnderline
								name={"Orders"}
								url={"/profile/orders"}
							/>
							<OnActiveUnderline
								name={"Products"}
								url={"/profile/products"}
							/>
							<OnActiveUnderline
								name={"Sellings"}
								url={"/profile/sellings"}
							/>
						</div>
					</div>
				</FadeInAnimation>
				<div className="col-span-2">{children}</div>
			</div>
		)
	}

	if (status == "loading") {
		return <Loading />
	}

	if (status == "unauthenticated") {
		return <UnauthenticatedFrame />
	}
}
