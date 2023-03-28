import Loading from '@/components/commmon/loading/index.vue';
import { ComponentPublicInstance, ObjectDirective, createApp } from 'vue';
interface DirectiveEL extends HTMLElement {
	instance: ComponentPublicInstance;
	startTime: number;
}
const LoadingDirective: ObjectDirective = {
	mounted(el: DirectiveEL, bingding) {
		const app = createApp(Loading);
		const instance = app.mount(document.createElement('div'));
		el.instance = instance;
		el.startTime = Date.now(); //记录开始时间
		bingding.value && appendEl(el);
	},
	updated(el, bingding, vnode) {
		if (bingding.value !== bingding.oldValue) {
			if (bingding.value) {
				appendEl(el);
			} else {
				const elapspedTime = Date.now() - el.startTime;
				const minDuration = 500;
				if (elapspedTime >= minDuration) {
					removeEl(el);
				} else {
					setTimeout(() => {
						removeEl(el);
					}, minDuration - elapspedTime);
				}
			}
		}
	},
};
const appendEl = (el: DirectiveEL) => {
	el.style.position = 'relative';
	el.appendChild(el.instance.$el);
};
const removeEl = (el: DirectiveEL) => {
	const $el = el.instance.$el;
	if (el.contains($el)) {
		el?.removeChild($el);
	}
};
export default LoadingDirective;
