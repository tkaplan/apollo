describe 'Apollo', () ->
  beforeEach angular.mock.module 'apollo'
  it 'should be true', () ->
    expect(true ).toBe(true)
    console.log(document.getElementsByTagName('body'))