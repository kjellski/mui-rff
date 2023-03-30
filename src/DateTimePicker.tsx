import React from 'react';

import {
	DateTimePicker as MuiDateTimePicker,
	DateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/x-date-pickers';

import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

import { ShowErrorFunc, showErrorOnChange } from './Util';
import { TextFieldProps } from '@mui/material/TextField';

export interface DateTimePickerProps extends Partial<Omit<MuiDateTimePickerProps<any>, 'onChange'>> {
	fieldProps?: Partial<FieldProps<any, any>>;
	locale?: any;
	name: string;
	required?: boolean;
	showError?: ShowErrorFunc;
	textFieldProps?: TextFieldProps;
}

export function DateTimePicker(props: DateTimePickerProps) {
	const { name, fieldProps, required, ...rest } = props;

	return (
		<Field
			name={name}
			render={(fieldRenderProps) => <DateTimePickerWrapper {...fieldRenderProps} {...rest} />}
			required={required}
			{...fieldProps}
		/>
	);
}

interface DateTimePickerWrapperProps extends FieldRenderProps<MuiDateTimePickerProps<any>> {
	required?: boolean;
}

function DateTimePickerWrapper(props: DateTimePickerWrapperProps) {
	const {
		input: { name, onChange, value, ...restInput },
		meta,
		showError = showErrorOnChange,
		required,
		...rest
	} = props;

	const { error, submitError } = meta;
	const isError = showError({ meta });

	const { helperText, textFieldProps, ...lessrest } = rest;

	return (
		<MuiDateTimePicker
			onChange={onChange}
			value={(value as any) === '' ? null : value}
			{...lessrest}
			slotProps={{
				textField: {
					helperText: isError ? error || submitError : helperText,
					inputProps: {
						onBlur: (event) => {
							restInput.onBlur(event);
						},
						onFocus: (event) => {
							restInput.onFocus(event);
						},
					},
					error: isError,
					name,
					onChange,
					value,
					required,
				},
			}}
		/>
	);
}
