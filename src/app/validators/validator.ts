import { AbstractControl } from "@angular/forms";

// custom validator for ProductId
export function productIdValidator(control: AbstractControl): {[key:string]:any} | null {

    const valid = /^P-[0-9]*$/.test(control.value)
    console.log("productIdValidator",valid)
    return !valid ? {'productId': {value:control.value}}: null
    
}