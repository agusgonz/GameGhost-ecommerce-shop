import { Session } from "next-auth"

declare module "next-auth" {
	interface Session {
		user: User // add any additional properties here
	}
}
