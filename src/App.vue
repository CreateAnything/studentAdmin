<script setup lang="ts"></script>

<template>
	<router-view v-slot="{ Component }">
		<transition name="slide-fade" mode="out-in">
			<component class="child-view" :is="Component" />
		</transition>
	</router-view>
</template>

<style lang="less" scoped></style>
