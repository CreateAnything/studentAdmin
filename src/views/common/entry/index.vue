<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const onEntry = () => {
	console.log(router);
	router.push('/login');
};
</script>
<template>
	<div class="entry">
		<div class="entry-btn" @click="onEntry">
			<span>Click to go to the home page</span>
		</div>
	</div>
</template>
<style lang="less" scoped>
.entry {
	width: 100vw;
	height: 100vh;
	background: url('/src/assets/image/entry.webp') no-repeat center;
	background-size: cover;
	position: relative;
	&::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.2);
		z-index: 1;
	}
	.entry-btn {
		position: absolute;
		top: 70%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
	}
	span {
		// color: white;
		font-size: 35px;
		cursor: pointer;
		transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
		display: inline-block;
		text-transform: uppercase;
		color: transparent;
		background-image: linear-gradient(
			to bottom right,
			#1e90ff,
			#9400d3
		);
		background-clip: text;
		-webkit-background-clip: text;
		filter: brightness(300%);

		overflow: hidden;
		white-space: nowrap;
		width: 0;
		animation: typing 2s steps(50, end) forwards;
	}
}
span:hover {
	transform: scale(1.1);
}
@keyframes typing {
	from {
		width: 0;
	}
	to {
		width: 100%;
	}
}
</style>
