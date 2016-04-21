// MPEG4ByteStream test

require("../../lib/WebModule.js");

WebModule.VERIFY  = true;
WebModule.VERBOSE = true;
WebModule.PUBLISH = true;

require("../../node_modules/uupaa.nalunit.js/node_modules/uupaa.bit.js/lib/Bit.js");
require("../../node_modules/uupaa.nalunit.js/node_modules/uupaa.bit.js/lib/BitView.js");
require("../../node_modules/uupaa.nalunit.js/node_modules/uupaa.hexdump.js/lib/HexDump.js");
require("../../node_modules/uupaa.nalunit.js/lib/NALUnitType.js");
require("../../node_modules/uupaa.nalunit.js/lib/NALUnitParameterSet.js");
require("../../node_modules/uupaa.nalunit.js/lib/NALUnitEBSP.js");
require("../../node_modules/uupaa.nalunit.js/lib/NALUnitAUD.js");
require("../../node_modules/uupaa.nalunit.js/lib/NALUnitSPS.js");
require("../../node_modules/uupaa.nalunit.js/lib/NALUnitPPS.js");
require("../../node_modules/uupaa.nalunit.js/lib/NALUnitSEI.js");
require("../../node_modules/uupaa.nalunit.js/lib/NALUnitIDR.js");
require("../../node_modules/uupaa.nalunit.js/lib/NALUnitNON_IDR.js");
require("../../node_modules/uupaa.nalunit.js/lib/NALUnit.js");
require("../wmtools.js");
require("../../lib/MPEG4ByteStream.js");
require("../../release/MPEG4ByteStream.n.min.js");
require("../testcase.js");

