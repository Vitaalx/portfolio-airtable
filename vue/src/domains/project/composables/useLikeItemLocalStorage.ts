import { useLocalStorageItem } from "@/composables/useLocalStorageItem";
import { computed } from "vue";

export function useLikeItemLocalStorage(projectId: string) {
	const likeKey = `like-${projectId}`;
	const likeIdKey = `like-id-${projectId}`;

	const isLikedItem = useLocalStorageItem<boolean>(likeKey);
	const likeIdItem = useLocalStorageItem<string>(likeIdKey);

	function setLikeItem(likeId: string) {
		isLikedItem.value = true;
		likeIdItem.value = likeId;
	}

	function deleteLikeItem() {
		isLikedItem.value = false;
		likeIdItem.value = null;
	}

	const isLikedComputedValue = computed(() => !!likeIdItem.value);

	return {
		setLikeItem,
		deleteLikeItem,
		isLikedComputedValue,
		likeIdItem,
	};
}

