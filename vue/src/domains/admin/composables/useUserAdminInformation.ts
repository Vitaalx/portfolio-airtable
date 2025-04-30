import { useLocalStorageItem } from "@/composables/useLocalStorageItem";
import { computed } from "vue";

const accessTokenLocalStorageKey = "accessToken";

export function useUserAdminInformation() {
	const accessTokenItem = useLocalStorageItem<string>(accessTokenLocalStorageKey);

	function setAccessToken(accessToken: string) {
		accessTokenItem.value = accessToken;
	}

	function deleteAccessToken() {
		accessTokenItem.value = null;
	}

	const isConnected = computed(() => !!accessTokenItem.value);

	const accessToken = computed(() => accessTokenItem.value);

	return {
		setAccessToken,
		deleteAccessToken,
		isConnected,
		accessToken,
	};
}
