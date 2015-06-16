
var JSC     = require('jscheck'),
    jasmine = require('jasmine');  // is ... this legit?

var slice   = [].slice,
    forAll;





forAll = function(signature, name, predicate) {

  var pp     = new jasmine.StringPrettyPrinter(),
      format = function(values) {
        pp.format(value);
        return pp.string;
      };



  return it(name, function() {

    var failedBefore, failure, jscPredicate, localJasmine;

    failedBefore = false;
    localJasmine = this;

    JSC.clear();

    jscPredicate = (function(_this) {

      return function() {
        var value  = value = 2 <= arguments.length ? slice.call(arguments, 1) : [],
            verify = arguments[0];
        predicate.apply(null, value);
        return verify(_this.results().failedCount === 0);
      };

    })(this);

    JSC.claim(name, jscPredicate, signature);

    if (this.reps) { JSC.reps(this.reps); }

    failure = function(f) {

      var theReport;

      theReport = 'Failed: ' + f.name;

      if (!failedBefore) {

        console.log('First failure with arguments:');
        console.log(f.args);

        if (f.exception != null) { console.log('Exception: ' + f.exception); }

        localJasmine.fail(theReport);

      }

      return failedBefore = true;

    };

    JSC.on_fail(failure);
    JSC.on_lost(failure);

    return JSC.check(5000);

  });

};





module.exports = {
  for_all : forAll
};
