export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const formatCuitCuil = (value: string): string => { 
    const digitsOnly = value.replace(/\D/g, "");
  
    if (digitsOnly.length > 11) {
      return digitsOnly.slice(0, 2) + "-" + digitsOnly.slice(2, 10) + "-" + digitsOnly.slice(10, 11);
    }
  
    if (digitsOnly.length <= 2) {
      return digitsOnly;
    } else if (digitsOnly.length <= 10) {
      return digitsOnly.slice(0, 2) + "-" + digitsOnly.slice(2);
    } else {
      return digitsOnly.slice(0, 2) + "-" + digitsOnly.slice(2, 10) + "-" + digitsOnly.slice(10);
    }
};