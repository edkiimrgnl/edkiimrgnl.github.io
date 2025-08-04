import {
	ref,
	onBeforeUnmount,
} from 'vue';
import {
	fetchPosts,
	fetchUsers,
} from '../services/api';
import type {
	MegaPost,
	User,
} from '../types/post';

export function usePostFeed(limit = 10) {
	const page          = ref(0);
	const posts         = ref<MegaPost[]>([]);
	const users         = ref<Record<number, User>>({});
	const uniqueUserIds = ref(new Set<number>());
	const isLoading     = ref(false);
	const hasMore       = ref(true);
	const observer      = ref<IntersectionObserver | null>(null);
	const error         = ref({ reason: '', text: '' });

	async function loadData() {
		if (isLoading.value || !hasMore.value) {
			return;
		}
		isLoading.value = true;

		try {
			const rawPosts = await fetchPosts(page.value * limit, limit);
			rawPosts.forEach(post => uniqueUserIds.value.add(post.userId));

			for (const id of uniqueUserIds.value) {
				if (!users.value[id]) {
					users.value[id] = await fetchUsers(id);
				}
			}

			const newPosts = rawPosts.map(post => ({
				...post,
				user: users.value[post.userId],
			}));

			posts.value.push(...(newPosts ? newPosts : []));

			if (newPosts.length < limit || newPosts.length === 0) {
				hasMore.value = false;
			}
		}
		catch (err) {
			const nbsp       = '\u00A0';
			error.value.text = `Что-то пошло не так. Пожалуйста, перезагрузите страницу или${nbsp}обратитесь в тех. поддержку.`;

			if (err instanceof Error) {
				error.value.reason = err.message;
			}
			else {
				error.value.reason = JSON.stringify(
					err,
					Object.getOwnPropertyNames(err),
				);
			}
		}

		page.value++;
		isLoading.value = false;
	}

	const observerSentinel = (el: HTMLElement) => {
		if (observer.value) {
			return;
		}

		observer.value = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				loadData();
			}
		}, {
			rootMargin: '1000px 0px 0px',
		});

		if (el) {
			observer.value.observe(el);
		}
	};

	onBeforeUnmount(() => {
		if (observer.value) {
			observer.value.disconnect();
		}
	});

	return { posts, error, isLoading, hasMore, loadData, observerSentinel };
}