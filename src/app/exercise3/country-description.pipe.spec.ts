import { CountryDescriptionPipe } from './country-description.pipe';

describe('CountryDescriptionPipe', () => {
  it('create an instance', () => {
    const pipe = new CountryDescriptionPipe();
    expect(pipe).toBeTruthy();
  });
});
