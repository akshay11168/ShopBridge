import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { productIdValidator } from './validator';

describe('AppComponent', () => {
  
    beforeEach(async(() => {
  
      const productServiceSpy = jasmine.createSpyObj('productService',["toggleSideNavData"])
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
        ],
  
        declarations: [
        ],
        providers:[
        ]
      }).compileComponents().then(()=>{
      });
    }));
  
    it("validator should be valid",()=>{
        const validity = productIdValidator(new FormControl('P-123'))
        expect(validity).toBeNull("product Id is not accepting valid values")
    })

    it("validator should be valid",()=>{
        const validity = productIdValidator(new FormControl('123'))
        expect(validity).toEqual({'productId': {value:'123'}})
    })
  });
  