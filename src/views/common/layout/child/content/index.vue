<template>
	<router-view v-slot="{ Component }" :key="$route.fullPath">
		<transition>
			<component :is="Component" />
		</transition>
	</router-view>
</template>
