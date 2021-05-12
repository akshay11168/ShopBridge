import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TopNavbarComponent } from './top-navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DebugElement } from '@angular/core';
import { Router , RouterLinkWithHref, ActivatedRoute , convertToParamMap } from '@angular/router';
import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { routes } from "src/app/app-routing.module"
import { Location } from "@angular/common" ;
import { of } from "rxjs"
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';

describe('TopNavbarComponent', () => {
  let component: TopNavbarComponent;
  let fixture: ComponentFixture<TopNavbarComponent>;
  let productsService : any;
  let titleHTML: HTMLElement;
  let el : DebugElement;
  let router : Router;
  let location : Location;

  beforeEach(async(() => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService',['toggleSideNavSource','toggleSideNav','searchProduct','getToggleSideNavSource'])
    const mockNgZoneSpy = jasmine.createSpyObj('mockNgZone', ['run', 'runOutsideAngular']);
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        MatIconModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [ 
        TopNavbarComponent ,
        ProductsComponent,
        ProductListComponent,
        DashboardComponent,
        SideNavbarComponent,
      
      ],
      providers: [
        {provide : ProductsService, useValue: productsServiceSpy},
      ],
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(TopNavbarComponent);
      productsService = TestBed.inject(ProductsService);
      component = fixture.componentInstance;
      el = fixture.debugElement
      router  = TestBed.inject(Router)
      location  = TestBed.inject(Location)

      router.initialNavigation()
    });
  }));

  it('should initail route',async (()=>{
     fixture.detectChanges()
     fixture.whenStable().then(()=>{
       expect(location.path()).toBe('/')
     })
  }))

  it('should searchProduct',fakeAsync (()=>{
    fixture.detectChanges()
    productsService.searchProduct.and.returnValue(of("abc","abc"))
    component.searchProduct()
    tick()
    expect(location.path()).toBe('/productslist')
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title',()=>{
    fixture.detectChanges();
    titleHTML = el.nativeElement.querySelector('#title')
    expect(titleHTML.textContent).toBe(component.title)
  })

  it('should toggle sideNavBar',()=>{
    productsService.toggleSideNav.and.returnValue(null)

    productsService.getToggleSideNavSource.and.returnValue(true)

    const result = component.toggleSidenav()
    expect(result).toBeUndefined("error in toggling side nav bar")
  })

});
