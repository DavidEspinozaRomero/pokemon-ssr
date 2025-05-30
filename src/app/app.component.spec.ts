import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLElement;

  @Component({
    selector: 'app-navbar',
  })
  class NavbarComponentMock { }

  beforeEach(async () => {
    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [NavbarComponentMock],
      },
    });

    // Recomendado
    // await TestBed.configureTestingModule({
    //   imports: [AppComponent,],
    //   providers: [provideRouter([])],
    // })
    //   .overrideComponent(AppComponent, {
    //     remove: {
    //       imports: [NavbarComponent],
    //     },
    //     add: {
    //       imports: [NavbarComponentMock],
    //     },
    //   })
    //   .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    console.log(fixture.nativeElement);
    expect(app).toBeTruthy();
  });

  it(`should render router-outlet and navbar`, () => {
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pokemos-ssr');
  // });
});
