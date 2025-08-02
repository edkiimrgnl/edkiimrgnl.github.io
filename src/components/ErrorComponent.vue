<template>
    <div v-if="error.reason"
         class="error-message">
        {{ error.reason }}:
        <br>
        {{ error.text }}
    </div>
</template>

<script setup
        lang="ts">
type LocalError = {
    reason: string,
    text: string
};

defineProps<{ error: LocalError }>();
</script>

<style scoped>
.error-message {
    max-width        : 600px;
    color            : red;
    padding          : 10px;
    background-color : #ffe5e5;
    border           : 1px solid red;
    border-radius    : 5px;
    margin           : 10px 0;
}
</style>