export type FullDropdownProps<T extends object> = {
  name: string
  label?: string
  listItems: T[]
  selectedValue?: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<any>
  bindItemValue?: string
  bindItemLabel?: string | string[]
  referenceValue?: string
  placeholder?: string
  arrowIcon?: boolean
  labelStyle?: any
  isDisabled?: boolean
  onChangeFunc?: (data: any) => void
  separationMultiItem?: string
  imageHeader?: string
  imageLabel?: string
  required?: boolean
  width?: string
  iconMarginLeft?: string
  menuButtonStyle?: any
}
