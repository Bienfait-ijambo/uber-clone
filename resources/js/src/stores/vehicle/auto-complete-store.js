import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useAutoCompleteStore = defineStore(
    "auto-complete-store",
    () => {
        const showSuggestionsDestination = ref(false);
const queryDestination = ref("");

const showSuggestionsLocation = ref(false);
const queryLocation = ref("");

        return {
           showSuggestionsDestination,
           showSuggestionsLocation,
           queryLocation,
           queryDestination
        };
    }
);

if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(useAutoCompleteStore, import.meta.hot)
    );
}
