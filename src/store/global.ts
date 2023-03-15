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
