import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BranddetailsComponent } from './branddetails.component';
describe('BranddetailsComponent', () => {
  let component: BranddetailsComponent;
  let fixture: ComponentFixture<BranddetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BranddetailsComponent]
    });
    fixture = TestBed.createComponent(BranddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
