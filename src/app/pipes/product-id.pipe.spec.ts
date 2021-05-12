import { ProductIdPipe } from './product-id.pipe';

describe('ProductIdPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductIdPipe();
    expect(pipe).toBeTruthy();
  });

  it('pipe testing',()=>{
    const pipe = new ProductIdPipe();
    const result = pipe.transform('P-103','complete')
    expect(result).toBe('P-103', "complete format of pipe not working")
  })

  it('pipe testing',()=>{
    const pipe = new ProductIdPipe();
    const result = pipe.transform('P-103','medium')
    expect(result).toBe('103', "medium format of pipe not working")
  })

  it('pipe testing',()=>{
    const pipe = new ProductIdPipe();
    const result = pipe.transform('P-103')
    expect(result).toBeNull("pipe error")
  })
});
