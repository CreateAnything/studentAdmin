import { defineStore } from 'pinia';
type State = {
	collapsed: boolean;
	isLoading: boolean;
};
export const useGlobalStore = defineStore('global', {
	state: (): State => ({
		collapsed: false,
		isLoading: false,
	}),
	persist: {
		enabled: true,
		strategies: [
			{
				storage: localStorage,
				paths: ['collapsed'],
			},
		],
	},
	getters: {},
	actions: {
		showLoading() {
			this.isLoading = true;
		},
		hideLoading() {
			this.isLoading = false;
		},
	},
});
