<template>
    <div v-if="hasPosts"
         class="feed">
        <div class="feed-container">
            <post-card v-for="post in posts"
                       :key="post.id"
                       :post="post">
            </post-card>
        </div>

        <loader-component v-if="isLoading">
        </loader-component>

        <div v-if="!hasMore">
            А коты кончились на сегодня. Давай, интернетозависимый, отдохни.
        </div>

        <div ref="sentinel"></div>
    </div>
</template>

<script setup
        lang="ts">
import {
    computed,
    ref,
    watchEffect,
}                        from 'vue';
import PostCard          from './PostCard.vue';
import LoaderComponent   from './LoaderComponent.vue';
import type { MegaPost } from '../types/post.ts';

const sentinel = ref<HTMLElement | null>(null);

interface Props {
    posts: MegaPost[];
    observerSentinel: (element: HTMLElement) => void;
    isLoading: boolean;
    hasMore: boolean;
}

const props = defineProps<Props>();

const hasPosts = computed(() => props.posts.length > 0);

watchEffect(() => {
    if (sentinel.value) {
        props.observerSentinel(sentinel.value);
    }
});

</script>

<style scoped>
.feed {
    width            : 600px;
    margin           : 0 auto;
    padding          : 20px;
    background-color : #fafafa;
}

.feed-container {
    display        : flex;
    flex-direction : column;
    gap            : 20px;
}
</style>
