import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
	enableCache: true,
});

export const setStorage = (key, val) => {
	storage.save({
		key,
		data: val,
	});
};

export const getStorage = async (key) => {
	const data = await storage.load({ key });
	return data;
};
