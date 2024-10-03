export interface FormValues {
    email: string;
    password: string;
}
  
export interface Errors {
    email?: string;
    password?: string;
}
  
export interface FieldState {
    isFocused: boolean;
}
  
export interface FormFieldStates {
    email: FieldState;
    password: FieldState;
}