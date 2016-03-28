(function moduleExporter(name, closure) {
"use strict";

var entity = GLOBAL["WebModule"]["exports"](name, closure);

if (typeof module !== "undefined") {
    module["exports"] = entity;
}
return entity;

})("MPEG4ByteStream", function moduleClosure(global, WebModule, VERIFY, VERBOSE) {
"use strict";

// --- technical terms / data structure --------------------
// --- dependency modules ----------------------------------
var HexDump     = WebModule["HexDump"];
var NALUnitType = WebModule["NALUnitType"];
// --- import / local extract functions --------------------
// --- define / local variables ----------------------------
// --- class / interfaces ----------------------------------
var MPEG4ByteStream = {
    "VERBOSE": VERBOSE,
    "convertByteStreamToNALUnitObjectArray": MPEG4ByteStream_convertByteStreamToNALUnitObjectArray, // MPEG4ByteStream.convertByteStreamToNALUnit(stream:ByteStreamUint8Array):NALUnitObjectArray
};

// --- implements ------------------------------------------
function MPEG4ByteStream_convertByteStreamToNALUnitObjectArray(stream) { // @arg ByteStreamUint8Array - ByteStreamFormat [00, 00, 00, 01, 09, F0 ...]
                                                                         // @ret NALUnitObjectArray - [ NALUnitObject, ... ]
                                                                         // @desc convert Annex B ByteStrem format to NALUnit(NAL file format).
                                                                         //        stream: `| 00 00 00 01 | NALUnit | 00 00 01    | NALUnit | ...`
                                                                         //        result: `|               NALUnit |               NALUnit | ...`
//{@dev
    if (VERIFY) {
        $valid($type(stream, "Uint8Array"), MPEG4ByteStream_convertByteStreamToNALUnitObjectArray, "stream");
        // need leading 2byte zero( 00 00 )
        $valid(stream.length >= 4 && !stream[0] && !stream[1],
                                            MPEG4ByteStream_convertByteStreamToNALUnitObjectArray, "stream");
    }
//}@dev

    var nalUnitUint8ArrayArray = []; // NALUnitUint8ArrayArray. [NALUnitUint8Array, ...] without StartCode
    var cursor       = 0;
    var start        = 0;  // NALUnit start position
    var end          = 0;  // NALUnit end position
    var streamLength = stream.length;

    // --- slide buffer ---
    var a = 0; // stream[current - 3] byte
    var b = 0; // stream[current - 2] byte
    var c = 0; // stream[current - 1] byte
    var d = 0; // stream[current] byte

    // --- split NALUnit token ---
    // | StartCode | NALUnit        | StartCode | NALUnit        | ...
    // | 00 00 01  | xx xx xx xx xx | 00 00 01  | xx xx xx xx xx | ...
    //               ^           ^
    //               |           |
    //             start        end
    while (cursor < streamLength) {
        a = b;
        b = c;
        c = d;
        d = stream[cursor++] || 0;
        if (b === 0x00 && c === 0x00 && d === 0x01) { // find StartCode(00 00 00 01) or (00 00 01)
            if (start !== 0) {
                end = cursor - ((a === 0x00) ? 4 : 3); // (00 00 00 01) or (00 00 01)
                nalUnitUint8ArrayArray.push( stream.subarray(start, end) );
            }
            start = cursor;
        }
    }
    if (start !== cursor) { // add last NALUnit
        nalUnitUint8ArrayArray.push( stream.subarray(start, cursor) );
    }

    if (MPEG4ByteStream["VERBOSE"]) {
        HexDump(stream, {
            "title": "NALUnit_convertByteStreamToNALUnit",
            "rule": {
                "StartCode(00 00 01)": { "values": [0x00, 0x00, 0x01], "bold": true, "style": "color:red" },
                "AUD":                 { "values": [0x09, 0xF0],       "bold": true, "style": "color:red"    },
                "EP3B(00 00 03 00)":   { "values": [0x00, 0x00, 0x03, 0x00],       "style": "color:tomato;background-color:yellow" },
                "EP3B(00 00 03 01)":   { "values": [0x00, 0x00, 0x03, 0x01],       "style": "color:tomato;background-color:yellow" },
                "EP3B(00 00 03 02)":   { "values": [0x00, 0x00, 0x03, 0x02],       "style": "color:tomato;background-color:yellow" },
                "EP3B(00 00 03 03)":   { "values": [0x00, 0x00, 0x03, 0x03],       "style": "color:tomato;background-color:yellow" },
                "PPS (4 byte)":        { "values": [0x68, 0xCE, 0x0F, 0x2C],       "bold": true, "style": "background-color:gold" },
                "PPS (5 byte)":        { "values": [0x68, 0xCE, 0x0F, 0x2C, 0x80], "bold": true, "style": "color:red" },
            }
        });
    }
    return _toNALUnitObjectArray(nalUnitUint8ArrayArray);
}

function _toNALUnitObjectArray(nalUnitUint8ArrayArray) { // @arg NALUnitUint8ArrayArray - [ Uint8Array(NALUnitHeader + EBSP), ... ]
                                                         // @ret NALUnitObjectArray - [ NALUnitObject, ... ]
                                                         // @desc convert NALUnit to NALUnitObject.
    var nalUnitObjectArray = []; // [NALUnitObject, ...]

    for (var i = 0, iz = nalUnitUint8ArrayArray.length; i < iz; ++i) {
        var nalUnit       = nalUnitUint8ArrayArray[i]; // NALUnit     = NALUnitHeader + EBSP
        var nal_ref_idc   = (nalUnit[0] & 0x60) >> 5;
        var nal_unit_type =  nalUnit[0] & 0x1F;
        var nalUnitObject = {
            "nal_ref_idc":      nal_ref_idc,
            "nal_unit_type":    nal_unit_type,
            "index":            i,
            "data":             nalUnit,
            "NAL_UNIT_TYPE":    NALUnitType[nal_unit_type],
        };

        nalUnitObjectArray.push( nalUnitObject );

        if (MPEG4ByteStream["VERBOSE"]) {
            HexDump(nalUnit, {
                "title": "_toNALUnitObjectArray: " + nalUnitObject["NAL_UNIT_TYPE"],
                "rule": {
                    "AUD":                 { "values": [0x09, 0xF0], "bold": true, "style": "color:red"    },
                    "EP3B(00 00 03 00)":   { "values": [0x00, 0x00, 0x03, 0x00], "style": "color:tomato;background-color:yellow" },
                    "EP3B(00 00 03 01)":   { "values": [0x00, 0x00, 0x03, 0x01], "style": "color:tomato;background-color:yellow" },
                    "EP3B(00 00 03 02)":   { "values": [0x00, 0x00, 0x03, 0x02], "style": "color:tomato;background-color:yellow" },
                    "EP3B(00 00 03 03)":   { "values": [0x00, 0x00, 0x03, 0x03], "style": "color:tomato;background-color:yellow" },
                }
            });
        }
    }
    return nalUnitObjectArray;
}

return MPEG4ByteStream; // return entity

});

