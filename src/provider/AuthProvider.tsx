"use client"
import { FC, ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

interface AuthProvierProps {
	children: ReactNode
	session?: Session
}

const AuthProvider: FC<AuthProvierProps> = ({
	children,
	session,
}) => {
	return (
		<SessionProvider session={session}>
			{children}
		</SessionProvider>
	)
}
export default AuthProvider
