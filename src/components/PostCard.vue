<template>
    <div class="post-card">
        <div class="post-header">
            <div class="user-info">
                <div class="user-avatar">
                    <img :src="avatarSrc"
                         :alt="user.username">
                </div>
                <span class="username">{{ user.username }}</span>
            </div>
            <div class="post-options">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>

        <div :class="isLoadingImage ? 'post-skeleton__image' : 'post-image'">
            <img :src="imgSrc"
                 :alt="post.body"
                 @load="isLoadingImage = false">
        </div>

        <div class="post-card__content">
            <h2 class="post-card__title">{{ post.title }}</h2>
            <p class="post-card__body">{{ post.body }}</p>
        </div>

        <!-- TODO кнопки, добавить действия -->
        <div class="post-actions">
            <div class="action-buttons">
                <button class="action-btn">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="action-btn">
                    <i class="fas fa-comment"></i>
                </button>
                <button class="action-btn">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
            <button class="action-btn bookmark">
                <i class="fas fa-bookmark"></i>
            </button>
        </div>
    </div>
</template>

<script setup
        lang="ts">
import {
    computed,
    ref,
}                        from 'vue';
import type { MegaPost } from '../types/post.ts';

const props = defineProps<{
    post: MegaPost
}>();

const user           = computed(() => props.post.user);
const isLoadingImage = ref(true);

const imgSrc    = `https://placecats.com/${getRandomFloat(100, 500)}/${getRandomFloat(100, 500)}`;
const avatarSrc = `https://placecats.com/${getRandomFloat(10, 50)}/${getRandomFloat(10, 50)}`;

function getRandomFloat(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max - min));
}
</script>

<style scoped>
.post-card {
    background    : #ffffff;
    border        : 1px solid #dbdbdb;
    border-radius : 3px;
}

.post-header {
    display         : flex;
    justify-content : space-between;
    align-items     : center;
    padding         : 14px 16px;
    border-bottom   : 1px solid #efefef;
}

.user-info {
    display     : flex;
    align-items : center;
    gap         : 10px;
}

.user-avatar {
    width         : 32px;
    height        : 32px;
    border-radius : 50%;
    overflow      : hidden;
}

.username {
    font-weight : 600;
    color       : #262626;
}

.user-avatar img {
    width      : 100%;
    height     : 100%;
    object-fit : cover;
}

.post-image {
    width : 100%;
}

.post-image img {
    width   : 100%;
    height  : auto;
    display : block;
}

.post-actions {
    display         : flex;
    justify-content : space-between;
    padding         : 8px 16px;
}

.post-card__content {
    padding : 16px;
    color   : #333;
}

.post-card__title {
    font-size   : 18px;
    margin      : 0 0 12px;
    line-height : 1.4;
}

.post-card__body {
    font-size   : 14px;
    line-height : 1.6;
    margin      : 0 0 16px;
}

.action-buttons {
    display : flex;
    gap     : 16px;
}

.action-btn {
    background : none;
    border     : none;
    padding    : 8px;
    cursor     : pointer;
    font-size  : 24px;
    color      : #262626;
}

.action-btn:hover {
    opacity : 0.7;
}

.post-skeleton__image {
    width      : 100%;
    height     : 600px;
    background : #f0f0f0;
    animation  : pulse 1s infinite;
}

@keyframes pulse {
    0% { opacity : 1; }
    50% { opacity : 0.5; }
    100% { opacity : 1; }
}
</style>