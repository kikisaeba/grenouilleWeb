import { MyMaterialsModule } from './my-materials.module';

describe('MyMaterialsModule', () => {
  let myMaterialsModule: MyMaterialsModule;

  beforeEach(() => {
    myMaterialsModule = new MyMaterialsModule();
  });

  it('should create an instance', () => {
    expect(myMaterialsModule).toBeTruthy();
  });
});
