import { defineStore } from 'pinia';
type State = {
	collapsed: boolean;
	showHistory: boolean;
	pathHome: string;
	siderMode: 'dark' | 'light';
};
export const useGlobalStore = defineStore('global', {
	state: (): State => ({
		collapsed: false,
		showHistory: true,
		pathHome: '',
		siderMode: 'dark',
	}),
	persist: {
		enabled: true,
		strategies: [
			{
				storage: localStorage,
				paths: ['collapsed', 'pathHome', 'siderMode'],
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
