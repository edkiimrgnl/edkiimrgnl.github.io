import type { Post, User } from '../types/post'

const BASE = 'https://jsonplaceholder.typicode.com';

async function fetchData<T>(url: string): Promise<T> {
		const res = await fetch(url);
		return await res.json();
}

export async function fetchPosts(start: number, limit: number): Promise<Post[]> {
	return await fetchData<Post[]>(`${BASE}/posts?_start=${start}&_limit=${limit}`);
}

export async function fetchUsers(id: number): Promise<User> {
	return await fetchData<User>(`${BASE}/users/${id}`);
}
