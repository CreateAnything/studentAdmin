<template>
	<router-view v-slot="{ Component }" :key="$route.fullPath">
		<keep-alive>
			<component :is="Component" />
		</keep-alive>
	</router-view>
</template>
