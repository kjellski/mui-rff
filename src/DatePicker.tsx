import React from 'react';

import { DatePicker as MuiDatePicker, DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

import { ShowErrorFunc, showErrorOnChange } from './Util';

export interface DatePickerProps extends Partial<Omit<MuiDatePickerProps<any, any>, 'onChange'>> {
	fieldProps?: Partial<FieldProps<any, any>>;
	locale?: any;
	name: string;
	required?: boolean;
	showError?: ShowErrorFunc;
	textFieldProps?: TextFieldProps;
}

export function DatePicker(props: DatePickerProps) {
	const { name, fieldProps, required, ...rest } = props;

	return (
		<Field
			name={name}
			render={(fieldRenderProps) => <DatePickerWrapper required={required} {...fieldRenderProps} {...rest} />}
			{...fieldProps}
		/>
	);
}

interface DatePickerWrapperProps extends FieldRenderProps<MuiDatePickerProps<any, any>> {
	required?: boolean;
}

function DatePickerWrapper(props: DatePickerWrapperProps) {
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
		<MuiDatePicker
			onChange={onChange}
			value={(value as any) === '' ? null : value}
			{...lessrest}
			renderInput={(inputProps) => (
				<TextField
					{...textFieldProps}
					{...inputProps}
					fullWidth={true}
					helperText={isError ? error || submitError : helperText}
					error={inputProps.error || isError}
					name={name}
					required={required}
					inputProps={{
						...inputProps.inputProps,
						onBlur: (event) => {
							inputProps.inputProps?.onBlur?.(event);
							restInput.onBlur(event);
						},
						onFocus: (event) => {
							inputProps.inputProps?.onFocus?.(event);
							restInput.onFocus(event);
						},
					}}
				/>
			)}
		/>
	);
}
