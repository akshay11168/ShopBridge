import { AbstractControl } from "@angular/forms";

// custom validator for ProductId
export function productIdValidator(control: AbstractControl): {[key:string]:any} | null {

    const valid = /^P-[0-9]*$/.test(control.value)
    return !valid ? {'productId': {value:control.value}}: null
    
}