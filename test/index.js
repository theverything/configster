var configurator = require('../');
var expect = require('chai').expect;

describe('configurator', function(){

  it('throws an error if no path is given', function(){
    expect(configurator).to.throw(Error, 'need path of config files');
  });

  describe('in development', function(){
    var config;

    before(function () {
      process.env.NODE_ENV = 'development';
      config = configurator('./configs');
    });

    it('returns the correct value', function(){
      var value = config('three.b.one');
      expect(value).to.equal('hello');
    });
  });

  describe('in production', function(){
    var config;

    before(function () {
      process.env.NODE_ENV = 'production';
      config = configurator('./configs');
    });

    it('returns the correct value', function(){
      var value = config('three.b.one');
      expect(value).to.equal('jeff');
    });
  });

});
