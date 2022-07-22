import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppModule } from '../modules/app.module';
import { RegisterComponent } from './register.component';
describe('RegisterComponent Test', () => {
    beforeEach((() => {
       TestBed.configureTestingModule({
        declarations: [
            RegisterComponent
        ],
        imports: [
            AppModule
        ],
      }).compileComponents();
    }));
    it('Debe de existir el componente', (() => {
      const fixture = TestBed.createComponent(RegisterComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    }));
})