import * as React from 'react'

export type DatePickerProps = {
  name: string
  label?: string
  selectedDate: any
  onChangeFunc?: (date: Date | null, event?: React.SyntheticEvent<any> | undefined) => void
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => Promise<any>
  placeholder?: string
  dateFormat?: string
  listExcludeDates?: IExcludeDates[]
  customDayClassName?: (date: Date) => string
  disabled?: boolean
  isClearable?: boolean
  disabledWeekday?: boolean
  required?: boolean
  [x: string]: any
}

export interface IExcludeDates {
  date: Date
  message: string
}
