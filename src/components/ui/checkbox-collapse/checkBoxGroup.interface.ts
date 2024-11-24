export interface ICheckboxElement {
  groupName: string
  groupElements: string[]
}

interface IDefaultValue {
  groupName: string
  groupElements: any[]
}

export interface ICheckboxGroup {
  checkBoxGroup: ICheckboxElement
  defaultValue?: IDefaultValue
  icon?: string
  onSelectGroupElement: (elt: any) => void
}
