import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue'

interface Options {
	callback: () => void | Promise<void>
	root?: HTMLElement | null
	rootMargin?: string
	threshold?: number
	disabled?: boolean
}

/**
 * Хук бесконечной прокрутки
 * @param target - ссылка на sentinel элемент (ref)
 * @param options - параметры: callback, root и т.д.
 */
export function useInfiniteScroll(
	target: Ref<HTMLElement | null>,
	options: Options
) {
	const observer = ref<IntersectionObserver | null>(null)

	const isEnabled = ref(!options.disabled)

	const initObserver = () => {
		if (!target.value || !isEnabled.value) return

		observer.value = new IntersectionObserver(
			async ([entry]) => {
				if (entry.isIntersecting && isEnabled.value) {
					await options.callback()
				}
			},
			{
				root: options.root || null,
				rootMargin: options.rootMargin || '0px',
				threshold: options.threshold ?? 1.0
			}
		)

		observer.value.observe(target.value)
	}

	const cleanupObserver = () => {
		if (observer.value && target.value) {
			observer.value.unobserve(target.value)
			observer.value.disconnect()
			observer.value = null
		}
	}

	onMounted(initObserver)
	onUnmounted(cleanupObserver)

	// если target появляется динамически
	watch(target, (el) => {
		cleanupObserver()
		if (el) initObserver()
	})

	// если в рантайме включается/отключается
	watch(() => options.disabled, (val) => {
		isEnabled.value = !val
		cleanupObserver()
		if (!val) initObserver()
	})
}