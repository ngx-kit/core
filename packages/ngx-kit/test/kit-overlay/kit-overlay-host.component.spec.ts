import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KitOverlayService } from '../../src/kit-overlay/kit-overlay.service';
import { KitOverlayHostComponent } from '../../src/kit-overlay/kit-overlay-host/kit-overlay-host.component';

describe('KitOverlayHost component', () => {
  let fixture: ComponentFixture<KitOverlayHostComponent>;
  let service: KitOverlayService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KitOverlayHostComponent,
      ],
      providers: [
        KitOverlayService,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    service = TestBed.get(KitOverlayService);
    spyOn(service, 'registerHost');
    fixture = TestBed.createComponent(KitOverlayHostComponent);
  });
  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it(`should register in service`, () => {
    expect(service.registerHost).toHaveBeenCalled();
  });
});