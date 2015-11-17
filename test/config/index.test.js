'use strict';

let config = require('../../config');
let r = config.r;

describe('Configuration', () => {


  it('should have the tables setup properly', (done) => {
    r.table('accounts').run()
      .then(accounts => {
        console.log(accounts);
        done();
      })
      .catch(done);


    //config.r
    //  .tableList()
    //  .run()
    //  .then(tables => {
    //    console.log(tables);
    //    done();
    //  });
    //done();
  });

});
