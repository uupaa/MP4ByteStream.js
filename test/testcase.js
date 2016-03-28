var ModuleTestMPEG4ByteStream = (function(global) {

var test = new Test(["MPEG4ByteStream"], { // Add the ModuleName to be tested here (if necessary).
        disable:    false, // disable all tests.
        browser:    true,  // enable browser test.
        worker:     true,  // enable worker test.
        node:       true,  // enable node test.
        nw:         true,  // enable nw.js test.
        el:         true,  // enable electron (render process) test.
        button:     true,  // show button.
        both:       true,  // test the primary and secondary modules.
        ignoreError:false, // ignore error.
        callback:   function() {
        },
        errorback:  function(error) {
            console.error(error.message);
        }
    });

if (IN_BROWSER || IN_NW || IN_EL || IN_WORKER || IN_NODE) {
    test.add([
        testMPEG4ByteStream_convertByteStreamToNALUnit,
    ]);
}

// --- test cases ------------------------------------------
function testMPEG4ByteStream_convertByteStreamToNALUnit(test, pass, miss) {
    var byteStream = new Uint8Array([0x00, 0x00, 0x01, 0x09, 0xF0]);
    var nalunit    = MPEG4ByteStream.convertByteStreamToNALUnitObjectArray( byteStream );

    test.done(pass());
}

return test.run();

})(GLOBAL);

