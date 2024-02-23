export interface EEE {
  (e: "update:modelValue", value: number): void;
  (e: "change", item: any, index: number): void;
}
