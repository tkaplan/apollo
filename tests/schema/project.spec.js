
var app = require('../db-mock').app,
    Q = require('q'),
    project,
    mongoose = require('../db-mock').mongoose;

describe("project", function() {
  this.timeout(10000);
  before(function(done) {
    //require('../../schema/User')(app,mongoose);
    require('../../schema/Project')(app,mongoose);

    project = {
      name: 'awsProject2',
      nestObj: {
      	'hello': {
      		'a': 'aa',
      		'b': 'bb'
      	}
      },
      pages: [

        {
          name: 'awsPage122',
          blocks: {
            'awsBlock1213':{
              content: '<p>this is test block121</p>'
            },
            'awsBlock1132': {
              content: '<p>this is test block122</p>'
            }

          }
        }
      ]
    }

    done();
  });

  it("Should allow me to set username", function(done) {
    var Project = app.db.model('Project');

    var testProject = new Project(project);
    testProject.save(function(err) {
    	console.log(err);
    	done();
    });
  });

  // after(function(done) {
  //   var  User = app.db.model('User');
  //       testUser = User.findOne({username: /^testUser/});
  //       testUser.remove(function(err, par) {
  //         if(err)
  //           console.log(err)
  //         done();
  //       });
  // });

});