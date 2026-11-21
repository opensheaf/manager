// A zip of text files, stored (no compression), for the files a page gives
// at once: a browser lets one click download one file only, so the rotation
// keys are saved as one zip, unpacked by the person onto the offline media.
// The files are at the top level of the zip, with the names given; their
// time is fixed (1 January 1980, the earliest a zip records), so that the
// same files give the same zip.

const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

export function crc32(bytes) {
  let c = 0xffffffff;
  for (const b of bytes) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// files: [{ name, text }] (names of ASCII characters, no folders). Gives the
// bytes of the zip.
export function storedZip(files) {
  const enc = new TextEncoder();
  const local = [], central = [];
  let offset = 0;
  const DOS_DATE = (0 << 9) | (1 << 5) | 1;   // 1980-01-01
  for (const f of files) {
    if (!/^[\x21-\x7e]+$/.test(f.name) || f.name.includes("/")) throw new Error(`not a name for the zip: ${f.name}`);
    const name = enc.encode(f.name), data = typeof f.text === "string" ? enc.encode(f.text) : f.text;
    const crc = crc32(data);
    const head = new DataView(new ArrayBuffer(30));
    head.setUint32(0, 0x04034b50, true);
    head.setUint16(4, 20, true);          // version needed: 2.0
    head.setUint16(6, 0, true);           // flags
    head.setUint16(8, 0, true);           // stored
    head.setUint16(10, 0, true);          // time
    head.setUint16(12, DOS_DATE, true);
    head.setUint32(14, crc, true);
    head.setUint32(18, data.length, true);
    head.setUint32(22, data.length, true);
    head.setUint16(26, name.length, true);
    head.setUint16(28, 0, true);
    local.push(new Uint8Array(head.buffer), name, data);
    const entry = new DataView(new ArrayBuffer(46));
    entry.setUint32(0, 0x02014b50, true);
    entry.setUint16(4, 20, true);         // made by: 2.0, MS-DOS
    entry.setUint16(6, 20, true);
    entry.setUint16(8, 0, true);
    entry.setUint16(10, 0, true);
    entry.setUint16(12, 0, true);
    entry.setUint16(14, DOS_DATE, true);
    entry.setUint32(16, crc, true);
    entry.setUint32(20, data.length, true);
    entry.setUint32(24, data.length, true);
    entry.setUint16(28, name.length, true);
    entry.setUint32(38, 0, true);         // external attributes
    entry.setUint32(42, offset, true);
    central.push(new Uint8Array(entry.buffer), name);
    offset += 30 + name.length + data.length;
  }
  const size = central.reduce((n, b) => n + b.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, files.length, true);
  end.setUint16(10, files.length, true);
  end.setUint32(12, size, true);
  end.setUint32(16, offset, true);
  const parts = [...local, ...central, new Uint8Array(end.buffer)];
  const out = new Uint8Array(parts.reduce((n, b) => n + b.length, 0));
  let at = 0;
  for (const b of parts) { out.set(b, at); at += b.length; }
  return out;
}

// The name of the zip of the rotation keys of OWNER for version N of its
// key log: rotation-keys-<the first 16 characters of the owner>-v<N>.zip.
export function rotationZipName(owner, version) {
  return `rotation-keys-${owner.slice(0, 16)}-v${version}.zip`;
}
