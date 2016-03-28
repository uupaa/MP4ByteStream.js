# MPEG4ByteStream.js [![Build Status](https://travis-ci.org/uupaa/MPEG4ByteStream.js.svg)](https://travis-ci.org/uupaa/MP4ByteStream.js)

[![npm](https://nodei.co/npm/uupaa.mp4bytestream.js.svg?downloads=true&stars=true)](https://nodei.co/npm/uupaa.mp4bytestream.js/)

MPEG4-10 AVC - Annex B - Byte stream format

This module made of [WebModule](https://github.com/uupaa/WebModule).

## Documentation
- [Spec](https://github.com/uupaa/MPEG4ByteStream.js/wiki/)
- [API Spec](https://github.com/uupaa/MPEG4ByteStream.js/wiki/MPEG4ByteStream)

## Browser, NW.js and Electron

```js
<script src="<module-dir>/lib/WebModule.js"></script>
<script src="<module-dir>/lib/MPEG4ByteStream.js"></script>
<script>

var mpeg2ts    = MPEG2TS.parse( new Uint8Array(buffer) );
var byteStream = MPEG2TS.convertTSPacketToByteStream( mpeg2ts["VIDEO_TS_PACKET"] );
var nalunit    = MPEG4ByteStream.convertTSPacketToByteStream( byteStream );

</script>
```

## WebWorkers

```js
importScripts("<module-dir>lib/WebModule.js");
importScripts("<module-dir>lib/MPEG4ByteStream.js");

```

## Node.js

```js
require("<module-dir>lib/WebModule.js");
require("<module-dir>lib/MPEG4ByteStream.js");

```

