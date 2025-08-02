export interface Post {
	userId: number
	id: number
	title: string
	body: string
}

export interface MegaPost extends Post {
	user: User,
}

export interface User {
	id: number
	name: string
	username: string
	email: string
}