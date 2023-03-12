interface IUseLocalStorage {
	setLocalStorage: (name: string, data: unknown) => void;
	getLocalStorage: (name: string) => unknown;
}

function useLocalStorage(): IUseLocalStorage {
	function setLocalStorage(name: string, data: unknown) {
		localStorage.setItem(name, JSON.stringify(data));
	}
	function getLocalStorage(name: string) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return JSON.parse(localStorage.getItem(name)!);
	}
	return {
		setLocalStorage,
		getLocalStorage,
	};
}

export { useLocalStorage };
