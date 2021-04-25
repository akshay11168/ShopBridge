import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavbarComponent } from './top-navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import { ProductsService } from 'src/app/services/products.service';

import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';

import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('TopNavbarComponent', () => {
  let component: TopNavbarComponent;
  let fixture: ComponentFixture<TopNavbarComponent>;
  let productsService : ProductsService;
  let titleHTML: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        MatIconModule,
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [ TopNavbarComponent ],
      providers: [ProductsService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavbarComponent);
    productsService = TestBed.inject(ProductsService);
    component = fixture.componentInstance;
    titleHTML = fixture.debugElement.nativeElement.querySelector('#title')
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title',()=>{
    expect(titleHTML.textContent).toBe(component.title)
  })
});
