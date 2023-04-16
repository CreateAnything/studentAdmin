import { defineStore } from 'pinia';
type State = {
	collapsed: boolean;
	showHistory: boolean;
	home: { name: string; path: string };
	siderMode: 'dark' | 'light';
	defaultRedirect: string;
};
export const useGlobalStore = defineStore('global', {
	state: (): State => ({
		collapsed: false,
		showHistory: true,
		home: {
			name: '',
			path: '',
		},
		siderMode: 'dark',
		defaultRedirect: 'entry',
	}),
	persist: {
		enabled: true,
		strategies: [
			{
				storage: localStorage,
				paths: ['collapsed', 'home', 'siderMode'],
			},
		],
	},
	getters: {
		getColor: (state) => {
			return state.siderMode === 'dark' ? '#001529' : '#fff';
		},
		getIconColor: (state) => {
			return state.siderMode === 'dark' ? '#fff' : '#000000';
		},
	},
	actions: {},
});
