// Dependencies
steal(
    "opstools/BuildApp/controllers/BuildModel.js",
// Initialization
function(){

    // the div to attach the controller to
    var divID = 'test_BuildModel';

    // add the div to the window
    var buildHTML = function() {
        var html = [
                    '<div id="'+divID+'">',
                    '</div>'
                    ].join('\n');

        $('body').append($(html));
    }
    

    //Define the unit tests
    describe('testing controller AD.controllers.opstools.BuildApp.BuildModel ', function(){

        var testController = null;

        before(function(){

            buildHTML();

            // Initialize the controller
            testController = new AD.controllers.opstools.BuildApp.BuildModel($('#'+divID), { some:'data' });

        });



        it('controller definition exists ', function(){
            assert.isDefined(AD.controllers.opstools , ' :=> should have been defined ');
            assert.isDefined(AD.controllers.opstools.BuildApp , ' :=> should have been defined ');
            assert.isDefined(AD.controllers.opstools.BuildApp.BuildModel, ' :=> should have been defined ');
              assert.isNotNull(AD.Control.get('opstools.BuildApp.BuildModel'), ' :=> returns our controller. ');
        });


    });


});