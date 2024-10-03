export interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    cuitCuil: string;
}
  
export interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    cuitCuil?: string;
    termsAccepted?: string;
}
  
export interface FieldState {
    isFocused: boolean;
}
  
export interface FormFieldStates {
    firstName: FieldState;
    lastName: FieldState;
    email: FieldState;
    password: FieldState;
    confirmPassword: FieldState;
    cuitCuil: FieldState;
}
  