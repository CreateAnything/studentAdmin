import Loading from '@/components/commmon/loading/index.vue';
import { ComponentPublicInstance, ObjectDirective, createApp } from 'vue';
interface DirectiveEL extends HTMLElement {
	instance: ComponentPublicInstance;
}
const LoadingDirective: ObjectDirective = {
	mounted(el: DirectiveEL, bingding) {
		const app = createApp(Loading);
		const instance = app.mount(document.createElement('div'));
		el.instance = instance;
		bingding.value && appendEl(el);
	},
	updated(el, bingding) {
		if (bingding.value !== bingding.oldValue) {
			bingding.value ? appendEl(el) : removeEl(el);
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
