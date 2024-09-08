import type { Input } from "@nordhealth/components";

export default function useField(initialValue = "") {
  const inputRef = ref<Input>();
  const value = ref(initialValue);

  return reactive({
    value,
    focus: () => inputRef.value?.focus(),
    setRef: (el: Input) => {
      inputRef.value = el;
    },
  });
}