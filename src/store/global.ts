import { defineStore } from 'pinia';
type State = {
	collapsed: boolean;
};
export const useGlobalStore = defineStore('global', {
	state: (): State => ({
		collapsed: false,
	}),
	getters: {},
	actions: {},
});
