<template>
    <loader-component v-if="isLoading && !posts.length">
    </loader-component>

    <feed-component v-else
                    :posts="posts"
                    :is-loading="isLoading"
                    :has-more="hasMore"
                    :observer-sentinel="observerSentinel">
    </feed-component>

    <error-component :error="error">
    </error-component>
</template>

<script setup
        lang="ts">
import {
    nextTick,
    onMounted,
    ref,
    watch,
}                      from 'vue';
import { usePostFeed } from './composables/usePostFeed.ts';
import FeedComponent   from './components/FeedComponent.vue';
import LoaderComponent from './components/LoaderComponent.vue';
import ErrorComponent  from './components/ErrorComponent.vue';

const initialLoading                                          = ref(true);
const { isLoading, hasMore, error, posts, observerSentinel, loadData } = usePostFeed();

onMounted(() => {
    loadData();
});

watch(isLoading, () => {
    if (!isLoading.value) {
        nextTick(() => {
            initialLoading.value = false;
        });
    }
});

</script>

