import { defineStore } from 'pinia';
type historyItem = { name: string | undefined; path: string };
type HistoryState = {
	index: number; //当前选中的
	pathStack: historyItem[];
};
const darkList: string[] = [
	'/entry',
	'/login',
	'/500',
	'/404',
	'/layout/500',
];
export const useHistoryStore = defineStore('history', {
	state: (): HistoryState => ({
		index: 0,
		pathStack: [],
	}),
	persist: {
		enabled: true,
		strategies: [
			{
				storage: localStorage,
				paths: ['pathStack', 'index'],
			},
		],
	},
	getters: {
		//获取当前选中的路由
		getCurrentHistory: (state) => {
			return state.pathStack[state.index];
		},
	},
	actions: {
		//加入一个路由信息
		setStack(history: historyItem) {
			//判断该路由在不在黑名单
			console.log(history, 'as');
			if (isExitDarkList(history)) {
				return;
			}
			//判断原路由是否存在该路由信息
			const index = findHistoryIndex(this.pathStack, history);
			if (index === -1) {
				this.pathStack.push(history);
				this.index = this.pathStack.length - 1;
				return;
			}
			//不存在则直接将指针赋值给Index
			this.index = index;
		},
		//删除一个路由信息
		removeStack(index: number) {
			if (index === 0) return; //如果是第一项那就不给删除
			const preItem = this.getCurrentHistory;
			//判断是否删除的是当前项,删除玩需要把指针往后挪动一位
			this.pathStack.splice(index, 1);
			if (this.index === index) {
				this.index--;
			} else {
				const newIndex = findHistoryIndex(
					this.pathStack,
					preItem
				);
				this.setIndex(newIndex);
			}
		},
		//点击设置索引
		setIndex(index: number) {
			this.index = index;
		},
	},
});
function findHistoryIndex(
	historyStack: historyItem[],
	history: historyItem
) {
	return historyStack.findIndex((item) => item.path === history.path);
}

function isExitDarkList(history: historyItem) {
	const path = history.path;
	return darkList.find((item) => item === path);
}
