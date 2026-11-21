// opensheaf-js 6b4a275002bff6b93e6ff9c7e624316fafc0f37d: web/manager.js bundled by tools/bundle.js (GPL-3.0-or-later)
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod2) => function __require2() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target2, all) => {
  for (var name2 in all)
    __defProp(target2, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target2) => (target2 = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  1 ? __defProp(target2, "default", { value: mod2, enumerable: true }) : target2,
  mod2
));

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/hash-wasm/4.12.0/dist/index.esm.js
var index_esm_exports = {};
__export(index_esm_exports, {
  adler32: () => adler32,
  argon2Verify: () => argon2Verify,
  argon2d: () => argon2d,
  argon2i: () => argon2i,
  argon2id: () => argon2id,
  bcrypt: () => bcrypt,
  bcryptVerify: () => bcryptVerify,
  blake2b: () => blake2b,
  blake2s: () => blake2s,
  blake3: () => blake3,
  crc32: () => crc32,
  crc64: () => crc64,
  createAdler32: () => createAdler32,
  createBLAKE2b: () => createBLAKE2b,
  createBLAKE2s: () => createBLAKE2s,
  createBLAKE3: () => createBLAKE3,
  createCRC32: () => createCRC32,
  createCRC64: () => createCRC64,
  createHMAC: () => createHMAC,
  createKeccak: () => createKeccak,
  createMD4: () => createMD4,
  createMD5: () => createMD5,
  createRIPEMD160: () => createRIPEMD160,
  createSHA1: () => createSHA1,
  createSHA224: () => createSHA224,
  createSHA256: () => createSHA256,
  createSHA3: () => createSHA3,
  createSHA384: () => createSHA384,
  createSHA512: () => createSHA512,
  createSM3: () => createSM3,
  createWhirlpool: () => createWhirlpool,
  createXXHash128: () => createXXHash128,
  createXXHash3: () => createXXHash3,
  createXXHash32: () => createXXHash32,
  createXXHash64: () => createXXHash64,
  keccak: () => keccak,
  md4: () => md4,
  md5: () => md5,
  pbkdf2: () => pbkdf2,
  ripemd160: () => ripemd160,
  scrypt: () => scrypt,
  sha1: () => sha1,
  sha224: () => sha224,
  sha256: () => sha2562,
  sha3: () => sha3,
  sha384: () => sha384,
  sha512: () => sha5122,
  sm3: () => sm3,
  whirlpool: () => whirlpool,
  xxhash128: () => xxhash128,
  xxhash3: () => xxhash3,
  xxhash32: () => xxhash32,
  xxhash64: () => xxhash64
});
function __awaiter(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function getGlobal() {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  return global;
}
function intArrayToString(arr, len) {
  return String.fromCharCode(...arr.subarray(0, len));
}
function hexCharCodesToInt(a, b) {
  return (a & 15) + (a >> 6 | a >> 3 & 8) << 4 | (b & 15) + (b >> 6 | b >> 3 & 8);
}
function writeHexToUInt8(buf, str) {
  const size = str.length >> 1;
  for (let i = 0; i < size; i++) {
    const index = i << 1;
    buf[i] = hexCharCodesToInt(str.charCodeAt(index), str.charCodeAt(index + 1));
  }
}
function hexStringEqualsUInt8(str, buf) {
  if (str.length !== buf.length * 2) {
    return false;
  }
  for (let i = 0; i < buf.length; i++) {
    const strIndex = i << 1;
    if (buf[i] !== hexCharCodesToInt(str.charCodeAt(strIndex), str.charCodeAt(strIndex + 1))) {
      return false;
    }
  }
  return true;
}
function getDigestHex(tmpBuffer, input, hashLength) {
  let p = 0;
  for (let i = 0; i < hashLength; i++) {
    let nibble = input[i] >>> 4;
    tmpBuffer[p++] = nibble > 9 ? nibble + alpha : nibble + digit;
    nibble = input[i] & 15;
    tmpBuffer[p++] = nibble > 9 ? nibble + alpha : nibble + digit;
  }
  return String.fromCharCode.apply(null, tmpBuffer);
}
function encodeBase64(data2, pad = true) {
  const len = data2.length;
  const extraBytes = len % 3;
  const parts = [];
  const len2 = len - extraBytes;
  for (let i = 0; i < len2; i += 3) {
    const tmp = (data2[i] << 16 & 16711680) + (data2[i + 1] << 8 & 65280) + (data2[i + 2] & 255);
    const triplet = base64Chars.charAt(tmp >> 18 & 63) + base64Chars.charAt(tmp >> 12 & 63) + base64Chars.charAt(tmp >> 6 & 63) + base64Chars.charAt(tmp & 63);
    parts.push(triplet);
  }
  if (extraBytes === 1) {
    const tmp = data2[len - 1];
    const a = base64Chars.charAt(tmp >> 2);
    const b = base64Chars.charAt(tmp << 4 & 63);
    parts.push(`${a}${b}`);
    if (pad) {
      parts.push("==");
    }
  } else if (extraBytes === 2) {
    const tmp = (data2[len - 2] << 8) + data2[len - 1];
    const a = base64Chars.charAt(tmp >> 10);
    const b = base64Chars.charAt(tmp >> 4 & 63);
    const c = base64Chars.charAt(tmp << 2 & 63);
    parts.push(`${a}${b}${c}`);
    if (pad) {
      parts.push("=");
    }
  }
  return parts.join("");
}
function getDecodeBase64Length(data2) {
  let bufferLength = Math.floor(data2.length * 0.75);
  const len = data2.length;
  if (data2[len - 1] === "=") {
    bufferLength -= 1;
    if (data2[len - 2] === "=") {
      bufferLength -= 1;
    }
  }
  return bufferLength;
}
function decodeBase64(data2) {
  const bufferLength = getDecodeBase64Length(data2);
  const len = data2.length;
  const bytes = new Uint8Array(bufferLength);
  let p = 0;
  for (let i = 0; i < len; i += 4) {
    const encoded1 = base64Lookup[data2.charCodeAt(i)];
    const encoded2 = base64Lookup[data2.charCodeAt(i + 1)];
    const encoded3 = base64Lookup[data2.charCodeAt(i + 2)];
    const encoded4 = base64Lookup[data2.charCodeAt(i + 3)];
    bytes[p] = encoded1 << 2 | encoded2 >> 4;
    p += 1;
    bytes[p] = (encoded2 & 15) << 4 | encoded3 >> 2;
    p += 1;
    bytes[p] = (encoded3 & 3) << 6 | encoded4 & 63;
    p += 1;
  }
  return bytes;
}
function WASMInterface(binary2, hashLength) {
  return __awaiter(this, void 0, void 0, function* () {
    let wasmInstance = null;
    let memoryView = null;
    let initialized = false;
    if (typeof WebAssembly === "undefined") {
      throw new Error("WebAssembly is not supported in this environment!");
    }
    const writeMemory = (data2, offset = 0) => {
      memoryView.set(data2, offset);
    };
    const getMemory = () => memoryView;
    const getExports = () => wasmInstance.exports;
    const setMemorySize = (totalSize) => {
      wasmInstance.exports.Hash_SetMemorySize(totalSize);
      const arrayOffset = wasmInstance.exports.Hash_GetBuffer();
      const memoryBuffer = wasmInstance.exports.memory.buffer;
      memoryView = new Uint8Array(memoryBuffer, arrayOffset, totalSize);
    };
    const getStateSize = () => {
      const view = new DataView(wasmInstance.exports.memory.buffer);
      const stateSize = view.getUint32(wasmInstance.exports.STATE_SIZE, true);
      return stateSize;
    };
    const loadWASMPromise = wasmMutex.dispatch(() => __awaiter(this, void 0, void 0, function* () {
      if (!wasmModuleCache.has(binary2.name)) {
        const asm = decodeBase64(binary2.data);
        const promise = WebAssembly.compile(asm);
        wasmModuleCache.set(binary2.name, promise);
      }
      const module = yield wasmModuleCache.get(binary2.name);
      wasmInstance = yield WebAssembly.instantiate(module, {});
    }));
    const setupInterface = () => __awaiter(this, void 0, void 0, function* () {
      if (!wasmInstance) {
        yield loadWASMPromise;
      }
      const arrayOffset = wasmInstance.exports.Hash_GetBuffer();
      const memoryBuffer = wasmInstance.exports.memory.buffer;
      memoryView = new Uint8Array(memoryBuffer, arrayOffset, MAX_HEAP);
    });
    const init = (bits = null) => {
      initialized = true;
      wasmInstance.exports.Hash_Init(bits);
    };
    const updateUInt8Array = (data2) => {
      let read = 0;
      while (read < data2.length) {
        const chunk = data2.subarray(read, read + MAX_HEAP);
        read += chunk.length;
        memoryView.set(chunk);
        wasmInstance.exports.Hash_Update(chunk.length);
      }
    };
    const update2 = (data2) => {
      if (!initialized) {
        throw new Error("update() called before init()");
      }
      const Uint8Buffer = getUInt8Buffer(data2);
      updateUInt8Array(Uint8Buffer);
    };
    const digestChars = new Uint8Array(hashLength * 2);
    const digest = (outputType, padding = null) => {
      if (!initialized) {
        throw new Error("digest() called before init()");
      }
      initialized = false;
      wasmInstance.exports.Hash_Final(padding);
      if (outputType === "binary") {
        return memoryView.slice(0, hashLength);
      }
      return getDigestHex(digestChars, memoryView, hashLength);
    };
    const save2 = () => {
      if (!initialized) {
        throw new Error("save() can only be called after init() and before digest()");
      }
      const stateOffset = wasmInstance.exports.Hash_GetState();
      const stateLength = getStateSize();
      const memoryBuffer = wasmInstance.exports.memory.buffer;
      const internalState = new Uint8Array(memoryBuffer, stateOffset, stateLength);
      const prefixedState = new Uint8Array(WASM_FUNC_HASH_LENGTH + stateLength);
      writeHexToUInt8(prefixedState, binary2.hash);
      prefixedState.set(internalState, WASM_FUNC_HASH_LENGTH);
      return prefixedState;
    };
    const load2 = (state) => {
      if (!(state instanceof Uint8Array)) {
        throw new Error("load() expects an Uint8Array generated by save()");
      }
      const stateOffset = wasmInstance.exports.Hash_GetState();
      const stateLength = getStateSize();
      const overallLength = WASM_FUNC_HASH_LENGTH + stateLength;
      const memoryBuffer = wasmInstance.exports.memory.buffer;
      if (state.length !== overallLength) {
        throw new Error(`Bad state length (expected ${overallLength} bytes, got ${state.length})`);
      }
      if (!hexStringEqualsUInt8(binary2.hash, state.subarray(0, WASM_FUNC_HASH_LENGTH))) {
        throw new Error("This state was written by an incompatible hash implementation");
      }
      const internalState = state.subarray(WASM_FUNC_HASH_LENGTH);
      new Uint8Array(memoryBuffer, stateOffset, stateLength).set(internalState);
      initialized = true;
    };
    const isDataShort = (data2) => {
      if (typeof data2 === "string") {
        return data2.length < MAX_HEAP / 4;
      }
      return data2.byteLength < MAX_HEAP;
    };
    let canSimplify = isDataShort;
    switch (binary2.name) {
      case "argon2":
      case "scrypt":
        canSimplify = () => true;
        break;
      case "blake2b":
      case "blake2s":
        canSimplify = (data2, initParam) => initParam <= 512 && isDataShort(data2);
        break;
      case "blake3":
        canSimplify = (data2, initParam) => initParam === 0 && isDataShort(data2);
        break;
      case "xxhash64":
      case "xxhash3":
      case "xxhash128":
      case "crc64":
        canSimplify = () => false;
        break;
    }
    const calculate = (data2, initParam = null, digestParam = null) => {
      if (!canSimplify(data2, initParam)) {
        init(initParam);
        update2(data2);
        return digest("hex", digestParam);
      }
      const buffer = getUInt8Buffer(data2);
      memoryView.set(buffer);
      wasmInstance.exports.Hash_Calculate(buffer.length, initParam, digestParam);
      return getDigestHex(digestChars, memoryView, hashLength);
    };
    yield setupInterface();
    return {
      getMemory,
      writeMemory,
      getExports,
      setMemorySize,
      init,
      update: update2,
      digest,
      save: save2,
      load: load2,
      calculate,
      hashLength
    };
  });
}
function lockedCreate(mutex2, binary2, hashLength) {
  return __awaiter(this, void 0, void 0, function* () {
    const unlock = yield mutex2.lock();
    const wasm = yield WASMInterface(binary2, hashLength);
    unlock();
    return wasm;
  });
}
function adler32(data2) {
  if (wasmCache$l === null) {
    return lockedCreate(mutex$l, wasmJson$l, 4).then((wasm) => {
      wasmCache$l = wasm;
      return wasmCache$l.calculate(data2);
    });
  }
  try {
    const hash2 = wasmCache$l.calculate(data2);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createAdler32() {
  return WASMInterface(wasmJson$l, 4).then((wasm) => {
    wasm.init();
    const obj = {
      init: () => {
        wasm.init();
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 4,
      digestSize: 4
    };
    return obj;
  });
}
function validateBits$4(bits) {
  if (!Number.isInteger(bits) || bits < 8 || bits > 512 || bits % 8 !== 0) {
    return new Error("Invalid variant! Valid values: 8, 16, ..., 512");
  }
  return null;
}
function getInitParam$1(outputBits, keyBits) {
  return outputBits | keyBits << 16;
}
function blake2b(data2, bits = 512, key = null) {
  if (validateBits$4(bits)) {
    return Promise.reject(validateBits$4(bits));
  }
  let keyBuffer = null;
  let initParam = bits;
  if (key !== null) {
    keyBuffer = getUInt8Buffer(key);
    if (keyBuffer.length > 64) {
      return Promise.reject(new Error("Max key length is 64 bytes"));
    }
    initParam = getInitParam$1(bits, keyBuffer.length);
  }
  const hashLength = bits / 8;
  if (wasmCache$k === null || wasmCache$k.hashLength !== hashLength) {
    return lockedCreate(mutex$k, wasmJson$j, hashLength).then((wasm) => {
      wasmCache$k = wasm;
      if (initParam > 512) {
        wasmCache$k.writeMemory(keyBuffer);
      }
      return wasmCache$k.calculate(data2, initParam);
    });
  }
  try {
    if (initParam > 512) {
      wasmCache$k.writeMemory(keyBuffer);
    }
    const hash2 = wasmCache$k.calculate(data2, initParam);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createBLAKE2b(bits = 512, key = null) {
  if (validateBits$4(bits)) {
    return Promise.reject(validateBits$4(bits));
  }
  let keyBuffer = null;
  let initParam = bits;
  if (key !== null) {
    keyBuffer = getUInt8Buffer(key);
    if (keyBuffer.length > 64) {
      return Promise.reject(new Error("Max key length is 64 bytes"));
    }
    initParam = getInitParam$1(bits, keyBuffer.length);
  }
  const outputSize = bits / 8;
  return WASMInterface(wasmJson$j, outputSize).then((wasm) => {
    if (initParam > 512) {
      wasm.writeMemory(keyBuffer);
    }
    wasm.init(initParam);
    const obj = {
      init: initParam > 512 ? () => {
        wasm.writeMemory(keyBuffer);
        wasm.init(initParam);
        return obj;
      } : () => {
        wasm.init(initParam);
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 128,
      digestSize: outputSize
    };
    return obj;
  });
}
function encodeResult(salt, options, res) {
  const parameters2 = [
    `m=${options.memorySize}`,
    `t=${options.iterations}`,
    `p=${options.parallelism}`
  ].join(",");
  return `$argon2${options.hashType}$v=19$${parameters2}$${encodeBase64(salt, false)}$${encodeBase64(res, false)}`;
}
function int32LE(x) {
  uint32View.setInt32(0, x, true);
  return new Uint8Array(uint32View.buffer);
}
function hashFunc(blake512, buf, len) {
  return __awaiter(this, void 0, void 0, function* () {
    if (len <= 64) {
      const blake = yield createBLAKE2b(len * 8);
      blake.update(int32LE(len));
      blake.update(buf);
      return blake.digest("binary");
    }
    const r = Math.ceil(len / 32) - 2;
    const ret = new Uint8Array(len);
    blake512.init();
    blake512.update(int32LE(len));
    blake512.update(buf);
    let vp = blake512.digest("binary");
    ret.set(vp.subarray(0, 32), 0);
    for (let i = 1; i < r; i++) {
      blake512.init();
      blake512.update(vp);
      vp = blake512.digest("binary");
      ret.set(vp.subarray(0, 32), i * 32);
    }
    const partialBytesNeeded = len - 32 * r;
    let blakeSmall;
    if (partialBytesNeeded === 64) {
      blakeSmall = blake512;
      blakeSmall.init();
    } else {
      blakeSmall = yield createBLAKE2b(partialBytesNeeded * 8);
    }
    blakeSmall.update(vp);
    vp = blakeSmall.digest("binary");
    ret.set(vp.subarray(0, partialBytesNeeded), r * 32);
    return ret;
  });
}
function getHashType(type) {
  switch (type) {
    case "d":
      return 0;
    case "i":
      return 1;
    default:
      return 2;
  }
}
function argon2Internal(options) {
  return __awaiter(this, void 0, void 0, function* () {
    var _a2;
    const { parallelism, iterations, hashLength } = options;
    const password = getUInt8Buffer(options.password);
    const salt = getUInt8Buffer(options.salt);
    const version = 19;
    const hashType = getHashType(options.hashType);
    const { memorySize } = options;
    const secret = getUInt8Buffer((_a2 = options.secret) !== null && _a2 !== void 0 ? _a2 : "");
    const [argon2Interface, blake512] = yield Promise.all([
      WASMInterface(wasmJson$k, 1024),
      createBLAKE2b(512)
    ]);
    argon2Interface.setMemorySize(memorySize * 1024 + 1024);
    const initVector = new Uint8Array(24);
    const initVectorView = new DataView(initVector.buffer);
    initVectorView.setInt32(0, parallelism, true);
    initVectorView.setInt32(4, hashLength, true);
    initVectorView.setInt32(8, memorySize, true);
    initVectorView.setInt32(12, iterations, true);
    initVectorView.setInt32(16, version, true);
    initVectorView.setInt32(20, hashType, true);
    argon2Interface.writeMemory(initVector, memorySize * 1024);
    blake512.init();
    blake512.update(initVector);
    blake512.update(int32LE(password.length));
    blake512.update(password);
    blake512.update(int32LE(salt.length));
    blake512.update(salt);
    blake512.update(int32LE(secret.length));
    blake512.update(secret);
    blake512.update(int32LE(0));
    const segments = Math.floor(memorySize / (parallelism * 4));
    const lanes = segments * 4;
    const param = new Uint8Array(72);
    const H0 = blake512.digest("binary");
    param.set(H0);
    for (let lane = 0; lane < parallelism; lane++) {
      param.set(int32LE(0), 64);
      param.set(int32LE(lane), 68);
      let position2 = lane * lanes;
      let chunk = yield hashFunc(blake512, param, 1024);
      argon2Interface.writeMemory(chunk, position2 * 1024);
      position2 += 1;
      param.set(int32LE(1), 64);
      chunk = yield hashFunc(blake512, param, 1024);
      argon2Interface.writeMemory(chunk, position2 * 1024);
    }
    const C = new Uint8Array(1024);
    writeHexToUInt8(C, argon2Interface.calculate(new Uint8Array([]), memorySize));
    const res = yield hashFunc(blake512, C, hashLength);
    if (options.outputType === "hex") {
      const digestChars = new Uint8Array(hashLength * 2);
      return getDigestHex(digestChars, res, hashLength);
    }
    if (options.outputType === "encoded") {
      return encodeResult(salt, options, res);
    }
    return res;
  });
}
function argon2i(options) {
  return __awaiter(this, void 0, void 0, function* () {
    validateOptions$3(options);
    return argon2Internal(Object.assign(Object.assign({}, options), {
      hashType: "i"
    }));
  });
}
function argon2id(options) {
  return __awaiter(this, void 0, void 0, function* () {
    validateOptions$3(options);
    return argon2Internal(Object.assign(Object.assign({}, options), {
      hashType: "id"
    }));
  });
}
function argon2d(options) {
  return __awaiter(this, void 0, void 0, function* () {
    validateOptions$3(options);
    return argon2Internal(Object.assign(Object.assign({}, options), {
      hashType: "d"
    }));
  });
}
function argon2Verify(options) {
  return __awaiter(this, void 0, void 0, function* () {
    validateVerifyOptions$1(options);
    const params = getHashParameters(options.password, options.hash, options.secret);
    validateOptions$3(params);
    const hashStart = options.hash.lastIndexOf("$") + 1;
    const result = yield argon2Internal(params);
    return result.substring(hashStart) === options.hash.substring(hashStart);
  });
}
function validateBits$3(bits) {
  if (!Number.isInteger(bits) || bits < 8 || bits > 256 || bits % 8 !== 0) {
    return new Error("Invalid variant! Valid values: 8, 16, ..., 256");
  }
  return null;
}
function getInitParam(outputBits, keyBits) {
  return outputBits | keyBits << 16;
}
function blake2s(data2, bits = 256, key = null) {
  if (validateBits$3(bits)) {
    return Promise.reject(validateBits$3(bits));
  }
  let keyBuffer = null;
  let initParam = bits;
  if (key !== null) {
    keyBuffer = getUInt8Buffer(key);
    if (keyBuffer.length > 32) {
      return Promise.reject(new Error("Max key length is 32 bytes"));
    }
    initParam = getInitParam(bits, keyBuffer.length);
  }
  const hashLength = bits / 8;
  if (wasmCache$j === null || wasmCache$j.hashLength !== hashLength) {
    return lockedCreate(mutex$j, wasmJson$i, hashLength).then((wasm) => {
      wasmCache$j = wasm;
      if (initParam > 512) {
        wasmCache$j.writeMemory(keyBuffer);
      }
      return wasmCache$j.calculate(data2, initParam);
    });
  }
  try {
    if (initParam > 512) {
      wasmCache$j.writeMemory(keyBuffer);
    }
    const hash2 = wasmCache$j.calculate(data2, initParam);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createBLAKE2s(bits = 256, key = null) {
  if (validateBits$3(bits)) {
    return Promise.reject(validateBits$3(bits));
  }
  let keyBuffer = null;
  let initParam = bits;
  if (key !== null) {
    keyBuffer = getUInt8Buffer(key);
    if (keyBuffer.length > 32) {
      return Promise.reject(new Error("Max key length is 32 bytes"));
    }
    initParam = getInitParam(bits, keyBuffer.length);
  }
  const outputSize = bits / 8;
  return WASMInterface(wasmJson$i, outputSize).then((wasm) => {
    if (initParam > 512) {
      wasm.writeMemory(keyBuffer);
    }
    wasm.init(initParam);
    const obj = {
      init: initParam > 512 ? () => {
        wasm.writeMemory(keyBuffer);
        wasm.init(initParam);
        return obj;
      } : () => {
        wasm.init(initParam);
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 64,
      digestSize: outputSize
    };
    return obj;
  });
}
function validateBits$2(bits) {
  if (!Number.isInteger(bits) || bits < 8 || bits % 8 !== 0) {
    return new Error("Invalid variant! Valid values: 8, 16, ...");
  }
  return null;
}
function blake3(data2, bits = 256, key = null) {
  if (validateBits$2(bits)) {
    return Promise.reject(validateBits$2(bits));
  }
  let keyBuffer = null;
  let initParam = 0;
  if (key !== null) {
    keyBuffer = getUInt8Buffer(key);
    if (keyBuffer.length !== 32) {
      return Promise.reject(new Error("Key length must be exactly 32 bytes"));
    }
    initParam = 32;
  }
  const hashLength = bits / 8;
  const digestParam = hashLength;
  if (wasmCache$i === null || wasmCache$i.hashLength !== hashLength) {
    return lockedCreate(mutex$i, wasmJson$h, hashLength).then((wasm) => {
      wasmCache$i = wasm;
      if (initParam === 32) {
        wasmCache$i.writeMemory(keyBuffer);
      }
      return wasmCache$i.calculate(data2, initParam, digestParam);
    });
  }
  try {
    if (initParam === 32) {
      wasmCache$i.writeMemory(keyBuffer);
    }
    const hash2 = wasmCache$i.calculate(data2, initParam, digestParam);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createBLAKE3(bits = 256, key = null) {
  if (validateBits$2(bits)) {
    return Promise.reject(validateBits$2(bits));
  }
  let keyBuffer = null;
  let initParam = 0;
  if (key !== null) {
    keyBuffer = getUInt8Buffer(key);
    if (keyBuffer.length !== 32) {
      return Promise.reject(new Error("Key length must be exactly 32 bytes"));
    }
    initParam = 32;
  }
  const outputSize = bits / 8;
  const digestParam = outputSize;
  return WASMInterface(wasmJson$h, outputSize).then((wasm) => {
    if (initParam === 32) {
      wasm.writeMemory(keyBuffer);
    }
    wasm.init(initParam);
    const obj = {
      init: initParam === 32 ? () => {
        wasm.writeMemory(keyBuffer);
        wasm.init(initParam);
        return obj;
      } : () => {
        wasm.init(initParam);
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType, digestParam),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 64,
      digestSize: outputSize
    };
    return obj;
  });
}
function validatePoly(poly) {
  if (!Number.isInteger(poly) || poly < 0 || poly > 4294967295) {
    return new Error("Polynomial must be a valid 32-bit long unsigned integer");
  }
  return null;
}
function crc32(data2, polynomial = 3988292384) {
  if (validatePoly(polynomial)) {
    return Promise.reject(validatePoly(polynomial));
  }
  if (wasmCache$h === null) {
    return lockedCreate(mutex$h, wasmJson$g, 4).then((wasm) => {
      wasmCache$h = wasm;
      return wasmCache$h.calculate(data2, polynomial);
    });
  }
  try {
    const hash2 = wasmCache$h.calculate(data2, polynomial);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createCRC32(polynomial = 3988292384) {
  if (validatePoly(polynomial)) {
    return Promise.reject(validatePoly(polynomial));
  }
  return WASMInterface(wasmJson$g, 4).then((wasm) => {
    wasm.init(polynomial);
    const obj = {
      init: () => {
        wasm.init(polynomial);
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 4,
      digestSize: 4
    };
    return obj;
  });
}
function parsePoly(poly) {
  const errText = "Polynomial must be provided as a 16 char long hex string";
  if (typeof poly !== "string" || poly.length !== 16) {
    return {
      hi: 0,
      lo: 0,
      err: new Error(errText)
    };
  }
  const hi = Number(`0x${poly.slice(0, 8)}`);
  const lo = Number(`0x${poly.slice(8)}`);
  if (Number.isNaN(hi) || Number.isNaN(lo)) {
    return {
      hi,
      lo,
      err: new Error(errText)
    };
  }
  return {
    hi,
    lo,
    err: null
  };
}
function writePoly(arr, lo, hi) {
  const buffer = new DataView(arr);
  buffer.setUint32(0, lo, true);
  buffer.setUint32(4, hi, true);
}
function crc64(data2, polynomial = "c96c5795d7870f42") {
  const { hi, lo, err } = parsePoly(polynomial);
  if (err !== null) {
    return Promise.reject(err);
  }
  if (wasmCache$g === null) {
    return lockedCreate(mutex$g, wasmJson$f, 8).then((wasm) => {
      wasmCache$g = wasm;
      writePoly(polyBuffer.buffer, lo, hi);
      wasmCache$g.writeMemory(polyBuffer);
      return wasmCache$g.calculate(data2);
    });
  }
  try {
    writePoly(polyBuffer.buffer, lo, hi);
    wasmCache$g.writeMemory(polyBuffer);
    const hash2 = wasmCache$g.calculate(data2);
    return Promise.resolve(hash2);
  } catch (err2) {
    return Promise.reject(err2);
  }
}
function createCRC64(polynomial = "c96c5795d7870f42") {
  const { hi, lo, err } = parsePoly(polynomial);
  if (err !== null) {
    return Promise.reject(err);
  }
  return WASMInterface(wasmJson$f, 8).then((wasm) => {
    const instanceBuffer = new Uint8Array(8);
    writePoly(instanceBuffer.buffer, lo, hi);
    wasm.writeMemory(instanceBuffer);
    wasm.init();
    const obj = {
      init: () => {
        wasm.writeMemory(instanceBuffer);
        wasm.init();
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 8,
      digestSize: 8
    };
    return obj;
  });
}
function md4(data2) {
  if (wasmCache$f === null) {
    return lockedCreate(mutex$f, wasmJson$e, 16).then((wasm) => {
      wasmCache$f = wasm;
      return wasmCache$f.calculate(data2);
    });
  }
  try {
    const hash2 = wasmCache$f.calculate(data2);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createMD4() {
  return WASMInterface(wasmJson$e, 16).then((wasm) => {
    wasm.init();
    const obj = {
      init: () => {
        wasm.init();
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 64,
      digestSize: 16
    };
    return obj;
  });
}
function md5(data2) {
  if (wasmCache$e === null) {
    return lockedCreate(mutex$e, wasmJson$d, 16).then((wasm) => {
      wasmCache$e = wasm;
      return wasmCache$e.calculate(data2);
    });
  }
  try {
    const hash2 = wasmCache$e.calculate(data2);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createMD5() {
  return WASMInterface(wasmJson$d, 16).then((wasm) => {
    wasm.init();
    const obj = {
      init: () => {
        wasm.init();
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 64,
      digestSize: 16
    };
    return obj;
  });
}
function sha1(data2) {
  if (wasmCache$d === null) {
    return lockedCreate(mutex$d, wasmJson$c, 20).then((wasm) => {
      wasmCache$d = wasm;
      return wasmCache$d.calculate(data2);
    });
  }
  try {
    const hash2 = wasmCache$d.calculate(data2);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createSHA1() {
  return WASMInterface(wasmJson$c, 20).then((wasm) => {
    wasm.init();
    const obj = {
      init: () => {
        wasm.init();
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 64,
      digestSize: 20
    };
    return obj;
  });
}
function validateBits$1(bits) {
  if (![
    224,
    256,
    384,
    512
  ].includes(bits)) {
    return new Error("Invalid variant! Valid values: 224, 256, 384, 512");
  }
  return null;
}
function sha3(data2, bits = 512) {
  if (validateBits$1(bits)) {
    return Promise.reject(validateBits$1(bits));
  }
  const hashLength = bits / 8;
  if (wasmCache$c === null || wasmCache$c.hashLength !== hashLength) {
    return lockedCreate(mutex$c, wasmJson$b, hashLength).then((wasm) => {
      wasmCache$c = wasm;
      return wasmCache$c.calculate(data2, bits, 6);
    });
  }
  try {
    const hash2 = wasmCache$c.calculate(data2, bits, 6);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createSHA3(bits = 512) {
  if (validateBits$1(bits)) {
    return Promise.reject(validateBits$1(bits));
  }
  const outputSize = bits / 8;
  return WASMInterface(wasmJson$b, outputSize).then((wasm) => {
    wasm.init(bits);
    const obj = {
      init: () => {
        wasm.init(bits);
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType, 6),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 200 - 2 * outputSize,
      digestSize: outputSize
    };
    return obj;
  });
}
function validateBits(bits) {
  if (![
    224,
    256,
    384,
    512
  ].includes(bits)) {
    return new Error("Invalid variant! Valid values: 224, 256, 384, 512");
  }
  return null;
}
function keccak(data2, bits = 512) {
  if (validateBits(bits)) {
    return Promise.reject(validateBits(bits));
  }
  const hashLength = bits / 8;
  if (wasmCache$b === null || wasmCache$b.hashLength !== hashLength) {
    return lockedCreate(mutex$b, wasmJson$b, hashLength).then((wasm) => {
      wasmCache$b = wasm;
      return wasmCache$b.calculate(data2, bits, 1);
    });
  }
  try {
    const hash2 = wasmCache$b.calculate(data2, bits, 1);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createKeccak(bits = 512) {
  if (validateBits(bits)) {
    return Promise.reject(validateBits(bits));
  }
  const outputSize = bits / 8;
  return WASMInterface(wasmJson$b, outputSize).then((wasm) => {
    wasm.init(bits);
    const obj = {
      init: () => {
        wasm.init(bits);
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType, 1),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 200 - 2 * outputSize,
      digestSize: outputSize
    };
    return obj;
  });
}
function sha224(data2) {
  if (wasmCache$a === null) {
    return lockedCreate(mutex$a, wasmJson$a, 28).then((wasm) => {
      wasmCache$a = wasm;
      return wasmCache$a.calculate(data2, 224);
    });
  }
  try {
    const hash2 = wasmCache$a.calculate(data2, 224);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createSHA224() {
  return WASMInterface(wasmJson$a, 28).then((wasm) => {
    wasm.init(224);
    const obj = {
      init: () => {
        wasm.init(224);
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 64,
      digestSize: 28
    };
    return obj;
  });
}
function sha2562(data2) {
  if (wasmCache$9 === null) {
    return lockedCreate(mutex$9, wasmJson$a, 32).then((wasm) => {
      wasmCache$9 = wasm;
      return wasmCache$9.calculate(data2, 256);
    });
  }
  try {
    const hash2 = wasmCache$9.calculate(data2, 256);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createSHA256() {
  return WASMInterface(wasmJson$a, 32).then((wasm) => {
    wasm.init(256);
    const obj = {
      init: () => {
        wasm.init(256);
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 64,
      digestSize: 32
    };
    return obj;
  });
}
function sha384(data2) {
  if (wasmCache$8 === null) {
    return lockedCreate(mutex$8, wasmJson$9, 48).then((wasm) => {
      wasmCache$8 = wasm;
      return wasmCache$8.calculate(data2, 384);
    });
  }
  try {
    const hash2 = wasmCache$8.calculate(data2, 384);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createSHA384() {
  return WASMInterface(wasmJson$9, 48).then((wasm) => {
    wasm.init(384);
    const obj = {
      init: () => {
        wasm.init(384);
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 128,
      digestSize: 48
    };
    return obj;
  });
}
function sha5122(data2) {
  if (wasmCache$7 === null) {
    return lockedCreate(mutex$7, wasmJson$9, 64).then((wasm) => {
      wasmCache$7 = wasm;
      return wasmCache$7.calculate(data2, 512);
    });
  }
  try {
    const hash2 = wasmCache$7.calculate(data2, 512);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createSHA512() {
  return WASMInterface(wasmJson$9, 64).then((wasm) => {
    wasm.init(512);
    const obj = {
      init: () => {
        wasm.init(512);
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 128,
      digestSize: 64
    };
    return obj;
  });
}
function validateSeed$3(seed) {
  if (!Number.isInteger(seed) || seed < 0 || seed > 4294967295) {
    return new Error("Seed must be a valid 32-bit long unsigned integer.");
  }
  return null;
}
function xxhash32(data2, seed = 0) {
  if (validateSeed$3(seed)) {
    return Promise.reject(validateSeed$3(seed));
  }
  if (wasmCache$6 === null) {
    return lockedCreate(mutex$6, wasmJson$8, 4).then((wasm) => {
      wasmCache$6 = wasm;
      return wasmCache$6.calculate(data2, seed);
    });
  }
  try {
    const hash2 = wasmCache$6.calculate(data2, seed);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createXXHash32(seed = 0) {
  if (validateSeed$3(seed)) {
    return Promise.reject(validateSeed$3(seed));
  }
  return WASMInterface(wasmJson$8, 4).then((wasm) => {
    wasm.init(seed);
    const obj = {
      init: () => {
        wasm.init(seed);
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 16,
      digestSize: 4
    };
    return obj;
  });
}
function validateSeed$2(seed) {
  if (!Number.isInteger(seed) || seed < 0 || seed > 4294967295) {
    return new Error("Seed must be given as two valid 32-bit long unsigned integers (lo + high).");
  }
  return null;
}
function writeSeed$2(arr, low, high) {
  const buffer = new DataView(arr);
  buffer.setUint32(0, low, true);
  buffer.setUint32(4, high, true);
}
function xxhash64(data2, seedLow = 0, seedHigh = 0) {
  if (validateSeed$2(seedLow)) {
    return Promise.reject(validateSeed$2(seedLow));
  }
  if (validateSeed$2(seedHigh)) {
    return Promise.reject(validateSeed$2(seedHigh));
  }
  if (wasmCache$5 === null) {
    return lockedCreate(mutex$5, wasmJson$7, 8).then((wasm) => {
      wasmCache$5 = wasm;
      writeSeed$2(seedBuffer$2.buffer, seedLow, seedHigh);
      wasmCache$5.writeMemory(seedBuffer$2);
      return wasmCache$5.calculate(data2);
    });
  }
  try {
    writeSeed$2(seedBuffer$2.buffer, seedLow, seedHigh);
    wasmCache$5.writeMemory(seedBuffer$2);
    const hash2 = wasmCache$5.calculate(data2);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createXXHash64(seedLow = 0, seedHigh = 0) {
  if (validateSeed$2(seedLow)) {
    return Promise.reject(validateSeed$2(seedLow));
  }
  if (validateSeed$2(seedHigh)) {
    return Promise.reject(validateSeed$2(seedHigh));
  }
  return WASMInterface(wasmJson$7, 8).then((wasm) => {
    const instanceBuffer = new Uint8Array(8);
    writeSeed$2(instanceBuffer.buffer, seedLow, seedHigh);
    wasm.writeMemory(instanceBuffer);
    wasm.init();
    const obj = {
      init: () => {
        wasm.writeMemory(instanceBuffer);
        wasm.init();
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 32,
      digestSize: 8
    };
    return obj;
  });
}
function validateSeed$1(seed) {
  if (!Number.isInteger(seed) || seed < 0 || seed > 4294967295) {
    return new Error("Seed must be given as two valid 32-bit long unsigned integers (lo + high).");
  }
  return null;
}
function writeSeed$1(arr, low, high) {
  const buffer = new DataView(arr);
  buffer.setUint32(0, low, true);
  buffer.setUint32(4, high, true);
}
function xxhash3(data2, seedLow = 0, seedHigh = 0) {
  if (validateSeed$1(seedLow)) {
    return Promise.reject(validateSeed$1(seedLow));
  }
  if (validateSeed$1(seedHigh)) {
    return Promise.reject(validateSeed$1(seedHigh));
  }
  if (wasmCache$4 === null) {
    return lockedCreate(mutex$4, wasmJson$6, 8).then((wasm) => {
      wasmCache$4 = wasm;
      writeSeed$1(seedBuffer$1.buffer, seedLow, seedHigh);
      wasmCache$4.writeMemory(seedBuffer$1);
      return wasmCache$4.calculate(data2);
    });
  }
  try {
    writeSeed$1(seedBuffer$1.buffer, seedLow, seedHigh);
    wasmCache$4.writeMemory(seedBuffer$1);
    const hash2 = wasmCache$4.calculate(data2);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createXXHash3(seedLow = 0, seedHigh = 0) {
  if (validateSeed$1(seedLow)) {
    return Promise.reject(validateSeed$1(seedLow));
  }
  if (validateSeed$1(seedHigh)) {
    return Promise.reject(validateSeed$1(seedHigh));
  }
  return WASMInterface(wasmJson$6, 8).then((wasm) => {
    const instanceBuffer = new Uint8Array(8);
    writeSeed$1(instanceBuffer.buffer, seedLow, seedHigh);
    wasm.writeMemory(instanceBuffer);
    wasm.init();
    const obj = {
      init: () => {
        wasm.writeMemory(instanceBuffer);
        wasm.init();
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 512,
      digestSize: 8
    };
    return obj;
  });
}
function validateSeed(seed) {
  if (!Number.isInteger(seed) || seed < 0 || seed > 4294967295) {
    return new Error("Seed must be given as two valid 32-bit long unsigned integers (lo + high).");
  }
  return null;
}
function writeSeed(arr, low, high) {
  const buffer = new DataView(arr);
  buffer.setUint32(0, low, true);
  buffer.setUint32(4, high, true);
}
function xxhash128(data2, seedLow = 0, seedHigh = 0) {
  if (validateSeed(seedLow)) {
    return Promise.reject(validateSeed(seedLow));
  }
  if (validateSeed(seedHigh)) {
    return Promise.reject(validateSeed(seedHigh));
  }
  if (wasmCache$3 === null) {
    return lockedCreate(mutex$3, wasmJson$5, 16).then((wasm) => {
      wasmCache$3 = wasm;
      writeSeed(seedBuffer.buffer, seedLow, seedHigh);
      wasmCache$3.writeMemory(seedBuffer);
      return wasmCache$3.calculate(data2);
    });
  }
  try {
    writeSeed(seedBuffer.buffer, seedLow, seedHigh);
    wasmCache$3.writeMemory(seedBuffer);
    const hash2 = wasmCache$3.calculate(data2);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createXXHash128(seedLow = 0, seedHigh = 0) {
  if (validateSeed(seedLow)) {
    return Promise.reject(validateSeed(seedLow));
  }
  if (validateSeed(seedHigh)) {
    return Promise.reject(validateSeed(seedHigh));
  }
  return WASMInterface(wasmJson$5, 16).then((wasm) => {
    const instanceBuffer = new Uint8Array(8);
    writeSeed(instanceBuffer.buffer, seedLow, seedHigh);
    wasm.writeMemory(instanceBuffer);
    wasm.init();
    const obj = {
      init: () => {
        wasm.writeMemory(instanceBuffer);
        wasm.init();
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 512,
      digestSize: 16
    };
    return obj;
  });
}
function ripemd160(data2) {
  if (wasmCache$2 === null) {
    return lockedCreate(mutex$2, wasmJson$4, 20).then((wasm) => {
      wasmCache$2 = wasm;
      return wasmCache$2.calculate(data2);
    });
  }
  try {
    const hash2 = wasmCache$2.calculate(data2);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createRIPEMD160() {
  return WASMInterface(wasmJson$4, 20).then((wasm) => {
    wasm.init();
    const obj = {
      init: () => {
        wasm.init();
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 64,
      digestSize: 20
    };
    return obj;
  });
}
function calculateKeyBuffer(hasher, key) {
  const { blockSize } = hasher;
  const buf = getUInt8Buffer(key);
  if (buf.length > blockSize) {
    hasher.update(buf);
    const uintArr = hasher.digest("binary");
    hasher.init();
    return uintArr;
  }
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
}
function calculateHmac(hasher, key) {
  hasher.init();
  const { blockSize } = hasher;
  const keyBuf = calculateKeyBuffer(hasher, key);
  const keyBuffer = new Uint8Array(blockSize);
  keyBuffer.set(keyBuf);
  const opad = new Uint8Array(blockSize);
  for (let i = 0; i < blockSize; i++) {
    const v = keyBuffer[i];
    opad[i] = v ^ 92;
    keyBuffer[i] = v ^ 54;
  }
  hasher.update(keyBuffer);
  const obj = {
    init: () => {
      hasher.init();
      hasher.update(keyBuffer);
      return obj;
    },
    update: (data2) => {
      hasher.update(data2);
      return obj;
    },
    digest: (outputType) => {
      const uintArr = hasher.digest("binary");
      hasher.init();
      hasher.update(opad);
      hasher.update(uintArr);
      return hasher.digest(outputType);
    },
    save: () => {
      throw new Error("save() not supported");
    },
    load: () => {
      throw new Error("load() not supported");
    },
    blockSize: hasher.blockSize,
    digestSize: hasher.digestSize
  };
  return obj;
}
function createHMAC(hash2, key) {
  if (!hash2 || !hash2.then) {
    throw new Error('Invalid hash function is provided! Usage: createHMAC(createMD5(), "key").');
  }
  return hash2.then((hasher) => calculateHmac(hasher, key));
}
function calculatePBKDF2(digest, salt, iterations, hashLength, outputType) {
  return __awaiter(this, void 0, void 0, function* () {
    const DK = new Uint8Array(hashLength);
    const block1 = new Uint8Array(salt.length + 4);
    const block1View = new DataView(block1.buffer);
    const saltBuffer = getUInt8Buffer(salt);
    const saltUIntBuffer = new Uint8Array(saltBuffer.buffer, saltBuffer.byteOffset, saltBuffer.length);
    block1.set(saltUIntBuffer);
    let destPos = 0;
    const hLen = digest.digestSize;
    const l = Math.ceil(hashLength / hLen);
    let T = null;
    let U = null;
    for (let i = 1; i <= l; i++) {
      block1View.setUint32(salt.length, i);
      digest.init();
      digest.update(block1);
      T = digest.digest("binary");
      U = T.slice();
      for (let j = 1; j < iterations; j++) {
        digest.init();
        digest.update(U);
        U = digest.digest("binary");
        for (let k = 0; k < hLen; k++) {
          T[k] ^= U[k];
        }
      }
      DK.set(T.subarray(0, hashLength - destPos), destPos);
      destPos += hLen;
    }
    if (outputType === "binary") {
      return DK;
    }
    const digestChars = new Uint8Array(hashLength * 2);
    return getDigestHex(digestChars, DK, hashLength);
  });
}
function pbkdf2(options) {
  return __awaiter(this, void 0, void 0, function* () {
    validateOptions$2(options);
    const hmac = yield createHMAC(options.hashFunction, options.password);
    return calculatePBKDF2(hmac, options.salt, options.iterations, options.hashLength, options.outputType);
  });
}
function scryptInternal(options) {
  return __awaiter(this, void 0, void 0, function* () {
    const { costFactor, blockSize, parallelism, hashLength } = options;
    const SHA256Hasher = createSHA256();
    const blockData = yield pbkdf2({
      password: options.password,
      salt: options.salt,
      iterations: 1,
      hashLength: 128 * blockSize * parallelism,
      hashFunction: SHA256Hasher,
      outputType: "binary"
    });
    const scryptInterface = yield WASMInterface(wasmJson$3, 0);
    const VSize = 128 * blockSize * costFactor;
    const XYSize = 256 * blockSize;
    scryptInterface.setMemorySize(blockData.length + VSize + XYSize);
    scryptInterface.writeMemory(blockData, 0);
    scryptInterface.getExports().scrypt(blockSize, costFactor, parallelism);
    const expensiveSalt = scryptInterface.getMemory().subarray(0, 128 * blockSize * parallelism);
    const outputData = yield pbkdf2({
      password: options.password,
      salt: expensiveSalt,
      iterations: 1,
      hashLength,
      hashFunction: SHA256Hasher,
      outputType: "binary"
    });
    if (options.outputType === "hex") {
      const digestChars = new Uint8Array(hashLength * 2);
      return getDigestHex(digestChars, outputData, hashLength);
    }
    return outputData;
  });
}
function scrypt(options) {
  return __awaiter(this, void 0, void 0, function* () {
    validateOptions$1(options);
    return scryptInternal(options);
  });
}
function bcryptInternal(options) {
  return __awaiter(this, void 0, void 0, function* () {
    const { costFactor, password, salt } = options;
    const bcryptInterface = yield WASMInterface(wasmJson$2, 0);
    bcryptInterface.writeMemory(getUInt8Buffer(salt), 0);
    const passwordBuffer = getUInt8Buffer(password);
    bcryptInterface.writeMemory(passwordBuffer, 16);
    const shouldEncode = options.outputType === "encoded" ? 1 : 0;
    bcryptInterface.getExports().bcrypt(passwordBuffer.length, costFactor, shouldEncode);
    const memory = bcryptInterface.getMemory();
    if (options.outputType === "encoded") {
      return intArrayToString(memory, 60);
    }
    if (options.outputType === "hex") {
      const digestChars = new Uint8Array(24 * 2);
      return getDigestHex(digestChars, memory, 24);
    }
    return memory.slice(0, 24);
  });
}
function bcrypt(options) {
  return __awaiter(this, void 0, void 0, function* () {
    validateOptions(options);
    return bcryptInternal(options);
  });
}
function bcryptVerify(options) {
  return __awaiter(this, void 0, void 0, function* () {
    validateVerifyOptions(options);
    const { hash: hash2, password } = options;
    const bcryptInterface = yield WASMInterface(wasmJson$2, 0);
    bcryptInterface.writeMemory(getUInt8Buffer(hash2), 0);
    const passwordBuffer = getUInt8Buffer(password);
    bcryptInterface.writeMemory(passwordBuffer, 60);
    return !!bcryptInterface.getExports().bcrypt_verify(passwordBuffer.length);
  });
}
function whirlpool(data2) {
  if (wasmCache$1 === null) {
    return lockedCreate(mutex$1, wasmJson$1, 64).then((wasm) => {
      wasmCache$1 = wasm;
      return wasmCache$1.calculate(data2);
    });
  }
  try {
    const hash2 = wasmCache$1.calculate(data2);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createWhirlpool() {
  return WASMInterface(wasmJson$1, 64).then((wasm) => {
    wasm.init();
    const obj = {
      init: () => {
        wasm.init();
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 64,
      digestSize: 64
    };
    return obj;
  });
}
function sm3(data2) {
  if (wasmCache === null) {
    return lockedCreate(mutex, wasmJson, 32).then((wasm) => {
      wasmCache = wasm;
      return wasmCache.calculate(data2);
    });
  }
  try {
    const hash2 = wasmCache.calculate(data2);
    return Promise.resolve(hash2);
  } catch (err) {
    return Promise.reject(err);
  }
}
function createSM3() {
  return WASMInterface(wasmJson, 32).then((wasm) => {
    wasm.init();
    const obj = {
      init: () => {
        wasm.init();
        return obj;
      },
      update: (data2) => {
        wasm.update(data2);
        return obj;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Conflict with IHasher type
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data2) => {
        wasm.load(data2);
        return obj;
      },
      blockSize: 64,
      digestSize: 32
    };
    return obj;
  });
}
var name$l, data$l, hash$l, wasmJson$l, Mutex, _a, globalObject, nodeBuffer, textEncoder, alpha, digit, getUInt8Buffer, base64Chars, base64Lookup, MAX_HEAP, WASM_FUNC_HASH_LENGTH, wasmMutex, wasmModuleCache, mutex$l, wasmCache$l, name$k, data$k, hash$k, wasmJson$k, name$j, data$j, hash$j, wasmJson$j, mutex$k, wasmCache$k, uint32View, validateOptions$3, getHashParameters, validateVerifyOptions$1, name$i, data$i, hash$i, wasmJson$i, mutex$j, wasmCache$j, name$h, data$h, hash$h, wasmJson$h, mutex$i, wasmCache$i, name$g, data$g, hash$g, wasmJson$g, mutex$h, wasmCache$h, name$f, data$f, hash$f, wasmJson$f, mutex$g, wasmCache$g, polyBuffer, name$e, data$e, hash$e, wasmJson$e, mutex$f, wasmCache$f, name$d, data$d, hash$d, wasmJson$d, mutex$e, wasmCache$e, name$c, data$c, hash$c, wasmJson$c, mutex$d, wasmCache$d, name$b, data$b, hash$b, wasmJson$b, mutex$c, wasmCache$c, mutex$b, wasmCache$b, name$a, data$a, hash$a, wasmJson$a, mutex$a, wasmCache$a, mutex$9, wasmCache$9, name$9, data$9, hash$9, wasmJson$9, mutex$8, wasmCache$8, mutex$7, wasmCache$7, name$8, data$8, hash$8, wasmJson$8, mutex$6, wasmCache$6, name$7, data$7, hash$7, wasmJson$7, mutex$5, wasmCache$5, seedBuffer$2, name$6, data$6, hash$6, wasmJson$6, mutex$4, wasmCache$4, seedBuffer$1, name$5, data$5, hash$5, wasmJson$5, mutex$3, wasmCache$3, seedBuffer, name$4, data$4, hash$4, wasmJson$4, mutex$2, wasmCache$2, validateOptions$2, name$3, data$3, hash$3, wasmJson$3, isPowerOfTwo, validateOptions$1, name$2, data$2, hash$2, wasmJson$2, validateOptions, validateHashCharacters, validateVerifyOptions, name$1, data$1, hash$1, wasmJson$1, mutex$1, wasmCache$1, name, data, hash, wasmJson, mutex, wasmCache;
var init_index_esm = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/hash-wasm/4.12.0/dist/index.esm.js"() {
    name$l = "adler32";
    data$l = "AGFzbQEAAAABDANgAAF/YAAAYAF/AAMHBgABAgEAAgUEAQECAgYOAn8BQYCJBQt/AEGACAsHcAgGbWVtb3J5AgAOSGFzaF9HZXRCdWZmZXIAAAlIYXNoX0luaXQAAQtIYXNoX1VwZGF0ZQACCkhhc2hfRmluYWwAAw1IYXNoX0dldFN0YXRlAAQOSGFzaF9DYWxjdWxhdGUABQpTVEFURV9TSVpFAwEK6wkGBQBBgAkLCgBBAEEBNgKECAvjCAEHf0EAKAKECCIBQf//A3EhAiABQRB2IQMCQAJAIABBAUcNACACQQAtAIAJaiIBQY+AfGogASABQfD/A0sbIgEgA2oiBEEQdCIFQYCAPGogBSAEQfD/A0sbIAFyIQEMAQsCQAJAAkACQAJAIABBEEkNAEGACSEGIABBsCtJDQFBgAkhBgNAQQAhBQNAIAYgBWoiASgCACIEQf8BcSACaiICIANqIAIgBEEIdkH/AXFqIgJqIAIgBEEQdkH/AXFqIgJqIAIgBEEYdmoiAmogAiABQQRqKAIAIgRB/wFxaiICaiACIARBCHZB/wFxaiICaiACIARBEHZB/wFxaiICaiACIARBGHZqIgJqIAIgAUEIaigCACIEQf8BcWoiAmogAiAEQQh2Qf8BcWoiAmogAiAEQRB2Qf8BcWoiAmogAiAEQRh2aiIEaiAEIAFBDGooAgAiAUH/AXFqIgRqIAQgAUEIdkH/AXFqIgRqIAQgAUEQdkH/AXFqIgRqIAQgAUEYdmoiAmohAyAFQRBqIgVBsCtHDQALIANB8f8DcCEDIAJB8f8DcCECIAZBsCtqIQYgAEHQVGoiAEGvK0sNAAsgAEUNBCAAQQ9LDQEMAgsCQCAARQ0AAkACQCAAQQNxIgUNAEGACSEBIAAhBAwBCyAAQXxxIQRBACEBA0AgAiABQYAJai0AAGoiAiADaiEDIAUgAUEBaiIBRw0ACyAFQYAJaiEBCyAAQQRJDQADQCACIAEtAABqIgUgAS0AAWoiBiABLQACaiIAIAFBA2otAABqIgIgACAGIAUgA2pqamohAyABQQRqIQEgBEF8aiIEDQALCyACQY+AfGogAiACQfD/A0sbIANB8f8DcEEQdHIhAQwECwNAIAYoAgAiAUH/AXEgAmoiBCADaiAEIAFBCHZB/wFxaiIEaiAEIAFBEHZB/wFxaiIEaiAEIAFBGHZqIgRqIAQgBkEEaigCACIBQf8BcWoiBGogBCABQQh2Qf8BcWoiBGogBCABQRB2Qf8BcWoiBGogBCABQRh2aiIEaiAEIAZBCGooAgAiAUH/AXFqIgRqIAQgAUEIdkH/AXFqIgRqIAQgAUEQdkH/AXFqIgRqIAQgAUEYdmoiBGogBCAGQQxqKAIAIgFB/wFxaiIEaiAEIAFBCHZB/wFxaiIEaiAEIAFBEHZB/wFxaiIEaiAEIAFBGHZqIgJqIQMgBkEQaiEGIABBcGoiAEEPSw0ACyAARQ0BCyAAQX9qIQcCQCAAQQNxIgVFDQAgAEF8cSEAIAUhBCAGIQEDQCACIAEtAABqIgIgA2ohAyABQQFqIQEgBEF/aiIEDQALIAYgBWohBgsgB0EDSQ0AA0AgAiAGLQAAaiIBIAYtAAFqIgQgBi0AAmoiBSAGQQNqLQAAaiICIAUgBCABIANqampqIQMgBkEEaiEGIABBfGoiAA0ACwsgA0Hx/wNwIQMgAkHx/wNwIQILIAIgA0EQdHIhAQtBACABNgKECAsxAQF/QQBBACgChAgiAEEYdCAAQYD+A3FBCHRyIABBCHZBgP4DcSAAQRh2cnI2AoAJCwUAQYQICzsAQQBBATYChAggABACQQBBACgChAgiAEEYdCAAQYD+A3FBCHRyIABBCHZBgP4DcSAAQRh2cnI2AoAJCwsVAgBBgAgLBAQAAAAAQYQICwQBAAAA";
    hash$l = "02ddbd17";
    wasmJson$l = {
      name: name$l,
      data: data$l,
      hash: hash$l
    };
    Mutex = class {
      constructor() {
        this.mutex = Promise.resolve();
      }
      lock() {
        let begin = () => {
        };
        this.mutex = this.mutex.then(() => new Promise(begin));
        return new Promise((res) => {
          begin = res;
        });
      }
      dispatch(fn) {
        return __awaiter(this, void 0, void 0, function* () {
          const unlock = yield this.lock();
          try {
            return yield Promise.resolve(fn());
          } finally {
            unlock();
          }
        });
      }
    };
    globalObject = getGlobal();
    nodeBuffer = (_a = globalObject.Buffer) !== null && _a !== void 0 ? _a : null;
    textEncoder = globalObject.TextEncoder ? new globalObject.TextEncoder() : null;
    alpha = "a".charCodeAt(0) - 10;
    digit = "0".charCodeAt(0);
    getUInt8Buffer = nodeBuffer !== null ? (data2) => {
      if (typeof data2 === "string") {
        const buf = nodeBuffer.from(data2, "utf8");
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
      }
      if (nodeBuffer.isBuffer(data2)) {
        return new Uint8Array(data2.buffer, data2.byteOffset, data2.length);
      }
      if (ArrayBuffer.isView(data2)) {
        return new Uint8Array(data2.buffer, data2.byteOffset, data2.byteLength);
      }
      throw new Error("Invalid data type!");
    } : (data2) => {
      if (typeof data2 === "string") {
        return textEncoder.encode(data2);
      }
      if (ArrayBuffer.isView(data2)) {
        return new Uint8Array(data2.buffer, data2.byteOffset, data2.byteLength);
      }
      throw new Error("Invalid data type!");
    };
    base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    base64Lookup = new Uint8Array(256);
    for (let i = 0; i < base64Chars.length; i++) {
      base64Lookup[base64Chars.charCodeAt(i)] = i;
    }
    MAX_HEAP = 16 * 1024;
    WASM_FUNC_HASH_LENGTH = 4;
    wasmMutex = new Mutex();
    wasmModuleCache = /* @__PURE__ */ new Map();
    mutex$l = new Mutex();
    wasmCache$l = null;
    name$k = "argon2";
    data$k = "AGFzbQEAAAABKQVgAX8Bf2AAAX9gEH9/f39/f39/f39/f39/f38AYAR/f39/AGACf38AAwYFAAECAwQFBgEBAoCAAgYIAX8BQZCoBAsHQQQGbWVtb3J5AgASSGFzaF9TZXRNZW1vcnlTaXplAAAOSGFzaF9HZXRCdWZmZXIAAQ5IYXNoX0NhbGN1bGF0ZQAECvEyBVgBAn9BACEBAkAgAEEAKAKICCICRg0AAkAgACACayIAQRB2IABBgIB8cSAASWoiAEAAQX9HDQBB/wHADwtBACEBQQBBACkDiAggAEEQdK18NwOICAsgAcALcAECfwJAQQAoAoAIIgANAEEAPwBBEHQiADYCgAhBACgCiAgiAUGAgCBGDQACQEGAgCAgAWsiAEEQdiAAQYCAfHEgAElqIgBAAEF/Rw0AQQAPC0EAQQApA4gIIABBEHStfDcDiAhBACgCgAghAAsgAAvcDgECfiAAIAQpAwAiECAAKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACAMIBAgDCkDAIVCIIkiEDcDACAIIBAgCCkDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgBCAQIAQpAwCFQiiJIhA3AwAgACAQIAApAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIAwgECAMKQMAhUIwiSIQNwMAIAggECAIKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAEIBAgBCkDAIVCAYk3AwAgASAFKQMAIhAgASkDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgDSAQIA0pAwCFQiCJIhA3AwAgCSAQIAkpAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIAUgECAFKQMAhUIoiSIQNwMAIAEgECABKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACANIBAgDSkDAIVCMIkiEDcDACAJIBAgCSkDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgBSAQIAUpAwCFQgGJNwMAIAIgBikDACIQIAIpAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIA4gECAOKQMAhUIgiSIQNwMAIAogECAKKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACAGIBAgBikDAIVCKIkiEDcDACACIBAgAikDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgDiAQIA4pAwCFQjCJIhA3AwAgCiAQIAopAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIAYgECAGKQMAhUIBiTcDACADIAcpAwAiECADKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACAPIBAgDykDAIVCIIkiEDcDACALIBAgCykDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgByAQIAcpAwCFQiiJIhA3AwAgAyAQIAMpAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIA8gECAPKQMAhUIwiSIQNwMAIAsgECALKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAHIBAgBykDAIVCAYk3AwAgACAFKQMAIhAgACkDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgDyAQIA8pAwCFQiCJIhA3AwAgCiAQIAopAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIAUgECAFKQMAhUIoiSIQNwMAIAAgECAAKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAPIBAgDykDAIVCMIkiEDcDACAKIBAgCikDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgBSAQIAUpAwCFQgGJNwMAIAEgBikDACIQIAEpAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIAwgECAMKQMAhUIgiSIQNwMAIAsgECALKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACAGIBAgBikDAIVCKIkiEDcDACABIBAgASkDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgDCAQIAwpAwCFQjCJIhA3AwAgCyAQIAspAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIAYgECAGKQMAhUIBiTcDACACIAcpAwAiECACKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACANIBAgDSkDAIVCIIkiEDcDACAIIBAgCCkDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgByAQIAcpAwCFQiiJIhA3AwAgAiAQIAIpAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIA0gECANKQMAhUIwiSIQNwMAIAggECAIKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAHIBAgBykDAIVCAYk3AwAgAyAEKQMAIhAgAykDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgDiAQIA4pAwCFQiCJIhA3AwAgCSAQIAkpAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIAQgECAEKQMAhUIoiSIQNwMAIAMgECADKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAOIBAgDikDAIVCMIkiEDcDACAJIBAgCSkDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgBCAQIAQpAwCFQgGJNwMAC98aAQN/QQAhBEEAIAIpAwAgASkDAIU3A5AIQQAgAikDCCABKQMIhTcDmAhBACACKQMQIAEpAxCFNwOgCEEAIAIpAxggASkDGIU3A6gIQQAgAikDICABKQMghTcDsAhBACACKQMoIAEpAyiFNwO4CEEAIAIpAzAgASkDMIU3A8AIQQAgAikDOCABKQM4hTcDyAhBACACKQNAIAEpA0CFNwPQCEEAIAIpA0ggASkDSIU3A9gIQQAgAikDUCABKQNQhTcD4AhBACACKQNYIAEpA1iFNwPoCEEAIAIpA2AgASkDYIU3A/AIQQAgAikDaCABKQNohTcD+AhBACACKQNwIAEpA3CFNwOACUEAIAIpA3ggASkDeIU3A4gJQQAgAikDgAEgASkDgAGFNwOQCUEAIAIpA4gBIAEpA4gBhTcDmAlBACACKQOQASABKQOQAYU3A6AJQQAgAikDmAEgASkDmAGFNwOoCUEAIAIpA6ABIAEpA6ABhTcDsAlBACACKQOoASABKQOoAYU3A7gJQQAgAikDsAEgASkDsAGFNwPACUEAIAIpA7gBIAEpA7gBhTcDyAlBACACKQPAASABKQPAAYU3A9AJQQAgAikDyAEgASkD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";
    hash$k = "e4cdc523";
    wasmJson$k = {
      name: name$k,
      data: data$k,
      hash: hash$k
    };
    name$j = "blake2b";
    data$j = "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";
    hash$j = "c6f286e6";
    wasmJson$j = {
      name: name$j,
      data: data$j,
      hash: hash$j
    };
    mutex$k = new Mutex();
    wasmCache$k = null;
    uint32View = new DataView(new ArrayBuffer(4));
    validateOptions$3 = (options) => {
      var _a2;
      if (!options || typeof options !== "object") {
        throw new Error("Invalid options parameter. It requires an object.");
      }
      if (!options.password) {
        throw new Error("Password must be specified");
      }
      options.password = getUInt8Buffer(options.password);
      if (options.password.length < 1) {
        throw new Error("Password must be specified");
      }
      if (!options.salt) {
        throw new Error("Salt must be specified");
      }
      options.salt = getUInt8Buffer(options.salt);
      if (options.salt.length < 8) {
        throw new Error("Salt should be at least 8 bytes long");
      }
      options.secret = getUInt8Buffer((_a2 = options.secret) !== null && _a2 !== void 0 ? _a2 : "");
      if (!Number.isInteger(options.iterations) || options.iterations < 1) {
        throw new Error("Iterations should be a positive number");
      }
      if (!Number.isInteger(options.parallelism) || options.parallelism < 1) {
        throw new Error("Parallelism should be a positive number");
      }
      if (!Number.isInteger(options.hashLength) || options.hashLength < 4) {
        throw new Error("Hash length should be at least 4 bytes.");
      }
      if (!Number.isInteger(options.memorySize)) {
        throw new Error("Memory size should be specified.");
      }
      if (options.memorySize < 8 * options.parallelism) {
        throw new Error("Memory size should be at least 8 * parallelism.");
      }
      if (options.outputType === void 0) {
        options.outputType = "hex";
      }
      if (![
        "hex",
        "binary",
        "encoded"
      ].includes(options.outputType)) {
        throw new Error(`Insupported output type ${options.outputType}. Valid values: ['hex', 'binary', 'encoded']`);
      }
    };
    getHashParameters = (password, encoded, secret) => {
      const regex = /^\$argon2(id|i|d)\$v=([0-9]+)\$((?:[mtp]=[0-9]+,){2}[mtp]=[0-9]+)\$([A-Za-z0-9+/]+)\$([A-Za-z0-9+/]+)$/;
      const match = encoded.match(regex);
      if (!match) {
        throw new Error("Invalid hash");
      }
      const [, hashType, version, parameters2, salt, hash2] = match;
      if (version !== "19") {
        throw new Error(`Unsupported version: ${version}`);
      }
      const parsedParameters = {};
      const paramMap = {
        m: "memorySize",
        p: "parallelism",
        t: "iterations"
      };
      for (const x of parameters2.split(",")) {
        const [n, v] = x.split("=");
        parsedParameters[paramMap[n]] = Number(v);
      }
      return Object.assign(Object.assign({}, parsedParameters), {
        password,
        secret,
        hashType,
        salt: decodeBase64(salt),
        hashLength: getDecodeBase64Length(hash2),
        outputType: "encoded"
      });
    };
    validateVerifyOptions$1 = (options) => {
      if (!options || typeof options !== "object") {
        throw new Error("Invalid options parameter. It requires an object.");
      }
      if (options.hash === void 0 || typeof options.hash !== "string") {
        throw new Error("Hash should be specified");
      }
    };
    name$i = "blake2s";
    data$i = "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";
    hash$i = "5c0ff166";
    wasmJson$i = {
      name: name$i,
      data: data$i,
      hash: hash$i
    };
    mutex$j = new Mutex();
    wasmCache$j = null;
    name$h = "blake3";
    data$h = "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IQEgAkFAaiICQcAASw0ACwsCQEHAACAHQf8BcSIGayIFIAIgBSACSRsiCUUNACAJQQNxIQtBACEFAkAgCUEESQ0AIAAgBmohByAJQfwAcSEIQQAhBQNAIAcgBWoiAkEoaiABIAVqIgotAAA6AAAgAkEpaiAKQQFqLQAAOgAAIAJBKmogCkECai0AADoAACACQStqIApBA2otAAA6AAAgCCAFQQRqIgVHDQALCwJAIAtFDQAgASAFaiEBIAUgBmogAGpBKGohBQNAIAUgAS0AADoAACABQQFqIQEgBUEBaiEFIAtBf2oiCw0ACwsgAC0AaCEHCyAAIAcgCWo6AGggA0HAAGokAAveAwQFfwN+BX8GfiMAQdABayIBJAACQCAAe6ciAkEALQCQigEiA08NAEEALQCKigFBBHIhBCABQShqIQVBACkDmIkBIQBBACkDkIkBIQZBACkDiIkBIQdBACkDgIkBIQggAyEJA0AgASAANwMYIAEgBjcDECABIAc3AwggASAINwMAIAEgA0EFdCIDQdGJAWoiCikDADcDKCABIANB2YkBaiILKQMANwMwIAEgA0HhiQFqIgwpAwA3AzggASADQemJAWoiDSkDADcDQCABIANB8YkBaikDADcDSCABIANB+YkBaikDADcDUCABIANBgYoBaikDADcDWCADQYmKAWopAwAhDiABQcAAOgBoIAEgDjcDYCABQgA3AyAgASAEOgBpIAEgADcDiAEgASAGNwOAASABIAc3A3ggASAINwNwIAFBkAFqIAFB8ABqIAVBwABCACAEQf8BcRACIAEpA7ABIQ4gASkDkAEhDyABKQO4ASEQIAEpA5gBIREgASkDwAEhEiABKQOgASETIA0gASkDyAEgASkDqAGFNwMAIAwgEiAThTcDACALIBAgEYU3AwAgCiAOIA+FNwMAIAlBf2oiCUH/AXEiAyACSw0AC0EAIAk6AJCKAQsgAUHQAWokAAvHCQIKfwV+IwBB4AJrIgUkAAJAAkAgAUGACEsNACAFIAA2AvwBIAVB/AFqIAFBgAhGIgZBECACQQEgA0EBQQIgBBABIAZBCnQiByABTw0BIAVB4ABqIgZCADcDACAFQdgAaiIIQgA3AwAgBUHQAGoiCUIANwMAIAVByABqIgpCADcDACAFQcAAaiILQgA3AwAgBUE4aiIMQgA3AwAgBUEwaiINQgA3AwAgBSADOgBqIAVCADcDKCAFQQA7AWggBUEAKQOAiQE3AwAgBUEAKQOIiQE3AwggBUEAKQOQiQE3AxAgBUEAKQOYiQE3AxggBSABQYAIRiIOrSACfDcDICAFIAAgB2pBACABIA4bEAQgBUGIAWpBMGogDSkDADcDACAFQYgBakE4aiAMKQMANwMAIAUgBSkDACIPNwOIASAFIAUpAwgiEDcDkAEgBSAFKQMQIhE3A5gBIAUgBSkDGCISNwOgASAFIAUpAyg3A7ABIAUtAGohACAFLQBpIQcgBSkDICECIAUtAGghASAFQYgBakHAAGogCykDADcDACAFQYgBakHIAGogCikDADcDACAFQYgBakHQAGogCSkDADcDACAFQYgBakHYAGogCCkDADcDACAFQYgBakHgAGogBikDADcDACAFIAE6APABIAUgAjcDqAEgBSAAIAdFckECciIAOgDxASAFIBI3A5gCIAUgETcDkAIgBSAQNwOIAiAFIA83A4ACIAVBoAJqIAVBgAJqIAVBsAFqIAEgAiAAQf8BcRACIAUpA8ACIQIgBSkDoAIhDyAFKQPIAiEQIAUpA6gCIREgBSkD0AIhEiAFKQOwAiETIAQgDkEFdGoiASAFKQPYAiAFKQO4AoU3AxggASASIBOFNwMQIAEgECARhTcDCCABIAIgD4U3AwBBAkEBIA4bIQYMAQsgAEIBIAFBf2pBCnZBAXKteUI/hYYiD6dBCnQiDiACIAMgBRAGIQcgACAOaiABIA5rIA9C////AYMgAnwgAyAFQcAAQSAgDkGACEsbahAGIQECQCAHQQFHDQAgBCAFKQMANwMAIAQgBSkDCDcDCCAEIAUpAxA3AxAgBCAFKQMYNwMYIAQgBSkDIDcDICAEIAUpAyg3AyggBCAFKQMwNwMwIAQgBSkDODcDOEECIQYMAQtBACEGQQAhAAJAIAEgB2oiCUECSQ0AIAlBfmoiCkEBdkEBaiIGQQNxIQ5BACEHAkAgCkEGSQ0AIAZB/P///wdxIQhBACEHIAVBiAFqIQEgBSEAA0AgASAANgIAIAFBDGogAEHAAWo2AgAgAUEIaiAAQYABajYCACABQQRqIABBwABqNgIAIABBgAJqIQAgAUEQaiEBIAggB0EEaiIHRw0ACwsgCkF+cSEIAkAgDkUNACAFIAdBBnRqIQEgBUGIAWogB0ECdGohAANAIAAgATYCACABQcAAaiEBIABBBGohACAOQX9qIg4NAAsLIAhBAmohAAsgBUGIAWogBkEBQgBBACADQQRyQQBBACAEEAEgACAJTw0AIAQgBkEFdGoiASAFIAZBBnRqIgApAwA3AwAgASAAKQMINwMIIAEgACkDEDcDECABIAApAxg3AxggBkEBaiEGCyAFQeACaiQAIAYLrRAIAn8EfgF/AX4EfwR+BH8EfiMAQfABayIBJAACQCAARQ0AAkBBAC0AkIoBIgINACABQTBqQQApA9CJATcDACABQThqQQApA9iJATcDACABQQApA6CJASIDNwMAIAFBACkDqIkBIgQ3AwggAUEAKQOwiQEiBTcDECABQQApA7iJASIGNwMYIAFBACkDyIkBNwMoQQAtAIqKASECQQAtAImKASEHQQApA8CJASEIQQAtAIiKASEJIAFBwABqQQApA+CJATcDACABQcgAakEAKQPoiQE3AwAgAUHQAGpBACkD8IkBNwMAIAFB2ABqQQApA/iJATcDACABQeAAakEAKQOAigE3AwAgASAJOgBoIAEgCDcDICABIAIgB0VyIgJBAnI6AGkgAUEoaiEKQgAhCEGACSELIAJBCnJB/wFxIQwDQCABQbABaiABIAogCUH/AXEgCCAMEAIgASABKQPQASINIAEpA7ABhTcDcCABIAEpA9gBIg4gASkDuAGFNwN4IAEgASkD4AEiDyABKQPAAYU3A4ABIAEgASkD6AEiECAGhTcDqAEgASAPIAWFNwOgASABIA4gBIU3A5gBIAEgDSADhTcDkAEgASAQIAEpA8gBhTcDiAEgAEHAACAAQcAASRsiEUF/aiESAkACQCARQQdxIhMNACABQfAAaiECIAshByARIRQMAQsgEUH4AHEhFCABQfAAaiECIAshBwNAIAcgAi0AADoAACAHQQFqIQcgAkEBaiECIBNBf2oiEw0ACwsCQCASQQdJDQADQCAHIAIpAAA3AAAgB0EIaiEHIAJBCGohAiAUQXhqIhQNAAsLIAhCAXwhCCALIBFqIQsgACARayIADQAMAgsLAkACQAJAQQAtAImKASIHQQZ0QQBBAC0AiIoBIhFrRg0AIAEgEToAaCABQQApA4CKATcDYCABQQApA/iJATcDWCABQQApA/CJATcDUCABQQApA+iJATcDSCABQQApA+CJATcDQCABQQApA9iJATcDOCABQQApA9CJATcDMCABQQApA8iJATcDKCABQQApA8CJASIINwMgIAFBACkDuIkBIgM3AxggAUEAKQOwiQEiBDcDECABQQApA6iJASIFNwMIIAFBACkDoIkBIgY3AwAgAUEALQCKigEiEyAHRXJBAnIiCzoAaSATQQRyIRNBACkDmIkBIQ1BACkDkIkBIQ5BACkDiIkBIQ9BACkDgIkBIRAMAQtBwAAhESABQcAAOgBoQgAhCCABQgA3AyAgAUEAKQOYiQEiDTcDGCABQQApA5CJASIONwMQIAFBACkDiIkBIg83AwggAUEAKQOAiQEiEDcDACABQQAtAIqKAUEEciITOgBpIAEgAkF+aiICQQV0IgdByYoBaikDADcDYCABIAdBwYoBaikDADcDWCABIAdBuYoBaikDADcDUCABIAdBsYoBaikDADcDSCABIAdBqYoBaikDADcDQCABIAdBoYoBaikDADcDOCABIAdBmYoBaikDADcDMCABIAdBkYoBaikDADcDKCATIQsgECEGIA8hBSAOIQQgDSEDIAJFDQELIAJBf2oiB0EFdCIUQZGKAWopAwAhFSAUQZmKAWopAwAhFiAUQaGKAWopAwAhFyAUQamKAWopAwAhGCABIAM3A4gBIAEgBDcDgAEgASAFNwN4IAEgBjcDcCABQbABaiABQfAAaiABQShqIhQgESAIIAtB/wFxEAIgASATOgBpIAFBwAA6AGggASAYNwNAIAEgFzcDOCABIBY3AzAgASAVNwMoIAFCADcDICABIA03AxggASAONwMQIAEgDzcDCCABIBA3AwAgASABKQPoASABKQPIAYU3A2AgASABKQPgASABKQPAAYU3A1ggASABKQPYASABKQO4AYU3A1AgASABKQPQASABKQOwAYU3A0ggB0UNACACQQV0QemJAWohAiATQf8BcSERA0AgAkFoaikDACEIIAJBcGopAwAhAyACQXhqKQMAIQQgAikDACEFIAEgDTcDiAEgASAONwOAASABIA83A3ggASAQNwNwIAFBsAFqIAFB8ABqIBRBwABCACAREAIgASATOgBpIAFBwAA6AGggASAFNwNAIAEgBDcDOCABIAM3AzAgASAINwMoIAFCADcDICABIA03AxggASAONwMQIAEgDzcDCCABIBA3AwAgASABKQPoASABKQPIAYU3A2AgASABKQPgASABKQPAAYU3A1ggASABKQPYASABKQO4AYU3A1AgASABKQPQASABKQOwAYU3A0ggAkFgaiECIAdBf2oiBw0ACwsgAUEoaiEJQgAhCEGACSELIBNBCHJB/wFxIQoDQCABQbABaiABIAlBwAAgCCAKEAIgASABKQPQASIDIAEpA7ABhTcDcCABIAEpA9gBIgQgASkDuAGFNwN4IAEgASkD4AEiBSABKQPAAYU3A4ABIAEgDSABKQPoASIGhTcDqAEgASAOIAWFNwOgASABIA8gBIU3A5gBIAEgECADhTcDkAEgASAGIAEpA8gBhTcDiAEgAEHAACAAQcAASRsiEUF/aiESAkACQCARQQdxIhMNACABQfAAaiECIAshByARIRQMAQsgEUH4AHEhFCABQfAAaiECIAshBwNAIAcgAi0AADoAACAHQQFqIQcgAkEBaiECIBNBf2oiEw0ACwsCQCASQQdJDQADQCAHIAIpAAA3AAAgB0EIaiEHIAJBCGohAiAUQXhqIhQNAAsLIAhCAXwhCCALIBFqIQsgACARayIADQALCyABQfABaiQAC6MCAQR+AkACQCAAQSBGDQBCq7OP/JGjs/DbACEBQv+kuYjFkdqCm38hAkLy5rvjo6f9p6V/IQNC58yn0NbQ67O7fyEEQQAhAAwBC0EAKQOYCSEBQQApA5AJIQJBACkDiAkhA0EAKQOACSEEQRAhAAtBACAAOgCKigFBAEIANwOAigFBAEIANwP4iQFBAEIANwPwiQFBAEIANwPoiQFBAEIANwPgiQFBAEIANwPYiQFBAEIANwPQiQFBAEIANwPIiQFBAEIANwPAiQFBACABNwO4iQFBACACNwOwiQFBACADNwOoiQFBACAENwOgiQFBACABNwOYiQFBACACNwOQiQFBACADNwOIiQFBACAENwOAiQFBAEEAOgCQigFBAEEAOwGIigELBgAgABADCwYAIAAQBwsGAEGAiQELqwIBBH4CQAJAIAFBIEYNAEKrs4/8kaOz8NsAIQNC/6S5iMWR2oKbfyEEQvLmu+Ojp/2npX8hBULnzKfQ1tDrs7t/IQZBACEBDAELQQApA5gJIQNBACkDkAkhBEEAKQOICSEFQQApA4AJIQZBECEBC0EAIAE6AIqKAUEAQgA3A4CKAUEAQgA3A/iJAUEAQgA3A/CJAUEAQgA3A+iJAUEAQgA3A+CJAUEAQgA3A9iJAUEAQgA3A9CJAUEAQgA3A8iJAUEAQgA3A8CJAUEAIAM3A7iJAUEAIAQ3A7CJAUEAIAU3A6iJAUEAIAY3A6CJAUEAIAM3A5iJAUEAIAQ3A5CJAUEAIAU3A4iJAUEAIAY3A4CJAUEAQQA6AJCKAUEAQQA7AYiKASAAEAMgAhAHCwsLAQBBgAgLBHgHAAA=";
    hash$h = "215d875f";
    wasmJson$h = {
      name: name$h,
      data: data$h,
      hash: hash$h
    };
    mutex$i = new Mutex();
    wasmCache$i = null;
    name$g = "crc32";
    data$g = "AGFzbQEAAAABEQRgAAF/YAF/AGAAAGACf38AAwgHAAEBAQIAAwUEAQECAgYOAn8BQZDJBQt/AEGACAsHcAgGbWVtb3J5AgAOSGFzaF9HZXRCdWZmZXIAAAlIYXNoX0luaXQAAgtIYXNoX1VwZGF0ZQADCkhhc2hfRmluYWwABA1IYXNoX0dldFN0YXRlAAUOSGFzaF9DYWxjdWxhdGUABgpTVEFURV9TSVpFAwEKkggHBQBBgAkLwwMBA39BgIkBIQFBACECA0AgAUEAQQBBAEEAQQBBAEEAQQAgAkEBcWsgAHEgAkEBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnM2AgAgAUEEaiEBIAJBAWoiAkGAAkcNAAtBACEAA0AgAEGEkQFqIABBhIkBaigCACICQf8BcUECdEGAiQFqKAIAIAJBCHZzIgI2AgAgAEGEmQFqIAJB/wFxQQJ0QYCJAWooAgAgAkEIdnMiAjYCACAAQYShAWogAkH/AXFBAnRBgIkBaigCACACQQh2cyICNgIAIABBhKkBaiACQf8BcUECdEGAiQFqKAIAIAJBCHZzIgI2AgAgAEGEsQFqIAJB/wFxQQJ0QYCJAWooAgAgAkEIdnMiAjYCACAAQYS5AWogAkH/AXFBAnRBgIkBaigCACACQQh2cyICNgIAIABBhMEBaiACQf8BcUECdEGAiQFqKAIAIAJBCHZzNgIAIABBBGoiAEH8B0cNAAsLJwACQEEAKAKAyQEgAEYNACAAEAFBACAANgKAyQELQQBBADYChMkBC4gDAQN/QQAoAoTJAUF/cyEBQYAJIQICQCAAQQhJDQBBgAkhAgNAIAJBBGooAgAiA0EOdkH8B3FBgJEBaigCACADQRZ2QfwHcUGAiQFqKAIAcyADQQZ2QfwHcUGAmQFqKAIAcyADQf8BcUECdEGAoQFqKAIAcyACKAIAIAFzIgFBFnZB/AdxQYCpAWooAgBzIAFBDnZB/AdxQYCxAWooAgBzIAFBBnZB/AdxQYC5AWooAgBzIAFB/wFxQQJ0QYDBAWooAgBzIQEgAkEIaiECIABBeGoiAEEHSw0ACwsCQCAARQ0AAkACQCAAQQFxDQAgACEDDAELIAFB/wFxIAItAABzQQJ0QYCJAWooAgAgAUEIdnMhASACQQFqIQIgAEF/aiEDCyAAQQFGDQADQCABQf8BcSACLQAAc0ECdEGAiQFqKAIAIAFBCHZzIgFB/wFxIAJBAWotAABzQQJ0QYCJAWooAgAgAUEIdnMhASACQQJqIQIgA0F+aiIDDQALC0EAIAFBf3M2AoTJAQsyAQF/QQBBACgChMkBIgBBGHQgAEGA/gNxQQh0ciAAQQh2QYD+A3EgAEEYdnJyNgKACQsGAEGEyQELWQACQEEAKAKAyQEgAUYNACABEAFBACABNgKAyQELQQBBADYChMkBIAAQA0EAQQAoAoTJASIBQRh0IAFBgP4DcUEIdHIgAUEIdkGA/gNxIAFBGHZycjYCgAkLCwsBAEGACAsEBAAAAA==";
    hash$g = "d2eba587";
    wasmJson$g = {
      name: name$g,
      data: data$g,
      hash: hash$g
    };
    mutex$h = new Mutex();
    wasmCache$h = null;
    name$f = "crc64";
    data$f = "AGFzbQEAAAABDANgAAF/YAAAYAF/AAMHBgABAgEAAQUEAQECAgYOAn8BQZCJBgt/AEGACAsHcAgGbWVtb3J5AgAOSGFzaF9HZXRCdWZmZXIAAAlIYXNoX0luaXQAAQtIYXNoX1VwZGF0ZQACCkhhc2hfRmluYWwAAw1IYXNoX0dldFN0YXRlAAQOSGFzaF9DYWxjdWxhdGUABQpTVEFURV9TSVpFAwEKgwgGBQBBgAkL9QMDAX4BfwJ+AkBBACkDgIkCQQApA4AJIgBRDQBBgIkBIQFCACECA0AgAUIAQgBCAEIAQgBCAEIAQgAgAkIBg30gAIMgAkIBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIU3AwAgAUEIaiEBIAJCAXwiAkKAAlINAAtBACEBA0AgAUGImQFqIAFBiIkBaikDACICp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiKkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiLkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiMkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiNkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiOkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiPkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhTcDACABQQhqIgFB+A9HDQALQQAgADcDgIkCC0EAQgA3A4iJAguUAwIBfgJ/QQApA4iJAkJ/hSEBQYAJIQICQCAAQQhJDQBBgAkhAgNAIAIpAwAgAYUiAUIwiKdB/wFxQQN0QYCZAWopAwAgAUI4iKdBA3RBgIkBaikDAIUgAUIoiKdB/wFxQQN0QYCpAWopAwCFIAFCIIinQf8BcUEDdEGAuQFqKQMAhSABpyIDQRV2QfgPcUGAyQFqKQMAhSADQQ12QfgPcUGA2QFqKQMAhSADQQV2QfgPcUGA6QFqKQMAhSADQf8BcUEDdEGA+QFqKQMAhSEBIAJBCGohAiAAQXhqIgBBB0sNAAsLAkAgAEUNAAJAAkAgAEEBcQ0AIAAhAwwBCyABQv8BgyACMQAAhadBA3RBgIkBaikDACABQgiIhSEBIAJBAWohAiAAQX9qIQMLIABBAUYNAANAIAFC/wGDIAIxAACFp0EDdEGAiQFqKQMAIAFCCIiFIgFC/wGDIAJBAWoxAACFp0EDdEGAiQFqKQMAIAFCCIiFIQEgAkECaiECIANBfmoiAw0ACwtBACABQn+FNwOIiQILZAEBfkEAQQApA4iJAiIAQjiGIABCgP4Dg0IohoQgAEKAgPwHg0IYhiAAQoCAgPgPg0IIhoSEIABCCIhCgICA+A+DIABCGIhCgID8B4OEIABCKIhCgP4DgyAAQjiIhISENwOACQsGAEGIiQILAgALCwsBAEGACAsECAAAAA==";
    hash$f = "c5ac6c16";
    wasmJson$f = {
      name: name$f,
      data: data$f,
      hash: hash$f
    };
    mutex$g = new Mutex();
    wasmCache$g = null;
    polyBuffer = new Uint8Array(8);
    name$e = "md4";
    data$e = "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";
    hash$e = "bd8ce7c7";
    wasmJson$e = {
      name: name$e,
      data: data$e,
      hash: hash$e
    };
    mutex$f = new Mutex();
    wasmCache$f = null;
    name$d = "md5";
    data$d = "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";
    hash$d = "e6508e4b";
    wasmJson$d = {
      name: name$d,
      data: data$d,
      hash: hash$d
    };
    mutex$e = new Mutex();
    wasmCache$e = null;
    name$c = "sha1";
    data$c = "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";
    hash$c = "6b530c24";
    wasmJson$c = {
      name: name$c,
      data: data$c,
      hash: hash$c
    };
    mutex$d = new Mutex();
    wasmCache$d = null;
    name$b = "sha3";
    data$b = "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";
    hash$b = "fb24e536";
    wasmJson$b = {
      name: name$b,
      data: data$b,
      hash: hash$b
    };
    mutex$c = new Mutex();
    wasmCache$c = null;
    mutex$b = new Mutex();
    wasmCache$b = null;
    name$a = "sha256";
    data$a = "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c2pBx6KerX1qIhkgASADcyACcSABIANxcyABQR53IAFBE3dzIAFBCndzaiAaaiICaiIJIBMgEnNxIBJzaiAJQRp3IAlBFXdzIAlBB3dzakHRxqk2aiIaIAIgAXMgA3EgAiABcXMgAkEedyACQRN3cyACQQp3c2ogGGoiA2oiESAJIBNzcSATc2ogEUEadyARQRV3cyARQQd3c2pB59KkoQFqIhggAyACcyABcSADIAJxcyADQR53IANBE3dzIANBCndzaiAUaiIBaiISIBEgCXNxIAlzaiASQRp3IBJBFXdzIBJBB3dzakGFldy9AmoiFCABIANzIAJxIAEgA3FzIAFBHncgAUETd3MgAUEKd3NqIBdqIgJqIhMgI2ogJiASaiAiIBFqICUgCWogEyASIBFzcSARc2ogE0EadyATQRV3cyATQQd3c2pBuMLs8AJqIhcgAiABcyADcSACIAFxcyACQR53IAJBE3dzIAJBCndzaiAZaiIDaiIJIBMgEnNxIBJzaiAJQRp3IAlBFXdzIAlBB3dzakH827HpBGoiGSADIAJzIAFxIAMgAnFzIANBHncgA0ETd3MgA0EKd3NqIBpqIgFqIhEgCSATc3EgE3NqIBFBGncgEUEVd3MgEUEHd3NqQZOa4JkFaiIaIAEgA3MgAnEgASADcXMgAUEedyABQRN3cyABQQp3c2ogGGoiAmoiEiARIAlzcSAJc2ogEkEadyASQRV3cyASQQd3c2pB1OapqAZqIhggAiABcyADcSACIAFxcyACQR53IAJBE3dzIAJBCndzaiAUaiIDaiITaiAoIBJqICQgEWogJyAJaiATIBIgEXNxIBFzaiATQRp3IBNBFXdzIBNBB3dzakG7laizB2oiFCADIAJzIAFxIAMgAnFzIANBHncgA0ETd3MgA0EKd3NqIBdqIgFqIgkgEyASc3EgEnNqIAlBGncgCUEVd3MgCUEHd3NqQa6Si454aiIXIAEgA3MgAnEgASADcXMgAUEedyABQRN3cyABQQp3c2ogGWoiAmoiESAJIBNzcSATc2ogEUEadyARQRV3cyARQQd3c2pBhdnIk3lqIhkgAiABcyADcSACIAFxcyACQR53IAJBE3dzIAJBCndzaiAaaiIDaiISIBEgCXNxIAlzaiASQRp3IBJBFXdzIBJBB3dzakGh0f+VemoiGiADIAJz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";
    hash$a = "8c18dd94";
    wasmJson$a = {
      name: name$a,
      data: data$a,
      hash: hash$a
    };
    mutex$a = new Mutex();
    wasmCache$a = null;
    mutex$9 = new Mutex();
    wasmCache$9 = null;
    name$9 = "sha512";
    data$9 = "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";
    hash$9 = "f2e40eb1";
    wasmJson$9 = {
      name: name$9,
      data: data$9,
      hash: hash$9
    };
    mutex$8 = new Mutex();
    wasmCache$8 = null;
    mutex$7 = new Mutex();
    wasmCache$7 = null;
    name$8 = "xxhash32";
    data$8 = "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";
    hash$8 = "4bb12485";
    wasmJson$8 = {
      name: name$8,
      data: data$8,
      hash: hash$8
    };
    mutex$6 = new Mutex();
    wasmCache$6 = null;
    name$7 = "xxhash64";
    data$7 = "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";
    hash$7 = "177fbfa3";
    wasmJson$7 = {
      name: name$7,
      data: data$7,
      hash: hash$7
    };
    mutex$5 = new Mutex();
    wasmCache$5 = null;
    seedBuffer$2 = new Uint8Array(8);
    name$6 = "xxhash3";
    data$6 = "AGFzbQEAAAABNAhgAAF/YAR/f39/AGAHf39/f39/fwBgBH9+fn4BfmAEf39/fgF+YAN/f34BfmAAAGABfwADDg0AAQIDBAUFBQYHBgAGBQQBAQICBg4CfwFBwI4FC38AQcAJCwdwCAZtZW1vcnkCAA5IYXNoX0dldEJ1ZmZlcgAACUhhc2hfSW5pdAAIC0hhc2hfVXBkYXRlAAkKSGFzaF9GaW5hbAAKDUhhc2hfR2V0U3RhdGUACw5IYXNoX0NhbGN1bGF0ZQAMClNUQVRFX1NJWkUDAQr6QQ0FAEGACgvkAwMPfgF/AX4CQCADRQ0AIAApAzAhBCAAKQM4IQUgACkDICEGIAApAyghByAAKQMQIQggACkDGCEJIAApAwAhCiAAKQMIIQsDQCAFIAFBMGopAwAiDHwgAkE4aikDACABQThqKQMAIg2FIgVCIIggBUL/////D4N+fCEFIAcgAUEgaikDACIOfCACQShqKQMAIAFBKGopAwAiD4UiB0IgiCAHQv////8Pg358IQcgCSABQRBqKQMAIhB8IAJBGGopAwAgAUEYaikDACIRhSIJQiCIIAlC/////w+DfnwhCSALIAEpAwAiEnwgAkEIaiITKQMAIAFBCGopAwAiFIUiC0IgiCALQv////8Pg358IQsgAkEwaikDACAMhSIMQiCIIAxC/////w+DfiAEfCANfCEEIAJBIGopAwAgDoUiDEIgiCAMQv////8Pg34gBnwgD3whBiACQRBqKQMAIBCFIgxCIIggDEL/////D4N+IAh8IBF8IQggAikDACAShSIMQiCIIAxC/////w+DfiAKfCAUfCEKIAFBwABqIQEgEyECIANBf2oiAw0ACyAAIAk3AxggACAKNwMAIAAgCzcDCCAAIAc3AyggACAINwMQIAAgBTcDOCAAIAY3AyAgACAENwMwCwveAgIBfwF+AkAgBCACIAEoAgAiB2siAkkNACAAIAMgBSAHQQN0aiACEAEgACAFIAZqIgcpAwAgACkDACIIQi+IhSAIhUKx893xCX43AwAgACAHKQMIIAApAwgiCEIviIUgCIVCsfPd8Ql+NwMIIAAgBykDECAAKQMQIghCL4iFIAiFQrHz3fEJfjcDECAAIAcpAxggACkDGCIIQi+IhSAIhUKx893xCX43AxggACAHKQMgIAApAyAiCEIviIUgCIVCsfPd8Ql+NwMgIAAgBykDKCAAKQMoIghCL4iFIAiFQrHz3fEJfjcDKCAAIAcpAzAgACkDMCIIQi+IhSAIhUKx893xCX43AzAgACAHKQM4IAApAzgiCEIviIUgCIVCsfPd8Ql+NwM4IAAgAyACQQZ0aiAFIAQgAmsiBxABIAEgBzYCAA8LIAAgAyAFIAdBA3RqIAQQASABIAcgBGo2AgALhQEBAX8gAiABhSADpyIEQRh0IARBgP4DcUEIdHIgBEEIdkGA/gNxIARBGHZycq1CIIYgA4V9QQA1AoCMAUIghiAAQfyLAWo1AgCEhSIDQjGJIANCGImFIAOFQqW+4/TRjIfZn39+IgNCI4ggAK18IAOFQqW+4/TRjIfZn39+IgNCHIggA4ULZwAgAiABc60gA3wiA0IhiEEALQCAjAFBEHQgAEEIdHIgAEEBdkGAjAFqLQAAQRh0ciAAQf+LAWotAAByrYUgA4VCz9bTvtLHq9lCfiIDQh2IIAOFQvnz3fGZ9pmrFn4iA0IgiCADhQuJAwEEfgJAIABBCUkNAEEAKQOAjAEgASkDICABKQMYhSACfIUiA0I4hiADQoD+A4NCKIaEIANCgID8B4NCGIYgA0KAgID4D4NCCIaEhCADQgiIQoCAgPgPgyADQhiIQoCA/AeDhCADQiiIQoD+A4MgA0I4iISEhCAArXwgAEH4iwFqKQMAIAEpAzAgASkDKIUgAn2FIgJ8IAJC/////w+DIgQgA0IgiCIFfiIGQv////8PgyACQiCIIgIgA0L/////D4MiA358IAQgA34iA0IgiHwiBEIghiADQv////8Pg4QgBkIgiCACIAV+fCAEQiCIfIV8IgNCJYggA4VC+fPd8ZnymasWfiIDQiCIIAOFDwsCQCAAQQRJDQAgACABQQhqKQMAIAFBEGopAwAgAhADDwsCQCAARQ0AIAAgASgCACABQQRqKAIAIAIQBA8LIAEpAzggASkDQIUgAoUiA0IhiCADhULP1tO+0ser2UJ+IgNCHYggA4VC+fPd8Zn2masWfiIDQiCIIAOFC94IAQZ+IACtQoeVr6+Ytt6bnn9+IQMCQCAAQSFJDQACQCAAQcEASQ0AAkAgAEHhAEkNACABKQNoIAJ9QQApA7iMAYUiBEL/////D4MiBSABKQNgIAJ8QQApA7CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgA3wgASkDeCACfSAAQciLAWopAwCFIgNC/////w+DIgQgASkDcCACfCAAQcCLAWopAwCFIgVCIIgiBn4iB0L/////D4MgA0IgiCIDIAVC/////w+DIgV+fCAEIAV+IgRCIIh8IgVCIIYgBEL/////D4OEIAdCIIggAyAGfnwgBUIgiHyFfCEDCyABKQNIIAJ9QQApA6iMAYUiBEL/////D4MiBSABKQNAIAJ8QQApA6CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgA3wgASkDWCACfSAAQdiLAWopAwCFIgNC/////w+DIgQgASkDUCACfCAAQdCLAWopAwCFIgVCIIgiBn4iB0L/////D4MgA0IgiCIDIAVC/////w+DIgV+fCAEIAV+IgRCIIh8IgVCIIYgBEL/////D4OEIAdCIIggAyAGfnwgBUIgiHyFfCEDCyABKQMoIAJ9QQApA5iMAYUiBEL/////D4MiBSABKQMgIAJ8QQApA5CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgA3wgASkDOCACfSAAQeiLAWopAwCFIgNC/////w+DIgQgASkDMCACfCAAQeCLAWopAwCFIgVCIIgiBn4iB0L/////D4MgA0IgiCIDIAVC/////w+DIgV+fCAEIAV+IgRCIIh8IgVCIIYgBEL/////D4OEIAdCIIggAyAGfnwgBUIgiHyFfCEDCyABKQMIIAJ9QQApA4iMAYUiBEL/////D4MiBSABKQMAIAJ8QQApA4CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgA3wgASkDGCACfSAAQfiLAWopAwCFIgNC/////w+DIgQgASkDECACfCAAQfCLAWopAwCFIgJCIIgiBX4iBkL/////D4MgA0IgiCIDIAJC/////w+DIgJ+fCAEIAJ+IgJCIIh8IgRCIIYgAkL/////D4OEIAZCIIggAyAFfnwgBEIgiHyFfCICQiWIIAKFQvnz3fGZ8pmrFn4iAkIgiCAChQv8CgQBfwV+An8BfkEAIQMgASkDeCACfUEAKQP4jAGFIgRC/////w+DIgUgASkDcCACfEEAKQPwjAGFIgZCIIgiB34iCEL/////D4MgBEIgiCIEIAZC/////w+DIgZ+fCAFIAZ+IgVCIIh8IgZCIIYgBUL/////D4OEIAhCIIggBCAHfnwgBkIgiHyFIAEpA2ggAn1BACkD6IwBhSIEQv////8PgyIFIAEpA2AgAnxBACkD4IwBhSIGQiCIIgd+IghC/////w+DIARCIIgiBCAGQv////8PgyIGfnwgBSAGfiIFQiCIfCIGQiCGIAVC/////w+DhCAIQiCIIAQgB358IAZCIIh8hSABKQNYIAJ9QQApA9iMAYUiBEL/////D4MiBSABKQNQIAJ8QQApA9CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgASkDSCACfUEAKQPIjAGFIgRC/////w+DIgUgASkDQCACfEEAKQPAjAGFIgZCIIgiB34iCEL/////D4MgBEIgiCIEIAZC/////w+DIgZ+fCAFIAZ+IgVCIIh8IgZCIIYgBUL/////D4OEIAhCIIggBCAHfnwgBkIgiHyFIAEpAzggAn1BACkDuIwBhSIEQv////8PgyIFIAEpAzAgAnxBACkDsIwBhSIGQiCIIgd+IghC/////w+DIARCIIgiBCAGQv////8PgyIGfnwgBSAGfiIFQiCIfCIGQiCGIAVC/////w+DhCAIQiCIIAQgB358IAZCIIh8hSABKQMoIAJ9QQApA6iMAYUiBEL/////D4MiBSABKQMgIAJ8QQApA6CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgASkDGCACfUEAKQOYjAGFIgRC/////w+DIgUgASkDECACfEEAKQOQjAGFIgZCIIgiB34iCEL/////D4MgBEIgiCIEIAZC/////w+DIgZ+fCAFIAZ+IgVCIIh8IgZCIIYgBUL/////D4OEIAhCIIggBCAHfnwgBkIgiHyFIAEpAwggAn1BACkDiIwBhSIEQv////8PgyIFIAEpAwAgAnxBACkDgIwBhSIGQiCIIgd+IghC/////w+DIARCIIgiBCAGQv////8PgyIGfnwgBSAGfiIFQiCIfCIGQiCGIAVC/////w+DhCAIQiCIIAQgB358IAZCIIh8hSAArUKHla+vmLbem55/fnx8fHx8fHx8IgRCJYggBIVC+fPd8ZnymasWfiIEQiCIIASFIQQCQCAAQZABSA0AIABBBHZBeGohCQNAIAEgA2oiCkELaikDACACfSADQYiNAWopAwCFIgVC/////w+DIgYgCkEDaikDACACfCADQYCNAWopAwCFIgdCIIgiCH4iC0L/////D4MgBUIgiCIFIAdC/////w+DIgd+fCAGIAd+IgZCIIh8IgdCIIYgBkL/////D4OEIAtCIIggBSAIfnwgB0IgiHyFIAR8IQQgA0EQaiEDIAlBf2oiCQ0ACwsgASkDfyACfSAAQfiLAWopAwCFIgVC/////w+DIgYgASkDdyACfCAAQfCLAWopAwCFIgJCIIgiB34iCEL/////D4MgBUIgiCIFIAJC/////w+DIgJ+fCAGIAJ+IgJCIIh8IgZCIIYgAkL/////D4OEIAhCIIggBSAHfnwgBkIgiHyFIAR8IgJCJYggAoVC+fPd8ZnymasWfiICQiCIIAKFC98FAgF+AX8CQAJAQQApA4AKIgBQRQ0AQYAIIQFCACEADAELAkBBACkDoI4BIABSDQBBACEBDAELQQAhAUEAQq+v79e895Kg/gAgAH03A/iLAUEAIABCxZbr+djShYIofDcD8IsBQQBCj/Hjja2P9JhOIAB9NwPoiwFBACAAQqus+MXV79HQfHw3A+CLAUEAQtOt1LKShbW0nn8gAH03A9iLAUEAIABCl5r0jvWWvO3JAHw3A9CLAUEAQsWDgv2v/8SxayAAfTcDyIsBQQAgAELqi7OdyOb09UN8NwPAiwFBAELIv/rLnJveueQAIAB9NwO4iwFBACAAQoqjgd/Ume2sMXw3A7CLAUEAQvm57738+MKnHSAA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QQApA4CKATcDACACQQApA4iKATcDCCACQQApA5CKATcDECACQQApA5iKATcDGCACQQApA6CKATcDICACQQApA6iKATcDKCACQQApA7CKASIFNwMwIAJBACkDuIoBIgY3AzgCQAJAQQAoAoCOASIHQcAASQ0AIAJBACgCiI4BNgJAIAIgAkHAAGpBACgCmI4BQYCMASAHQX9qQQZ2IANBACgCnI4BIgAQAiADIABqIgBBeWopAwAhCCAAKQMJIQkgACkDGSEKIAApAykhCyAHQcCLAWopAwAhBSAAKQMBIQwgB0HIiwFqKQMAIQYgB0HQiwFqKQMAIQ0gACkDESEOIAdB2IsBaikDACEPIAdB4IsBaikDACEQIAApAyEhESAHQeiLAWopAwAhEiACKQMAIRMgAikDECEUIAIpAyAhFSACKQMwIRYgAikDCCEXIAIpAxghGCACKQMoIRkgAiACKQM4IAdB8IsBaikDACIafCAAKQMxIAdB+IsBaikDACIbhSIcQiCIIBxC/////w+Dfnw3AzggGSAQfCARIBKFIhFCIIggEUL/////D4N+fCERIBggDXwgDiAPhSIOQiCIIA5C/////w+DfnwhDiAXIAV8IAwgBoUiDEIgiCAMQv////8Pg358IQwgGyAWIAsgGoUiC0IgiCALQv////8Pg358fCELIBIgFSAKIBCFIhBCIIggEEL/////D4N+fHwhECAPIBQgCSANhSINQiCIIA1C/////w+Dfnx8IRIgBiATIAggBYUiBUIgiCAFQv////8Pg358fCEIDAELIAdBwI0BaiEdQcAAIAdrIR4gAkHAAGohAAJAAkACQCAHQThNDQAgHiEfDAELAkACQEE4IAdrQQN2QQFqQQdxIh8NACACQcAAaiEAIB4hHwwBCyACQcAAaiEAIB9BA3QiICEfA0AgACAdKQMANwMAIABBCGohACAdQQhqIR0gH0F4aiIfDQALQcAAIAcgIGprIR8LAkAgBw0AA0AgACAdKQMANwMAIABBCGogHUEIaikDADcDACAAQRBqIB1BEGopAwA3AwAgAEEYaiAdQRhqKQMANwMAIABBIGogHUEgaikDADcDACAAQShqIB1BKGopAwA3AwAgAEEwaiAdQTBqKQMANwMAIABBOGogHUE4aikDADcDACAAQcAAaiEAIB1BwABqIR0gH0FAaiIfQQdLDQALCyAfRQ0BCyAfQX9qISECQCAfQQdxIiBFDQAgH0F4cSEfA0AgACAdLQAAOgAAIABBAWohACAdQQFqIR0gIEF/aiIgDQALCyAhQQdJDQADQCAAIB0pAAA3AAAgAEEIaiEAIB1BCGohHSAfQXhqIh8NAAsLIAJBwABqIB5qIR1BgIwBIQACQAJAAkAgB0EISQ0AAkAgB0E4akEDdkEBakEHcSIfDQAMAgsgH0EDdCEgQYCMASEAA0AgHSAAKQMANwMAIB1BCGohHSAAQQhqIQAgH0F/aiIfDQALIAcgIGshBwsgB0UNAQJAAkAgB0EHcSIgDQAgByEfDAELIAdBeHEhHwNAIB0gAC0AADoAACAdQQFqIR0gAEEBaiEAICBBf2oiIA0ACwsgB0EISQ0BCwNAIB0gACkAADcAACAdQQhqIR0gAEEIaiEAIB9BeGoiHw0ACwsgA0EAKAKcjgFqIgBBeWopAwAhCiAAKQMJIRMgACkDGSEUIAApAykhCyAAKQMBIQwgACkDESEOIAApAyEhESACKQMAIRUgAikDECEWIAIpAyAhFyACKQMIIRggAikDQCENIAIpA0ghDyACKQMYIRkgAikDUCESIAIpA1ghCCACKQMoIRogAikDYCEQIAIpA2ghCSACIAYgAikDcCIbfCAAKQMxIAIpA3giBoUiHEIgiCAcQv////8Pg358NwM4IBogEHwgESAJhSIRQiCIIBFC/////w+DfnwhESAZIBJ8IA4gCIUiDkIgiCAOQv////8Pg358IQ4gGCANfCAMIA+FIgxCIIggDEL/////D4N+fCEMIAYgCyAbhSILQiCIIAtC/////w+DfiAFfHwhCyAJIBcgFCAQhSIFQiCIIAVC/////w+Dfnx8IRAgCCAWIBMgEoUiBUIgiCAFQv////8Pg358fCESIA8gFSAKIA2FIgVCIIggBUL/////D4N+fHwhCAsgAykDQyACKQM4hSIFQv////8PgyIGIAMpAzsgC4UiC0IgiCINfiIPQv////8PgyAFQiCIIgUgC0L/////D4MiC358IAYgC34iBkIgiHwiC0IghiAGQv////8Pg4QgD0IgiCAFIA1+fCALQiCIfIUgAykDMyARhSIFQv////8PgyIGIAMpAysgEIUiC0IgiCINfiIPQv////8PgyAFQiCIIgUgC0L/////D4MiC358IAYgC34iBkIgiHwiC0IghiAGQv////8Pg4QgD0IgiCAFIA1+fCALQiCIfIUgAykDIyAOhSIFQv////8PgyIGIAMpAxsgEoUiC0IgiCINfiIPQv////8PgyAFQiCIIgUgC0L/////D4MiC358IAYgC34iBkIgiHwiC0IghiAGQv////8Pg4QgD0IgiCAFIA1+fCALQiCIfIUgAykDEyAMhSIFQv////8PgyIGIAMpAwsgCIUiC0IgiCINfiIPQv////8PgyAFQiCIIgUgC0L/////D4MiC358IAYgC34iBkIgiHwiC0IghiAGQv////8Pg4QgD0IgiCAFIA1+fCALQiCIfIUgBEKHla+vmLbem55/fnx8fHwiBEIliCAEhUL5893xmfKZqxZ+IgRCIIggBIUhBAwBCyAEpyEAAkBBACkDoI4BIgRQDQACQCAAQRBLDQAgAEGACCAEEAUhBAwCCwJAIABBgAFLDQAgAEGACCAEEAYhBAwCCyAAQYAIIAQQByEEDAELAkAgAEEQSw0AIAAgA0IAEAUhBAwBCwJAIABBgAFLDQAgACADQgAQBiEEDAELIAAgA0IAEAchBAtBACAEQjiGIARCgP4Dg0IohoQgBEKAgPwHg0IYhiAEQoCAgPgPg0IIhoSEIARCCIhCgICA+A+DIARCGIhCgID8B4OEIARCKIhCgP4DgyAEQjiIhISENwOACiABJAALBgBBgIoBCwIACwvMAQEAQYAIC8QBuP5sOSOkS758AYEs9yGtHN7UbemDkJfbckCkpLezZx/LeeZOzMDleIJa0H3M/3IhuAhGdPdDJI7gNZDmgTomTDwoUruRwwDLiNBlixtTLqNxZEiXog35TjgZ70ap3qzYqPp2P+OcND/53LvHxwtPHYpR4EvNtFkxyJ9+ydl4c2TqxayDNNPrw8WBoP/6E2PrFw3dUbfw2knTFlUmKdRonisWvlh9R6H8j/i40XrQMc5FyzqPlRYEKK/X+8q7S0B+QAIAAA==";
    hash$6 = "5a2fbdbb";
    wasmJson$6 = {
      name: name$6,
      data: data$6,
      hash: hash$6
    };
    mutex$4 = new Mutex();
    wasmCache$4 = null;
    seedBuffer$1 = new Uint8Array(8);
    name$5 = "xxhash128";
    data$5 = "AGFzbQEAAAABKwdgAAF/YAR/f39/AGAHf39/f39/fwBgA39/fgF+YAR/f39+AGAAAGABfwADDQwAAQIDBAQEBQYFAAUFBAEBAgIGDgJ/AUHAjgULfwBBwAkLB3AIBm1lbW9yeQIADkhhc2hfR2V0QnVmZmVyAAAJSGFzaF9Jbml0AAcLSGFzaF9VcGRhdGUACApIYXNoX0ZpbmFsAAkNSGFzaF9HZXRTdGF0ZQAKDkhhc2hfQ2FsY3VsYXRlAAsKU1RBVEVfU0laRQMBCqBNDAUAQYAKC+QDAw9+AX8BfgJAIANFDQAgACkDMCEEIAApAzghBSAAKQMgIQYgACkDKCEHIAApAxAhCCAAKQMYIQkgACkDACEKIAApAwghCwNAIAUgAUEwaikDACIMfCACQThqKQMAIAFBOGopAwAiDYUiBUIgiCAFQv////8Pg358IQUgByABQSBqKQMAIg58IAJBKGopAwAgAUEoaikDACIPhSIHQiCIIAdC/////w+DfnwhByAJIAFBEGopAwAiEHwgAkEYaikDACABQRhqKQMAIhGFIglCIIggCUL/////D4N+fCEJIAsgASkDACISfCACQQhqIhMpAwAgAUEIaikDACIUhSILQiCIIAtC/////w+DfnwhCyACQTBqKQMAIAyFIgxCIIggDEL/////D4N+IAR8IA18IQQgAkEgaikDACAOhSIMQiCIIAxC/////w+DfiAGfCAPfCEGIAJBEGopAwAgEIUiDEIgiCAMQv////8Pg34gCHwgEXwhCCACKQMAIBKFIgxCIIggDEL/////D4N+IAp8IBR8IQogAUHAAGohASATIQIgA0F/aiIDDQALIAAgCTcDGCAAIAo3AwAgACALNwMIIAAgBzcDKCAAIAg3AxAgACAFNwM4IAAgBjcDICAAIAQ3AzALC94CAgF/AX4CQCAEIAIgASgCACIHayICSQ0AIAAgAyAFIAdBA3RqIAIQASAAIAUgBmoiBykDACAAKQMAIghCL4iFIAiFQrHz3fEJfjcDACAAIAcpAwggACkDCCIIQi+IhSAIhUKx893xCX43AwggACAHKQMQIAApAxAiCEIviIUgCIVCsfPd8Ql+NwMQIAAgBykDGCAAKQMYIghCL4iFIAiFQrHz3fEJfjcDGCAAIAcpAyAgACkDICIIQi+IhSAIhUKx893xCX43AyAgACAHKQMoIAApAygiCEIviIUgCIVCsfPd8Ql+NwMoIAAgBykDMCAAKQMwIghCL4iFIAiFQrHz3fEJfjcDMCAAIAcpAzggACkDOCIIQi+IhSAIhUKx893xCX43AzggACADIAJBBnRqIAUgBCACayIHEAEgASAHNgIADwsgACADIAUgB0EDdGogBBABIAEgByAEajYCAAvtAwEFfiABKQM4IAApAziFIgNC/////w+DIgQgASkDMCAAKQMwhSIFQiCIIgZ+IgdC/////w+DIANCIIgiAyAFQv////8PgyIFfnwgBCAFfiIEQiCIfCIFQiCGIARC/////w+DhCAHQiCIIAMgBn58IAVCIIh8hSABKQMoIAApAyiFIgNC/////w+DIgQgASkDICAAKQMghSIFQiCIIgZ+IgdC/////w+DIANCIIgiAyAFQv////8PgyIFfnwgBCAFfiIEQiCIfCIFQiCGIARC/////w+DhCAHQiCIIAMgBn58IAVCIIh8hSABKQMYIAApAxiFIgNC/////w+DIgQgASkDECAAKQMQhSIFQiCIIgZ+IgdC/////w+DIANCIIgiAyAFQv////8PgyIFfnwgBCAFfiIEQiCIfCIFQiCGIARC/////w+DhCAHQiCIIAMgBn58IAVCIIh8hSABKQMIIAApAwiFIgNC/////w+DIgQgASkDACAAKQMAhSIFQiCIIgZ+IgdC/////w+DIANCIIgiAyAFQv////8PgyIFfnwgBCAFfiIEQiCIfCIFQiCGIARC/////w+DhCAHQiCIIAMgBn58IAVCIIh8hSACfHx8fCICQiWIIAKFQvnz3fGZ8pmrFn4iAkIgiCAChQu6CAIFfgN/AkAgAUEJSQ0AIAAgAUH4iwFqKQMAIgQgAikDOCACKQMwhSADfIUiBUL/////D4NC95Svrwh+IAVCgICAgHCDfEEAKQOAjAEgAikDKCACKQMghSADfYUgBIUiA0IgiCIEQrHz3fEJfnwgBEKHla+vCH4iBEIgiHwgBEL/////D4MgA0L/////D4MiA0Kx893xCX58IANCh5Wvrwh+IgRCIIh8IgVCIIh8IgNCOIYgA0KA/gODQiiGhCADQoCA/AeDQhiGIANCgICA+A+DQgiGhIQgA0IIiEKAgID4D4MgA0IYiEKAgPwHg4QgA0IoiEKA/gODIANCOIiEhIQgBEL/////D4MgAUF/aq1CNoaEIAVCIIZ8hSIEQiCIIgVCz9bTvgJ+IgZC/////w+DIARC/////w+DIgRCvdzKlQx+fCAEQs/W074CfiIEQiCIfCIHQiCGIghCJYggCCAEQv////8Pg4SFQvnz3fGZ8pmrFn4iBEIgiCAEhTcDACAAIAVCvdzKlQx+IANCz9bTvtLHq9lCfnwgBkIgiHwgB0IgiHwiA0IliCADhUL5893xmfKZqxZ+IgNCIIggA4U3AwgPCwJAIAFBBEkNACAAIAIpAxggAikDEIUgA6ciAkEYdCACQYD+A3FBCHRyIAJBCHZBgP4DcSACQRh2cnKtQiCGIAOFfCABQfyLAWo1AgBCIIZBADUCgIwBhIUiA0IgiCIEIAFBAnRBh5Wvr3hqrSIFfiIGQiCIIARCsfPd8Ql+fCAGQv////8PgyADQv////8PgyIDQrHz3fEJfnwgAyAFfiIDQiCIfCIEQiCIfCAEQiCGIANC/////w+DhCIEQgGGfCIDQiWIIAOFQvnz3fGZ8pmrFn4iBUIgiCAFhTcDCCAAIANCA4ggBIUiA0IjiCADhUKlvuP00YyH2Z9/fiIDQhyIIAOFNwMADwsCQCABRQ0AIAAgAigCBCACKAIAc60gA3wiBEIhiEEALQCAjAFBEHQgAUEIdHIiCSABQQF2QYCMAWotAABBGHRyIgogAUH/iwFqLQAAIgFyIguthSAEhULP1tO+0ser2UJ+IgRCHYggBIVC+fPd8Zn2masWfiIEQiCIIASFNwMAIAAgAigCDCACKAIIc60gA30iA0IhiCABQRh0IAtBgP4DcUEIdHIgCUEIdkGA/gNxIApBGHZyckENd62FIAOFQs/W077Sx6vZQn4iA0IdiCADhUL5893xmfaZqxZ+IgNCIIggA4U3AwgPCyAAIAIpA1AgAikDWIUgA4UiBEIhiCAEhULP1tO+0ser2UJ+IgRCHYggBIVC+fPd8Zn2masWfiIEQiCIIASFNwMIIAAgAikDQCACKQNIhSADhSIDQiGIIAOFQs/W077Sx6vZQn4iA0IdiCADhUL5893xmfaZqxZ+IgNCIIggA4U3AwALwwoBCn4gAa0iBEKHla+vmLbem55/fiEFAkACQCABQSFPDQBCACEGDAELQgAhBwJAIAFBwQBJDQBCACEHAkAgAUHhAEkNACACQfgAaikDACADfSABQciLAWopAwAiCIUiB0L/////D4MiCSACKQNwIAN8IAFBwIsBaikDACIKhSILQiCIIgx+Ig1CIIggB0IgiCIHIAx+fCANQv////8PgyAHIAtC/////w+DIgt+fCAJIAt+IgdCIIh8IglCIIh8QQApA7iMASILQQApA7CMASIMfIUgCUIghiAHQv////8Pg4SFIQcgAkHoAGopAwAgA30gC4UiCUL/////D4MiCyACKQNgIAN8IAyFIgxCIIgiDX4iBkL/////D4MgCUIgiCIJIAxC/////w+DIgx+fCALIAx+IgtCIIh8IgxCIIYgC0L/////D4OEIAZCIIggCSANfnwgDEIgiHyFIAV8IAggCnyFIQULIAJB2ABqKQMAIAN9IAFB2IsBaikDACIIhSIJQv////8PgyIKIAIpA1AgA3wgAUHQiwFqKQMAIguFIgxCIIgiDX4iBkL/////D4MgCUIgiCIJIAxC/////w+DIgx+fCAKIAx+IgpCIIh8IgxCIIYgCkL/////D4OEIAZCIIggCSANfnwgDEIgiHyFIAd8QQApA6iMASIJQQApA6CMASIKfIUhByACQcgAaikDACADfSAJhSIJQv////8PgyIMIAIpA0AgA3wgCoUiCkIgiCINfiIGQv////8PgyAJQiCIIgkgCkL/////D4MiCn58IAwgCn4iCkIgiHwiDEIghiAKQv////8Pg4QgBkIgiCAJIA1+fCAMQiCIfIUgBXwgCCALfIUhBQsgAkE4aikDACADfSABQeiLAWopAwAiCIUiCUL/////D4MiCiACKQMwIAN8IAFB4IsBaikDACILhSIMQiCIIg1+IgZC/////w+DIAlCIIgiCSAMQv////8PgyIMfnwgCiAMfiIKQiCIfCIMQiCGIApC/////w+DhCAGQiCIIAkgDX58IAxCIIh8hSAHfEEAKQOYjAEiB0EAKQOQjAEiCXyFIQYgAkEoaikDACADfSAHhSIHQv////8PgyIKIAIpAyAgA3wgCYUiCUIgiCIMfiINQv////8PgyAHQiCIIgcgCUL/////D4MiCX58IAogCX4iCUIgiHwiCkIghiAJQv////8Pg4QgDUIgiCAHIAx+fCAKQiCIfIUgBXwgCCALfIUhBQsgACACQRhqKQMAIAN9IAFB+IsBaikDACIHhSIIQv////8PgyIJIAIpAxAgA3wgAUHwiwFqKQMAIgqFIgtCIIgiDH4iDUL/////D4MgCEIgiCIIIAtC/////w+DIgt+fCAJIAt+IglCIIh8IgtCIIYgCUL/////D4OEIA1CIIggCCAMfnwgC0IgiHyFIAZ8QQApA4iMASIIQQApA4CMASIJfIUiCyACQQhqKQMAIAN9IAiFIghC/////w+DIgwgAikDACADfCAJhSIJQiCIIg1+IgZC/////w+DIAhCIIgiCCAJQv////8PgyIJfnwgDCAJfiIJQiCIfCIMQiCGIAlC/////w+DhCAGQiCIIAggDX58IAxCIIh8hSAFfCAHIAp8hSIFfCIHQiWIIAeFQvnz3fGZ8pmrFn4iB0IgiCAHhTcDACAAQgAgBUKHla+vmLbem55/fiAEIAN9Qs/W077Sx6vZQn58IAtC49zKlfzO8vWFf358IgNCJYggA4VC+fPd8ZnymasWfiIDQiCIIAOFfTcDCAuhDwMBfxR+An9BACEEIAJB+ABqKQMAIAN9QQApA/iMASIFhSIGQv////8PgyIHIAIpA3AgA3xBACkD8IwBIgiFIglCIIgiCn4iC0L/////D4MgBkIgiCIGIAlC/////w+DIgl+fCAHIAl+IgdCIIh8IglCIIYgB0L/////D4OEIAtCIIggBiAKfnwgCUIgiHyFIAJB2ABqKQMAIAN9QQApA9iMASIHhSIGQv////8PgyIJIAIpA1AgA3xBACkD0IwBIgqFIgtCIIgiDH4iDUL/////D4MgBkIgiCIGIAtC/////w+DIgt+fCAJIAt+IglCIIh8IgtCIIYgCUL/////D4OEIA1CIIggBiAMfnwgC0IgiHyFIAJBOGopAwAgA31BACkDuIwBIgmFIgZC/////w+DIgsgAikDMCADfEEAKQOwjAEiDIUiDUIgiCIOfiIPQv////8PgyAGQiCIIgYgDUL/////D4MiDX58IAsgDX4iC0IgiHwiDUIghiALQv////8Pg4QgD0IgiCAGIA5+fCANQiCIfIUgAkEYaikDACADfUEAKQOYjAEiC4UiBkL/////D4MiDSACKQMQIAN8QQApA5CMASIOhSIPQiCIIhB+IhFC/////w+DIAZCIIgiBiAPQv////8PgyIPfnwgDSAPfiINQiCIfCIPQiCGIA1C/////w+DhCARQiCIIAYgEH58IA9CIIh8hUEAKQOIjAEiDUEAKQOAjAEiD3yFfEEAKQOojAEiEEEAKQOgjAEiEXyFfEEAKQPIjAEiEkEAKQPAjAEiE3yFfEEAKQPojAEiFEEAKQPgjAEiFXyFIgZCJYggBoVC+fPd8ZnymasWfiIGQiCIIAaFIQYgAkHoAGopAwAgA30gFIUiFEL/////D4MiFiACKQNgIAN8IBWFIhVCIIgiF34iGEL/////D4MgFEIgiCIUIBVC/////w+DIhV+fCAWIBV+IhVCIIh8IhZCIIYgFUL/////D4OEIBhCIIggFCAXfnwgFkIgiHyFIAJByABqKQMAIAN9IBKFIhJC/////w+DIhQgAikDQCADfCAThSITQiCIIhV+IhZC/////w+DIBJCIIgiEiATQv////8PgyITfnwgFCATfiITQiCIfCIUQiCGIBNC/////w+DhCAWQiCIIBIgFX58IBRCIIh8hSACQShqKQMAIAN9IBCFIhBC/////w+DIhIgAikDICADfCARhSIRQiCIIhN+IhRC/////w+DIBBCIIgiECARQv////8PgyIRfnwgEiARfiIRQiCIfCISQiCGIBFC/////w+DhCAUQiCIIBAgE358IBJCIIh8hSACQQhqKQMAIAN9IA2FIg1C/////w+DIhAgAikDACADfCAPhSIPQiCIIhF+IhJC/////w+DIA1CIIgiDSAPQv////8PgyIPfnwgECAPfiIPQiCIfCIQQiCGIA9C/////w+DhCASQiCIIA0gEX58IBBCIIh8hSABrSIPQoeVr6+Ytt6bnn9+fCALIA58hXwgCSAMfIV8IAcgCnyFfCAFIAh8hSIFQiWIIAWFQvnz3fGZ8pmrFn4iBUIgiCAFhSEFAkAgAUGgAUgNACABQQV2QXxqIRkDQCACIARqIhpBG2opAwAgA30gBEGYjQFqKQMAIgeFIghC/////w+DIgkgGkETaikDACADfCAEQZCNAWopAwAiCoUiC0IgiCIMfiINQv////8PgyAIQiCIIgggC0L/////D4MiC358IAkgC34iCUIgiHwiC0IghiAJQv////8Pg4QgDUIgiCAIIAx+fCALQiCIfIUgBnwgBEGIjQFqKQMAIgggBEGAjQFqKQMAIgl8hSEGIBpBC2opAwAgA30gCIUiCEL/////D4MiCyAaQQNqKQMAIAN8IAmFIglCIIgiDH4iDUL/////D4MgCEIgiCIIIAlC/////w+DIgl+fCALIAl+IglCIIh8IgtCIIYgCUL/////D4OEIA1CIIggCCAMfnwgC0IgiHyFIAV8IAcgCnyFIQUgBEEgaiEEIBlBf2oiGQ0ACwsgACACQf8AaikDACADfCABQeiLAWopAwAiB4UiCEL/////D4MiCSACKQN3IAN9IAFB4IsBaikDACIKhSILQiCIIgx+Ig1C/////w+DIAhCIIgiCCALQv////8PgyILfnwgCSALfiIJQiCIfCILQiCGIAlC/////w+DhCANQiCIIAggDH58IAtCIIh8hSAGfCABQfiLAWopAwAiBiABQfCLAWopAwAiCHyFIgkgAkHvAGopAwAgA3wgBoUiBkL/////D4MiCyACKQNnIAN9IAiFIghCIIgiDH4iDUL/////D4MgBkIgiCIGIAhC/////w+DIgh+fCALIAh+IghCIIh8IgtCIIYgCEL/////D4OEIA1CIIggBiAMfnwgC0IgiHyFIAV8IAcgCnyFIgZ8IgVCJYggBYVC+fPd8ZnymasWfiIFQiCIIAWFNwMAIABCACAGQoeVr6+Ytt6bnn9+IA8gA31Cz9bTvtLHq9lCfnwgCULj3MqV/M7y9YV/fnwiA0IliCADhUL5893xmfKZqxZ+IgNCIIggA4V9NwMIC98FAgF+AX8CQAJAQQApA4AKIgBQRQ0AQYAIIQFCACEADAELAkBBACkDoI4BIABSDQBBACEBDAELQQAhAUEAQq+v79e895Kg/gAgAH03A/iLAUEAIABCxZbr+djShYIofDcD8IsBQQBCj/Hjja2P9JhOIAB9NwPoiwFBACAAQqus+MXV79HQfHw3A+CLAUEAQtOt1LKShbW0nn8gAH03A9iLAUEAIABCl5r0jvWWvO3JAHw3A9CLAUEAQsWDgv2v/8SxayAAfTcDyIsBQQAgAELqi7OdyOb09UN8NwPAiwFBAELIv/rLnJveueQAIAB9NwO4iwFBACAAQoqjgd/Ume2sMXw3A7CLAUEAQvm57738+MKnHSAAfTcDqIsBQQAgAEKo9dv7s5ynmj98NwOgiwFBAEK4sry3lNW31lggAH03A5iLAUEAIABC8cihuqm0w/zOAHw3A5CLAUEAQoihl9u445SXo38gAH03A4iL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AkHAAGogDGohC0GAjAEhAAJAAkACQCAHQQhJDQACQCAHQThqQQN2QQFqQQdxIg0NAAwCCyANQQN0IQ5BgIwBIQADQCALIAApAwA3AwAgC0EIaiELIABBCGohACANQX9qIg0NAAsgByAOayEHCyAHRQ0BAkACQCAHQQdxIg4NACAHIQ0MAQsgB0F4cSENA0AgCyAALQAAOgAAIAtBAWohCyAAQQFqIQAgDkF/aiIODQALCyAHQQhJDQELA0AgCyAAKQAANwAAIAtBCGohCyAAQQhqIQAgDUF4aiINDQALCyACIAIpAwggAikDQCIIfCADQQAoApyOAWoiACkDASACKQNIIgmFIgpCIIggCkL/////D4N+fDcDCCACIAIpAxggAikDUCIKfCAAKQMRIAIpA1giEIUiEUIgiCARQv////8Pg358NwMYIAIgECAKIAApAwmFIgpCIIggCkL/////D4N+IAIpAxB8fDcDECACIAkgCCAAQXlqKQMAhSIIQiCIIAhC/////w+DfiACKQMAfHw3AwAgACkDGSEIIAIpAyAhCSACIAIpAyggAikDYCIKfCAAKQMhIAIpA2giEIUiEUIgiCARQv////8Pg358NwMoIAIgECAJIAggCoUiCEIgiCAIQv////8Pg358fDcDICACIAYgAikDcCIIfCAAKQMxIAIpA3giBoUiCUIgiCAJQv////8Pg358NwM4IAIgBiAIIAApAymFIghCIIggCEL/////D4N+IAV8fDcDMAsgAiACIANBC2ogBEKHla+vmLbem55/fhADNwNAIAIgAiADQQAoApyOAWpBdWogBELP1tO+0ser2UJ+Qn+FEAM3A0gMAQsgBKchAAJAQQApA6COASIEUA0AAkAgAEEQSw0AIAJBwABqIABBgAggBBAEDAILAkAgAEGAAUsNACACQcAAaiAAQYAIIAQQBQwCCyACQcAAaiAAQYAIIAQQBgwBCwJAIABBEEsNACACQcAAaiAAIANCABAEDAELAkAgAEGAAUsNACACQcAAaiAAIANCABAFDAELIAJBwABqIAAgA0IAEAYLQQAgAikDcDcDuApBACACKQNgNwOoCkEAIAIpA1A3A5gKQQAgAkH4AGopAwA3A8AKQQAgAkHoAGopAwA3A7AKQQAgAkHYAGopAwA3A6AKQQAgAikDSCIEQjiGIARCgP4Dg0IohoQgBEKAgPwHg0IYhiAEQoCAgPgPg0IIhoSEIARCCIhCgICA+A+DIARCGIhCgID8B4OEIARCKIhCgP4DgyAEQjiIhISEIgQ3A4AKQQAgBDcDkApBACACKQNAIgRCOIYgBEKA/gODQiiGhCAEQoCA/AeDQhiGIARCgICA+A+DQgiGhIQgBEIIiEKAgID4D4MgBEIYiEKAgPwHg4QgBEIoiEKA/gODIARCOIiEhIQ3A4gKIAEkAAsGAEGAigELAgALC8wBAQBBgAgLxAG4/mw5I6RLvnwBgSz3Ia0c3tRt6YOQl9tyQKSkt7NnH8t55k7MwOV4glrQfcz/ciG4CEZ090MkjuA1kOaBOiZMPChSu5HDAMuI0GWLG1Muo3FkSJeiDflOOBnvRqnerNio+nY/45w0P/ncu8fHC08dilHgS820WTHIn37J2XhzZOrFrIM00+vDxYGg//oTY+sXDd1Rt/DaSdMWVSYp1GieKxa+WH1HofyP+LjRetAxzkXLOo+VFgQor9f7yrtLQH5AAgAA";
    hash$5 = "b9ab74e2";
    wasmJson$5 = {
      name: name$5,
      data: data$5,
      hash: hash$5
    };
    mutex$3 = new Mutex();
    wasmCache$3 = null;
    seedBuffer = new Uint8Array(8);
    name$4 = "ripemd160";
    data$4 = "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";
    hash$4 = "6abbce74";
    wasmJson$4 = {
      name: name$4,
      data: data$4,
      hash: hash$4
    };
    mutex$2 = new Mutex();
    wasmCache$2 = null;
    validateOptions$2 = (options) => {
      if (!options || typeof options !== "object") {
        throw new Error("Invalid options parameter. It requires an object.");
      }
      if (!options.hashFunction || !options.hashFunction.then) {
        throw new Error('Invalid hash function is provided! Usage: pbkdf2("password", "salt", 1000, 32, createSHA1()).');
      }
      if (!Number.isInteger(options.iterations) || options.iterations < 1) {
        throw new Error("Iterations should be a positive number");
      }
      if (!Number.isInteger(options.hashLength) || options.hashLength < 1) {
        throw new Error("Hash length should be a positive number");
      }
      if (options.outputType === void 0) {
        options.outputType = "hex";
      }
      if (![
        "hex",
        "binary"
      ].includes(options.outputType)) {
        throw new Error(`Insupported output type ${options.outputType}. Valid values: ['hex', 'binary']`);
      }
    };
    name$3 = "scrypt";
    data$3 = "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cyICajYCOCAAIAAoAjwgAiAKakESdyAGc2o2AjwLvxIDFX8Bfg5/AkAgAkUNACAAQQd0IgNBQGoiBEEAKAKACCIFIAMgAmwiBmogAyABbGoiByADaiIIaiEJIAAgAkEHdCIKIAFBB3RqIgtsIQwgACALQYABamwhDSAAQQV0IgtBASALQQFLGyILQWBxIQ4gC0EBcSEPIAdBeGohECAHQXBqIREgB0FoaiESIAdBYGohEyAHQVhqIRQgB0FQaiEVIAdBSGohFiAHQUBqIRcgAa1Cf3whGCAEIAdqIRkgByAAQQh0IhpqIRsgACAKQYABamwhHCALQQRJIR1BACEeQQAhHwNAQQAoAoAIIiAgAyAfbGohIQJAIABFDQBBACEiAkAgHQ0AICAgHmohI0EAIQtBACEiA0AgByALaiIEICMgC2oiJCgCADYCACAEQQRqICRBBGooAgA2AgAgBEEIaiAkQQhqKAIANgIAIARBDGogJEEMaigCADYCACALQRBqIQsgDiAiQQRqIiJHDQALCyAPRQ0AIAcgIkECdCILaiAhIAtqKAIANgIACwJAIAFFDQBBACElIBwhIyAGISYDQCAFISQgACEiAkACQCAADQAgGyAXKQMANwMAIBsgFikDADcDCCAbIBUpAwA3AxAgGyAUKQMANwMYIBsgEykDADcDICAbIBIpAwA3AyggGyARKQMANwMwIBsgECkDADcDOAwBCwNAICQgJmoiCyAkIAxqIgQpAwA3AwAgC0EIaiAEQQhqKQMANwMAIAtBEGogBEEQaikDADcDACALQRhqIARBGGopAwA3AwAgC0EgaiAEQSBqKQMANwMAIAtBKGogBEEoaikDADcDACALQTBqIARBMGopAwA3AwAgC0E4aiAEQThqKQMANwMAIAtBwABqIARBwABqKQMANwMAIAtByABqIARByABqKQMANwMAIAtB0ABqIARB0ABqKQMANwMAIAtB2ABqIARB2ABqKQMANwMAIAtB4ABqIARB4ABqKQMANwMAIAtB6ABqIARB6ABqKQMANwMAIAtB8ABqIARB8ABqKQMANwMAIAtB+ABqIARB+ABqKQMANwMAICRBgAFqISQgIkF/aiIiDQALIAcgCCAbIAAQAiAFISQgACEiA0AgJCAjaiILICQgDWoiBCkDADcDACALQQhqIARBCGopAwA3AwAgC0EQaiAEQRBqKQMANwMAIAtBGGogBEEYaikDADcDACALQSBqIARBIGopAwA3AwAgC0EoaiAEQShqKQMANwMAIAtBMGogBEEwaikDADcDACALQThqIARBOGopAwA3AwAgC0HAAGogBEHAAGopAwA3AwAgC0HIAGogBEHIAGopAwA3AwAgC0HQAGogBEHQAGopAwA3AwAgC0HYAGogBEHYAGopAwA3AwAgC0HgAGogBEHgAGopAwA3AwAgC0HoAGogBEHoAGopAwA3AwAgC0HwAGogBEHwAGopAwA3AwAgC0H4AGogBEH4AGopAwA3AwAgJEGAAWohJCAiQX9qIiINAAsLIAggByAbIAAQAiAjIBpqISMgJiAaaiEmICVBAmoiJSABSQ0AC0EAISUDQAJAAkAgAA0AIBsgFykDADcDACAbIBYpAwA3AwggGyAVKQMANwMQIBsgFCkDADcDGCAbIBMpAwA3AyAgGyASKQMANwMoIBsgESkDADcDMCAbIBApAwA3AzgMAQsgACAKIBkpAgAgGIOnQQd0amwhJiAFISQgACEiA0AgJCAMaiILIAspAwAgJCAmaiIEKQMAhTcDACALQQhqIiMgIykDACAEQQhqKQMAhTcDACALQRBqIiMgIykDACAEQRBqKQMAhTcDACALQRhqIiMgIykDACAEQRhqKQMAhTcDACALQSBqIiMgIykDACAEQSBqKQMAhTcDACALQShqIiMgIykDACAEQShqKQMAhTcDACALQTBqIiMgIykDACAEQTBqKQMAhTcDACALQThqIiMgIykDACAEQThqKQMAhTcDACALQcAAaiIjICMpAwAgBEHAAGopAwCFNwMAIAtByABqIiMgIykDACAEQcgAaikDAIU3AwAgC0HQAGoiIyAjKQMAIARB0ABqKQMAhTcDACALQdgAaiIjICMpAwAgBEHYAGopAwCFNwMAIAtB4ABqIiMgIykDACAEQeAAaikDAIU3AwAgC0HoAGoiIyAjKQMAIARB6ABqKQMAhTcDACALQfAAaiIjICMpAwAgBEHwAGopAwCFNwMAIAtB+ABqIgsgCykDACAEQfgAaikDAIU3AwAgJEGAAWohJCAiQX9qIiINAAsgByAIIBsgABACIAAgCiAJKQIAIBiDp0EHdGpsISYgBSEkIAAhIgNAICQgDWoiCyALKQMAICQgJmoiBCkDAIU3AwAgC0EIaiIjICMpAwAgBEEIaikDAIU3AwAgC0EQaiIjICMpAwAgBEEQaikDAIU3AwAgC0EYaiIjICMpAwAgBEEYaikDAIU3AwAgC0EgaiIjICMpAwAgBEEgaikDAIU3AwAgC0EoaiIjICMpAwAgBEEoaikDAIU3AwAgC0EwaiIjICMpAwAgBEEwaikDAIU3AwAgC0E4aiIjICMpAwAgBEE4aikDAIU3AwAgC0HAAGoiIyAjKQMAIARBwABqKQMAhTcDACALQcgAaiIjICMpAwAgBEHIAGopAwCFNwMAIAtB0ABqIiMgIykDACAEQdAAaikDAIU3AwAgC0HYAGoiIyAjKQMAIARB2ABqKQMAhTcDACALQeAAaiIjICMpAwAgBEHgAGopAwCFNwMAIAtB6ABqIiMgIykDACAEQegAaikDAIU3AwAgC0HwAGoiIyAjKQMAIARB8ABqKQMAhTcDACALQfgAaiILIAspAwAgBEH4AGopAwCFNwMAICRBgAFqISQgIkF/aiIiDQALCyAIIAcgGyAAEAIgJUECaiIlIAFJDQALCwJAIABFDQBBACEiAkAgHQ0AICAgHmohI0EAIQtBACEiA0AgIyALaiIEIAcgC2oiJCgCADYCACAEQQRqICRBBGooAgA2AgAgBEEIaiAkQQhqKAIANgIAIARBDGogJEEMaigCADYCACALQRBqIQsgDiAiQQRqIiJHDQALCyAPRQ0AICEgIkECdCILaiAHIAtqKAIANgIACyAeIANqIR4gH0EBaiIfIAJHDQALCws=";
    hash$3 = "b32721f8";
    wasmJson$3 = {
      name: name$3,
      data: data$3,
      hash: hash$3
    };
    isPowerOfTwo = (v) => v && !(v & v - 1);
    validateOptions$1 = (options) => {
      if (!options || typeof options !== "object") {
        throw new Error("Invalid options parameter. It requires an object.");
      }
      if (!Number.isInteger(options.blockSize) || options.blockSize < 1) {
        throw new Error("Block size should be a positive number");
      }
      if (!Number.isInteger(options.costFactor) || options.costFactor < 2 || !isPowerOfTwo(options.costFactor)) {
        throw new Error("Cost factor should be a power of 2, greater than 1");
      }
      if (!Number.isInteger(options.parallelism) || options.parallelism < 1) {
        throw new Error("Parallelism should be a positive number");
      }
      if (!Number.isInteger(options.hashLength) || options.hashLength < 1) {
        throw new Error("Hash length should be a positive number.");
      }
      if (options.outputType === void 0) {
        options.outputType = "hex";
      }
      if (![
        "hex",
        "binary"
      ].includes(options.outputType)) {
        throw new Error(`Insupported output type ${options.outputType}. Valid values: ['hex', 'binary']`);
      }
    };
    name$2 = "bcrypt";
    data$2 = "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";
    hash$2 = "8bd8822d";
    wasmJson$2 = {
      name: name$2,
      data: data$2,
      hash: hash$2
    };
    validateOptions = (options) => {
      if (!options || typeof options !== "object") {
        throw new Error("Invalid options parameter. It requires an object.");
      }
      if (!Number.isInteger(options.costFactor) || options.costFactor < 4 || options.costFactor > 31) {
        throw new Error("Cost factor should be a number between 4 and 31");
      }
      options.password = getUInt8Buffer(options.password);
      if (options.password.length < 1) {
        throw new Error("Password should be at least 1 byte long");
      }
      if (options.password.length > 72) {
        throw new Error("Password should be at most 72 bytes long");
      }
      options.salt = getUInt8Buffer(options.salt);
      if (options.salt.length !== 16) {
        throw new Error("Salt should be 16 bytes long");
      }
      if (options.outputType === void 0) {
        options.outputType = "encoded";
      }
      if (![
        "hex",
        "binary",
        "encoded"
      ].includes(options.outputType)) {
        throw new Error(`Insupported output type ${options.outputType}. Valid values: ['hex', 'binary', 'encoded']`);
      }
    };
    validateHashCharacters = (hash2) => {
      if (!/^\$2[axyb]\$[0-3][0-9]\$[./A-Za-z0-9]{53}$/.test(hash2)) {
        return false;
      }
      if (hash2[4] === "0" && Number(hash2[5]) < 4) {
        return false;
      }
      if (hash2[4] === "3" && Number(hash2[5]) > 1) {
        return false;
      }
      return true;
    };
    validateVerifyOptions = (options) => {
      if (!options || typeof options !== "object") {
        throw new Error("Invalid options parameter. It requires an object.");
      }
      if (options.hash === void 0 || typeof options.hash !== "string") {
        throw new Error("Hash should be specified");
      }
      if (options.hash.length !== 60) {
        throw new Error("Hash should be 60 bytes long");
      }
      if (!validateHashCharacters(options.hash)) {
        throw new Error("Invalid hash");
      }
      options.password = getUInt8Buffer(options.password);
      if (options.password.length < 1) {
        throw new Error("Password should be at least 1 byte long");
      }
      if (options.password.length > 72) {
        throw new Error("Password should be at most 72 bytes long");
      }
    };
    name$1 = "whirlpool";
    data$1 = "AGFzbQEAAAABEQRgAAF/YAF/AGACf38AYAAAAwkIAAECAwEDAAEFBAEBAgIGDgJ/AUHQmwULfwBBgAgLB3AIBm1lbW9yeQIADkhhc2hfR2V0QnVmZmVyAAAJSGFzaF9Jbml0AAMLSGFzaF9VcGRhdGUABApIYXNoX0ZpbmFsAAUNSGFzaF9HZXRTdGF0ZQAGDkhhc2hfQ2FsY3VsYXRlAAcKU1RBVEVfU0laRQMBCu0bCAUAQYAZC8wGAQl+IAApAwAhAUEAQQApA4CbASICNwPAmQEgACkDGCEDIAApAxAhBCAAKQMIIQVBAEEAKQOYmwEiBjcD2JkBQQBBACkDkJsBIgc3A9CZAUEAQQApA4ibASIINwPImQFBACABIAKFNwOAmgFBACAFIAiFNwOImgFBACAEIAeFNwOQmgFBACADIAaFNwOYmgEgACkDICEDQQBBACkDoJsBIgE3A+CZAUEAIAMgAYU3A6CaASAAKQMoIQRBAEEAKQOomwEiAzcD6JkBQQAgBCADhTcDqJoBIAApAzAhBUEAQQApA7CbASIENwPwmQFBACAFIASFNwOwmgEgACkDOCEJQQBBACkDuJsBIgU3A/iZAUEAIAkgBYU3A7iaAUEAQpjGmMb+kO6AzwA3A4CZAUHAmQFBgJkBEAJBgJoBQcCZARACQQBCtszKrp/v28jSADcDgJkBQcCZAUGAmQEQAkGAmgFBwJkBEAJBAELg+O70uJTDvTU3A4CZAUHAmQFBgJkBEAJBgJoBQcCZARACQQBCncDfluzlkv/XADcDgJkBQcCZAUGAmQEQAkGAmgFBwJkBEAJBAEKV7t2p/pO8pVo3A4CZAUHAmQFBgJkBEAJBgJoBQcCZARACQQBC2JKn0ZCW6LWFfzcDgJkBQcCZAUGAmQEQAkGAmgFBwJkBEAJBAEK9u8Ggv9nPgucANwOAmQFBwJkBQYCZARACQYCaAUHAmQEQAkEAQuTPhNr4tN/KWDcDgJkBQcCZAUGAmQEQAkGAmgFBwJkBEAJBAEL73fOz1vvFo55/NwOAmQFBwJkBQYCZARACQYCaAUHAmQEQAkEAQsrb/L3Q1dbBMzcDgJkBQcCZAUGAmQEQAkGAmgFBwJkBEAJBACACQQApA4CaASAAKQMAhYU3A4CbAUEAIAhBACkDiJoBIAApAwiFhTcDiJsBQQAgB0EAKQOQmgEgACkDEIWFNwOQmwFBACAGQQApA5iaASAAKQMYhYU3A5ibAUEAIAFBACkDoJoBIAApAyCFhTcDoJsBQQAgA0EAKQOomgEgACkDKIWFNwOomwFBACAEQQApA7CaASAAKQMwhYU3A7CbAUEAIAVBACkDuJoBIAApAziFhTcDuJsBC4YMCgF+AX8BfgF/AX4BfwF+AX8EfgN/IAAgACkDACICpyIDQf8BcUEDdEGQCGopAwBCOIkgACkDOCIEpyIFQQV2QfgPcUGQCGopAwCFQjiJIAApAzAiBqciB0ENdkH4D3FBkAhqKQMAhUI4iSAAKQMoIginIglBFXZB+A9xQZAIaikDAIVCOIkgACkDICIKQiCIp0H/AXFBA3RBkAhqKQMAhUI4iSAAKQMYIgtCKIinQf8BcUEDdEGQCGopAwCFQjiJIAApAxAiDEIwiKdB/wFxQQN0QZAIaikDAIVCOIkgACkDCCINQjiIp0EDdEGQCGopAwCFQjiJIAEpAwCFNwMAIAAgDaciDkH/AXFBA3RBkAhqKQMAQjiJIANBBXZB+A9xQZAIaikDAIVCOIkgBUENdkH4D3FBkAhqKQMAhUI4iSAHQRV2QfgPcUGQCGopAwCFQjiJIAhCIIinQf8BcUEDdEGQCGopAwCFQjiJIApCKIinQf8BcUEDdEGQCGopAwCFQjiJIAtCMIinQf8BcUEDdEGQCGopAwCFQjiJIAxCOIinQQN0QZAIaikDAIVCOIkgASkDCIU3AwggACAMpyIPQf8BcUEDdEGQCGopAwBCOIkgDkEFdkH4D3FBkAhqKQMAhUI4iSADQQ12QfgPcUGQCGopAwCFQjiJIAVBFXZB+A9xQZAIaikDAIVCOIkgBkIgiKdB/wFxQQN0QZAIaikDAIVCOIkgCEIoiKdB/wFxQQN0QZAIaikDAIVCOIkgCkIwiKdB/wFxQQN0QZAIaikDAIVCOIkgC0I4iKdBA3RBkAhqKQMAhUI4iSABKQMQhTcDECAAIAunIhBB/wFxQQN0QZAIaikDAEI4iSAPQQV2QfgPcUGQCGopAwCFQjiJIA5BDXZB+A9xQZAIaikDAIVCOIkgA0EVdkH4D3FBkAhqKQMAhUI4iSAEQiCIp0H/AXFBA3RBkAhqKQMAhUI4iSAGQiiIp0H/AXFBA3RBkAhqKQMAhUI4iSAIQjCIp0H/AXFBA3RBkAhqKQMAhUI4iSAKQjiIp0EDdEGQCGopAwCFQjiJIAEpAxiFNwMYIAAgCqciA0H/AXFBA3RBkAhqKQMAQjiJIBBBBXZB+A9xQZAIaikDAIVCOIkgD0ENdkH4D3FBkAhqKQMAhUI4iSAOQRV2QfgPcUGQCGopAwCFQjiJIAJCIIinQf8BcUEDdEGQCGopAwCFQjiJIARCKIinQf8BcUEDdEGQCGopAwCFQjiJIAZCMIinQf8BcUEDdEGQCGopAwCFQjiJIAhCOIinQQN0QZAIaikDAIVCOIkgASkDIIU3AyAgACAJQf8BcUEDdEGQCGopAwBCOIkgA0EFdkH4D3FBkAhqKQMAhUI4iSAQQQ12QfgPcUGQCGopAwCFQjiJIA9BFXZB+A9xQZAIaikDAIVCOIkgDUIgiKdB/wFxQQN0QZAIaikDAIVCOIkgAkIoiKdB/wFxQQN0QZAIaikDAIVCOIkgBEIwiKdB/wFxQQN0QZAIaikDAIVCOIkgBkI4iKdBA3RBkAhqKQMAhUI4iSABKQMohTcDKCAAIAdB/wFxQQN0QZAIaikDAEI4iSAJQQV2QfgPcUGQCGopAwCFQjiJIANBDXZB+A9xQZAIaikDAIVCOIkgEEEVdkH4D3FBkAhqKQMAhUI4iSAMQiCIp0H/AXFBA3RBkAhqKQMAhUI4iSANQiiIp0H/AXFBA3RBkAhqKQMAhUI4iSACQjCIp0H/AXFBA3RBkAhqKQMAhUI4iSAEQjiIp0EDdEGQCGopAwCFQjiJIAEpAzCFNwMwIAAgBUH/AXFBA3RBkAhqKQMAQjiJIAdBBXZB+A9xQZAIaikDAIVCOIkgCUENdkH4D3FBkAhqKQMAhUI4iSADQRV2QfgPcUGQCGopAwCFQjiJIAtCIIinQf8BcUEDdEGQCGopAwCFQjiJIAxCKIinQf8BcUEDdEGQCGopAwCFQjiJIA1CMIinQf8BcUEDdEGQCGopAwCFQjiJIAJCOIinQQN0QZAIaikDAIVCOIkgASkDOIU3AzgLXABBAEIANwPImwFBAEIANwO4mwFBAEIANwOwmwFBAEIANwOomwFBAEIANwOgmwFBAEIANwOYmwFBAEIANwOQmwFBAEIANwOImwFBAEIANwOAmwFBAEEANgLAmwELxgMBB39BACEBQQBBACkDyJsBIACtfDcDyJsBAkBBACgCwJsBIgJFDQBBACEBAkAgAiAAaiIDQcAAIANBwABJGyIEIAJB/wFxIgVNDQAgBCAFayIBQQNxIQYCQAJAIAQgBUF/c2pBA08NAEEAIQEMAQsgAUF8cSEHQQAhAQNAIAUgAWoiAkHAmgFqIAFBgBlqLQAAOgAAIAJBwZoBaiABQYEZai0AADoAACACQcKaAWogAUGCGWotAAA6AAAgAkHDmgFqIAFBgxlqLQAAOgAAIAcgAUEEaiIBRw0ACyAFIAFqIgUhAgsgBkUNACACQf8BcUEBaiECA0AgBUHAmgFqIAFBgBlqLQAAOgAAIAIiBUEBaiECIAFBAWohASAFIQUgBkF/aiIGDQALCwJAIANBP00NAEHAmgEQAUEAIQQLQQAgBDYCwJsBCwJAIAAgAWsiAkHAAEkNAANAIAFBgBlqEAEgAUHAAGohASACQUBqIgJBP0sNAAsLAkAgASAARg0AQQAgAjYCwJsBIAJFDQBBACECQQAhBQNAIAJBwJoBaiACIAFqQYAZai0AADoAAEEAKALAmwEgBUEBaiIFQf8BcSICSw0ACwsL/wMCBH8BfiMAQcAAayIAJAAgAEE4akIANwMAIABBMGpCADcDACAAQShqQgA3AwAgAEEgakIANwMAIABBGGpCADcDACAAQRBqQgA3AwAgAEIANwMIIABCADcDAEEAIQECQAJAQQAoAsCbASICRQ0AQQAhAwNAIAAgAWogAUHAmgFqLQAAOgAAIAFBAWohASACIANBAWoiA0H/AXFLDQALQQAgAkEBajYCwJsBIAAgAmpBgAE6AAAgAkFgcUEgRw0BIAAQASAAQgA3AxggAEIANwMQIABCADcDCCAAQgA3AwAMAQtBAEEBNgLAmwEgAEGAAToAAAtBACkDyJsBIQRBAEIANwPImwEgAEEAOgA2IABBADYBMiAAQgA3ASogAEEAOgApIABCADcAISAAQQA6ACAgACAEQgWIPAA+IAAgBEINiDwAPSAAIARCFYg8ADwgACAEQh2IPAA7IAAgBEIliDwAOiAAIARCLYg8ADkgACAEQjWIPAA4IAAgBEI9iDwANyAAIASnQQN0OgA/IAAQAUEAQQApA4CbATcDgBlBAEEAKQOImwE3A4gZQQBBACkDkJsBNwOQGUEAQQApA5ibATcDmBlBAEEAKQOgmwE3A6AZQQBBACkDqJsBNwOoGUEAQQApA7CbATcDsBlBAEEAKQO4mwE3A7gZIABBwABqJAALBgBBwJoBC2IAQQBCADcDyJsBQQBCADcDuJsBQQBCADcDsJsBQQBCADcDqJsBQQBCADcDoJsBQQBCADcDmJsBQQBCADcDkJsBQQBCADcDiJsBQQBCADcDgJsBQQBBADYCwJsBIAAQBBAFCwuYEAEAQYAIC5AQkAAAAAAAAAAAAAAAAAAAABgYYBjAeDDYIyOMIwWvRibGxj/GfvmRuOjoh+gTb837h4cmh0yhE8u4uNq4qWJtEQEBBAEIBQIJT08hT0Jung02Ntg2re5sm6amoqZZBFH/0tJv0t69uQz19fP1+wb3Dnl5+XnvgPKWb2+hb1/O3jCRkX6R/O8/bVJSVVKqB6T4YGCdYCf9wEe8vMq8iXZlNZubVpuszSs3jo4CjgSMAYqjo7ajcRVb0gwMMAxgPBhse3vxe/+K9oQ1NdQ1teFqgB0ddB3oaTr14OCn4FNH3bPX13vX9qyzIcLCL8Je7ZmcLi64Lm2WXENLSzFLYnqWKf7+3/6jIeFdV1dBV4IWrtUVFVQVqEEqvXd3wXeftu7oNzfcN6XrbpLl5bPle1bXnp+fRp+M2SMT8PDn8NMX/SNKSjVKan+UINraT9qelalEWFh9WPolsKLJyQPJBsqPzykppClVjVJ8CgooClAiFFqxsf6x4U9/UKCguqBpGl3Ja2uxa3/a1hSFhS6FXKsX2b29zr2Bc2c8XV1pXdI0uo8QEEAQgFAgkPT09/TzA/UHy8sLyxbAi90+Pvg+7cZ80wUFFAUoEQotZ2eBZx/mznjk5Lfkc1PVlycnnCclu04CQUEZQTJYgnOLixaLLJ0Lp6enpqdRAVP2fX3pfc+U+rKVlW6V3Ps3SdjYR9iOn61W+/vL+4sw63Du7p/uI3HBzXx87XzHkfi7ZmaFZhfjzHHd3VPdpo6nexcXXBe4Sy6vR0cBRwJGjkWenkKehNwhGsrKD8oexYnULS20LXWZWli/v8a/kXljLgcHHAc4Gw4/ra2OrQEjR6xaWnVa6i+0sIODNoNstRvvMzPMM4X/ZrZjY5FjP/LGXAICCAIQCgQSqqqSqjk4SZNxcdlxr6ji3sjIB8gOz43GGRlkGch9MtFJSTlJcnCSO9nZQ9mGmq9f8vLv8sMd+THj46vjS0jbqFtbcVviKra5iIgaiDSSDbyamlKapMgpPiYmmCYtvkwLMjLIMo36ZL+wsPqw6Up9Wenpg+kbas/yDw88D3gzHnfV1XPV5qa3M4CAOoB0uh30vr7Cvpl8YSfNzRPNJt6H6zQ00DS95GiJSEg9SHp1kDL//9v/qyTjVHp69Xr3j/SNkJB6kPTqPWRfX2Ffwj6+nSAggCAdoEA9aGi9aGfV0A8aGmga0HI0yq6ugq4ZLEG3tLTqtMledX1UVE1UmhmozpOTdpPs5Tt/IiKIIg2qRC9kZI1kB+nIY/Hx4/HbEv8qc3PRc7+i5swSEkgSkFokgkBAHUA6XYB6CAggCEAoEEjDwyvDVuiblezsl+wze8Xf29tL25aQq02hob6hYR9fwI2NDo0cgweRPT30PfXJesiXl2aXzPEzWwAAAAAAAAAAz88bzzbUg/krK6wrRYdWbnZ2xXaXs+zhgoIygmSwGebW1n/W/qmxKBsbbBvYdzbDtbXutcFbd3Svr4avESlDvmpqtWp339QdUFBdULoNoOpFRQlFEkyKV/Pz6/PLGPs4MDDAMJ3wYK3v75vvK3TDxD8//D/lw37aVVVJVZIcqseiorKieRBZ2+rqj+oDZcnpZWWJZQ/symq6utK6uWhpAy8vvC9lk15KwMAnwE7nnY7e3l/evoGhYBwccBzgbDj8/f3T/bsu50ZNTSlNUmSaH5KScpLk4Dl2dXXJdY+86voGBhgGMB4MNoqKEookmAmusrLysvlAeUvm5r/mY1nRhQ4OOA5wNhx+Hx98H/hjPudiYpViN/fEVdTUd9Tuo7U6qKiaqCkyTYGWlmKWxPQxUvn5w/mbOu9ixcUzxWb2l6MlJZQlNbFKEFlZeVnyILKrhIQqhFSuFdByctVyt6fkxTk55DnV3XLsTEwtTFphmBZeXmVeyju8lHh4/XjnhfCfODjgON3YcOWMjAqMFIYFmNHRY9HGsr8XpaWupUELV+Ti4q/iQ03ZoWFhmWEv+MJOs7P2s/FFe0IhIYQhFaVCNJycSpyU1iUIHh54HvBmPO5DQxFDIlKGYcfHO8d2/JOx/PzX/LMr5U8EBBAEIBQIJFFRWVGyCKLjmZlembzHLyVtbaltT8TaIg0NNA1oORpl+vrP+oM16Xnf31vftoSjaX5+5X7Xm/ypJCSQJD20SBk7O+w7xdd2/qurlqsxPUuazs4fzj7RgfAREUQRiFUimY+PBo8MiQODTk4lTkprnAS3t+a30VFzZuvri+sLYMvgPDzwPP3MeMGBgT6BfL8f/ZSUapTU/jVA9/f79+sM8xy5ud65oWdvGBMTTBOYXyaLLCywLH2cWFHT02vT1ri7Befnu+drXNOMbm6lblfL3DnExDfEbvOVqgMDDAMYDwYbVlZFVooTrNxERA1EGkmIXn9/4X/fnv6gqameqSE3T4gqKqgqTYJUZ7u71ruxbWsKwcEjwUbin4dTU1FTogKm8dzcV9yui6VyCwssC1gnFlOdnU6dnNMnAWxsrWxHwdgrMTHEMZX1YqR0dM10h7no8/b2//bjCfEVRkYFRgpDjEysrIqsCSZFpYmJHok8lw+1FBRQFKBEKLTh4aPhW0LfuhYWWBawTiymOjroOs3SdPdpablpb9DSBgkJJAlILRJBcHDdcKet4Ne2tuK22VRxb9DQZ9DOt70e7e2T7Tt+x9bMzBfMLtuF4kJCFUIqV4RomJhamLTCLSykpKqkSQ5V7SgooChdiFB1XFxtXNoxuIb4+Mf4kz/ta4aGIoZEpBHC";
    hash$1 = "8d8f6035";
    wasmJson$1 = {
      name: name$1,
      data: data$1,
      hash: hash$1
    };
    mutex$1 = new Mutex();
    wasmCache$1 = null;
    name = "sm3";
    data = "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";
    hash = "b6fb4b8e";
    wasmJson = {
      name,
      data,
      hash
    };
    mutex = new Mutex();
    wasmCache = null;
  }
});

// deno: deno-browser-disabled:crypto
var require_deno_browser_disabled_crypto = __commonJS({
  "deno:\0deno-browser-disabled:crypto"(exports, module) {
    module.exports = {};
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/tweetnacl/1.0.3/nacl-fast.js
var require_nacl_fast = __commonJS({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/tweetnacl/1.0.3/nacl-fast.js"(exports, module) {
    (function(nacl) {
      "use strict";
      var gf = function(init) {
        var i, r = new Float64Array(16);
        if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
        return r;
      };
      var randombytes = function() {
        throw new Error("no PRNG");
      };
      var _0 = new Uint8Array(16);
      var _9 = new Uint8Array(32);
      _9[0] = 9;
      var gf0 = gf(), gf1 = gf([
        1
      ]), _121665 = gf([
        56129,
        1
      ]), D2 = gf([
        30883,
        4953,
        19914,
        30187,
        55467,
        16705,
        2637,
        112,
        59544,
        30585,
        16505,
        36039,
        65139,
        11119,
        27886,
        20995
      ]), D22 = gf([
        61785,
        9906,
        39828,
        60374,
        45398,
        33411,
        5274,
        224,
        53552,
        61171,
        33010,
        6542,
        64743,
        22239,
        55772,
        9222
      ]), X = gf([
        54554,
        36645,
        11616,
        51542,
        42930,
        38181,
        51040,
        26924,
        56412,
        64982,
        57905,
        49316,
        21502,
        52590,
        14035,
        8553
      ]), Y = gf([
        26200,
        26214,
        26214,
        26214,
        26214,
        26214,
        26214,
        26214,
        26214,
        26214,
        26214,
        26214,
        26214,
        26214,
        26214,
        26214
      ]), I = gf([
        41136,
        18958,
        6951,
        50414,
        58488,
        44335,
        6150,
        12099,
        55207,
        15867,
        153,
        11085,
        57099,
        20417,
        9344,
        11139
      ]);
      function ts64(x, i, h, l) {
        x[i] = h >> 24 & 255;
        x[i + 1] = h >> 16 & 255;
        x[i + 2] = h >> 8 & 255;
        x[i + 3] = h & 255;
        x[i + 4] = l >> 24 & 255;
        x[i + 5] = l >> 16 & 255;
        x[i + 6] = l >> 8 & 255;
        x[i + 7] = l & 255;
      }
      function vn(x, xi, y, yi, n) {
        var i, d = 0;
        for (i = 0; i < n; i++) d |= x[xi + i] ^ y[yi + i];
        return (1 & d - 1 >>> 8) - 1;
      }
      function crypto_verify_16(x, xi, y, yi) {
        return vn(x, xi, y, yi, 16);
      }
      function crypto_verify_32(x, xi, y, yi) {
        return vn(x, xi, y, yi, 32);
      }
      function core_salsa20(o, p, k, c) {
        var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
        for (var i = 0; i < 20; i += 2) {
          u = x0 + x12 | 0;
          x4 ^= u << 7 | u >>> 32 - 7;
          u = x4 + x0 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x4 | 0;
          x12 ^= u << 13 | u >>> 32 - 13;
          u = x12 + x8 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x1 | 0;
          x9 ^= u << 7 | u >>> 32 - 7;
          u = x9 + x5 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x9 | 0;
          x1 ^= u << 13 | u >>> 32 - 13;
          u = x1 + x13 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x6 | 0;
          x14 ^= u << 7 | u >>> 32 - 7;
          u = x14 + x10 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x14 | 0;
          x6 ^= u << 13 | u >>> 32 - 13;
          u = x6 + x2 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x11 | 0;
          x3 ^= u << 7 | u >>> 32 - 7;
          u = x3 + x15 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x3 | 0;
          x11 ^= u << 13 | u >>> 32 - 13;
          u = x11 + x7 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
          u = x0 + x3 | 0;
          x1 ^= u << 7 | u >>> 32 - 7;
          u = x1 + x0 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x1 | 0;
          x3 ^= u << 13 | u >>> 32 - 13;
          u = x3 + x2 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x4 | 0;
          x6 ^= u << 7 | u >>> 32 - 7;
          u = x6 + x5 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x6 | 0;
          x4 ^= u << 13 | u >>> 32 - 13;
          u = x4 + x7 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x9 | 0;
          x11 ^= u << 7 | u >>> 32 - 7;
          u = x11 + x10 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x11 | 0;
          x9 ^= u << 13 | u >>> 32 - 13;
          u = x9 + x8 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x14 | 0;
          x12 ^= u << 7 | u >>> 32 - 7;
          u = x12 + x15 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x12 | 0;
          x14 ^= u << 13 | u >>> 32 - 13;
          u = x14 + x13 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
        }
        x0 = x0 + j0 | 0;
        x1 = x1 + j1 | 0;
        x2 = x2 + j2 | 0;
        x3 = x3 + j3 | 0;
        x4 = x4 + j4 | 0;
        x5 = x5 + j5 | 0;
        x6 = x6 + j6 | 0;
        x7 = x7 + j7 | 0;
        x8 = x8 + j8 | 0;
        x9 = x9 + j9 | 0;
        x10 = x10 + j10 | 0;
        x11 = x11 + j11 | 0;
        x12 = x12 + j12 | 0;
        x13 = x13 + j13 | 0;
        x14 = x14 + j14 | 0;
        x15 = x15 + j15 | 0;
        o[0] = x0 >>> 0 & 255;
        o[1] = x0 >>> 8 & 255;
        o[2] = x0 >>> 16 & 255;
        o[3] = x0 >>> 24 & 255;
        o[4] = x1 >>> 0 & 255;
        o[5] = x1 >>> 8 & 255;
        o[6] = x1 >>> 16 & 255;
        o[7] = x1 >>> 24 & 255;
        o[8] = x2 >>> 0 & 255;
        o[9] = x2 >>> 8 & 255;
        o[10] = x2 >>> 16 & 255;
        o[11] = x2 >>> 24 & 255;
        o[12] = x3 >>> 0 & 255;
        o[13] = x3 >>> 8 & 255;
        o[14] = x3 >>> 16 & 255;
        o[15] = x3 >>> 24 & 255;
        o[16] = x4 >>> 0 & 255;
        o[17] = x4 >>> 8 & 255;
        o[18] = x4 >>> 16 & 255;
        o[19] = x4 >>> 24 & 255;
        o[20] = x5 >>> 0 & 255;
        o[21] = x5 >>> 8 & 255;
        o[22] = x5 >>> 16 & 255;
        o[23] = x5 >>> 24 & 255;
        o[24] = x6 >>> 0 & 255;
        o[25] = x6 >>> 8 & 255;
        o[26] = x6 >>> 16 & 255;
        o[27] = x6 >>> 24 & 255;
        o[28] = x7 >>> 0 & 255;
        o[29] = x7 >>> 8 & 255;
        o[30] = x7 >>> 16 & 255;
        o[31] = x7 >>> 24 & 255;
        o[32] = x8 >>> 0 & 255;
        o[33] = x8 >>> 8 & 255;
        o[34] = x8 >>> 16 & 255;
        o[35] = x8 >>> 24 & 255;
        o[36] = x9 >>> 0 & 255;
        o[37] = x9 >>> 8 & 255;
        o[38] = x9 >>> 16 & 255;
        o[39] = x9 >>> 24 & 255;
        o[40] = x10 >>> 0 & 255;
        o[41] = x10 >>> 8 & 255;
        o[42] = x10 >>> 16 & 255;
        o[43] = x10 >>> 24 & 255;
        o[44] = x11 >>> 0 & 255;
        o[45] = x11 >>> 8 & 255;
        o[46] = x11 >>> 16 & 255;
        o[47] = x11 >>> 24 & 255;
        o[48] = x12 >>> 0 & 255;
        o[49] = x12 >>> 8 & 255;
        o[50] = x12 >>> 16 & 255;
        o[51] = x12 >>> 24 & 255;
        o[52] = x13 >>> 0 & 255;
        o[53] = x13 >>> 8 & 255;
        o[54] = x13 >>> 16 & 255;
        o[55] = x13 >>> 24 & 255;
        o[56] = x14 >>> 0 & 255;
        o[57] = x14 >>> 8 & 255;
        o[58] = x14 >>> 16 & 255;
        o[59] = x14 >>> 24 & 255;
        o[60] = x15 >>> 0 & 255;
        o[61] = x15 >>> 8 & 255;
        o[62] = x15 >>> 16 & 255;
        o[63] = x15 >>> 24 & 255;
      }
      function core_hsalsa20(o, p, k, c) {
        var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
        for (var i = 0; i < 20; i += 2) {
          u = x0 + x12 | 0;
          x4 ^= u << 7 | u >>> 32 - 7;
          u = x4 + x0 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x4 | 0;
          x12 ^= u << 13 | u >>> 32 - 13;
          u = x12 + x8 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x1 | 0;
          x9 ^= u << 7 | u >>> 32 - 7;
          u = x9 + x5 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x9 | 0;
          x1 ^= u << 13 | u >>> 32 - 13;
          u = x1 + x13 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x6 | 0;
          x14 ^= u << 7 | u >>> 32 - 7;
          u = x14 + x10 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x14 | 0;
          x6 ^= u << 13 | u >>> 32 - 13;
          u = x6 + x2 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x11 | 0;
          x3 ^= u << 7 | u >>> 32 - 7;
          u = x3 + x15 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x3 | 0;
          x11 ^= u << 13 | u >>> 32 - 13;
          u = x11 + x7 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
          u = x0 + x3 | 0;
          x1 ^= u << 7 | u >>> 32 - 7;
          u = x1 + x0 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x1 | 0;
          x3 ^= u << 13 | u >>> 32 - 13;
          u = x3 + x2 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x4 | 0;
          x6 ^= u << 7 | u >>> 32 - 7;
          u = x6 + x5 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x6 | 0;
          x4 ^= u << 13 | u >>> 32 - 13;
          u = x4 + x7 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x9 | 0;
          x11 ^= u << 7 | u >>> 32 - 7;
          u = x11 + x10 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x11 | 0;
          x9 ^= u << 13 | u >>> 32 - 13;
          u = x9 + x8 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x14 | 0;
          x12 ^= u << 7 | u >>> 32 - 7;
          u = x12 + x15 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x12 | 0;
          x14 ^= u << 13 | u >>> 32 - 13;
          u = x14 + x13 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
        }
        o[0] = x0 >>> 0 & 255;
        o[1] = x0 >>> 8 & 255;
        o[2] = x0 >>> 16 & 255;
        o[3] = x0 >>> 24 & 255;
        o[4] = x5 >>> 0 & 255;
        o[5] = x5 >>> 8 & 255;
        o[6] = x5 >>> 16 & 255;
        o[7] = x5 >>> 24 & 255;
        o[8] = x10 >>> 0 & 255;
        o[9] = x10 >>> 8 & 255;
        o[10] = x10 >>> 16 & 255;
        o[11] = x10 >>> 24 & 255;
        o[12] = x15 >>> 0 & 255;
        o[13] = x15 >>> 8 & 255;
        o[14] = x15 >>> 16 & 255;
        o[15] = x15 >>> 24 & 255;
        o[16] = x6 >>> 0 & 255;
        o[17] = x6 >>> 8 & 255;
        o[18] = x6 >>> 16 & 255;
        o[19] = x6 >>> 24 & 255;
        o[20] = x7 >>> 0 & 255;
        o[21] = x7 >>> 8 & 255;
        o[22] = x7 >>> 16 & 255;
        o[23] = x7 >>> 24 & 255;
        o[24] = x8 >>> 0 & 255;
        o[25] = x8 >>> 8 & 255;
        o[26] = x8 >>> 16 & 255;
        o[27] = x8 >>> 24 & 255;
        o[28] = x9 >>> 0 & 255;
        o[29] = x9 >>> 8 & 255;
        o[30] = x9 >>> 16 & 255;
        o[31] = x9 >>> 24 & 255;
      }
      function crypto_core_salsa20(out, inp, k, c) {
        core_salsa20(out, inp, k, c);
      }
      function crypto_core_hsalsa20(out, inp, k, c) {
        core_hsalsa20(out, inp, k, c);
      }
      var sigma = new Uint8Array([
        101,
        120,
        112,
        97,
        110,
        100,
        32,
        51,
        50,
        45,
        98,
        121,
        116,
        101,
        32,
        107
      ]);
      function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
        var z = new Uint8Array(16), x = new Uint8Array(64);
        var u, i;
        for (i = 0; i < 16; i++) z[i] = 0;
        for (i = 0; i < 8; i++) z[i] = n[i];
        while (b >= 64) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < 64; i++) c[cpos + i] = m[mpos + i] ^ x[i];
          u = 1;
          for (i = 8; i < 16; i++) {
            u = u + (z[i] & 255) | 0;
            z[i] = u & 255;
            u >>>= 8;
          }
          b -= 64;
          cpos += 64;
          mpos += 64;
        }
        if (b > 0) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < b; i++) c[cpos + i] = m[mpos + i] ^ x[i];
        }
        return 0;
      }
      function crypto_stream_salsa20(c, cpos, b, n, k) {
        var z = new Uint8Array(16), x = new Uint8Array(64);
        var u, i;
        for (i = 0; i < 16; i++) z[i] = 0;
        for (i = 0; i < 8; i++) z[i] = n[i];
        while (b >= 64) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < 64; i++) c[cpos + i] = x[i];
          u = 1;
          for (i = 8; i < 16; i++) {
            u = u + (z[i] & 255) | 0;
            z[i] = u & 255;
            u >>>= 8;
          }
          b -= 64;
          cpos += 64;
        }
        if (b > 0) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < b; i++) c[cpos + i] = x[i];
        }
        return 0;
      }
      function crypto_stream(c, cpos, d, n, k) {
        var s = new Uint8Array(32);
        crypto_core_hsalsa20(s, n, k, sigma);
        var sn = new Uint8Array(8);
        for (var i = 0; i < 8; i++) sn[i] = n[i + 16];
        return crypto_stream_salsa20(c, cpos, d, sn, s);
      }
      function crypto_stream_xor(c, cpos, m, mpos, d, n, k) {
        var s = new Uint8Array(32);
        crypto_core_hsalsa20(s, n, k, sigma);
        var sn = new Uint8Array(8);
        for (var i = 0; i < 8; i++) sn[i] = n[i + 16];
        return crypto_stream_salsa20_xor(c, cpos, m, mpos, d, sn, s);
      }
      var poly1305 = function(key) {
        this.buffer = new Uint8Array(16);
        this.r = new Uint16Array(10);
        this.h = new Uint16Array(10);
        this.pad = new Uint16Array(8);
        this.leftover = 0;
        this.fin = 0;
        var t0, t1, t2, t3, t4, t5, t6, t7;
        t0 = key[0] & 255 | (key[1] & 255) << 8;
        this.r[0] = t0 & 8191;
        t1 = key[2] & 255 | (key[3] & 255) << 8;
        this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
        t2 = key[4] & 255 | (key[5] & 255) << 8;
        this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
        t3 = key[6] & 255 | (key[7] & 255) << 8;
        this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
        t4 = key[8] & 255 | (key[9] & 255) << 8;
        this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
        this.r[5] = t4 >>> 1 & 8190;
        t5 = key[10] & 255 | (key[11] & 255) << 8;
        this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
        t6 = key[12] & 255 | (key[13] & 255) << 8;
        this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
        t7 = key[14] & 255 | (key[15] & 255) << 8;
        this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
        this.r[9] = t7 >>> 5 & 127;
        this.pad[0] = key[16] & 255 | (key[17] & 255) << 8;
        this.pad[1] = key[18] & 255 | (key[19] & 255) << 8;
        this.pad[2] = key[20] & 255 | (key[21] & 255) << 8;
        this.pad[3] = key[22] & 255 | (key[23] & 255) << 8;
        this.pad[4] = key[24] & 255 | (key[25] & 255) << 8;
        this.pad[5] = key[26] & 255 | (key[27] & 255) << 8;
        this.pad[6] = key[28] & 255 | (key[29] & 255) << 8;
        this.pad[7] = key[30] & 255 | (key[31] & 255) << 8;
      };
      poly1305.prototype.blocks = function(m, mpos, bytes) {
        var hibit = this.fin ? 0 : 1 << 11;
        var t0, t1, t2, t3, t4, t5, t6, t7, c;
        var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;
        var h0 = this.h[0], h1 = this.h[1], h2 = this.h[2], h3 = this.h[3], h4 = this.h[4], h5 = this.h[5], h6 = this.h[6], h7 = this.h[7], h8 = this.h[8], h9 = this.h[9];
        var r0 = this.r[0], r1 = this.r[1], r2 = this.r[2], r3 = this.r[3], r4 = this.r[4], r5 = this.r[5], r6 = this.r[6], r7 = this.r[7], r8 = this.r[8], r9 = this.r[9];
        while (bytes >= 16) {
          t0 = m[mpos + 0] & 255 | (m[mpos + 1] & 255) << 8;
          h0 += t0 & 8191;
          t1 = m[mpos + 2] & 255 | (m[mpos + 3] & 255) << 8;
          h1 += (t0 >>> 13 | t1 << 3) & 8191;
          t2 = m[mpos + 4] & 255 | (m[mpos + 5] & 255) << 8;
          h2 += (t1 >>> 10 | t2 << 6) & 8191;
          t3 = m[mpos + 6] & 255 | (m[mpos + 7] & 255) << 8;
          h3 += (t2 >>> 7 | t3 << 9) & 8191;
          t4 = m[mpos + 8] & 255 | (m[mpos + 9] & 255) << 8;
          h4 += (t3 >>> 4 | t4 << 12) & 8191;
          h5 += t4 >>> 1 & 8191;
          t5 = m[mpos + 10] & 255 | (m[mpos + 11] & 255) << 8;
          h6 += (t4 >>> 14 | t5 << 2) & 8191;
          t6 = m[mpos + 12] & 255 | (m[mpos + 13] & 255) << 8;
          h7 += (t5 >>> 11 | t6 << 5) & 8191;
          t7 = m[mpos + 14] & 255 | (m[mpos + 15] & 255) << 8;
          h8 += (t6 >>> 8 | t7 << 8) & 8191;
          h9 += t7 >>> 5 | hibit;
          c = 0;
          d0 = c;
          d0 += h0 * r0;
          d0 += h1 * (5 * r9);
          d0 += h2 * (5 * r8);
          d0 += h3 * (5 * r7);
          d0 += h4 * (5 * r6);
          c = d0 >>> 13;
          d0 &= 8191;
          d0 += h5 * (5 * r5);
          d0 += h6 * (5 * r4);
          d0 += h7 * (5 * r3);
          d0 += h8 * (5 * r2);
          d0 += h9 * (5 * r1);
          c += d0 >>> 13;
          d0 &= 8191;
          d1 = c;
          d1 += h0 * r1;
          d1 += h1 * r0;
          d1 += h2 * (5 * r9);
          d1 += h3 * (5 * r8);
          d1 += h4 * (5 * r7);
          c = d1 >>> 13;
          d1 &= 8191;
          d1 += h5 * (5 * r6);
          d1 += h6 * (5 * r5);
          d1 += h7 * (5 * r4);
          d1 += h8 * (5 * r3);
          d1 += h9 * (5 * r2);
          c += d1 >>> 13;
          d1 &= 8191;
          d2 = c;
          d2 += h0 * r2;
          d2 += h1 * r1;
          d2 += h2 * r0;
          d2 += h3 * (5 * r9);
          d2 += h4 * (5 * r8);
          c = d2 >>> 13;
          d2 &= 8191;
          d2 += h5 * (5 * r7);
          d2 += h6 * (5 * r6);
          d2 += h7 * (5 * r5);
          d2 += h8 * (5 * r4);
          d2 += h9 * (5 * r3);
          c += d2 >>> 13;
          d2 &= 8191;
          d3 = c;
          d3 += h0 * r3;
          d3 += h1 * r2;
          d3 += h2 * r1;
          d3 += h3 * r0;
          d3 += h4 * (5 * r9);
          c = d3 >>> 13;
          d3 &= 8191;
          d3 += h5 * (5 * r8);
          d3 += h6 * (5 * r7);
          d3 += h7 * (5 * r6);
          d3 += h8 * (5 * r5);
          d3 += h9 * (5 * r4);
          c += d3 >>> 13;
          d3 &= 8191;
          d4 = c;
          d4 += h0 * r4;
          d4 += h1 * r3;
          d4 += h2 * r2;
          d4 += h3 * r1;
          d4 += h4 * r0;
          c = d4 >>> 13;
          d4 &= 8191;
          d4 += h5 * (5 * r9);
          d4 += h6 * (5 * r8);
          d4 += h7 * (5 * r7);
          d4 += h8 * (5 * r6);
          d4 += h9 * (5 * r5);
          c += d4 >>> 13;
          d4 &= 8191;
          d5 = c;
          d5 += h0 * r5;
          d5 += h1 * r4;
          d5 += h2 * r3;
          d5 += h3 * r2;
          d5 += h4 * r1;
          c = d5 >>> 13;
          d5 &= 8191;
          d5 += h5 * r0;
          d5 += h6 * (5 * r9);
          d5 += h7 * (5 * r8);
          d5 += h8 * (5 * r7);
          d5 += h9 * (5 * r6);
          c += d5 >>> 13;
          d5 &= 8191;
          d6 = c;
          d6 += h0 * r6;
          d6 += h1 * r5;
          d6 += h2 * r4;
          d6 += h3 * r3;
          d6 += h4 * r2;
          c = d6 >>> 13;
          d6 &= 8191;
          d6 += h5 * r1;
          d6 += h6 * r0;
          d6 += h7 * (5 * r9);
          d6 += h8 * (5 * r8);
          d6 += h9 * (5 * r7);
          c += d6 >>> 13;
          d6 &= 8191;
          d7 = c;
          d7 += h0 * r7;
          d7 += h1 * r6;
          d7 += h2 * r5;
          d7 += h3 * r4;
          d7 += h4 * r3;
          c = d7 >>> 13;
          d7 &= 8191;
          d7 += h5 * r2;
          d7 += h6 * r1;
          d7 += h7 * r0;
          d7 += h8 * (5 * r9);
          d7 += h9 * (5 * r8);
          c += d7 >>> 13;
          d7 &= 8191;
          d8 = c;
          d8 += h0 * r8;
          d8 += h1 * r7;
          d8 += h2 * r6;
          d8 += h3 * r5;
          d8 += h4 * r4;
          c = d8 >>> 13;
          d8 &= 8191;
          d8 += h5 * r3;
          d8 += h6 * r2;
          d8 += h7 * r1;
          d8 += h8 * r0;
          d8 += h9 * (5 * r9);
          c += d8 >>> 13;
          d8 &= 8191;
          d9 = c;
          d9 += h0 * r9;
          d9 += h1 * r8;
          d9 += h2 * r7;
          d9 += h3 * r6;
          d9 += h4 * r5;
          c = d9 >>> 13;
          d9 &= 8191;
          d9 += h5 * r4;
          d9 += h6 * r3;
          d9 += h7 * r2;
          d9 += h8 * r1;
          d9 += h9 * r0;
          c += d9 >>> 13;
          d9 &= 8191;
          c = (c << 2) + c | 0;
          c = c + d0 | 0;
          d0 = c & 8191;
          c = c >>> 13;
          d1 += c;
          h0 = d0;
          h1 = d1;
          h2 = d2;
          h3 = d3;
          h4 = d4;
          h5 = d5;
          h6 = d6;
          h7 = d7;
          h8 = d8;
          h9 = d9;
          mpos += 16;
          bytes -= 16;
        }
        this.h[0] = h0;
        this.h[1] = h1;
        this.h[2] = h2;
        this.h[3] = h3;
        this.h[4] = h4;
        this.h[5] = h5;
        this.h[6] = h6;
        this.h[7] = h7;
        this.h[8] = h8;
        this.h[9] = h9;
      };
      poly1305.prototype.finish = function(mac, macpos) {
        var g = new Uint16Array(10);
        var c, mask, f, i;
        if (this.leftover) {
          i = this.leftover;
          this.buffer[i++] = 1;
          for (; i < 16; i++) this.buffer[i] = 0;
          this.fin = 1;
          this.blocks(this.buffer, 0, 16);
        }
        c = this.h[1] >>> 13;
        this.h[1] &= 8191;
        for (i = 2; i < 10; i++) {
          this.h[i] += c;
          c = this.h[i] >>> 13;
          this.h[i] &= 8191;
        }
        this.h[0] += c * 5;
        c = this.h[0] >>> 13;
        this.h[0] &= 8191;
        this.h[1] += c;
        c = this.h[1] >>> 13;
        this.h[1] &= 8191;
        this.h[2] += c;
        g[0] = this.h[0] + 5;
        c = g[0] >>> 13;
        g[0] &= 8191;
        for (i = 1; i < 10; i++) {
          g[i] = this.h[i] + c;
          c = g[i] >>> 13;
          g[i] &= 8191;
        }
        g[9] -= 1 << 13;
        mask = (c ^ 1) - 1;
        for (i = 0; i < 10; i++) g[i] &= mask;
        mask = ~mask;
        for (i = 0; i < 10; i++) this.h[i] = this.h[i] & mask | g[i];
        this.h[0] = (this.h[0] | this.h[1] << 13) & 65535;
        this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535;
        this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535;
        this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535;
        this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535;
        this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535;
        this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535;
        this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535;
        f = this.h[0] + this.pad[0];
        this.h[0] = f & 65535;
        for (i = 1; i < 8; i++) {
          f = (this.h[i] + this.pad[i] | 0) + (f >>> 16) | 0;
          this.h[i] = f & 65535;
        }
        mac[macpos + 0] = this.h[0] >>> 0 & 255;
        mac[macpos + 1] = this.h[0] >>> 8 & 255;
        mac[macpos + 2] = this.h[1] >>> 0 & 255;
        mac[macpos + 3] = this.h[1] >>> 8 & 255;
        mac[macpos + 4] = this.h[2] >>> 0 & 255;
        mac[macpos + 5] = this.h[2] >>> 8 & 255;
        mac[macpos + 6] = this.h[3] >>> 0 & 255;
        mac[macpos + 7] = this.h[3] >>> 8 & 255;
        mac[macpos + 8] = this.h[4] >>> 0 & 255;
        mac[macpos + 9] = this.h[4] >>> 8 & 255;
        mac[macpos + 10] = this.h[5] >>> 0 & 255;
        mac[macpos + 11] = this.h[5] >>> 8 & 255;
        mac[macpos + 12] = this.h[6] >>> 0 & 255;
        mac[macpos + 13] = this.h[6] >>> 8 & 255;
        mac[macpos + 14] = this.h[7] >>> 0 & 255;
        mac[macpos + 15] = this.h[7] >>> 8 & 255;
      };
      poly1305.prototype.update = function(m, mpos, bytes) {
        var i, want;
        if (this.leftover) {
          want = 16 - this.leftover;
          if (want > bytes) want = bytes;
          for (i = 0; i < want; i++) this.buffer[this.leftover + i] = m[mpos + i];
          bytes -= want;
          mpos += want;
          this.leftover += want;
          if (this.leftover < 16) return;
          this.blocks(this.buffer, 0, 16);
          this.leftover = 0;
        }
        if (bytes >= 16) {
          want = bytes - bytes % 16;
          this.blocks(m, mpos, want);
          mpos += want;
          bytes -= want;
        }
        if (bytes) {
          for (i = 0; i < bytes; i++) this.buffer[this.leftover + i] = m[mpos + i];
          this.leftover += bytes;
        }
      };
      function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
        var s = new poly1305(k);
        s.update(m, mpos, n);
        s.finish(out, outpos);
        return 0;
      }
      function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
        var x = new Uint8Array(16);
        crypto_onetimeauth(x, 0, m, mpos, n, k);
        return crypto_verify_16(h, hpos, x, 0);
      }
      function crypto_secretbox(c, m, d, n, k) {
        var i;
        if (d < 32) return -1;
        crypto_stream_xor(c, 0, m, 0, d, n, k);
        crypto_onetimeauth(c, 16, c, 32, d - 32, c);
        for (i = 0; i < 16; i++) c[i] = 0;
        return 0;
      }
      function crypto_secretbox_open(m, c, d, n, k) {
        var i;
        var x = new Uint8Array(32);
        if (d < 32) return -1;
        crypto_stream(x, 0, 32, n, k);
        if (crypto_onetimeauth_verify(c, 16, c, 32, d - 32, x) !== 0) return -1;
        crypto_stream_xor(m, 0, c, 0, d, n, k);
        for (i = 0; i < 32; i++) m[i] = 0;
        return 0;
      }
      function set25519(r, a) {
        var i;
        for (i = 0; i < 16; i++) r[i] = a[i] | 0;
      }
      function car25519(o) {
        var i, v, c = 1;
        for (i = 0; i < 16; i++) {
          v = o[i] + c + 65535;
          c = Math.floor(v / 65536);
          o[i] = v - c * 65536;
        }
        o[0] += c - 1 + 37 * (c - 1);
      }
      function sel25519(p, q, b) {
        var t, c = ~(b - 1);
        for (var i = 0; i < 16; i++) {
          t = c & (p[i] ^ q[i]);
          p[i] ^= t;
          q[i] ^= t;
        }
      }
      function pack25519(o, n) {
        var i, j, b;
        var m = gf(), t = gf();
        for (i = 0; i < 16; i++) t[i] = n[i];
        car25519(t);
        car25519(t);
        car25519(t);
        for (j = 0; j < 2; j++) {
          m[0] = t[0] - 65517;
          for (i = 1; i < 15; i++) {
            m[i] = t[i] - 65535 - (m[i - 1] >> 16 & 1);
            m[i - 1] &= 65535;
          }
          m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
          b = m[15] >> 16 & 1;
          m[14] &= 65535;
          sel25519(t, m, 1 - b);
        }
        for (i = 0; i < 16; i++) {
          o[2 * i] = t[i] & 255;
          o[2 * i + 1] = t[i] >> 8;
        }
      }
      function neq25519(a, b) {
        var c = new Uint8Array(32), d = new Uint8Array(32);
        pack25519(c, a);
        pack25519(d, b);
        return crypto_verify_32(c, 0, d, 0);
      }
      function par25519(a) {
        var d = new Uint8Array(32);
        pack25519(d, a);
        return d[0] & 1;
      }
      function unpack25519(o, n) {
        var i;
        for (i = 0; i < 16; i++) o[i] = n[2 * i] + (n[2 * i + 1] << 8);
        o[15] &= 32767;
      }
      function A(o, a, b) {
        for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
      }
      function Z(o, a, b) {
        for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
      }
      function M(o, a, b) {
        var v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        v = a[0];
        t0 += v * b0;
        t1 += v * b1;
        t2 += v * b2;
        t3 += v * b3;
        t4 += v * b4;
        t5 += v * b5;
        t6 += v * b6;
        t7 += v * b7;
        t8 += v * b8;
        t9 += v * b9;
        t10 += v * b10;
        t11 += v * b11;
        t12 += v * b12;
        t13 += v * b13;
        t14 += v * b14;
        t15 += v * b15;
        v = a[1];
        t1 += v * b0;
        t2 += v * b1;
        t3 += v * b2;
        t4 += v * b3;
        t5 += v * b4;
        t6 += v * b5;
        t7 += v * b6;
        t8 += v * b7;
        t9 += v * b8;
        t10 += v * b9;
        t11 += v * b10;
        t12 += v * b11;
        t13 += v * b12;
        t14 += v * b13;
        t15 += v * b14;
        t16 += v * b15;
        v = a[2];
        t2 += v * b0;
        t3 += v * b1;
        t4 += v * b2;
        t5 += v * b3;
        t6 += v * b4;
        t7 += v * b5;
        t8 += v * b6;
        t9 += v * b7;
        t10 += v * b8;
        t11 += v * b9;
        t12 += v * b10;
        t13 += v * b11;
        t14 += v * b12;
        t15 += v * b13;
        t16 += v * b14;
        t17 += v * b15;
        v = a[3];
        t3 += v * b0;
        t4 += v * b1;
        t5 += v * b2;
        t6 += v * b3;
        t7 += v * b4;
        t8 += v * b5;
        t9 += v * b6;
        t10 += v * b7;
        t11 += v * b8;
        t12 += v * b9;
        t13 += v * b10;
        t14 += v * b11;
        t15 += v * b12;
        t16 += v * b13;
        t17 += v * b14;
        t18 += v * b15;
        v = a[4];
        t4 += v * b0;
        t5 += v * b1;
        t6 += v * b2;
        t7 += v * b3;
        t8 += v * b4;
        t9 += v * b5;
        t10 += v * b6;
        t11 += v * b7;
        t12 += v * b8;
        t13 += v * b9;
        t14 += v * b10;
        t15 += v * b11;
        t16 += v * b12;
        t17 += v * b13;
        t18 += v * b14;
        t19 += v * b15;
        v = a[5];
        t5 += v * b0;
        t6 += v * b1;
        t7 += v * b2;
        t8 += v * b3;
        t9 += v * b4;
        t10 += v * b5;
        t11 += v * b6;
        t12 += v * b7;
        t13 += v * b8;
        t14 += v * b9;
        t15 += v * b10;
        t16 += v * b11;
        t17 += v * b12;
        t18 += v * b13;
        t19 += v * b14;
        t20 += v * b15;
        v = a[6];
        t6 += v * b0;
        t7 += v * b1;
        t8 += v * b2;
        t9 += v * b3;
        t10 += v * b4;
        t11 += v * b5;
        t12 += v * b6;
        t13 += v * b7;
        t14 += v * b8;
        t15 += v * b9;
        t16 += v * b10;
        t17 += v * b11;
        t18 += v * b12;
        t19 += v * b13;
        t20 += v * b14;
        t21 += v * b15;
        v = a[7];
        t7 += v * b0;
        t8 += v * b1;
        t9 += v * b2;
        t10 += v * b3;
        t11 += v * b4;
        t12 += v * b5;
        t13 += v * b6;
        t14 += v * b7;
        t15 += v * b8;
        t16 += v * b9;
        t17 += v * b10;
        t18 += v * b11;
        t19 += v * b12;
        t20 += v * b13;
        t21 += v * b14;
        t22 += v * b15;
        v = a[8];
        t8 += v * b0;
        t9 += v * b1;
        t10 += v * b2;
        t11 += v * b3;
        t12 += v * b4;
        t13 += v * b5;
        t14 += v * b6;
        t15 += v * b7;
        t16 += v * b8;
        t17 += v * b9;
        t18 += v * b10;
        t19 += v * b11;
        t20 += v * b12;
        t21 += v * b13;
        t22 += v * b14;
        t23 += v * b15;
        v = a[9];
        t9 += v * b0;
        t10 += v * b1;
        t11 += v * b2;
        t12 += v * b3;
        t13 += v * b4;
        t14 += v * b5;
        t15 += v * b6;
        t16 += v * b7;
        t17 += v * b8;
        t18 += v * b9;
        t19 += v * b10;
        t20 += v * b11;
        t21 += v * b12;
        t22 += v * b13;
        t23 += v * b14;
        t24 += v * b15;
        v = a[10];
        t10 += v * b0;
        t11 += v * b1;
        t12 += v * b2;
        t13 += v * b3;
        t14 += v * b4;
        t15 += v * b5;
        t16 += v * b6;
        t17 += v * b7;
        t18 += v * b8;
        t19 += v * b9;
        t20 += v * b10;
        t21 += v * b11;
        t22 += v * b12;
        t23 += v * b13;
        t24 += v * b14;
        t25 += v * b15;
        v = a[11];
        t11 += v * b0;
        t12 += v * b1;
        t13 += v * b2;
        t14 += v * b3;
        t15 += v * b4;
        t16 += v * b5;
        t17 += v * b6;
        t18 += v * b7;
        t19 += v * b8;
        t20 += v * b9;
        t21 += v * b10;
        t22 += v * b11;
        t23 += v * b12;
        t24 += v * b13;
        t25 += v * b14;
        t26 += v * b15;
        v = a[12];
        t12 += v * b0;
        t13 += v * b1;
        t14 += v * b2;
        t15 += v * b3;
        t16 += v * b4;
        t17 += v * b5;
        t18 += v * b6;
        t19 += v * b7;
        t20 += v * b8;
        t21 += v * b9;
        t22 += v * b10;
        t23 += v * b11;
        t24 += v * b12;
        t25 += v * b13;
        t26 += v * b14;
        t27 += v * b15;
        v = a[13];
        t13 += v * b0;
        t14 += v * b1;
        t15 += v * b2;
        t16 += v * b3;
        t17 += v * b4;
        t18 += v * b5;
        t19 += v * b6;
        t20 += v * b7;
        t21 += v * b8;
        t22 += v * b9;
        t23 += v * b10;
        t24 += v * b11;
        t25 += v * b12;
        t26 += v * b13;
        t27 += v * b14;
        t28 += v * b15;
        v = a[14];
        t14 += v * b0;
        t15 += v * b1;
        t16 += v * b2;
        t17 += v * b3;
        t18 += v * b4;
        t19 += v * b5;
        t20 += v * b6;
        t21 += v * b7;
        t22 += v * b8;
        t23 += v * b9;
        t24 += v * b10;
        t25 += v * b11;
        t26 += v * b12;
        t27 += v * b13;
        t28 += v * b14;
        t29 += v * b15;
        v = a[15];
        t15 += v * b0;
        t16 += v * b1;
        t17 += v * b2;
        t18 += v * b3;
        t19 += v * b4;
        t20 += v * b5;
        t21 += v * b6;
        t22 += v * b7;
        t23 += v * b8;
        t24 += v * b9;
        t25 += v * b10;
        t26 += v * b11;
        t27 += v * b12;
        t28 += v * b13;
        t29 += v * b14;
        t30 += v * b15;
        t0 += 38 * t16;
        t1 += 38 * t17;
        t2 += 38 * t18;
        t3 += 38 * t19;
        t4 += 38 * t20;
        t5 += 38 * t21;
        t6 += 38 * t22;
        t7 += 38 * t23;
        t8 += 38 * t24;
        t9 += 38 * t25;
        t10 += 38 * t26;
        t11 += 38 * t27;
        t12 += 38 * t28;
        t13 += 38 * t29;
        t14 += 38 * t30;
        c = 1;
        v = t0 + c + 65535;
        c = Math.floor(v / 65536);
        t0 = v - c * 65536;
        v = t1 + c + 65535;
        c = Math.floor(v / 65536);
        t1 = v - c * 65536;
        v = t2 + c + 65535;
        c = Math.floor(v / 65536);
        t2 = v - c * 65536;
        v = t3 + c + 65535;
        c = Math.floor(v / 65536);
        t3 = v - c * 65536;
        v = t4 + c + 65535;
        c = Math.floor(v / 65536);
        t4 = v - c * 65536;
        v = t5 + c + 65535;
        c = Math.floor(v / 65536);
        t5 = v - c * 65536;
        v = t6 + c + 65535;
        c = Math.floor(v / 65536);
        t6 = v - c * 65536;
        v = t7 + c + 65535;
        c = Math.floor(v / 65536);
        t7 = v - c * 65536;
        v = t8 + c + 65535;
        c = Math.floor(v / 65536);
        t8 = v - c * 65536;
        v = t9 + c + 65535;
        c = Math.floor(v / 65536);
        t9 = v - c * 65536;
        v = t10 + c + 65535;
        c = Math.floor(v / 65536);
        t10 = v - c * 65536;
        v = t11 + c + 65535;
        c = Math.floor(v / 65536);
        t11 = v - c * 65536;
        v = t12 + c + 65535;
        c = Math.floor(v / 65536);
        t12 = v - c * 65536;
        v = t13 + c + 65535;
        c = Math.floor(v / 65536);
        t13 = v - c * 65536;
        v = t14 + c + 65535;
        c = Math.floor(v / 65536);
        t14 = v - c * 65536;
        v = t15 + c + 65535;
        c = Math.floor(v / 65536);
        t15 = v - c * 65536;
        t0 += c - 1 + 37 * (c - 1);
        c = 1;
        v = t0 + c + 65535;
        c = Math.floor(v / 65536);
        t0 = v - c * 65536;
        v = t1 + c + 65535;
        c = Math.floor(v / 65536);
        t1 = v - c * 65536;
        v = t2 + c + 65535;
        c = Math.floor(v / 65536);
        t2 = v - c * 65536;
        v = t3 + c + 65535;
        c = Math.floor(v / 65536);
        t3 = v - c * 65536;
        v = t4 + c + 65535;
        c = Math.floor(v / 65536);
        t4 = v - c * 65536;
        v = t5 + c + 65535;
        c = Math.floor(v / 65536);
        t5 = v - c * 65536;
        v = t6 + c + 65535;
        c = Math.floor(v / 65536);
        t6 = v - c * 65536;
        v = t7 + c + 65535;
        c = Math.floor(v / 65536);
        t7 = v - c * 65536;
        v = t8 + c + 65535;
        c = Math.floor(v / 65536);
        t8 = v - c * 65536;
        v = t9 + c + 65535;
        c = Math.floor(v / 65536);
        t9 = v - c * 65536;
        v = t10 + c + 65535;
        c = Math.floor(v / 65536);
        t10 = v - c * 65536;
        v = t11 + c + 65535;
        c = Math.floor(v / 65536);
        t11 = v - c * 65536;
        v = t12 + c + 65535;
        c = Math.floor(v / 65536);
        t12 = v - c * 65536;
        v = t13 + c + 65535;
        c = Math.floor(v / 65536);
        t13 = v - c * 65536;
        v = t14 + c + 65535;
        c = Math.floor(v / 65536);
        t14 = v - c * 65536;
        v = t15 + c + 65535;
        c = Math.floor(v / 65536);
        t15 = v - c * 65536;
        t0 += c - 1 + 37 * (c - 1);
        o[0] = t0;
        o[1] = t1;
        o[2] = t2;
        o[3] = t3;
        o[4] = t4;
        o[5] = t5;
        o[6] = t6;
        o[7] = t7;
        o[8] = t8;
        o[9] = t9;
        o[10] = t10;
        o[11] = t11;
        o[12] = t12;
        o[13] = t13;
        o[14] = t14;
        o[15] = t15;
      }
      function S(o, a) {
        M(o, a, a);
      }
      function inv25519(o, i) {
        var c = gf();
        var a;
        for (a = 0; a < 16; a++) c[a] = i[a];
        for (a = 253; a >= 0; a--) {
          S(c, c);
          if (a !== 2 && a !== 4) M(c, c, i);
        }
        for (a = 0; a < 16; a++) o[a] = c[a];
      }
      function pow2523(o, i) {
        var c = gf();
        var a;
        for (a = 0; a < 16; a++) c[a] = i[a];
        for (a = 250; a >= 0; a--) {
          S(c, c);
          if (a !== 1) M(c, c, i);
        }
        for (a = 0; a < 16; a++) o[a] = c[a];
      }
      function crypto_scalarmult(q, n, p) {
        var z = new Uint8Array(32);
        var x = new Float64Array(80), r, i;
        var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf();
        for (i = 0; i < 31; i++) z[i] = n[i];
        z[31] = n[31] & 127 | 64;
        z[0] &= 248;
        unpack25519(x, p);
        for (i = 0; i < 16; i++) {
          b[i] = x[i];
          d[i] = a[i] = c[i] = 0;
        }
        a[0] = d[0] = 1;
        for (i = 254; i >= 0; --i) {
          r = z[i >>> 3] >>> (i & 7) & 1;
          sel25519(a, b, r);
          sel25519(c, d, r);
          A(e, a, c);
          Z(a, a, c);
          A(c, b, d);
          Z(b, b, d);
          S(d, e);
          S(f, a);
          M(a, c, a);
          M(c, b, e);
          A(e, a, c);
          Z(a, a, c);
          S(b, a);
          Z(c, d, f);
          M(a, c, _121665);
          A(a, a, d);
          M(c, c, a);
          M(a, d, f);
          M(d, b, x);
          S(b, e);
          sel25519(a, b, r);
          sel25519(c, d, r);
        }
        for (i = 0; i < 16; i++) {
          x[i + 16] = a[i];
          x[i + 32] = c[i];
          x[i + 48] = b[i];
          x[i + 64] = d[i];
        }
        var x32 = x.subarray(32);
        var x16 = x.subarray(16);
        inv25519(x32, x32);
        M(x16, x16, x32);
        pack25519(q, x16);
        return 0;
      }
      function crypto_scalarmult_base(q, n) {
        return crypto_scalarmult(q, n, _9);
      }
      function crypto_box_keypair(y, x) {
        randombytes(x, 32);
        return crypto_scalarmult_base(y, x);
      }
      function crypto_box_beforenm(k, y, x) {
        var s = new Uint8Array(32);
        crypto_scalarmult(s, x, y);
        return crypto_core_hsalsa20(k, _0, s, sigma);
      }
      var crypto_box_afternm = crypto_secretbox;
      var crypto_box_open_afternm = crypto_secretbox_open;
      function crypto_box(c, m, d, n, y, x) {
        var k = new Uint8Array(32);
        crypto_box_beforenm(k, y, x);
        return crypto_box_afternm(c, m, d, n, k);
      }
      function crypto_box_open(m, c, d, n, y, x) {
        var k = new Uint8Array(32);
        crypto_box_beforenm(k, y, x);
        return crypto_box_open_afternm(m, c, d, n, k);
      }
      var K = [
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591
      ];
      function crypto_hashblocks_hl(hh, hl, m, n) {
        var wh = new Int32Array(16), wl = new Int32Array(16), bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7, bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7, th, tl, i, j, h, l, a, b, c, d;
        var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
        var pos = 0;
        while (n >= 128) {
          for (i = 0; i < 16; i++) {
            j = 8 * i + pos;
            wh[i] = m[j + 0] << 24 | m[j + 1] << 16 | m[j + 2] << 8 | m[j + 3];
            wl[i] = m[j + 4] << 24 | m[j + 5] << 16 | m[j + 6] << 8 | m[j + 7];
          }
          for (i = 0; i < 80; i++) {
            bh0 = ah0;
            bh1 = ah1;
            bh2 = ah2;
            bh3 = ah3;
            bh4 = ah4;
            bh5 = ah5;
            bh6 = ah6;
            bh7 = ah7;
            bl0 = al0;
            bl1 = al1;
            bl2 = al2;
            bl3 = al3;
            bl4 = al4;
            bl5 = al5;
            bl6 = al6;
            bl7 = al7;
            h = ah7;
            l = al7;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
            l = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = ah4 & ah5 ^ ~ah4 & ah6;
            l = al4 & al5 ^ ~al4 & al6;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = K[i * 2];
            l = K[i * 2 + 1];
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = wh[i % 16];
            l = wl[i % 16];
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            th = c & 65535 | d << 16;
            tl = a & 65535 | b << 16;
            h = th;
            l = tl;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
            l = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
            l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            bh7 = c & 65535 | d << 16;
            bl7 = a & 65535 | b << 16;
            h = bh3;
            l = bl3;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = th;
            l = tl;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            bh3 = c & 65535 | d << 16;
            bl3 = a & 65535 | b << 16;
            ah1 = bh0;
            ah2 = bh1;
            ah3 = bh2;
            ah4 = bh3;
            ah5 = bh4;
            ah6 = bh5;
            ah7 = bh6;
            ah0 = bh7;
            al1 = bl0;
            al2 = bl1;
            al3 = bl2;
            al4 = bl3;
            al5 = bl4;
            al6 = bl5;
            al7 = bl6;
            al0 = bl7;
            if (i % 16 === 15) {
              for (j = 0; j < 16; j++) {
                h = wh[j];
                l = wl[j];
                a = l & 65535;
                b = l >>> 16;
                c = h & 65535;
                d = h >>> 16;
                h = wh[(j + 9) % 16];
                l = wl[(j + 9) % 16];
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                th = wh[(j + 1) % 16];
                tl = wl[(j + 1) % 16];
                h = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
                l = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                th = wh[(j + 14) % 16];
                tl = wl[(j + 14) % 16];
                h = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
                l = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                wh[j] = c & 65535 | d << 16;
                wl[j] = a & 65535 | b << 16;
              }
            }
          }
          h = ah0;
          l = al0;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[0];
          l = hl[0];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[0] = ah0 = c & 65535 | d << 16;
          hl[0] = al0 = a & 65535 | b << 16;
          h = ah1;
          l = al1;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[1];
          l = hl[1];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[1] = ah1 = c & 65535 | d << 16;
          hl[1] = al1 = a & 65535 | b << 16;
          h = ah2;
          l = al2;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[2];
          l = hl[2];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[2] = ah2 = c & 65535 | d << 16;
          hl[2] = al2 = a & 65535 | b << 16;
          h = ah3;
          l = al3;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[3];
          l = hl[3];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[3] = ah3 = c & 65535 | d << 16;
          hl[3] = al3 = a & 65535 | b << 16;
          h = ah4;
          l = al4;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[4];
          l = hl[4];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[4] = ah4 = c & 65535 | d << 16;
          hl[4] = al4 = a & 65535 | b << 16;
          h = ah5;
          l = al5;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[5];
          l = hl[5];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[5] = ah5 = c & 65535 | d << 16;
          hl[5] = al5 = a & 65535 | b << 16;
          h = ah6;
          l = al6;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[6];
          l = hl[6];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[6] = ah6 = c & 65535 | d << 16;
          hl[6] = al6 = a & 65535 | b << 16;
          h = ah7;
          l = al7;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[7];
          l = hl[7];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[7] = ah7 = c & 65535 | d << 16;
          hl[7] = al7 = a & 65535 | b << 16;
          pos += 128;
          n -= 128;
        }
        return n;
      }
      function crypto_hash(out, m, n) {
        var hh = new Int32Array(8), hl = new Int32Array(8), x = new Uint8Array(256), i, b = n;
        hh[0] = 1779033703;
        hh[1] = 3144134277;
        hh[2] = 1013904242;
        hh[3] = 2773480762;
        hh[4] = 1359893119;
        hh[5] = 2600822924;
        hh[6] = 528734635;
        hh[7] = 1541459225;
        hl[0] = 4089235720;
        hl[1] = 2227873595;
        hl[2] = 4271175723;
        hl[3] = 1595750129;
        hl[4] = 2917565137;
        hl[5] = 725511199;
        hl[6] = 4215389547;
        hl[7] = 327033209;
        crypto_hashblocks_hl(hh, hl, m, n);
        n %= 128;
        for (i = 0; i < n; i++) x[i] = m[b - n + i];
        x[n] = 128;
        n = 256 - 128 * (n < 112 ? 1 : 0);
        x[n - 9] = 0;
        ts64(x, n - 8, b / 536870912 | 0, b << 3);
        crypto_hashblocks_hl(hh, hl, x, n);
        for (i = 0; i < 8; i++) ts64(out, 8 * i, hh[i], hl[i]);
        return 0;
      }
      function add2(p, q) {
        var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf(), g = gf(), h = gf(), t = gf();
        Z(a, p[1], p[0]);
        Z(t, q[1], q[0]);
        M(a, a, t);
        A(b, p[0], p[1]);
        A(t, q[0], q[1]);
        M(b, b, t);
        M(c, p[3], q[3]);
        M(c, c, D22);
        M(d, p[2], q[2]);
        A(d, d, d);
        Z(e, b, a);
        Z(f, d, c);
        A(g, d, c);
        A(h, b, a);
        M(p[0], e, f);
        M(p[1], h, g);
        M(p[2], g, f);
        M(p[3], e, h);
      }
      function cswap(p, q, b) {
        var i;
        for (i = 0; i < 4; i++) {
          sel25519(p[i], q[i], b);
        }
      }
      function pack(r, p) {
        var tx = gf(), ty = gf(), zi = gf();
        inv25519(zi, p[2]);
        M(tx, p[0], zi);
        M(ty, p[1], zi);
        pack25519(r, ty);
        r[31] ^= par25519(tx) << 7;
      }
      function scalarmult(p, q, s) {
        var b, i;
        set25519(p[0], gf0);
        set25519(p[1], gf1);
        set25519(p[2], gf1);
        set25519(p[3], gf0);
        for (i = 255; i >= 0; --i) {
          b = s[i / 8 | 0] >> (i & 7) & 1;
          cswap(p, q, b);
          add2(q, p);
          add2(p, p);
          cswap(p, q, b);
        }
      }
      function scalarbase(p, s) {
        var q = [
          gf(),
          gf(),
          gf(),
          gf()
        ];
        set25519(q[0], X);
        set25519(q[1], Y);
        set25519(q[2], gf1);
        M(q[3], X, Y);
        scalarmult(p, q, s);
      }
      function crypto_sign_keypair(pk, sk, seeded) {
        var d = new Uint8Array(64);
        var p = [
          gf(),
          gf(),
          gf(),
          gf()
        ];
        var i;
        if (!seeded) randombytes(sk, 32);
        crypto_hash(d, sk, 32);
        d[0] &= 248;
        d[31] &= 127;
        d[31] |= 64;
        scalarbase(p, d);
        pack(pk, p);
        for (i = 0; i < 32; i++) sk[i + 32] = pk[i];
        return 0;
      }
      var L2 = new Float64Array([
        237,
        211,
        245,
        92,
        26,
        99,
        18,
        88,
        214,
        156,
        247,
        162,
        222,
        249,
        222,
        20,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        16
      ]);
      function modL(r, x) {
        var carry, i, j, k;
        for (i = 63; i >= 32; --i) {
          carry = 0;
          for (j = i - 32, k = i - 12; j < k; ++j) {
            x[j] += carry - 16 * x[i] * L2[j - (i - 32)];
            carry = Math.floor((x[j] + 128) / 256);
            x[j] -= carry * 256;
          }
          x[j] += carry;
          x[i] = 0;
        }
        carry = 0;
        for (j = 0; j < 32; j++) {
          x[j] += carry - (x[31] >> 4) * L2[j];
          carry = x[j] >> 8;
          x[j] &= 255;
        }
        for (j = 0; j < 32; j++) x[j] -= carry * L2[j];
        for (i = 0; i < 32; i++) {
          x[i + 1] += x[i] >> 8;
          r[i] = x[i] & 255;
        }
      }
      function reduce(r) {
        var x = new Float64Array(64), i;
        for (i = 0; i < 64; i++) x[i] = r[i];
        for (i = 0; i < 64; i++) r[i] = 0;
        modL(r, x);
      }
      function crypto_sign(sm, m, n, sk) {
        var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
        var i, j, x = new Float64Array(64);
        var p = [
          gf(),
          gf(),
          gf(),
          gf()
        ];
        crypto_hash(d, sk, 32);
        d[0] &= 248;
        d[31] &= 127;
        d[31] |= 64;
        var smlen = n + 64;
        for (i = 0; i < n; i++) sm[64 + i] = m[i];
        for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];
        crypto_hash(r, sm.subarray(32), n + 32);
        reduce(r);
        scalarbase(p, r);
        pack(sm, p);
        for (i = 32; i < 64; i++) sm[i] = sk[i];
        crypto_hash(h, sm, n + 64);
        reduce(h);
        for (i = 0; i < 64; i++) x[i] = 0;
        for (i = 0; i < 32; i++) x[i] = r[i];
        for (i = 0; i < 32; i++) {
          for (j = 0; j < 32; j++) {
            x[i + j] += h[i] * d[j];
          }
        }
        modL(sm.subarray(32), x);
        return smlen;
      }
      function unpackneg(r, p) {
        var t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
        set25519(r[2], gf1);
        unpack25519(r[1], p);
        S(num, r[1]);
        M(den, num, D2);
        Z(num, num, r[2]);
        A(den, r[2], den);
        S(den2, den);
        S(den4, den2);
        M(den6, den4, den2);
        M(t, den6, num);
        M(t, t, den);
        pow2523(t, t);
        M(t, t, num);
        M(t, t, den);
        M(t, t, den);
        M(r[0], t, den);
        S(chk, r[0]);
        M(chk, chk, den);
        if (neq25519(chk, num)) M(r[0], r[0], I);
        S(chk, r[0]);
        M(chk, chk, den);
        if (neq25519(chk, num)) return -1;
        if (par25519(r[0]) === p[31] >> 7) Z(r[0], gf0, r[0]);
        M(r[3], r[0], r[1]);
        return 0;
      }
      function crypto_sign_open(m, sm, n, pk) {
        var i;
        var t = new Uint8Array(32), h = new Uint8Array(64);
        var p = [
          gf(),
          gf(),
          gf(),
          gf()
        ], q = [
          gf(),
          gf(),
          gf(),
          gf()
        ];
        if (n < 64) return -1;
        if (unpackneg(q, pk)) return -1;
        for (i = 0; i < n; i++) m[i] = sm[i];
        for (i = 0; i < 32; i++) m[i + 32] = pk[i];
        crypto_hash(h, m, n);
        reduce(h);
        scalarmult(p, q, h);
        scalarbase(q, sm.subarray(32));
        add2(p, q);
        pack(t, p);
        n -= 64;
        if (crypto_verify_32(sm, 0, t, 0)) {
          for (i = 0; i < n; i++) m[i] = 0;
          return -1;
        }
        for (i = 0; i < n; i++) m[i] = sm[i + 64];
        return n;
      }
      var crypto_secretbox_KEYBYTES = 32, crypto_secretbox_NONCEBYTES = 24, crypto_secretbox_ZEROBYTES = 32, crypto_secretbox_BOXZEROBYTES = 16, crypto_scalarmult_BYTES = 32, crypto_scalarmult_SCALARBYTES = 32, crypto_box_PUBLICKEYBYTES = 32, crypto_box_SECRETKEYBYTES = 32, crypto_box_BEFORENMBYTES = 32, crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES, crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES, crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES, crypto_sign_BYTES = 64, crypto_sign_PUBLICKEYBYTES = 32, crypto_sign_SECRETKEYBYTES = 64, crypto_sign_SEEDBYTES = 32, crypto_hash_BYTES = 64;
      nacl.lowlevel = {
        crypto_core_hsalsa20,
        crypto_stream_xor,
        crypto_stream,
        crypto_stream_salsa20_xor,
        crypto_stream_salsa20,
        crypto_onetimeauth,
        crypto_onetimeauth_verify,
        crypto_verify_16,
        crypto_verify_32,
        crypto_secretbox,
        crypto_secretbox_open,
        crypto_scalarmult,
        crypto_scalarmult_base,
        crypto_box_beforenm,
        crypto_box_afternm,
        crypto_box,
        crypto_box_open,
        crypto_box_keypair,
        crypto_hash,
        crypto_sign,
        crypto_sign_keypair,
        crypto_sign_open,
        crypto_secretbox_KEYBYTES,
        crypto_secretbox_NONCEBYTES,
        crypto_secretbox_ZEROBYTES,
        crypto_secretbox_BOXZEROBYTES,
        crypto_scalarmult_BYTES,
        crypto_scalarmult_SCALARBYTES,
        crypto_box_PUBLICKEYBYTES,
        crypto_box_SECRETKEYBYTES,
        crypto_box_BEFORENMBYTES,
        crypto_box_NONCEBYTES,
        crypto_box_ZEROBYTES,
        crypto_box_BOXZEROBYTES,
        crypto_sign_BYTES,
        crypto_sign_PUBLICKEYBYTES,
        crypto_sign_SECRETKEYBYTES,
        crypto_sign_SEEDBYTES,
        crypto_hash_BYTES,
        gf,
        D: D2,
        L: L2,
        pack25519,
        unpack25519,
        M,
        A,
        S,
        Z,
        pow2523,
        add: add2,
        set25519,
        modL,
        scalarmult,
        scalarbase
      };
      function checkLengths(k, n) {
        if (k.length !== crypto_secretbox_KEYBYTES) throw new Error("bad key size");
        if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error("bad nonce size");
      }
      function checkBoxLengths(pk, sk) {
        if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error("bad public key size");
        if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error("bad secret key size");
      }
      function checkArrayTypes() {
        for (var i = 0; i < arguments.length; i++) {
          if (!(arguments[i] instanceof Uint8Array)) throw new TypeError("unexpected type, use Uint8Array");
        }
      }
      function cleanup(arr) {
        for (var i = 0; i < arr.length; i++) arr[i] = 0;
      }
      nacl.randomBytes = function(n) {
        var b = new Uint8Array(n);
        randombytes(b, n);
        return b;
      };
      nacl.secretbox = function(msg, nonce, key) {
        checkArrayTypes(msg, nonce, key);
        checkLengths(key, nonce);
        var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
        var c = new Uint8Array(m.length);
        for (var i = 0; i < msg.length; i++) m[i + crypto_secretbox_ZEROBYTES] = msg[i];
        crypto_secretbox(c, m, m.length, nonce, key);
        return c.subarray(crypto_secretbox_BOXZEROBYTES);
      };
      nacl.secretbox.open = function(box, nonce, key) {
        checkArrayTypes(box, nonce, key);
        checkLengths(key, nonce);
        var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
        var m = new Uint8Array(c.length);
        for (var i = 0; i < box.length; i++) c[i + crypto_secretbox_BOXZEROBYTES] = box[i];
        if (c.length < 32) return null;
        if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
        return m.subarray(crypto_secretbox_ZEROBYTES);
      };
      nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
      nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
      nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;
      nacl.scalarMult = function(n, p) {
        checkArrayTypes(n, p);
        if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error("bad n size");
        if (p.length !== crypto_scalarmult_BYTES) throw new Error("bad p size");
        var q = new Uint8Array(crypto_scalarmult_BYTES);
        crypto_scalarmult(q, n, p);
        return q;
      };
      nacl.scalarMult.base = function(n) {
        checkArrayTypes(n);
        if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error("bad n size");
        var q = new Uint8Array(crypto_scalarmult_BYTES);
        crypto_scalarmult_base(q, n);
        return q;
      };
      nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
      nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;
      nacl.box = function(msg, nonce, publicKey, secretKey) {
        var k = nacl.box.before(publicKey, secretKey);
        return nacl.secretbox(msg, nonce, k);
      };
      nacl.box.before = function(publicKey, secretKey) {
        checkArrayTypes(publicKey, secretKey);
        checkBoxLengths(publicKey, secretKey);
        var k = new Uint8Array(crypto_box_BEFORENMBYTES);
        crypto_box_beforenm(k, publicKey, secretKey);
        return k;
      };
      nacl.box.after = nacl.secretbox;
      nacl.box.open = function(msg, nonce, publicKey, secretKey) {
        var k = nacl.box.before(publicKey, secretKey);
        return nacl.secretbox.open(msg, nonce, k);
      };
      nacl.box.open.after = nacl.secretbox.open;
      nacl.box.keyPair = function() {
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
        crypto_box_keypair(pk, sk);
        return {
          publicKey: pk,
          secretKey: sk
        };
      };
      nacl.box.keyPair.fromSecretKey = function(secretKey) {
        checkArrayTypes(secretKey);
        if (secretKey.length !== crypto_box_SECRETKEYBYTES) throw new Error("bad secret key size");
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        crypto_scalarmult_base(pk, secretKey);
        return {
          publicKey: pk,
          secretKey: new Uint8Array(secretKey)
        };
      };
      nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
      nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
      nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
      nacl.box.nonceLength = crypto_box_NONCEBYTES;
      nacl.box.overheadLength = nacl.secretbox.overheadLength;
      nacl.sign = function(msg, secretKey) {
        checkArrayTypes(msg, secretKey);
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES) throw new Error("bad secret key size");
        var signedMsg = new Uint8Array(crypto_sign_BYTES + msg.length);
        crypto_sign(signedMsg, msg, msg.length, secretKey);
        return signedMsg;
      };
      nacl.sign.open = function(signedMsg, publicKey) {
        checkArrayTypes(signedMsg, publicKey);
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES) throw new Error("bad public key size");
        var tmp = new Uint8Array(signedMsg.length);
        var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
        if (mlen < 0) return null;
        var m = new Uint8Array(mlen);
        for (var i = 0; i < m.length; i++) m[i] = tmp[i];
        return m;
      };
      nacl.sign.detached = function(msg, secretKey) {
        var signedMsg = nacl.sign(msg, secretKey);
        var sig = new Uint8Array(crypto_sign_BYTES);
        for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
        return sig;
      };
      nacl.sign.detached.verify = function(msg, sig, publicKey) {
        checkArrayTypes(msg, sig, publicKey);
        if (sig.length !== crypto_sign_BYTES) throw new Error("bad signature size");
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES) throw new Error("bad public key size");
        var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
        var m = new Uint8Array(crypto_sign_BYTES + msg.length);
        var i;
        for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
        for (i = 0; i < msg.length; i++) sm[i + crypto_sign_BYTES] = msg[i];
        return crypto_sign_open(m, sm, sm.length, publicKey) >= 0;
      };
      nacl.sign.keyPair = function() {
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
        crypto_sign_keypair(pk, sk);
        return {
          publicKey: pk,
          secretKey: sk
        };
      };
      nacl.sign.keyPair.fromSecretKey = function(secretKey) {
        checkArrayTypes(secretKey);
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES) throw new Error("bad secret key size");
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32 + i];
        return {
          publicKey: pk,
          secretKey: new Uint8Array(secretKey)
        };
      };
      nacl.sign.keyPair.fromSeed = function(seed) {
        checkArrayTypes(seed);
        if (seed.length !== crypto_sign_SEEDBYTES) throw new Error("bad seed size");
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
        for (var i = 0; i < 32; i++) sk[i] = seed[i];
        crypto_sign_keypair(pk, sk, true);
        return {
          publicKey: pk,
          secretKey: sk
        };
      };
      nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
      nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
      nacl.sign.seedLength = crypto_sign_SEEDBYTES;
      nacl.sign.signatureLength = crypto_sign_BYTES;
      nacl.hash = function(msg) {
        checkArrayTypes(msg);
        var h = new Uint8Array(crypto_hash_BYTES);
        crypto_hash(h, msg, msg.length);
        return h;
      };
      nacl.hash.hashLength = crypto_hash_BYTES;
      nacl.verify = function(x, y) {
        checkArrayTypes(x, y);
        if (x.length === 0 || y.length === 0) return false;
        if (x.length !== y.length) return false;
        return vn(x, 0, y, 0, x.length) === 0 ? true : false;
      };
      nacl.setPRNG = function(fn) {
        randombytes = fn;
      };
      (function() {
        var crypto2 = typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
        if (crypto2 && crypto2.getRandomValues) {
          var QUOTA = 65536;
          nacl.setPRNG(function(x, n) {
            var i, v = new Uint8Array(n);
            for (i = 0; i < n; i += QUOTA) {
              crypto2.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
            }
            for (i = 0; i < n; i++) x[i] = v[i];
            cleanup(v);
          });
        } else if (typeof __require !== "undefined") {
          crypto2 = require_deno_browser_disabled_crypto();
          if (crypto2 && crypto2.randomBytes) {
            nacl.setPRNG(function(x, n) {
              var i, v = crypto2.randomBytes(n);
              for (i = 0; i < n; i++) x[i] = v[i];
              cleanup(v);
            });
          }
        }
      })();
    })(typeof module !== "undefined" && module.exports ? module.exports : self.nacl = self.nacl || {});
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/identity.js
function isCollection(node) {
  if (node && typeof node === "object") switch (node[NODE_TYPE]) {
    case MAP:
    case SEQ:
      return true;
  }
  return false;
}
function isNode(node) {
  if (node && typeof node === "object") switch (node[NODE_TYPE]) {
    case ALIAS:
    case MAP:
    case SCALAR:
    case SEQ:
      return true;
  }
  return false;
}
var ALIAS, DOC, MAP, PAIR, SCALAR, SEQ, NODE_TYPE, isAlias, isDocument, isMap, isPair, isScalar, isSeq, hasAnchor;
var init_identity = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/identity.js"() {
    ALIAS = Symbol.for("yaml.alias");
    DOC = Symbol.for("yaml.document");
    MAP = Symbol.for("yaml.map");
    PAIR = Symbol.for("yaml.pair");
    SCALAR = Symbol.for("yaml.scalar");
    SEQ = Symbol.for("yaml.seq");
    NODE_TYPE = Symbol.for("yaml.node.type");
    isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
    isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
    isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
    isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
    isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
    isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
    hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/visit.js
function visit(node, visitor) {
  const visitor_ = initVisitor(visitor);
  if (isDocument(node)) {
    const cd = visit_(null, node.contents, visitor_, Object.freeze([
      node
    ]));
    if (cd === REMOVE) node.contents = null;
  } else visit_(null, node, visitor_, Object.freeze([]));
}
function visit_(key, node, visitor, path) {
  const ctrl = callVisitor(key, node, visitor, path);
  if (isNode(ctrl) || isPair(ctrl)) {
    replaceNode(key, path, ctrl);
    return visit_(key, ctrl, visitor, path);
  }
  if (typeof ctrl !== "symbol") {
    if (isCollection(node)) {
      path = Object.freeze(path.concat(node));
      for (let i = 0; i < node.items.length; ++i) {
        const ci = visit_(i, node.items[i], visitor, path);
        if (typeof ci === "number") i = ci - 1;
        else if (ci === BREAK) return BREAK;
        else if (ci === REMOVE) {
          node.items.splice(i, 1);
          i -= 1;
        }
      }
    } else if (isPair(node)) {
      path = Object.freeze(path.concat(node));
      const ck = visit_("key", node.key, visitor, path);
      if (ck === BREAK) return BREAK;
      else if (ck === REMOVE) node.key = null;
      const cv = visit_("value", node.value, visitor, path);
      if (cv === BREAK) return BREAK;
      else if (cv === REMOVE) node.value = null;
    }
  }
  return ctrl;
}
async function visitAsync(node, visitor) {
  const visitor_ = initVisitor(visitor);
  if (isDocument(node)) {
    const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([
      node
    ]));
    if (cd === REMOVE) node.contents = null;
  } else await visitAsync_(null, node, visitor_, Object.freeze([]));
}
async function visitAsync_(key, node, visitor, path) {
  const ctrl = await callVisitor(key, node, visitor, path);
  if (isNode(ctrl) || isPair(ctrl)) {
    replaceNode(key, path, ctrl);
    return visitAsync_(key, ctrl, visitor, path);
  }
  if (typeof ctrl !== "symbol") {
    if (isCollection(node)) {
      path = Object.freeze(path.concat(node));
      for (let i = 0; i < node.items.length; ++i) {
        const ci = await visitAsync_(i, node.items[i], visitor, path);
        if (typeof ci === "number") i = ci - 1;
        else if (ci === BREAK) return BREAK;
        else if (ci === REMOVE) {
          node.items.splice(i, 1);
          i -= 1;
        }
      }
    } else if (isPair(node)) {
      path = Object.freeze(path.concat(node));
      const ck = await visitAsync_("key", node.key, visitor, path);
      if (ck === BREAK) return BREAK;
      else if (ck === REMOVE) node.key = null;
      const cv = await visitAsync_("value", node.value, visitor, path);
      if (cv === BREAK) return BREAK;
      else if (cv === REMOVE) node.value = null;
    }
  }
  return ctrl;
}
function initVisitor(visitor) {
  if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
    return Object.assign({
      Alias: visitor.Node,
      Map: visitor.Node,
      Scalar: visitor.Node,
      Seq: visitor.Node
    }, visitor.Value && {
      Map: visitor.Value,
      Scalar: visitor.Value,
      Seq: visitor.Value
    }, visitor.Collection && {
      Map: visitor.Collection,
      Seq: visitor.Collection
    }, visitor);
  }
  return visitor;
}
function callVisitor(key, node, visitor, path) {
  if (typeof visitor === "function") return visitor(key, node, path);
  if (isMap(node)) return visitor.Map?.(key, node, path);
  if (isSeq(node)) return visitor.Seq?.(key, node, path);
  if (isPair(node)) return visitor.Pair?.(key, node, path);
  if (isScalar(node)) return visitor.Scalar?.(key, node, path);
  if (isAlias(node)) return visitor.Alias?.(key, node, path);
  return void 0;
}
function replaceNode(key, path, node) {
  const parent = path[path.length - 1];
  if (isCollection(parent)) {
    parent.items[key] = node;
  } else if (isPair(parent)) {
    if (key === "key") parent.key = node;
    else parent.value = node;
  } else if (isDocument(parent)) {
    parent.contents = node;
  } else {
    const pt = isAlias(parent) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${pt} parent`);
  }
}
var BREAK, SKIP, REMOVE;
var init_visit = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/visit.js"() {
    init_identity();
    BREAK = Symbol("break visit");
    SKIP = Symbol("skip children");
    REMOVE = Symbol("remove node");
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    visitAsync.BREAK = BREAK;
    visitAsync.SKIP = SKIP;
    visitAsync.REMOVE = REMOVE;
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/doc/directives.js
var escapeChars, escapeTagName, Directives;
var init_directives = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/doc/directives.js"() {
    init_identity();
    init_visit();
    escapeChars = {
      "!": "%21",
      ",": "%2C",
      "[": "%5B",
      "]": "%5D",
      "{": "%7B",
      "}": "%7D"
    };
    escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
    Directives = class _Directives {
      constructor(yaml, tags) {
        this.docStart = null;
        this.docEnd = false;
        this.yaml = Object.assign({}, _Directives.defaultYaml, yaml);
        this.tags = Object.assign({}, _Directives.defaultTags, tags);
      }
      clone() {
        const copy = new _Directives(this.yaml, this.tags);
        copy.docStart = this.docStart;
        return copy;
      }
      /**
         * During parsing, get a Directives instance for the current document and
         * update the stream state according to the current version's spec.
         */
      atDocument() {
        const res = new _Directives(this.yaml, this.tags);
        switch (this.yaml.version) {
          case "1.1":
            this.atNextDocument = true;
            break;
          case "1.2":
            this.atNextDocument = false;
            this.yaml = {
              explicit: _Directives.defaultYaml.explicit,
              version: "1.2"
            };
            this.tags = Object.assign({}, _Directives.defaultTags);
            break;
        }
        return res;
      }
      /**
         * @param onError - May be called even if the action was successful
         * @returns `true` on success
         */
      add(line, onError) {
        if (this.atNextDocument) {
          this.yaml = {
            explicit: _Directives.defaultYaml.explicit,
            version: "1.1"
          };
          this.tags = Object.assign({}, _Directives.defaultTags);
          this.atNextDocument = false;
        }
        const parts = line.trim().split(/[ \t]+/);
        const name2 = parts.shift();
        switch (name2) {
          case "%TAG": {
            if (parts.length !== 2) {
              onError(0, "%TAG directive should contain exactly two parts");
              if (parts.length < 2) return false;
            }
            const [handle, prefix] = parts;
            this.tags[handle] = prefix;
            return true;
          }
          case "%YAML": {
            this.yaml.explicit = true;
            if (parts.length !== 1) {
              onError(0, "%YAML directive should contain exactly one part");
              return false;
            }
            const [version] = parts;
            if (version === "1.1" || version === "1.2") {
              this.yaml.version = version;
              return true;
            } else {
              const isValid2 = /^\d+\.\d+$/.test(version);
              onError(6, `Unsupported YAML version ${version}`, isValid2);
              return false;
            }
          }
          default:
            onError(0, `Unknown directive ${name2}`, true);
            return false;
        }
      }
      /**
         * Resolves a tag, matching handles to those defined in %TAG directives.
         *
         * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
         *   `'!local'` tag, or `null` if unresolvable.
         */
      tagName(source, onError) {
        if (source === "!") return "!";
        if (source[0] !== "!") {
          onError(`Not a valid tag: ${source}`);
          return null;
        }
        if (source[1] === "<") {
          const verbatim = source.slice(2, -1);
          if (verbatim === "!" || verbatim === "!!") {
            onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
            return null;
          }
          if (source[source.length - 1] !== ">") onError("Verbatim tags must end with a >");
          return verbatim;
        }
        const [, handle, suffix2] = source.match(/^(.*!)([^!]*)$/s);
        if (!suffix2) onError(`The ${source} tag has no suffix`);
        const prefix = this.tags[handle];
        if (prefix) {
          try {
            return prefix + decodeURIComponent(suffix2);
          } catch (error) {
            onError(String(error));
            return null;
          }
        }
        if (handle === "!") return source;
        onError(`Could not resolve tag: ${source}`);
        return null;
      }
      /**
         * Given a fully resolved tag, returns its printable string form,
         * taking into account current tag prefixes and defaults.
         */
      tagString(tag) {
        for (const [handle, prefix] of Object.entries(this.tags)) {
          if (tag.startsWith(prefix)) return handle + escapeTagName(tag.substring(prefix.length));
        }
        return tag[0] === "!" ? tag : `!<${tag}>`;
      }
      toString(doc) {
        const lines2 = this.yaml.explicit ? [
          `%YAML ${this.yaml.version || "1.2"}`
        ] : [];
        const tagEntries = Object.entries(this.tags);
        let tagNames;
        if (doc && tagEntries.length > 0 && isNode(doc.contents)) {
          const tags = {};
          visit(doc.contents, (_key, node) => {
            if (isNode(node) && node.tag) tags[node.tag] = true;
          });
          tagNames = Object.keys(tags);
        } else tagNames = [];
        for (const [handle, prefix] of tagEntries) {
          if (handle === "!!" && prefix === "tag:yaml.org,2002:") continue;
          if (!doc || tagNames.some((tn) => tn.startsWith(prefix))) lines2.push(`%TAG ${handle} ${prefix}`);
        }
        return lines2.join("\n");
      }
    };
    Directives.defaultYaml = {
      explicit: false,
      version: "1.2"
    };
    Directives.defaultTags = {
      "!!": "tag:yaml.org,2002:"
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/doc/anchors.js
function anchorIsValid(anchor) {
  if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
    const sa = JSON.stringify(anchor);
    const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
    throw new Error(msg);
  }
  return true;
}
function anchorNames(root) {
  const anchors = /* @__PURE__ */ new Set();
  visit(root, {
    Value(_key, node) {
      if (node.anchor) anchors.add(node.anchor);
    }
  });
  return anchors;
}
function findNewAnchor(prefix, exclude) {
  for (let i = 1; true; ++i) {
    const name2 = `${prefix}${i}`;
    if (!exclude.has(name2)) return name2;
  }
}
function createNodeAnchors(doc, prefix) {
  const aliasObjects = [];
  const sourceObjects = /* @__PURE__ */ new Map();
  let prevAnchors = null;
  return {
    onAnchor: (source) => {
      aliasObjects.push(source);
      prevAnchors ?? (prevAnchors = anchorNames(doc));
      const anchor = findNewAnchor(prefix, prevAnchors);
      prevAnchors.add(anchor);
      return anchor;
    },
    /**
         * With circular references, the source node is only resolved after all
         * of its child nodes are. This is why anchors are set only after all of
         * the nodes have been created.
         */
    setAnchors: () => {
      for (const source of aliasObjects) {
        const ref = sourceObjects.get(source);
        if (typeof ref === "object" && ref.anchor && (isScalar(ref.node) || isCollection(ref.node))) {
          ref.node.anchor = ref.anchor;
        } else {
          const error = new Error("Failed to resolve repeated object (this should not happen)");
          error.source = source;
          throw error;
        }
      }
    },
    sourceObjects
  };
}
var init_anchors = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/doc/anchors.js"() {
    init_identity();
    init_visit();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/doc/applyReviver.js
function applyReviver(reviver, obj, key, val) {
  if (val && typeof val === "object") {
    if (Array.isArray(val)) {
      for (let i = 0, len = val.length; i < len; ++i) {
        const v0 = val[i];
        const v1 = applyReviver(reviver, val, String(i), v0);
        if (v1 === void 0) delete val[i];
        else if (v1 !== v0) val[i] = v1;
      }
    } else if (val instanceof Map) {
      for (const k of Array.from(val.keys())) {
        const v0 = val.get(k);
        const v1 = applyReviver(reviver, val, k, v0);
        if (v1 === void 0) val.delete(k);
        else if (v1 !== v0) val.set(k, v1);
      }
    } else if (val instanceof Set) {
      for (const v0 of Array.from(val)) {
        const v1 = applyReviver(reviver, val, v0, v0);
        if (v1 === void 0) val.delete(v0);
        else if (v1 !== v0) {
          val.delete(v0);
          val.add(v1);
        }
      }
    } else {
      for (const [k, v0] of Object.entries(val)) {
        const v1 = applyReviver(reviver, val, k, v0);
        if (v1 === void 0) delete val[k];
        else if (v1 !== v0) val[k] = v1;
      }
    }
  }
  return reviver.call(obj, key, val);
}
var init_applyReviver = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/doc/applyReviver.js"() {
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/toJS.js
function toJS(value, arg, ctx) {
  if (Array.isArray(value)) return value.map((v, i) => toJS(v, String(i), ctx));
  if (value && typeof value.toJSON === "function") {
    if (!ctx || !hasAnchor(value)) return value.toJSON(arg, ctx);
    const data2 = {
      aliasCount: 0,
      count: 1,
      res: void 0
    };
    ctx.anchors.set(value, data2);
    ctx.onCreate = (res2) => {
      data2.res = res2;
      delete ctx.onCreate;
    };
    const res = value.toJSON(arg, ctx);
    if (ctx.onCreate) ctx.onCreate(res);
    return res;
  }
  if (typeof value === "bigint" && !ctx?.keep) return Number(value);
  return value;
}
var init_toJS = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/toJS.js"() {
    init_identity();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/Node.js
var NodeBase;
var init_Node = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/Node.js"() {
    init_applyReviver();
    init_identity();
    init_toJS();
    NodeBase = class {
      constructor(type) {
        Object.defineProperty(this, NODE_TYPE, {
          value: type
        });
      }
      /** Create a copy of this node.  */
      clone() {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (this.range) copy.range = this.range.slice();
        return copy;
      }
      /** A plain JavaScript representation of this node. */
      toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        if (!isDocument(doc)) throw new TypeError("A document argument is required");
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc,
          keep: true,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS(this, "", ctx);
        if (typeof onAnchor === "function") for (const { count, res: res2 } of ctx.anchors.values()) onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver(reviver, {
          "": res
        }, "", res) : res;
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/Alias.js
function getAliasCount(doc, node, anchors) {
  if (isAlias(node)) {
    const source = node.resolve(doc);
    const anchor = anchors && source && anchors.get(source);
    return anchor ? anchor.count * anchor.aliasCount : 0;
  } else if (isCollection(node)) {
    let count = 0;
    for (const item of node.items) {
      const c = getAliasCount(doc, item, anchors);
      if (c > count) count = c;
    }
    return count;
  } else if (isPair(node)) {
    const kc = getAliasCount(doc, node.key, anchors);
    const vc = getAliasCount(doc, node.value, anchors);
    return Math.max(kc, vc);
  }
  return 1;
}
var Alias;
var init_Alias = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/Alias.js"() {
    init_anchors();
    init_visit();
    init_identity();
    init_Node();
    init_toJS();
    Alias = class extends NodeBase {
      constructor(source) {
        super(ALIAS);
        this.source = source;
        Object.defineProperty(this, "tag", {
          set() {
            throw new Error("Alias nodes cannot have tags");
          }
        });
      }
      /**
         * Resolve the value of this alias within `doc`, finding the last
         * instance of the `source` anchor before this node.
         */
      resolve(doc, ctx) {
        let nodes;
        if (ctx?.aliasResolveCache) {
          nodes = ctx.aliasResolveCache;
        } else {
          nodes = [];
          visit(doc, {
            Node: (_key, node) => {
              if (isAlias(node) || hasAnchor(node)) nodes.push(node);
            }
          });
          if (ctx) ctx.aliasResolveCache = nodes;
        }
        let found2 = void 0;
        for (const node of nodes) {
          if (node === this) break;
          if (node.anchor === this.source) found2 = node;
        }
        return found2;
      }
      toJSON(_arg, ctx) {
        if (!ctx) return {
          source: this.source
        };
        const { anchors, doc, maxAliasCount } = ctx;
        const source = this.resolve(doc, ctx);
        if (!source) {
          const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
          throw new ReferenceError(msg);
        }
        let data2 = anchors.get(source);
        if (!data2) {
          toJS(source, null, ctx);
          data2 = anchors.get(source);
        }
        if (!data2 || data2.res === void 0) {
          const msg = "This should not happen: Alias anchor was not resolved?";
          throw new ReferenceError(msg);
        }
        if (maxAliasCount >= 0) {
          data2.count += 1;
          if (data2.aliasCount === 0) data2.aliasCount = getAliasCount(doc, source, anchors);
          if (data2.count * data2.aliasCount > maxAliasCount) {
            const msg = "Excessive alias count indicates a resource exhaustion attack";
            throw new ReferenceError(msg);
          }
        }
        return data2.res;
      }
      toString(ctx, _onComment, _onChompKeep) {
        const src = `*${this.source}`;
        if (ctx) {
          anchorIsValid(this.source);
          if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
            const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new Error(msg);
          }
          if (ctx.implicitKey) return `${src} `;
        }
        return src;
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/Scalar.js
var isScalarValue, Scalar;
var init_Scalar = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/Scalar.js"() {
    init_identity();
    init_Node();
    init_toJS();
    isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
    Scalar = class extends NodeBase {
      constructor(value) {
        super(SCALAR);
        this.value = value;
      }
      toJSON(arg, ctx) {
        return ctx?.keep ? this.value : toJS(this.value, arg, ctx);
      }
      toString() {
        return String(this.value);
      }
    };
    Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
    Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
    Scalar.PLAIN = "PLAIN";
    Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
    Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/doc/createNode.js
function findTagObject(value, tagName, tags) {
  if (tagName) {
    const match = tags.filter((t) => t.tag === tagName);
    const tagObj = match.find((t) => !t.format) ?? match[0];
    if (!tagObj) throw new Error(`Tag ${tagName} not found`);
    return tagObj;
  }
  return tags.find((t) => t.identify?.(value) && !t.format);
}
function createNode(value, tagName, ctx) {
  if (isDocument(value)) value = value.contents;
  if (isNode(value)) return value;
  if (isPair(value)) {
    const map2 = ctx.schema[MAP].createNode?.(ctx.schema, null, ctx);
    map2.items.push(value);
    return map2;
  }
  if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
    value = value.valueOf();
  }
  const { aliasDuplicateObjects, onAnchor, onTagObj, schema: schema4, sourceObjects } = ctx;
  let ref = void 0;
  if (aliasDuplicateObjects && value && typeof value === "object") {
    ref = sourceObjects.get(value);
    if (ref) {
      ref.anchor ?? (ref.anchor = onAnchor(value));
      return new Alias(ref.anchor);
    } else {
      ref = {
        anchor: null,
        node: null
      };
      sourceObjects.set(value, ref);
    }
  }
  if (tagName?.startsWith("!!")) tagName = defaultTagPrefix + tagName.slice(2);
  let tagObj = findTagObject(value, tagName, schema4.tags);
  if (!tagObj) {
    if (value && typeof value.toJSON === "function") {
      value = value.toJSON();
    }
    if (!value || typeof value !== "object") {
      const node2 = new Scalar(value);
      if (ref) ref.node = node2;
      return node2;
    }
    tagObj = value instanceof Map ? schema4[MAP] : Symbol.iterator in Object(value) ? schema4[SEQ] : schema4[MAP];
  }
  if (onTagObj) {
    onTagObj(tagObj);
    delete ctx.onTagObj;
  }
  const node = tagObj?.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof tagObj?.nodeClass?.from === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar(value);
  if (tagName) node.tag = tagName;
  else if (!tagObj.default) node.tag = tagObj.tag;
  if (ref) ref.node = node;
  return node;
}
var defaultTagPrefix;
var init_createNode = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/doc/createNode.js"() {
    init_Alias();
    init_identity();
    init_Scalar();
    defaultTagPrefix = "tag:yaml.org,2002:";
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/Collection.js
function collectionFromPath(schema4, path, value) {
  let v = value;
  for (let i = path.length - 1; i >= 0; --i) {
    const k = path[i];
    if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
      const a = [];
      a[k] = v;
      v = a;
    } else {
      v = /* @__PURE__ */ new Map([
        [
          k,
          v
        ]
      ]);
    }
  }
  return createNode(v, void 0, {
    aliasDuplicateObjects: false,
    keepUndefined: false,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: schema4,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
var isEmptyPath, Collection;
var init_Collection = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/Collection.js"() {
    init_createNode();
    init_identity();
    init_Node();
    isEmptyPath = (path) => path == null || typeof path === "object" && !!path[Symbol.iterator]().next().done;
    Collection = class extends NodeBase {
      constructor(type, schema4) {
        super(type);
        Object.defineProperty(this, "schema", {
          value: schema4,
          configurable: true,
          enumerable: false,
          writable: true
        });
      }
      /**
         * Create a copy of this collection.
         *
         * @param schema - If defined, overwrites the original's schema
         */
      clone(schema4) {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (schema4) copy.schema = schema4;
        copy.items = copy.items.map((it) => isNode(it) || isPair(it) ? it.clone(schema4) : it);
        if (this.range) copy.range = this.range.slice();
        return copy;
      }
      /**
         * Adds a value to the collection. For `!!map` and `!!omap` the value must
         * be a Pair instance or a `{ key, value }` object, which may not have a key
         * that already exists in the map.
         */
      addIn(path, value) {
        if (isEmptyPath(path)) this.add(value);
        else {
          const [key, ...rest] = path;
          const node = this.get(key, true);
          if (isCollection(node)) node.addIn(rest, value);
          else if (node === void 0 && this.schema) this.set(key, collectionFromPath(this.schema, rest, value));
          else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      /**
         * Removes a value from the collection.
         * @returns `true` if the item was found and removed.
         */
      deleteIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0) return this.delete(key);
        const node = this.get(key, true);
        if (isCollection(node)) return node.deleteIn(rest);
        else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      /**
         * Returns item at `key`, or `undefined` if not found. By default unwraps
         * scalar values from their surrounding node; to disable set `keepScalar` to
         * `true` (collections are always returned intact).
         */
      getIn(path, keepScalar) {
        const [key, ...rest] = path;
        const node = this.get(key, true);
        if (rest.length === 0) return !keepScalar && isScalar(node) ? node.value : node;
        else return isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues(allowScalar) {
        return this.items.every((node) => {
          if (!isPair(node)) return false;
          const n = node.value;
          return n == null || allowScalar && isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
        });
      }
      /**
         * Checks if the collection includes a value with the key `key`.
         */
      hasIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0) return this.has(key);
        const node = this.get(key, true);
        return isCollection(node) ? node.hasIn(rest) : false;
      }
      /**
         * Sets a value in this collection. For `!!set`, `value` needs to be a
         * boolean to add/remove the item from the set.
         */
      setIn(path, value) {
        const [key, ...rest] = path;
        if (rest.length === 0) {
          this.set(key, value);
        } else {
          const node = this.get(key, true);
          if (isCollection(node)) node.setIn(rest, value);
          else if (node === void 0 && this.schema) this.set(key, collectionFromPath(this.schema, rest, value));
          else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/stringifyComment.js
function indentComment(comment, indent) {
  if (/^\n+$/.test(comment)) return comment.substring(1);
  return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
}
var stringifyComment, lineComment;
var init_stringifyComment = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/stringifyComment.js"() {
    stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
    lineComment = (str, indent, comment) => str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment;
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/foldFlowLines.js
function foldFlowLines(text3, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
  if (!lineWidth || lineWidth < 0) return text3;
  if (lineWidth < minContentWidth) minContentWidth = 0;
  const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
  if (text3.length <= endStep) return text3;
  const folds = [];
  const escapedFolds = {};
  let end = lineWidth - indent.length;
  if (typeof indentAtStart === "number") {
    if (indentAtStart > lineWidth - Math.max(2, minContentWidth)) folds.push(0);
    else end = lineWidth - indentAtStart;
  }
  let split = void 0;
  let prev = void 0;
  let overflow = false;
  let i = -1;
  let escStart = -1;
  let escEnd = -1;
  if (mode === FOLD_BLOCK) {
    i = consumeMoreIndentedLines(text3, i, indent.length);
    if (i !== -1) end = i + endStep;
  }
  for (let ch; ch = text3[i += 1]; ) {
    if (mode === FOLD_QUOTED && ch === "\\") {
      escStart = i;
      switch (text3[i + 1]) {
        case "x":
          i += 3;
          break;
        case "u":
          i += 5;
          break;
        case "U":
          i += 9;
          break;
        default:
          i += 1;
      }
      escEnd = i;
    }
    if (ch === "\n") {
      if (mode === FOLD_BLOCK) i = consumeMoreIndentedLines(text3, i, indent.length);
      end = i + indent.length + endStep;
      split = void 0;
    } else {
      if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
        const next = text3[i + 1];
        if (next && next !== " " && next !== "\n" && next !== "	") split = i;
      }
      if (i >= end) {
        if (split) {
          folds.push(split);
          end = split + endStep;
          split = void 0;
        } else if (mode === FOLD_QUOTED) {
          while (prev === " " || prev === "	") {
            prev = ch;
            ch = text3[i += 1];
            overflow = true;
          }
          const j = i > escEnd + 1 ? i - 2 : escStart - 1;
          if (escapedFolds[j]) return text3;
          folds.push(j);
          escapedFolds[j] = true;
          end = j + endStep;
          split = void 0;
        } else {
          overflow = true;
        }
      }
    }
    prev = ch;
  }
  if (overflow && onOverflow) onOverflow();
  if (folds.length === 0) return text3;
  if (onFold) onFold();
  let res = text3.slice(0, folds[0]);
  for (let i2 = 0; i2 < folds.length; ++i2) {
    const fold = folds[i2];
    const end2 = folds[i2 + 1] || text3.length;
    if (fold === 0) res = `
${indent}${text3.slice(0, end2)}`;
    else {
      if (mode === FOLD_QUOTED && escapedFolds[fold]) res += `${text3[fold]}\\`;
      res += `
${indent}${text3.slice(fold + 1, end2)}`;
    }
  }
  return res;
}
function consumeMoreIndentedLines(text3, i, indent) {
  let end = i;
  let start = i + 1;
  let ch = text3[start];
  while (ch === " " || ch === "	") {
    if (i < start + indent) {
      ch = text3[++i];
    } else {
      do {
        ch = text3[++i];
      } while (ch && ch !== "\n");
      end = i;
      start = i + 1;
      ch = text3[start];
    }
  }
  return end;
}
var FOLD_FLOW, FOLD_BLOCK, FOLD_QUOTED;
var init_foldFlowLines = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/foldFlowLines.js"() {
    FOLD_FLOW = "flow";
    FOLD_BLOCK = "block";
    FOLD_QUOTED = "quoted";
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/stringifyString.js
function lineLengthOverLimit(str, lineWidth, indentLength) {
  if (!lineWidth || lineWidth < 0) return false;
  const limit = lineWidth - indentLength;
  const strLen = str.length;
  if (strLen <= limit) return false;
  for (let i = 0, start = 0; i < strLen; ++i) {
    if (str[i] === "\n") {
      if (i - start > limit) return true;
      start = i + 1;
      if (strLen - start <= limit) return false;
    }
  }
  return true;
}
function doubleQuotedString(value, ctx) {
  const json = JSON.stringify(value);
  if (ctx.options.doubleQuotedAsJSON) return json;
  const { implicitKey } = ctx;
  const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
  const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
  let str = "";
  let start = 0;
  for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
    if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
      str += json.slice(start, i) + "\\ ";
      i += 1;
      start = i;
      ch = "\\";
    }
    if (ch === "\\") switch (json[i + 1]) {
      case "u":
        {
          str += json.slice(start, i);
          const code = json.substr(i + 2, 4);
          switch (code) {
            case "0000":
              str += "\\0";
              break;
            case "0007":
              str += "\\a";
              break;
            case "000b":
              str += "\\v";
              break;
            case "001b":
              str += "\\e";
              break;
            case "0085":
              str += "\\N";
              break;
            case "00a0":
              str += "\\_";
              break;
            case "2028":
              str += "\\L";
              break;
            case "2029":
              str += "\\P";
              break;
            default:
              if (code.substr(0, 2) === "00") str += "\\x" + code.substr(2);
              else str += json.substr(i, 6);
          }
          i += 5;
          start = i + 1;
        }
        break;
      case "n":
        if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
          i += 1;
        } else {
          str += json.slice(start, i) + "\n\n";
          while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
            str += "\n";
            i += 2;
          }
          str += indent;
          if (json[i + 2] === " ") str += "\\";
          i += 1;
          start = i + 1;
        }
        break;
      default:
        i += 1;
    }
  }
  str = start ? str + json.slice(start) : json;
  return implicitKey ? str : foldFlowLines(str, indent, FOLD_QUOTED, getFoldOptions(ctx, false));
}
function singleQuotedString(value, ctx) {
  if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value)) return doubleQuotedString(value, ctx);
  const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
  const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
  return ctx.implicitKey ? res : foldFlowLines(res, indent, FOLD_FLOW, getFoldOptions(ctx, false));
}
function quotedString(value, ctx) {
  const { singleQuote } = ctx.options;
  let qs;
  if (singleQuote === false) qs = doubleQuotedString;
  else {
    const hasDouble = value.includes('"');
    const hasSingle = value.includes("'");
    if (hasDouble && !hasSingle) qs = singleQuotedString;
    else if (hasSingle && !hasDouble) qs = doubleQuotedString;
    else qs = singleQuote ? singleQuotedString : doubleQuotedString;
  }
  return qs(value, ctx);
}
function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
  const { blockQuote, commentString, lineWidth } = ctx.options;
  if (!blockQuote || /\n[\t ]+$/.test(value)) {
    return quotedString(value, ctx);
  }
  const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
  const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.BLOCK_FOLDED ? false : type === Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
  if (!value) return literal ? "|\n" : ">\n";
  let chomp;
  let endStart;
  for (endStart = value.length; endStart > 0; --endStart) {
    const ch = value[endStart - 1];
    if (ch !== "\n" && ch !== "	" && ch !== " ") break;
  }
  let end = value.substring(endStart);
  const endNlPos = end.indexOf("\n");
  if (endNlPos === -1) {
    chomp = "-";
  } else if (value === end || endNlPos !== end.length - 1) {
    chomp = "+";
    if (onChompKeep) onChompKeep();
  } else {
    chomp = "";
  }
  if (end) {
    value = value.slice(0, -end.length);
    if (end[end.length - 1] === "\n") end = end.slice(0, -1);
    end = end.replace(blockEndNewlines, `$&${indent}`);
  }
  let startWithSpace = false;
  let startEnd;
  let startNlPos = -1;
  for (startEnd = 0; startEnd < value.length; ++startEnd) {
    const ch = value[startEnd];
    if (ch === " ") startWithSpace = true;
    else if (ch === "\n") startNlPos = startEnd;
    else break;
  }
  let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
  if (start) {
    value = value.substring(start.length);
    start = start.replace(/\n+/g, `$&${indent}`);
  }
  const indentSize = indent ? "2" : "1";
  let header = (startWithSpace ? indentSize : "") + chomp;
  if (comment) {
    header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
    if (onComment) onComment();
  }
  if (!literal) {
    const foldedValue = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
    let literalFallback = false;
    const foldOptions = getFoldOptions(ctx, true);
    if (blockQuote !== "folded" && type !== Scalar.BLOCK_FOLDED) {
      foldOptions.onOverflow = () => {
        literalFallback = true;
      };
    }
    const body = foldFlowLines(`${start}${foldedValue}${end}`, indent, FOLD_BLOCK, foldOptions);
    if (!literalFallback) return `>${header}
${indent}${body}`;
  }
  value = value.replace(/\n+/g, `$&${indent}`);
  return `|${header}
${indent}${start}${value}${end}`;
}
function plainString(item, ctx, onComment, onChompKeep) {
  const { type, value } = item;
  const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
  if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
    return quotedString(value, ctx);
  }
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
    return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
  }
  if (!implicitKey && !inFlow && type !== Scalar.PLAIN && value.includes("\n")) {
    return blockString(item, ctx, onComment, onChompKeep);
  }
  if (containsDocumentMarker(value)) {
    if (indent === "") {
      ctx.forceBlockIndent = true;
      return blockString(item, ctx, onComment, onChompKeep);
    } else if (implicitKey && indent === indentStep) {
      return quotedString(value, ctx);
    }
  }
  const str = value.replace(/\n+/g, `$&
${indent}`);
  if (actualString) {
    const test = (tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str);
    const { compat, tags } = ctx.doc.schema;
    if (tags.some(test) || compat?.some(test)) return quotedString(value, ctx);
  }
  return implicitKey ? str : foldFlowLines(str, indent, FOLD_FLOW, getFoldOptions(ctx, false));
}
function stringifyString(item, ctx, onComment, onChompKeep) {
  const { implicitKey, inFlow } = ctx;
  const ss = typeof item.value === "string" ? item : Object.assign({}, item, {
    value: String(item.value)
  });
  let { type } = item;
  if (type !== Scalar.QUOTE_DOUBLE) {
    if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value)) type = Scalar.QUOTE_DOUBLE;
  }
  const _stringify = (_type) => {
    switch (_type) {
      case Scalar.BLOCK_FOLDED:
      case Scalar.BLOCK_LITERAL:
        return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
      case Scalar.QUOTE_DOUBLE:
        return doubleQuotedString(ss.value, ctx);
      case Scalar.QUOTE_SINGLE:
        return singleQuotedString(ss.value, ctx);
      case Scalar.PLAIN:
        return plainString(ss, ctx, onComment, onChompKeep);
      default:
        return null;
    }
  };
  let res = _stringify(type);
  if (res === null) {
    const { defaultKeyType, defaultStringType } = ctx.options;
    const t = implicitKey && defaultKeyType || defaultStringType;
    res = _stringify(t);
    if (res === null) throw new Error(`Unsupported default string type ${t}`);
  }
  return res;
}
var getFoldOptions, containsDocumentMarker, blockEndNewlines;
var init_stringifyString = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/stringifyString.js"() {
    init_Scalar();
    init_foldFlowLines();
    getFoldOptions = (ctx, isBlock2) => ({
      indentAtStart: isBlock2 ? ctx.indent.length : ctx.indentAtStart,
      lineWidth: ctx.options.lineWidth,
      minContentWidth: ctx.options.minContentWidth
    });
    containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
    try {
      blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
    } catch {
      blockEndNewlines = /\n+(?!\n|$)/g;
    }
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/stringify.js
function createStringifyContext(doc, options) {
  const opt = Object.assign({
    blockQuote: true,
    commentString: stringifyComment,
    defaultKeyType: null,
    defaultStringType: "PLAIN",
    directives: null,
    doubleQuotedAsJSON: false,
    doubleQuotedMinMultiLineLength: 40,
    falseStr: "false",
    flowCollectionPadding: true,
    indentSeq: true,
    lineWidth: 80,
    minContentWidth: 20,
    nullStr: "null",
    simpleKeys: false,
    singleQuote: null,
    trueStr: "true",
    verifyAliasOrder: true
  }, doc.schema.toStringOptions, options);
  let inFlow;
  switch (opt.collectionStyle) {
    case "block":
      inFlow = false;
      break;
    case "flow":
      inFlow = true;
      break;
    default:
      inFlow = null;
  }
  return {
    anchors: /* @__PURE__ */ new Set(),
    doc,
    flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
    indent: "",
    indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
    inFlow,
    options: opt
  };
}
function getTagObject(tags, item) {
  if (item.tag) {
    const match = tags.filter((t) => t.tag === item.tag);
    if (match.length > 0) return match.find((t) => t.format === item.format) ?? match[0];
  }
  let tagObj = void 0;
  let obj;
  if (isScalar(item)) {
    obj = item.value;
    let match = tags.filter((t) => t.identify?.(obj));
    if (match.length > 1) {
      const testMatch = match.filter((t) => t.test);
      if (testMatch.length > 0) match = testMatch;
    }
    tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
  } else {
    obj = item;
    tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
  }
  if (!tagObj) {
    const name2 = obj?.constructor?.name ?? (obj === null ? "null" : typeof obj);
    throw new Error(`Tag not resolved for ${name2} value`);
  }
  return tagObj;
}
function stringifyProps(node, tagObj, { anchors, doc }) {
  if (!doc.directives) return "";
  const props = [];
  const anchor = (isScalar(node) || isCollection(node)) && node.anchor;
  if (anchor && anchorIsValid(anchor)) {
    anchors.add(anchor);
    props.push(`&${anchor}`);
  }
  const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
  if (tag) props.push(doc.directives.tagString(tag));
  return props.join(" ");
}
function stringify(item, ctx, onComment, onChompKeep) {
  if (isPair(item)) return item.toString(ctx, onComment, onChompKeep);
  if (isAlias(item)) {
    if (ctx.doc.directives) return item.toString(ctx);
    if (ctx.resolvedAliases?.has(item)) {
      throw new TypeError(`Cannot stringify circular structure without alias nodes`);
    } else {
      if (ctx.resolvedAliases) ctx.resolvedAliases.add(item);
      else ctx.resolvedAliases = /* @__PURE__ */ new Set([
        item
      ]);
      item = item.resolve(ctx.doc);
    }
  }
  let tagObj = void 0;
  const node = isNode(item) ? item : ctx.doc.createNode(item, {
    onTagObj: (o) => tagObj = o
  });
  tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
  const props = stringifyProps(node, tagObj, ctx);
  if (props.length > 0) ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
  const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : isScalar(node) ? stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
  if (!props) return str;
  return isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
}
var init_stringify = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/stringify.js"() {
    init_anchors();
    init_identity();
    init_stringifyComment();
    init_stringifyString();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/stringifyPair.js
function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
  const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
  let keyComment = isNode(key) && key.comment || null;
  if (simpleKeys) {
    if (keyComment) {
      throw new Error("With simple keys, key nodes cannot have comments");
    }
    if (isCollection(key) || !isNode(key) && typeof key === "object") {
      const msg = "With simple keys, collection cannot be used as a key value";
      throw new Error(msg);
    }
  }
  let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || isCollection(key) || (isScalar(key) ? key.type === Scalar.BLOCK_FOLDED || key.type === Scalar.BLOCK_LITERAL : typeof key === "object"));
  ctx = Object.assign({}, ctx, {
    allNullValues: false,
    implicitKey: !explicitKey && (simpleKeys || !allNullValues),
    indent: indent + indentStep
  });
  let keyCommentDone = false;
  let chompKeep = false;
  let str = stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
  if (!explicitKey && !ctx.inFlow && str.length > 1024) {
    if (simpleKeys) throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    explicitKey = true;
  }
  if (ctx.inFlow) {
    if (allNullValues || value == null) {
      if (keyCommentDone && onComment) onComment();
      return str === "" ? "?" : explicitKey ? `? ${str}` : str;
    }
  } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
    str = `? ${str}`;
    if (keyComment && !keyCommentDone) {
      str += lineComment(str, ctx.indent, commentString(keyComment));
    } else if (chompKeep && onChompKeep) onChompKeep();
    return str;
  }
  if (keyCommentDone) keyComment = null;
  if (explicitKey) {
    if (keyComment) str += lineComment(str, ctx.indent, commentString(keyComment));
    str = `? ${str}
${indent}:`;
  } else {
    str = `${str}:`;
    if (keyComment) str += lineComment(str, ctx.indent, commentString(keyComment));
  }
  let vsb, vcb, valueComment;
  if (isNode(value)) {
    vsb = !!value.spaceBefore;
    vcb = value.commentBefore;
    valueComment = value.comment;
  } else {
    vsb = false;
    vcb = null;
    valueComment = null;
    if (value && typeof value === "object") value = doc.createNode(value);
  }
  ctx.implicitKey = false;
  if (!explicitKey && !keyComment && isScalar(value)) ctx.indentAtStart = str.length + 1;
  chompKeep = false;
  if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && isSeq(value) && !value.flow && !value.tag && !value.anchor) {
    ctx.indent = ctx.indent.substring(2);
  }
  let valueCommentDone = false;
  const valueStr = stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
  let ws = " ";
  if (keyComment || vsb || vcb) {
    ws = vsb ? "\n" : "";
    if (vcb) {
      const cs = commentString(vcb);
      ws += `
${indentComment(cs, ctx.indent)}`;
    }
    if (valueStr === "" && !ctx.inFlow) {
      if (ws === "\n") ws = "\n\n";
    } else {
      ws += `
${ctx.indent}`;
    }
  } else if (!explicitKey && isCollection(value)) {
    const vs0 = valueStr[0];
    const nl0 = valueStr.indexOf("\n");
    const hasNewline = nl0 !== -1;
    const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
    if (hasNewline || !flow) {
      let hasPropsLine = false;
      if (hasNewline && (vs0 === "&" || vs0 === "!")) {
        let sp0 = valueStr.indexOf(" ");
        if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
          sp0 = valueStr.indexOf(" ", sp0 + 1);
        }
        if (sp0 === -1 || nl0 < sp0) hasPropsLine = true;
      }
      if (!hasPropsLine) ws = `
${ctx.indent}`;
    }
  } else if (valueStr === "" || valueStr[0] === "\n") {
    ws = "";
  }
  str += ws + valueStr;
  if (ctx.inFlow) {
    if (valueCommentDone && onComment) onComment();
  } else if (valueComment && !valueCommentDone) {
    str += lineComment(str, ctx.indent, commentString(valueComment));
  } else if (chompKeep && onChompKeep) {
    onChompKeep();
  }
  return str;
}
var init_stringifyPair = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/stringifyPair.js"() {
    init_identity();
    init_Scalar();
    init_stringify();
    init_stringifyComment();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/log.js
function warn(logLevel, warning) {
  if (logLevel === "debug" || logLevel === "warn") {
    console.warn(warning);
  }
}
var init_log = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/log.js"() {
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/merge.js
function addMergeToJSMap(ctx, map2, value) {
  value = ctx && isAlias(value) ? value.resolve(ctx.doc) : value;
  if (isSeq(value)) for (const it of value.items) mergeValue(ctx, map2, it);
  else if (Array.isArray(value)) for (const it of value) mergeValue(ctx, map2, it);
  else mergeValue(ctx, map2, value);
}
function mergeValue(ctx, map2, value) {
  const source = ctx && isAlias(value) ? value.resolve(ctx.doc) : value;
  if (!isMap(source)) throw new Error("Merge sources must be maps or map aliases");
  const srcMap = source.toJSON(null, ctx, Map);
  for (const [key, value2] of srcMap) {
    if (map2 instanceof Map) {
      if (!map2.has(key)) map2.set(key, value2);
    } else if (map2 instanceof Set) {
      map2.add(key);
    } else if (!Object.prototype.hasOwnProperty.call(map2, key)) {
      Object.defineProperty(map2, key, {
        value: value2,
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
  }
  return map2;
}
var MERGE_KEY, merge, isMergeKey;
var init_merge = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/merge.js"() {
    init_identity();
    init_Scalar();
    MERGE_KEY = "<<";
    merge = {
      identify: (value) => value === MERGE_KEY || typeof value === "symbol" && value.description === MERGE_KEY,
      default: "key",
      tag: "tag:yaml.org,2002:merge",
      test: /^<<$/,
      resolve: () => Object.assign(new Scalar(Symbol(MERGE_KEY)), {
        addToJSMap: addMergeToJSMap
      }),
      stringify: () => MERGE_KEY
    };
    isMergeKey = (ctx, key) => (merge.identify(key) || isScalar(key) && (!key.type || key.type === Scalar.PLAIN) && merge.identify(key.value)) && ctx?.doc.schema.tags.some((tag) => tag.tag === merge.tag && tag.default);
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/addPairToJSMap.js
function addPairToJSMap(ctx, map2, { key, value }) {
  if (isNode(key) && key.addToJSMap) key.addToJSMap(ctx, map2, value);
  else if (isMergeKey(ctx, key)) addMergeToJSMap(ctx, map2, value);
  else {
    const jsKey = toJS(key, "", ctx);
    if (map2 instanceof Map) {
      map2.set(jsKey, toJS(value, jsKey, ctx));
    } else if (map2 instanceof Set) {
      map2.add(jsKey);
    } else {
      const stringKey = stringifyKey(key, jsKey, ctx);
      const jsValue = toJS(value, stringKey, ctx);
      if (stringKey in map2) Object.defineProperty(map2, stringKey, {
        value: jsValue,
        writable: true,
        enumerable: true,
        configurable: true
      });
      else map2[stringKey] = jsValue;
    }
  }
  return map2;
}
function stringifyKey(key, jsKey, ctx) {
  if (jsKey === null) return "";
  if (typeof jsKey !== "object") return String(jsKey);
  if (isNode(key) && ctx?.doc) {
    const strCtx = createStringifyContext(ctx.doc, {});
    strCtx.anchors = /* @__PURE__ */ new Set();
    for (const node of ctx.anchors.keys()) strCtx.anchors.add(node.anchor);
    strCtx.inFlow = true;
    strCtx.inStringifyKey = true;
    const strKey = key.toString(strCtx);
    if (!ctx.mapKeyWarned) {
      let jsonStr = JSON.stringify(strKey);
      if (jsonStr.length > 40) jsonStr = jsonStr.substring(0, 36) + '..."';
      warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
      ctx.mapKeyWarned = true;
    }
    return strKey;
  }
  return JSON.stringify(jsKey);
}
var init_addPairToJSMap = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/addPairToJSMap.js"() {
    init_log();
    init_merge();
    init_stringify();
    init_identity();
    init_toJS();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/Pair.js
function createPair(key, value, ctx) {
  const k = createNode(key, void 0, ctx);
  const v = createNode(value, void 0, ctx);
  return new Pair(k, v);
}
var Pair;
var init_Pair = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/Pair.js"() {
    init_createNode();
    init_stringifyPair();
    init_addPairToJSMap();
    init_identity();
    Pair = class _Pair {
      constructor(key, value = null) {
        Object.defineProperty(this, NODE_TYPE, {
          value: PAIR
        });
        this.key = key;
        this.value = value;
      }
      clone(schema4) {
        let { key, value } = this;
        if (isNode(key)) key = key.clone(schema4);
        if (isNode(value)) value = value.clone(schema4);
        return new _Pair(key, value);
      }
      toJSON(_, ctx) {
        const pair = ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        return addPairToJSMap(ctx, pair, this);
      }
      toString(ctx, onComment, onChompKeep) {
        return ctx?.doc ? stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/stringifyCollection.js
function stringifyCollection(collection2, ctx, options) {
  const flow = ctx.inFlow ?? collection2.flow;
  const stringify4 = flow ? stringifyFlowCollection : stringifyBlockCollection;
  return stringify4(collection2, ctx, options);
}
function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
  const { indent, options: { commentString } } = ctx;
  const itemCtx = Object.assign({}, ctx, {
    indent: itemIndent,
    type: null
  });
  let chompKeep = false;
  const lines2 = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    let comment2 = null;
    if (isNode(item)) {
      if (!chompKeep && item.spaceBefore) lines2.push("");
      addCommentBefore(ctx, lines2, item.commentBefore, chompKeep);
      if (item.comment) comment2 = item.comment;
    } else if (isPair(item)) {
      const ik = isNode(item.key) ? item.key : null;
      if (ik) {
        if (!chompKeep && ik.spaceBefore) lines2.push("");
        addCommentBefore(ctx, lines2, ik.commentBefore, chompKeep);
      }
    }
    chompKeep = false;
    let str2 = stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
    if (comment2) str2 += lineComment(str2, itemIndent, commentString(comment2));
    if (chompKeep && comment2) chompKeep = false;
    lines2.push(blockItemPrefix + str2);
  }
  let str;
  if (lines2.length === 0) {
    str = flowChars.start + flowChars.end;
  } else {
    str = lines2[0];
    for (let i = 1; i < lines2.length; ++i) {
      const line = lines2[i];
      str += line ? `
${indent}${line}` : "\n";
    }
  }
  if (comment) {
    str += "\n" + indentComment(commentString(comment), indent);
    if (onComment) onComment();
  } else if (chompKeep && onChompKeep) onChompKeep();
  return str;
}
function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
  const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
  itemIndent += indentStep;
  const itemCtx = Object.assign({}, ctx, {
    indent: itemIndent,
    inFlow: true,
    type: null
  });
  let reqNewline = false;
  let linesAtValue = 0;
  const lines2 = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    let comment = null;
    if (isNode(item)) {
      if (item.spaceBefore) lines2.push("");
      addCommentBefore(ctx, lines2, item.commentBefore, false);
      if (item.comment) comment = item.comment;
    } else if (isPair(item)) {
      const ik = isNode(item.key) ? item.key : null;
      if (ik) {
        if (ik.spaceBefore) lines2.push("");
        addCommentBefore(ctx, lines2, ik.commentBefore, false);
        if (ik.comment) reqNewline = true;
      }
      const iv = isNode(item.value) ? item.value : null;
      if (iv) {
        if (iv.comment) comment = iv.comment;
        if (iv.commentBefore) reqNewline = true;
      } else if (item.value == null && ik?.comment) {
        comment = ik.comment;
      }
    }
    if (comment) reqNewline = true;
    let str = stringify(item, itemCtx, () => comment = null);
    if (i < items.length - 1) str += ",";
    if (comment) str += lineComment(str, itemIndent, commentString(comment));
    if (!reqNewline && (lines2.length > linesAtValue || str.includes("\n"))) reqNewline = true;
    lines2.push(str);
    linesAtValue = lines2.length;
  }
  const { start, end } = flowChars;
  if (lines2.length === 0) {
    return start + end;
  } else {
    if (!reqNewline) {
      const len = lines2.reduce((sum, line) => sum + line.length + 2, 2);
      reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
    }
    if (reqNewline) {
      let str = start;
      for (const line of lines2) str += line ? `
${indentStep}${indent}${line}` : "\n";
      return `${str}
${indent}${end}`;
    } else {
      return `${start}${fcPadding}${lines2.join(" ")}${fcPadding}${end}`;
    }
  }
}
function addCommentBefore({ indent, options: { commentString } }, lines2, comment, chompKeep) {
  if (comment && chompKeep) comment = comment.replace(/^\n+/, "");
  if (comment) {
    const ic = indentComment(commentString(comment), indent);
    lines2.push(ic.trimStart());
  }
}
var init_stringifyCollection = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/stringifyCollection.js"() {
    init_identity();
    init_stringify();
    init_stringifyComment();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/YAMLMap.js
function findPair(items, key) {
  const k = isScalar(key) ? key.value : key;
  for (const it of items) {
    if (isPair(it)) {
      if (it.key === key || it.key === k) return it;
      if (isScalar(it.key) && it.key.value === k) return it;
    }
  }
  return void 0;
}
var YAMLMap;
var init_YAMLMap = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/YAMLMap.js"() {
    init_stringifyCollection();
    init_addPairToJSMap();
    init_Collection();
    init_identity();
    init_Pair();
    init_Scalar();
    YAMLMap = class extends Collection {
      static get tagName() {
        return "tag:yaml.org,2002:map";
      }
      constructor(schema4) {
        super(MAP, schema4);
        this.items = [];
      }
      /**
         * A generic collection parsing method that can be extended
         * to other node classes that inherit from YAMLMap
         */
      static from(schema4, obj, ctx) {
        const { keepUndefined, replacer } = ctx;
        const map2 = new this(schema4);
        const add2 = (key, value) => {
          if (typeof replacer === "function") value = replacer.call(obj, key, value);
          else if (Array.isArray(replacer) && !replacer.includes(key)) return;
          if (value !== void 0 || keepUndefined) map2.items.push(createPair(key, value, ctx));
        };
        if (obj instanceof Map) {
          for (const [key, value] of obj) add2(key, value);
        } else if (obj && typeof obj === "object") {
          for (const key of Object.keys(obj)) add2(key, obj[key]);
        }
        if (typeof schema4.sortMapEntries === "function") {
          map2.items.sort(schema4.sortMapEntries);
        }
        return map2;
      }
      /**
         * Adds a value to the collection.
         *
         * @param overwrite - If not set `true`, using a key that is already in the
         *   collection will throw. Otherwise, overwrites the previous value.
         */
      add(pair, overwrite) {
        let _pair;
        if (isPair(pair)) _pair = pair;
        else if (!pair || typeof pair !== "object" || !("key" in pair)) {
          _pair = new Pair(pair, pair?.value);
        } else _pair = new Pair(pair.key, pair.value);
        const prev = findPair(this.items, _pair.key);
        const sortEntries = this.schema?.sortMapEntries;
        if (prev) {
          if (!overwrite) throw new Error(`Key ${_pair.key} already set`);
          if (isScalar(prev.value) && isScalarValue(_pair.value)) prev.value.value = _pair.value;
          else prev.value = _pair.value;
        } else if (sortEntries) {
          const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
          if (i === -1) this.items.push(_pair);
          else this.items.splice(i, 0, _pair);
        } else {
          this.items.push(_pair);
        }
      }
      delete(key) {
        const it = findPair(this.items, key);
        if (!it) return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it?.value;
        return (!keepScalar && isScalar(node) ? node.value : node) ?? void 0;
      }
      has(key) {
        return !!findPair(this.items, key);
      }
      set(key, value) {
        this.add(new Pair(key, value), true);
      }
      /**
         * @param ctx - Conversion context, originally set in Document#toJS()
         * @param {Class} Type - If set, forces the returned collection type
         * @returns Instance of Type, Map, or Object
         */
      toJSON(_, ctx, Type) {
        const map2 = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        if (ctx?.onCreate) ctx.onCreate(map2);
        for (const item of this.items) addPairToJSMap(ctx, map2, item);
        return map2;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx) return JSON.stringify(this);
        for (const item of this.items) {
          if (!isPair(item)) throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        if (!ctx.allNullValues && this.hasAllNullValues(false)) ctx = Object.assign({}, ctx, {
          allNullValues: true
        });
        return stringifyCollection(this, ctx, {
          blockItemPrefix: "",
          flowChars: {
            start: "{",
            end: "}"
          },
          itemIndent: ctx.indent || "",
          onChompKeep,
          onComment
        });
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/common/map.js
var map;
var init_map = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/common/map.js"() {
    init_identity();
    init_YAMLMap();
    map = {
      collection: "map",
      default: true,
      nodeClass: YAMLMap,
      tag: "tag:yaml.org,2002:map",
      resolve(map2, onError) {
        if (!isMap(map2)) onError("Expected a mapping for this tag");
        return map2;
      },
      createNode: (schema4, obj, ctx) => YAMLMap.from(schema4, obj, ctx)
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/YAMLSeq.js
function asItemIndex(key) {
  let idx = isScalar(key) ? key.value : key;
  if (idx && typeof idx === "string") idx = Number(idx);
  return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
}
var YAMLSeq;
var init_YAMLSeq = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/nodes/YAMLSeq.js"() {
    init_createNode();
    init_stringifyCollection();
    init_Collection();
    init_identity();
    init_Scalar();
    init_toJS();
    YAMLSeq = class extends Collection {
      static get tagName() {
        return "tag:yaml.org,2002:seq";
      }
      constructor(schema4) {
        super(SEQ, schema4);
        this.items = [];
      }
      add(value) {
        this.items.push(value);
      }
      /**
         * Removes a value from the collection.
         *
         * `key` must contain a representation of an integer for this to succeed.
         * It may be wrapped in a `Scalar`.
         *
         * @returns `true` if the item was found and removed.
         */
      delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number") return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number") return void 0;
        const it = this.items[idx];
        return !keepScalar && isScalar(it) ? it.value : it;
      }
      /**
         * Checks if the collection includes a value with the key `key`.
         *
         * `key` must contain a representation of an integer for this to succeed.
         * It may be wrapped in a `Scalar`.
         */
      has(key) {
        const idx = asItemIndex(key);
        return typeof idx === "number" && idx < this.items.length;
      }
      /**
         * Sets a value in this collection. For `!!set`, `value` needs to be a
         * boolean to add/remove the item from the set.
         *
         * If `key` does not contain a representation of an integer, this will throw.
         * It may be wrapped in a `Scalar`.
         */
      set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number") throw new Error(`Expected a valid index, not ${key}.`);
        const prev = this.items[idx];
        if (isScalar(prev) && isScalarValue(value)) prev.value = value;
        else this.items[idx] = value;
      }
      toJSON(_, ctx) {
        const seq2 = [];
        if (ctx?.onCreate) ctx.onCreate(seq2);
        let i = 0;
        for (const item of this.items) seq2.push(toJS(item, String(i++), ctx));
        return seq2;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx) return JSON.stringify(this);
        return stringifyCollection(this, ctx, {
          blockItemPrefix: "- ",
          flowChars: {
            start: "[",
            end: "]"
          },
          itemIndent: (ctx.indent || "") + "  ",
          onChompKeep,
          onComment
        });
      }
      static from(schema4, obj, ctx) {
        const { replacer } = ctx;
        const seq2 = new this(schema4);
        if (obj && Symbol.iterator in Object(obj)) {
          let i = 0;
          for (let it of obj) {
            if (typeof replacer === "function") {
              const key = obj instanceof Set ? it : String(i++);
              it = replacer.call(obj, key, it);
            }
            seq2.items.push(createNode(it, void 0, ctx));
          }
        }
        return seq2;
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/common/seq.js
var seq;
var init_seq = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/common/seq.js"() {
    init_identity();
    init_YAMLSeq();
    seq = {
      collection: "seq",
      default: true,
      nodeClass: YAMLSeq,
      tag: "tag:yaml.org,2002:seq",
      resolve(seq2, onError) {
        if (!isSeq(seq2)) onError("Expected a sequence for this tag");
        return seq2;
      },
      createNode: (schema4, obj, ctx) => YAMLSeq.from(schema4, obj, ctx)
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/common/string.js
var string;
var init_string = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/common/string.js"() {
    init_stringifyString();
    string = {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: (str) => str,
      stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({
          actualString: true
        }, ctx);
        return stringifyString(item, ctx, onComment, onChompKeep);
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/common/null.js
var nullTag;
var init_null = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/common/null.js"() {
    init_Scalar();
    nullTag = {
      identify: (value) => value == null,
      createNode: () => new Scalar(null),
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => new Scalar(null),
      stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/core/bool.js
var boolTag;
var init_bool = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/core/bool.js"() {
    init_Scalar();
    boolTag = {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: (str) => new Scalar(str[0] === "t" || str[0] === "T"),
      stringify({ source, value }, ctx) {
        if (source && boolTag.test.test(source)) {
          const sv = source[0] === "t" || source[0] === "T";
          if (value === sv) return source;
        }
        return value ? ctx.options.trueStr : ctx.options.falseStr;
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/stringifyNumber.js
function stringifyNumber({ format, minFractionDigits, tag, value }) {
  if (typeof value === "bigint") return String(value);
  const num = typeof value === "number" ? value : Number(value);
  if (!isFinite(num)) return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
  let n = JSON.stringify(value);
  if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^\d/.test(n)) {
    let i = n.indexOf(".");
    if (i < 0) {
      i = n.length;
      n += ".";
    }
    let d = minFractionDigits - (n.length - i - 1);
    while (d-- > 0) n += "0";
  }
  return n;
}
var init_stringifyNumber = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/stringifyNumber.js"() {
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/core/float.js
var floatNaN, floatExp, float;
var init_float = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/core/float.js"() {
    init_Scalar();
    init_stringifyNumber();
    floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber
    };
    floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber(node);
      }
    };
    float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
      resolve(str) {
        const node = new Scalar(parseFloat(str));
        const dot = str.indexOf(".");
        if (dot !== -1 && str[str.length - 1] === "0") node.minFractionDigits = str.length - dot - 1;
        return node;
      },
      stringify: stringifyNumber
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/core/int.js
function intStringify(node, radix, prefix) {
  const { value } = node;
  if (intIdentify(value) && value >= 0) return prefix + value.toString(radix);
  return stringifyNumber(node);
}
var intIdentify, intResolve, intOct, int, intHex;
var init_int = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/core/int.js"() {
    init_stringifyNumber();
    intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    intResolve = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
    intOct = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^0o[0-7]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
      stringify: (node) => intStringify(node, 8, "0o")
    };
    int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber
    };
    intHex = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^0x[0-9a-fA-F]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/core/schema.js
var schema;
var init_schema = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/core/schema.js"() {
    init_map();
    init_null();
    init_seq();
    init_string();
    init_bool();
    init_float();
    init_int();
    schema = [
      map,
      seq,
      string,
      nullTag,
      boolTag,
      intOct,
      int,
      intHex,
      floatNaN,
      floatExp,
      float
    ];
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/json/schema.js
function intIdentify2(value) {
  return typeof value === "bigint" || Number.isInteger(value);
}
var stringifyJSON, jsonScalars, jsonError, schema2;
var init_schema2 = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/json/schema.js"() {
    init_Scalar();
    init_map();
    init_seq();
    stringifyJSON = ({ value }) => JSON.stringify(value);
    jsonScalars = [
      {
        identify: (value) => typeof value === "string",
        default: true,
        tag: "tag:yaml.org,2002:str",
        resolve: (str) => str,
        stringify: stringifyJSON
      },
      {
        identify: (value) => value == null,
        createNode: () => new Scalar(null),
        default: true,
        tag: "tag:yaml.org,2002:null",
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
      },
      {
        identify: (value) => typeof value === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^true$|^false$/,
        resolve: (str) => str === "true",
        stringify: stringifyJSON
      },
      {
        identify: intIdentify2,
        default: true,
        tag: "tag:yaml.org,2002:int",
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
        stringify: ({ value }) => intIdentify2(value) ? value.toString() : JSON.stringify(value)
      },
      {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: (str) => parseFloat(str),
        stringify: stringifyJSON
      }
    ];
    jsonError = {
      default: true,
      tag: "",
      test: /^/,
      resolve(str, onError) {
        onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
        return str;
      }
    };
    schema2 = [
      map,
      seq
    ].concat(jsonScalars, jsonError);
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/binary.js
var binary;
var init_binary = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/binary.js"() {
    init_Scalar();
    init_stringifyString();
    binary = {
      identify: (value) => value instanceof Uint8Array,
      default: false,
      tag: "tag:yaml.org,2002:binary",
      /**
         * Returns a Buffer in node and an Uint8Array in browsers
         *
         * To use the resulting buffer as an image, you'll want to do something like:
         *
         *   const blob = new Blob([buffer], { type: 'image/jpeg' })
         *   document.querySelector('#photo').src = URL.createObjectURL(blob)
         */
      resolve(src, onError) {
        if (typeof atob === "function") {
          const str = atob(src.replace(/[\n\r]/g, ""));
          const buffer = new Uint8Array(str.length);
          for (let i = 0; i < str.length; ++i) buffer[i] = str.charCodeAt(i);
          return buffer;
        } else {
          onError("This environment does not support reading binary tags; either Buffer or atob is required");
          return src;
        }
      },
      stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
        if (!value) return "";
        const buf = value;
        let str;
        if (typeof btoa === "function") {
          let s = "";
          for (let i = 0; i < buf.length; ++i) s += String.fromCharCode(buf[i]);
          str = btoa(s);
        } else {
          throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
        }
        type ?? (type = Scalar.BLOCK_LITERAL);
        if (type !== Scalar.QUOTE_DOUBLE) {
          const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
          const n = Math.ceil(str.length / lineWidth);
          const lines2 = new Array(n);
          for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
            lines2[i] = str.substr(o, lineWidth);
          }
          str = lines2.join(type === Scalar.BLOCK_LITERAL ? "\n" : " ");
        }
        return stringifyString({
          comment,
          type,
          value: str
        }, ctx, onComment, onChompKeep);
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/pairs.js
function resolvePairs(seq2, onError) {
  if (isSeq(seq2)) {
    for (let i = 0; i < seq2.items.length; ++i) {
      let item = seq2.items[i];
      if (isPair(item)) continue;
      else if (isMap(item)) {
        if (item.items.length > 1) onError("Each pair must have its own sequence indicator");
        const pair = item.items[0] || new Pair(new Scalar(null));
        if (item.commentBefore) pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
        if (item.comment) {
          const cn = pair.value ?? pair.key;
          cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
        }
        item = pair;
      }
      seq2.items[i] = isPair(item) ? item : new Pair(item);
    }
  } else onError("Expected a sequence for this tag");
  return seq2;
}
function createPairs(schema4, iterable, ctx) {
  const { replacer } = ctx;
  const pairs2 = new YAMLSeq(schema4);
  pairs2.tag = "tag:yaml.org,2002:pairs";
  let i = 0;
  if (iterable && Symbol.iterator in Object(iterable)) for (let it of iterable) {
    if (typeof replacer === "function") it = replacer.call(iterable, String(i++), it);
    let key, value;
    if (Array.isArray(it)) {
      if (it.length === 2) {
        key = it[0];
        value = it[1];
      } else throw new TypeError(`Expected [key, value] tuple: ${it}`);
    } else if (it && it instanceof Object) {
      const keys = Object.keys(it);
      if (keys.length === 1) {
        key = keys[0];
        value = it[key];
      } else {
        throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
      }
    } else {
      key = it;
    }
    pairs2.items.push(createPair(key, value, ctx));
  }
  return pairs2;
}
var pairs;
var init_pairs = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/pairs.js"() {
    init_identity();
    init_Pair();
    init_Scalar();
    init_YAMLSeq();
    pairs = {
      collection: "seq",
      default: false,
      tag: "tag:yaml.org,2002:pairs",
      resolve: resolvePairs,
      createNode: createPairs
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/omap.js
var YAMLOMap, omap;
var init_omap = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/omap.js"() {
    init_identity();
    init_toJS();
    init_YAMLMap();
    init_YAMLSeq();
    init_pairs();
    YAMLOMap = class _YAMLOMap extends YAMLSeq {
      constructor() {
        super();
        this.add = YAMLMap.prototype.add.bind(this);
        this.delete = YAMLMap.prototype.delete.bind(this);
        this.get = YAMLMap.prototype.get.bind(this);
        this.has = YAMLMap.prototype.has.bind(this);
        this.set = YAMLMap.prototype.set.bind(this);
        this.tag = _YAMLOMap.tag;
      }
      /**
         * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
         * but TypeScript won't allow widening the signature of a child method.
         */
      toJSON(_, ctx) {
        if (!ctx) return super.toJSON(_);
        const map2 = /* @__PURE__ */ new Map();
        if (ctx?.onCreate) ctx.onCreate(map2);
        for (const pair of this.items) {
          let key, value;
          if (isPair(pair)) {
            key = toJS(pair.key, "", ctx);
            value = toJS(pair.value, key, ctx);
          } else {
            key = toJS(pair, "", ctx);
          }
          if (map2.has(key)) throw new Error("Ordered maps must not include duplicate keys");
          map2.set(key, value);
        }
        return map2;
      }
      static from(schema4, iterable, ctx) {
        const pairs2 = createPairs(schema4, iterable, ctx);
        const omap2 = new this();
        omap2.items = pairs2.items;
        return omap2;
      }
    };
    YAMLOMap.tag = "tag:yaml.org,2002:omap";
    omap = {
      collection: "seq",
      identify: (value) => value instanceof Map,
      nodeClass: YAMLOMap,
      default: false,
      tag: "tag:yaml.org,2002:omap",
      resolve(seq2, onError) {
        const pairs2 = resolvePairs(seq2, onError);
        const seenKeys = [];
        for (const { key } of pairs2.items) {
          if (isScalar(key)) {
            if (seenKeys.includes(key.value)) {
              onError(`Ordered maps must not include duplicate keys: ${key.value}`);
            } else {
              seenKeys.push(key.value);
            }
          }
        }
        return Object.assign(new YAMLOMap(), pairs2);
      },
      createNode: (schema4, iterable, ctx) => YAMLOMap.from(schema4, iterable, ctx)
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/bool.js
function boolStringify({ value, source }, ctx) {
  const boolObj = value ? trueTag : falseTag;
  if (source && boolObj.test.test(source)) return source;
  return value ? ctx.options.trueStr : ctx.options.falseStr;
}
var trueTag, falseTag;
var init_bool2 = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/bool.js"() {
    init_Scalar();
    trueTag = {
      identify: (value) => value === true,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: () => new Scalar(true),
      stringify: boolStringify
    };
    falseTag = {
      identify: (value) => value === false,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
      resolve: () => new Scalar(false),
      stringify: boolStringify
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/float.js
var floatNaN2, floatExp2, float2;
var init_float2 = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/float.js"() {
    init_Scalar();
    init_stringifyNumber();
    floatNaN2 = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber
    };
    floatExp2 = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str.replace(/_/g, "")),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber(node);
      }
    };
    float2 = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
      resolve(str) {
        const node = new Scalar(parseFloat(str.replace(/_/g, "")));
        const dot = str.indexOf(".");
        if (dot !== -1) {
          const f = str.substring(dot + 1).replace(/_/g, "");
          if (f[f.length - 1] === "0") node.minFractionDigits = f.length;
        }
        return node;
      },
      stringify: stringifyNumber
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/int.js
function intResolve2(str, offset, radix, { intAsBigInt }) {
  const sign = str[0];
  if (sign === "-" || sign === "+") offset += 1;
  str = str.substring(offset).replace(/_/g, "");
  if (intAsBigInt) {
    switch (radix) {
      case 2:
        str = `0b${str}`;
        break;
      case 8:
        str = `0o${str}`;
        break;
      case 16:
        str = `0x${str}`;
        break;
    }
    const n2 = BigInt(str);
    return sign === "-" ? BigInt(-1) * n2 : n2;
  }
  const n = parseInt(str, radix);
  return sign === "-" ? -1 * n : n;
}
function intStringify2(node, radix, prefix) {
  const { value } = node;
  if (intIdentify3(value)) {
    const str = value.toString(radix);
    return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
  }
  return stringifyNumber(node);
}
var intIdentify3, intBin, intOct2, int2, intHex2;
var init_int2 = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/int.js"() {
    init_stringifyNumber();
    intIdentify3 = (value) => typeof value === "bigint" || Number.isInteger(value);
    intBin = {
      identify: intIdentify3,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "BIN",
      test: /^[-+]?0b[0-1_]+$/,
      resolve: (str, _onError, opt) => intResolve2(str, 2, 2, opt),
      stringify: (node) => intStringify2(node, 2, "0b")
    };
    intOct2 = {
      identify: intIdentify3,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^[-+]?0[0-7_]+$/,
      resolve: (str, _onError, opt) => intResolve2(str, 1, 8, opt),
      stringify: (node) => intStringify2(node, 8, "0")
    };
    int2 = {
      identify: intIdentify3,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9][0-9_]*$/,
      resolve: (str, _onError, opt) => intResolve2(str, 0, 10, opt),
      stringify: stringifyNumber
    };
    intHex2 = {
      identify: intIdentify3,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^[-+]?0x[0-9a-fA-F_]+$/,
      resolve: (str, _onError, opt) => intResolve2(str, 2, 16, opt),
      stringify: (node) => intStringify2(node, 16, "0x")
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/set.js
var YAMLSet, set;
var init_set = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/set.js"() {
    init_identity();
    init_Pair();
    init_YAMLMap();
    YAMLSet = class _YAMLSet extends YAMLMap {
      constructor(schema4) {
        super(schema4);
        this.tag = _YAMLSet.tag;
      }
      add(key) {
        let pair;
        if (isPair(key)) pair = key;
        else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null) pair = new Pair(key.key, null);
        else pair = new Pair(key, null);
        const prev = findPair(this.items, pair.key);
        if (!prev) this.items.push(pair);
      }
      /**
         * If `keepPair` is `true`, returns the Pair matching `key`.
         * Otherwise, returns the value of that Pair's key.
         */
      get(key, keepPair) {
        const pair = findPair(this.items, key);
        return !keepPair && isPair(pair) ? isScalar(pair.key) ? pair.key.value : pair.key : pair;
      }
      set(key, value) {
        if (typeof value !== "boolean") throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = findPair(this.items, key);
        if (prev && !value) {
          this.items.splice(this.items.indexOf(prev), 1);
        } else if (!prev && value) {
          this.items.push(new Pair(key));
        }
      }
      toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx) return JSON.stringify(this);
        if (this.hasAllNullValues(true)) return super.toString(Object.assign({}, ctx, {
          allNullValues: true
        }), onComment, onChompKeep);
        else throw new Error("Set items must all have null values");
      }
      static from(schema4, iterable, ctx) {
        const { replacer } = ctx;
        const set2 = new this(schema4);
        if (iterable && Symbol.iterator in Object(iterable)) for (let value of iterable) {
          if (typeof replacer === "function") value = replacer.call(iterable, value, value);
          set2.items.push(createPair(value, null, ctx));
        }
        return set2;
      }
    };
    YAMLSet.tag = "tag:yaml.org,2002:set";
    set = {
      collection: "map",
      identify: (value) => value instanceof Set,
      nodeClass: YAMLSet,
      default: false,
      tag: "tag:yaml.org,2002:set",
      createNode: (schema4, iterable, ctx) => YAMLSet.from(schema4, iterable, ctx),
      resolve(map2, onError) {
        if (isMap(map2)) {
          if (map2.hasAllNullValues(true)) return Object.assign(new YAMLSet(), map2);
          else onError("Set items must all have null values");
        } else onError("Expected a mapping for this tag");
        return map2;
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/timestamp.js
function parseSexagesimal(str, asBigInt) {
  const sign = str[0];
  const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
  const num = (n) => asBigInt ? BigInt(n) : Number(n);
  const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
  return sign === "-" ? num(-1) * res : res;
}
function stringifySexagesimal(node) {
  let { value } = node;
  let num = (n) => n;
  if (typeof value === "bigint") num = (n) => BigInt(n);
  else if (isNaN(value) || !isFinite(value)) return stringifyNumber(node);
  let sign = "";
  if (value < 0) {
    sign = "-";
    value *= num(-1);
  }
  const _60 = num(60);
  const parts = [
    value % _60
  ];
  if (value < 60) {
    parts.unshift(0);
  } else {
    value = (value - parts[0]) / _60;
    parts.unshift(value % _60);
    if (value >= 60) {
      value = (value - parts[0]) / _60;
      parts.unshift(value);
    }
  }
  return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
var intTime, floatTime, timestamp;
var init_timestamp = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/timestamp.js"() {
    init_stringifyNumber();
    intTime = {
      identify: (value) => typeof value === "bigint" || Number.isInteger(value),
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
      resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
      stringify: stringifySexagesimal
    };
    floatTime = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
      resolve: (str) => parseSexagesimal(str, false),
      stringify: stringifySexagesimal
    };
    timestamp = {
      identify: (value) => value instanceof Date,
      default: true,
      tag: "tag:yaml.org,2002:timestamp",
      // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
      // may be omitted altogether, resulting in a date format. In such a case, the time part is
      // assumed to be 00:00:00Z (start of day, UTC).
      test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
      resolve(str) {
        const match = str.match(timestamp.test);
        if (!match) throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
        const [, year, month, day, hour, minute, second] = match.map(Number);
        const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
        let date2 = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        const tz = match[8];
        if (tz && tz !== "Z") {
          let d = parseSexagesimal(tz, false);
          if (Math.abs(d) < 30) d *= 60;
          date2 -= 6e4 * d;
        }
        return new Date(date2);
      },
      stringify: ({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/schema.js
var schema3;
var init_schema3 = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/yaml-1.1/schema.js"() {
    init_map();
    init_null();
    init_seq();
    init_string();
    init_binary();
    init_bool2();
    init_float2();
    init_int2();
    init_merge();
    init_omap();
    init_pairs();
    init_set();
    init_timestamp();
    schema3 = [
      map,
      seq,
      string,
      nullTag,
      trueTag,
      falseTag,
      intBin,
      intOct2,
      int2,
      intHex2,
      floatNaN2,
      floatExp2,
      float2,
      binary,
      merge,
      omap,
      pairs,
      set,
      intTime,
      floatTime,
      timestamp
    ];
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/tags.js
function getTags(customTags, schemaName, addMergeTag) {
  const schemaTags = schemas.get(schemaName);
  if (schemaTags && !customTags) {
    return addMergeTag && !schemaTags.includes(merge) ? schemaTags.concat(merge) : schemaTags.slice();
  }
  let tags = schemaTags;
  if (!tags) {
    if (Array.isArray(customTags)) tags = [];
    else {
      const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
      throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
    }
  }
  if (Array.isArray(customTags)) {
    for (const tag of customTags) tags = tags.concat(tag);
  } else if (typeof customTags === "function") {
    tags = customTags(tags.slice());
  }
  if (addMergeTag) tags = tags.concat(merge);
  return tags.reduce((tags2, tag) => {
    const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
    if (!tagObj) {
      const tagName = JSON.stringify(tag);
      const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
      throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
    }
    if (!tags2.includes(tagObj)) tags2.push(tagObj);
    return tags2;
  }, []);
}
var schemas, tagsByName, coreKnownTags;
var init_tags = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/tags.js"() {
    init_map();
    init_null();
    init_seq();
    init_string();
    init_bool();
    init_float();
    init_int();
    init_schema();
    init_schema2();
    init_binary();
    init_merge();
    init_omap();
    init_pairs();
    init_schema3();
    init_set();
    init_timestamp();
    schemas = /* @__PURE__ */ new Map([
      [
        "core",
        schema
      ],
      [
        "failsafe",
        [
          map,
          seq,
          string
        ]
      ],
      [
        "json",
        schema2
      ],
      [
        "yaml11",
        schema3
      ],
      [
        "yaml-1.1",
        schema3
      ]
    ]);
    tagsByName = {
      binary,
      bool: boolTag,
      float,
      floatExp,
      floatNaN,
      floatTime,
      int,
      intHex,
      intOct,
      intTime,
      map,
      merge,
      null: nullTag,
      omap,
      pairs,
      seq,
      set,
      timestamp
    };
    coreKnownTags = {
      "tag:yaml.org,2002:binary": binary,
      "tag:yaml.org,2002:merge": merge,
      "tag:yaml.org,2002:omap": omap,
      "tag:yaml.org,2002:pairs": pairs,
      "tag:yaml.org,2002:set": set,
      "tag:yaml.org,2002:timestamp": timestamp
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/Schema.js
var sortMapEntriesByKey, Schema;
var init_Schema = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/schema/Schema.js"() {
    init_identity();
    init_map();
    init_seq();
    init_string();
    init_tags();
    sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    Schema = class _Schema {
      constructor({ compat, customTags, merge: merge2, resolveKnownTags, schema: schema4, sortMapEntries, toStringDefaults }) {
        this.compat = Array.isArray(compat) ? getTags(compat, "compat") : compat ? getTags(null, compat) : null;
        this.name = typeof schema4 === "string" && schema4 || "core";
        this.knownTags = resolveKnownTags ? coreKnownTags : {};
        this.tags = getTags(customTags, this.name, merge2);
        this.toStringOptions = toStringDefaults ?? null;
        Object.defineProperty(this, MAP, {
          value: map
        });
        Object.defineProperty(this, SCALAR, {
          value: string
        });
        Object.defineProperty(this, SEQ, {
          value: seq
        });
        this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
      }
      clone() {
        const copy = Object.create(_Schema.prototype, Object.getOwnPropertyDescriptors(this));
        copy.tags = this.tags.slice();
        return copy;
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/stringifyDocument.js
function stringifyDocument(doc, options) {
  const lines2 = [];
  let hasDirectives = options.directives === true;
  if (options.directives !== false && doc.directives) {
    const dir = doc.directives.toString(doc);
    if (dir) {
      lines2.push(dir);
      hasDirectives = true;
    } else if (doc.directives.docStart) hasDirectives = true;
  }
  if (hasDirectives) lines2.push("---");
  const ctx = createStringifyContext(doc, options);
  const { commentString } = ctx.options;
  if (doc.commentBefore) {
    if (lines2.length !== 1) lines2.unshift("");
    const cs = commentString(doc.commentBefore);
    lines2.unshift(indentComment(cs, ""));
  }
  let chompKeep = false;
  let contentComment = null;
  if (doc.contents) {
    if (isNode(doc.contents)) {
      if (doc.contents.spaceBefore && hasDirectives) lines2.push("");
      if (doc.contents.commentBefore) {
        const cs = commentString(doc.contents.commentBefore);
        lines2.push(indentComment(cs, ""));
      }
      ctx.forceBlockIndent = !!doc.comment;
      contentComment = doc.contents.comment;
    }
    const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
    let body = stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
    if (contentComment) body += lineComment(body, "", commentString(contentComment));
    if ((body[0] === "|" || body[0] === ">") && lines2[lines2.length - 1] === "---") {
      lines2[lines2.length - 1] = `--- ${body}`;
    } else lines2.push(body);
  } else {
    lines2.push(stringify(doc.contents, ctx));
  }
  if (doc.directives?.docEnd) {
    if (doc.comment) {
      const cs = commentString(doc.comment);
      if (cs.includes("\n")) {
        lines2.push("...");
        lines2.push(indentComment(cs, ""));
      } else {
        lines2.push(`... ${cs}`);
      }
    } else {
      lines2.push("...");
    }
  } else {
    let dc = doc.comment;
    if (dc && chompKeep) dc = dc.replace(/^\n+/, "");
    if (dc) {
      if ((!chompKeep || contentComment) && lines2[lines2.length - 1] !== "") lines2.push("");
      lines2.push(indentComment(commentString(dc), ""));
    }
  }
  return lines2.join("\n") + "\n";
}
var init_stringifyDocument = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/stringify/stringifyDocument.js"() {
    init_identity();
    init_stringify();
    init_stringifyComment();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/doc/Document.js
function assertCollection(contents) {
  if (isCollection(contents)) return true;
  throw new Error("Expected a YAML collection as document contents");
}
var Document;
var init_Document = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/doc/Document.js"() {
    init_Alias();
    init_Collection();
    init_identity();
    init_Pair();
    init_toJS();
    init_Schema();
    init_stringifyDocument();
    init_anchors();
    init_applyReviver();
    init_createNode();
    init_directives();
    Document = class _Document {
      constructor(value, replacer, options) {
        this.commentBefore = null;
        this.comment = null;
        this.errors = [];
        this.warnings = [];
        Object.defineProperty(this, NODE_TYPE, {
          value: DOC
        });
        let _replacer = null;
        if (typeof replacer === "function" || Array.isArray(replacer)) {
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const opt = Object.assign({
          intAsBigInt: false,
          keepSourceTokens: false,
          logLevel: "warn",
          prettyErrors: true,
          strict: true,
          stringKeys: false,
          uniqueKeys: true,
          version: "1.2"
        }, options);
        this.options = opt;
        let { version } = opt;
        if (options?._directives) {
          this.directives = options._directives.atDocument();
          if (this.directives.yaml.explicit) version = this.directives.yaml.version;
        } else this.directives = new Directives({
          version
        });
        this.setSchema(version, options);
        this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
      }
      /**
         * Create a deep copy of this Document and its contents.
         *
         * Custom Node values that inherit from `Object` still refer to their original instances.
         */
      clone() {
        const copy = Object.create(_Document.prototype, {
          [NODE_TYPE]: {
            value: DOC
          }
        });
        copy.commentBefore = this.commentBefore;
        copy.comment = this.comment;
        copy.errors = this.errors.slice();
        copy.warnings = this.warnings.slice();
        copy.options = Object.assign({}, this.options);
        if (this.directives) copy.directives = this.directives.clone();
        copy.schema = this.schema.clone();
        copy.contents = isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
        if (this.range) copy.range = this.range.slice();
        return copy;
      }
      /** Adds a value to the document. */
      add(value) {
        if (assertCollection(this.contents)) this.contents.add(value);
      }
      /** Adds a value to the document. */
      addIn(path, value) {
        if (assertCollection(this.contents)) this.contents.addIn(path, value);
      }
      /**
         * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
         *
         * If `node` already has an anchor, `name` is ignored.
         * Otherwise, the `node.anchor` value will be set to `name`,
         * or if an anchor with that name is already present in the document,
         * `name` will be used as a prefix for a new unique anchor.
         * If `name` is undefined, the generated anchor will use 'a' as a prefix.
         */
      createAlias(node, name2) {
        if (!node.anchor) {
          const prev = anchorNames(this);
          node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          !name2 || prev.has(name2) ? findNewAnchor(name2 || "a", prev) : name2;
        }
        return new Alias(node.anchor);
      }
      createNode(value, replacer, options) {
        let _replacer = void 0;
        if (typeof replacer === "function") {
          value = replacer.call({
            "": value
          }, "", value);
          _replacer = replacer;
        } else if (Array.isArray(replacer)) {
          const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
          const asStr = replacer.filter(keyToStr).map(String);
          if (asStr.length > 0) replacer = replacer.concat(asStr);
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
        const { onAnchor, setAnchors, sourceObjects } = createNodeAnchors(
          this,
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          anchorPrefix || "a"
        );
        const ctx = {
          aliasDuplicateObjects: aliasDuplicateObjects ?? true,
          keepUndefined: keepUndefined ?? false,
          onAnchor,
          onTagObj,
          replacer: _replacer,
          schema: this.schema,
          sourceObjects
        };
        const node = createNode(value, tag, ctx);
        if (flow && isCollection(node)) node.flow = true;
        setAnchors();
        return node;
      }
      /**
         * Convert a key and a value into a `Pair` using the current schema,
         * recursively wrapping all values as `Scalar` or `Collection` nodes.
         */
      createPair(key, value, options = {}) {
        const k = this.createNode(key, null, options);
        const v = this.createNode(value, null, options);
        return new Pair(k, v);
      }
      /**
         * Removes a value from the document.
         * @returns `true` if the item was found and removed.
         */
      delete(key) {
        return assertCollection(this.contents) ? this.contents.delete(key) : false;
      }
      /**
         * Removes a value from the document.
         * @returns `true` if the item was found and removed.
         */
      deleteIn(path) {
        if (isEmptyPath(path)) {
          if (this.contents == null) return false;
          this.contents = null;
          return true;
        }
        return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
      }
      /**
         * Returns item at `key`, or `undefined` if not found. By default unwraps
         * scalar values from their surrounding node; to disable set `keepScalar` to
         * `true` (collections are always returned intact).
         */
      get(key, keepScalar) {
        return isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
      }
      /**
         * Returns item at `path`, or `undefined` if not found. By default unwraps
         * scalar values from their surrounding node; to disable set `keepScalar` to
         * `true` (collections are always returned intact).
         */
      getIn(path, keepScalar) {
        if (isEmptyPath(path)) return !keepScalar && isScalar(this.contents) ? this.contents.value : this.contents;
        return isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0;
      }
      /**
         * Checks if the document includes a value with the key `key`.
         */
      has(key) {
        return isCollection(this.contents) ? this.contents.has(key) : false;
      }
      /**
         * Checks if the document includes a value at `path`.
         */
      hasIn(path) {
        if (isEmptyPath(path)) return this.contents !== void 0;
        return isCollection(this.contents) ? this.contents.hasIn(path) : false;
      }
      /**
         * Sets a value in this document. For `!!set`, `value` needs to be a
         * boolean to add/remove the item from the set.
         */
      set(key, value) {
        if (this.contents == null) {
          this.contents = collectionFromPath(this.schema, [
            key
          ], value);
        } else if (assertCollection(this.contents)) {
          this.contents.set(key, value);
        }
      }
      /**
         * Sets a value in this document. For `!!set`, `value` needs to be a
         * boolean to add/remove the item from the set.
         */
      setIn(path, value) {
        if (isEmptyPath(path)) {
          this.contents = value;
        } else if (this.contents == null) {
          this.contents = collectionFromPath(this.schema, Array.from(path), value);
        } else if (assertCollection(this.contents)) {
          this.contents.setIn(path, value);
        }
      }
      /**
         * Change the YAML version and schema used by the document.
         * A `null` version disables support for directives, explicit tags, anchors, and aliases.
         * It also requires the `schema` option to be given as a `Schema` instance value.
         *
         * Overrides all previously set schema options.
         */
      setSchema(version, options = {}) {
        if (typeof version === "number") version = String(version);
        let opt;
        switch (version) {
          case "1.1":
            if (this.directives) this.directives.yaml.version = "1.1";
            else this.directives = new Directives({
              version: "1.1"
            });
            opt = {
              resolveKnownTags: false,
              schema: "yaml-1.1"
            };
            break;
          case "1.2":
          case "next":
            if (this.directives) this.directives.yaml.version = version;
            else this.directives = new Directives({
              version
            });
            opt = {
              resolveKnownTags: true,
              schema: "core"
            };
            break;
          case null:
            if (this.directives) delete this.directives;
            opt = null;
            break;
          default: {
            const sv = JSON.stringify(version);
            throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
          }
        }
        if (options.schema instanceof Object) this.schema = options.schema;
        else if (opt) this.schema = new Schema(Object.assign(opt, options));
        else throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
      }
      // json & jsonArg are only used from toJSON()
      toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc: this,
          keep: !json,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS(this.contents, jsonArg ?? "", ctx);
        if (typeof onAnchor === "function") for (const { count, res: res2 } of ctx.anchors.values()) onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver(reviver, {
          "": res
        }, "", res) : res;
      }
      /**
         * A JSON representation of the document `contents`.
         *
         * @param jsonArg Used by `JSON.stringify` to indicate the array index or
         *   property name.
         */
      toJSON(jsonArg, onAnchor) {
        return this.toJS({
          json: true,
          jsonArg,
          mapAsMap: false,
          onAnchor
        });
      }
      /** A YAML representation of the document. */
      toString(options = {}) {
        if (this.errors.length > 0) throw new Error("Document with errors cannot be stringified");
        if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
          const s = JSON.stringify(options.indent);
          throw new Error(`"indent" option must be a positive integer, not ${s}`);
        }
        return stringifyDocument(this, options);
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/errors.js
var YAMLError, YAMLParseError, YAMLWarning, prettifyError;
var init_errors = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/errors.js"() {
    YAMLError = class extends Error {
      constructor(name2, pos, code, message2) {
        super();
        this.name = name2;
        this.code = code;
        this.message = message2;
        this.pos = pos;
      }
    };
    YAMLParseError = class extends YAMLError {
      constructor(pos, code, message2) {
        super("YAMLParseError", pos, code, message2);
      }
    };
    YAMLWarning = class extends YAMLError {
      constructor(pos, code, message2) {
        super("YAMLWarning", pos, code, message2);
      }
    };
    prettifyError = (src, lc) => (error) => {
      if (error.pos[0] === -1) return;
      error.linePos = error.pos.map((pos) => lc.linePos(pos));
      const { line, col } = error.linePos[0];
      error.message += ` at line ${line}, column ${col}`;
      let ci = col - 1;
      let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
      if (ci >= 60 && lineStr.length > 80) {
        const trimStart = Math.min(ci - 39, lineStr.length - 79);
        lineStr = "\u2026" + lineStr.substring(trimStart);
        ci -= trimStart - 1;
      }
      if (lineStr.length > 80) lineStr = lineStr.substring(0, 79) + "\u2026";
      if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
        let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
        if (prev.length > 80) prev = prev.substring(0, 79) + "\u2026\n";
        lineStr = prev + lineStr;
      }
      if (/[^ ]/.test(lineStr)) {
        let count = 1;
        const end = error.linePos[1];
        if (end && end.line === line && end.col > col) {
          count = Math.max(1, Math.min(end.col - col, 80 - ci));
        }
        const pointer = " ".repeat(ci) + "^".repeat(count);
        error.message += `:

${lineStr}
${pointer}
`;
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/resolve-props.js
function resolveProps(tokens, { flow, indicator, next, offset, onError, parentIndent, startOnNewline }) {
  let spaceBefore = false;
  let atNewline = startOnNewline;
  let hasSpace = startOnNewline;
  let comment = "";
  let commentSep = "";
  let hasNewline = false;
  let reqSpace = false;
  let tab = null;
  let anchor = null;
  let tag = null;
  let newlineAfterProp = null;
  let comma = null;
  let found2 = null;
  let start = null;
  for (const token of tokens) {
    if (reqSpace) {
      if (token.type !== "space" && token.type !== "newline" && token.type !== "comma") onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      reqSpace = false;
    }
    if (tab) {
      if (atNewline && token.type !== "comment" && token.type !== "newline") {
        onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
      }
      tab = null;
    }
    switch (token.type) {
      case "space":
        if (!flow && (indicator !== "doc-start" || next?.type !== "flow-collection") && token.source.includes("	")) {
          tab = token;
        }
        hasSpace = true;
        break;
      case "comment": {
        if (!hasSpace) onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const cb = token.source.substring(1) || " ";
        if (!comment) comment = cb;
        else comment += commentSep + cb;
        commentSep = "";
        atNewline = false;
        break;
      }
      case "newline":
        if (atNewline) {
          if (comment) comment += token.source;
          else if (!found2 || indicator !== "seq-item-ind") spaceBefore = true;
        } else commentSep += token.source;
        atNewline = true;
        hasNewline = true;
        if (anchor || tag) newlineAfterProp = token;
        hasSpace = true;
        break;
      case "anchor":
        if (anchor) onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
        if (token.source.endsWith(":")) onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
        anchor = token;
        start ?? (start = token.offset);
        atNewline = false;
        hasSpace = false;
        reqSpace = true;
        break;
      case "tag": {
        if (tag) onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
        tag = token;
        start ?? (start = token.offset);
        atNewline = false;
        hasSpace = false;
        reqSpace = true;
        break;
      }
      case indicator:
        if (anchor || tag) onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
        if (found2) onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
        found2 = token;
        atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind";
        hasSpace = false;
        break;
      case "comma":
        if (flow) {
          if (comma) onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
          comma = token;
          atNewline = false;
          hasSpace = false;
          break;
        }
      // else fallthrough
      default:
        onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
        atNewline = false;
        hasSpace = false;
    }
  }
  const last = tokens[tokens.length - 1];
  const end = last ? last.offset + last.source.length : offset;
  if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== "")) {
    onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
  }
  if (tab && (atNewline && tab.indent <= parentIndent || next?.type === "block-map" || next?.type === "block-seq")) onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
  return {
    comma,
    found: found2,
    spaceBefore,
    comment,
    hasNewline,
    anchor,
    tag,
    newlineAfterProp,
    end,
    start: start ?? end
  };
}
var init_resolve_props = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/resolve-props.js"() {
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/util-contains-newline.js
function containsNewline(key) {
  if (!key) return null;
  switch (key.type) {
    case "alias":
    case "scalar":
    case "double-quoted-scalar":
    case "single-quoted-scalar":
      if (key.source.includes("\n")) return true;
      if (key.end) {
        for (const st of key.end) if (st.type === "newline") return true;
      }
      return false;
    case "flow-collection":
      for (const it of key.items) {
        for (const st of it.start) if (st.type === "newline") return true;
        if (it.sep) {
          for (const st of it.sep) if (st.type === "newline") return true;
        }
        if (containsNewline(it.key) || containsNewline(it.value)) return true;
      }
      return false;
    default:
      return true;
  }
}
var init_util_contains_newline = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/util-contains-newline.js"() {
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/util-flow-indent-check.js
function flowIndentCheck(indent, fc, onError) {
  if (fc?.type === "flow-collection") {
    const end = fc.end[0];
    if (end.indent === indent && (end.source === "]" || end.source === "}") && containsNewline(fc)) {
      const msg = "Flow end indicator should be more indented than parent";
      onError(end, "BAD_INDENT", msg, true);
    }
  }
}
var init_util_flow_indent_check = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/util-flow-indent-check.js"() {
    init_util_contains_newline();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/util-map-includes.js
function mapIncludes(ctx, items, search) {
  const { uniqueKeys } = ctx.options;
  if (uniqueKeys === false) return false;
  const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || isScalar(a) && isScalar(b) && a.value === b.value;
  return items.some((pair) => isEqual(pair.key, search));
}
var init_util_map_includes = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/util-map-includes.js"() {
    init_identity();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/resolve-block-map.js
function resolveBlockMap({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, bm, onError, tag) {
  const NodeClass = tag?.nodeClass ?? YAMLMap;
  const map2 = new NodeClass(ctx.schema);
  if (ctx.atRoot) ctx.atRoot = false;
  let offset = bm.offset;
  let commentEnd = null;
  for (const collItem of bm.items) {
    const { start, key, sep, value } = collItem;
    const keyProps = resolveProps(start, {
      indicator: "explicit-key-ind",
      next: key ?? sep?.[0],
      offset,
      onError,
      parentIndent: bm.indent,
      startOnNewline: true
    });
    const implicitKey = !keyProps.found;
    if (implicitKey) {
      if (key) {
        if (key.type === "block-seq") onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
        else if ("indent" in key && key.indent !== bm.indent) onError(offset, "BAD_INDENT", startColMsg);
      }
      if (!keyProps.anchor && !keyProps.tag && !sep) {
        commentEnd = keyProps.end;
        if (keyProps.comment) {
          if (map2.comment) map2.comment += "\n" + keyProps.comment;
          else map2.comment = keyProps.comment;
        }
        continue;
      }
      if (keyProps.newlineAfterProp || containsNewline(key)) {
        onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
      }
    } else if (keyProps.found?.indent !== bm.indent) {
      onError(offset, "BAD_INDENT", startColMsg);
    }
    ctx.atKey = true;
    const keyStart = keyProps.end;
    const keyNode = key ? composeNode2(ctx, key, keyProps, onError) : composeEmptyNode2(ctx, keyStart, start, null, keyProps, onError);
    if (ctx.schema.compat) flowIndentCheck(bm.indent, key, onError);
    ctx.atKey = false;
    if (mapIncludes(ctx, map2.items, keyNode)) onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
    const valueProps = resolveProps(sep ?? [], {
      indicator: "map-value-ind",
      next: value,
      offset: keyNode.range[2],
      onError,
      parentIndent: bm.indent,
      startOnNewline: !key || key.type === "block-scalar"
    });
    offset = valueProps.end;
    if (valueProps.found) {
      if (implicitKey) {
        if (value?.type === "block-map" && !valueProps.hasNewline) onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
        if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024) onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
      }
      const valueNode = value ? composeNode2(ctx, value, valueProps, onError) : composeEmptyNode2(ctx, offset, sep, null, valueProps, onError);
      if (ctx.schema.compat) flowIndentCheck(bm.indent, value, onError);
      offset = valueNode.range[2];
      const pair = new Pair(keyNode, valueNode);
      if (ctx.options.keepSourceTokens) pair.srcToken = collItem;
      map2.items.push(pair);
    } else {
      if (implicitKey) onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
      if (valueProps.comment) {
        if (keyNode.comment) keyNode.comment += "\n" + valueProps.comment;
        else keyNode.comment = valueProps.comment;
      }
      const pair = new Pair(keyNode);
      if (ctx.options.keepSourceTokens) pair.srcToken = collItem;
      map2.items.push(pair);
    }
  }
  if (commentEnd && commentEnd < offset) onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
  map2.range = [
    bm.offset,
    offset,
    commentEnd ?? offset
  ];
  return map2;
}
var startColMsg;
var init_resolve_block_map = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/resolve-block-map.js"() {
    init_Pair();
    init_YAMLMap();
    init_resolve_props();
    init_util_contains_newline();
    init_util_flow_indent_check();
    init_util_map_includes();
    startColMsg = "All mapping items must start at the same column";
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/resolve-block-seq.js
function resolveBlockSeq({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, bs, onError, tag) {
  const NodeClass = tag?.nodeClass ?? YAMLSeq;
  const seq2 = new NodeClass(ctx.schema);
  if (ctx.atRoot) ctx.atRoot = false;
  if (ctx.atKey) ctx.atKey = false;
  let offset = bs.offset;
  let commentEnd = null;
  for (const { start, value } of bs.items) {
    const props = resolveProps(start, {
      indicator: "seq-item-ind",
      next: value,
      offset,
      onError,
      parentIndent: bs.indent,
      startOnNewline: true
    });
    if (!props.found) {
      if (props.anchor || props.tag || value) {
        if (value && value.type === "block-seq") onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
        else onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
      } else {
        commentEnd = props.end;
        if (props.comment) seq2.comment = props.comment;
        continue;
      }
    }
    const node = value ? composeNode2(ctx, value, props, onError) : composeEmptyNode2(ctx, props.end, start, null, props, onError);
    if (ctx.schema.compat) flowIndentCheck(bs.indent, value, onError);
    offset = node.range[2];
    seq2.items.push(node);
  }
  seq2.range = [
    bs.offset,
    offset,
    commentEnd ?? offset
  ];
  return seq2;
}
var init_resolve_block_seq = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/resolve-block-seq.js"() {
    init_YAMLSeq();
    init_resolve_props();
    init_util_flow_indent_check();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/resolve-end.js
function resolveEnd(end, offset, reqSpace, onError) {
  let comment = "";
  if (end) {
    let hasSpace = false;
    let sep = "";
    for (const token of end) {
      const { source, type } = token;
      switch (type) {
        case "space":
          hasSpace = true;
          break;
        case "comment": {
          if (reqSpace && !hasSpace) onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const cb = source.substring(1) || " ";
          if (!comment) comment = cb;
          else comment += sep + cb;
          sep = "";
          break;
        }
        case "newline":
          if (comment) sep += source;
          hasSpace = true;
          break;
        default:
          onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
      }
      offset += source.length;
    }
  }
  return {
    comment,
    offset
  };
}
var init_resolve_end = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/resolve-end.js"() {
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/resolve-flow-collection.js
function resolveFlowCollection({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, fc, onError, tag) {
  const isMap2 = fc.start.source === "{";
  const fcName = isMap2 ? "flow map" : "flow sequence";
  const NodeClass = tag?.nodeClass ?? (isMap2 ? YAMLMap : YAMLSeq);
  const coll = new NodeClass(ctx.schema);
  coll.flow = true;
  const atRoot = ctx.atRoot;
  if (atRoot) ctx.atRoot = false;
  if (ctx.atKey) ctx.atKey = false;
  let offset = fc.offset + fc.start.source.length;
  for (let i = 0; i < fc.items.length; ++i) {
    const collItem = fc.items[i];
    const { start, key, sep, value } = collItem;
    const props = resolveProps(start, {
      flow: fcName,
      indicator: "explicit-key-ind",
      next: key ?? sep?.[0],
      offset,
      onError,
      parentIndent: fc.indent,
      startOnNewline: false
    });
    if (!props.found) {
      if (!props.anchor && !props.tag && !sep && !value) {
        if (i === 0 && props.comma) onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
        else if (i < fc.items.length - 1) onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
        if (props.comment) {
          if (coll.comment) coll.comment += "\n" + props.comment;
          else coll.comment = props.comment;
        }
        offset = props.end;
        continue;
      }
      if (!isMap2 && ctx.options.strict && containsNewline(key)) onError(key, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
    }
    if (i === 0) {
      if (props.comma) onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
    } else {
      if (!props.comma) onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
      if (props.comment) {
        let prevItemComment = "";
        loop: for (const st of start) {
          switch (st.type) {
            case "comma":
            case "space":
              break;
            case "comment":
              prevItemComment = st.source.substring(1);
              break loop;
            default:
              break loop;
          }
        }
        if (prevItemComment) {
          let prev = coll.items[coll.items.length - 1];
          if (isPair(prev)) prev = prev.value ?? prev.key;
          if (prev.comment) prev.comment += "\n" + prevItemComment;
          else prev.comment = prevItemComment;
          props.comment = props.comment.substring(prevItemComment.length + 1);
        }
      }
    }
    if (!isMap2 && !sep && !props.found) {
      const valueNode = value ? composeNode2(ctx, value, props, onError) : composeEmptyNode2(ctx, props.end, sep, null, props, onError);
      coll.items.push(valueNode);
      offset = valueNode.range[2];
      if (isBlock(value)) onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
    } else {
      ctx.atKey = true;
      const keyStart = props.end;
      const keyNode = key ? composeNode2(ctx, key, props, onError) : composeEmptyNode2(ctx, keyStart, start, null, props, onError);
      if (isBlock(key)) onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
      ctx.atKey = false;
      const valueProps = resolveProps(sep ?? [], {
        flow: fcName,
        indicator: "map-value-ind",
        next: value,
        offset: keyNode.range[2],
        onError,
        parentIndent: fc.indent,
        startOnNewline: false
      });
      if (valueProps.found) {
        if (!isMap2 && !props.found && ctx.options.strict) {
          if (sep) for (const st of sep) {
            if (st === valueProps.found) break;
            if (st.type === "newline") {
              onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
              break;
            }
          }
          if (props.start < valueProps.found.offset - 1024) onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else if (value) {
        if ("source" in value && value.source && value.source[0] === ":") onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
        else onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
      }
      const valueNode = value ? composeNode2(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode2(ctx, valueProps.end, sep, null, valueProps, onError) : null;
      if (valueNode) {
        if (isBlock(value)) onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
      } else if (valueProps.comment) {
        if (keyNode.comment) keyNode.comment += "\n" + valueProps.comment;
        else keyNode.comment = valueProps.comment;
      }
      const pair = new Pair(keyNode, valueNode);
      if (ctx.options.keepSourceTokens) pair.srcToken = collItem;
      if (isMap2) {
        const map2 = coll;
        if (mapIncludes(ctx, map2.items, keyNode)) onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
        map2.items.push(pair);
      } else {
        const map2 = new YAMLMap(ctx.schema);
        map2.flow = true;
        map2.items.push(pair);
        const endRange = (valueNode ?? keyNode).range;
        map2.range = [
          keyNode.range[0],
          endRange[1],
          endRange[2]
        ];
        coll.items.push(map2);
      }
      offset = valueNode ? valueNode.range[2] : valueProps.end;
    }
  }
  const expectedEnd = isMap2 ? "}" : "]";
  const [ce, ...ee] = fc.end;
  let cePos = offset;
  if (ce && ce.source === expectedEnd) cePos = ce.offset + ce.source.length;
  else {
    const name2 = fcName[0].toUpperCase() + fcName.substring(1);
    const msg = atRoot ? `${name2} must end with a ${expectedEnd}` : `${name2} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
    onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
    if (ce && ce.source.length !== 1) ee.unshift(ce);
  }
  if (ee.length > 0) {
    const end = resolveEnd(ee, cePos, ctx.options.strict, onError);
    if (end.comment) {
      if (coll.comment) coll.comment += "\n" + end.comment;
      else coll.comment = end.comment;
    }
    coll.range = [
      fc.offset,
      cePos,
      end.offset
    ];
  } else {
    coll.range = [
      fc.offset,
      cePos,
      cePos
    ];
  }
  return coll;
}
var blockMsg, isBlock;
var init_resolve_flow_collection = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/resolve-flow-collection.js"() {
    init_identity();
    init_Pair();
    init_YAMLMap();
    init_YAMLSeq();
    init_resolve_end();
    init_resolve_props();
    init_util_contains_newline();
    init_util_map_includes();
    blockMsg = "Block collections are not allowed within flow collections";
    isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/compose-collection.js
function resolveCollection(CN2, ctx, token, onError, tagName, tag) {
  const coll = token.type === "block-map" ? resolveBlockMap(CN2, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq(CN2, ctx, token, onError, tag) : resolveFlowCollection(CN2, ctx, token, onError, tag);
  const Coll = coll.constructor;
  if (tagName === "!" || tagName === Coll.tagName) {
    coll.tag = Coll.tagName;
    return coll;
  }
  if (tagName) coll.tag = tagName;
  return coll;
}
function composeCollection(CN2, ctx, token, props, onError) {
  const tagToken = props.tag;
  const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
  if (token.type === "block-seq") {
    const { anchor, newlineAfterProp: nl } = props;
    const lastProp = anchor && tagToken ? anchor.offset > tagToken.offset ? anchor : tagToken : anchor ?? tagToken;
    if (lastProp && (!nl || nl.offset < lastProp.offset)) {
      const message2 = "Missing newline after block sequence props";
      onError(lastProp, "MISSING_CHAR", message2);
    }
  }
  const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
  if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.tagName && expType === "seq") {
    return resolveCollection(CN2, ctx, token, onError, tagName);
  }
  let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
  if (!tag) {
    const kt = ctx.schema.knownTags[tagName];
    if (kt && kt.collection === expType) {
      ctx.schema.tags.push(Object.assign({}, kt, {
        default: false
      }));
      tag = kt;
    } else {
      if (kt) {
        onError(tagToken, "BAD_COLLECTION_TYPE", `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? "scalar"}`, true);
      } else {
        onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
      }
      return resolveCollection(CN2, ctx, token, onError, tagName);
    }
  }
  const coll = resolveCollection(CN2, ctx, token, onError, tagName, tag);
  const res = tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ?? coll;
  const node = isNode(res) ? res : new Scalar(res);
  node.range = coll.range;
  node.tag = tagName;
  if (tag?.format) node.format = tag.format;
  return node;
}
var init_compose_collection = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/compose-collection.js"() {
    init_identity();
    init_Scalar();
    init_YAMLMap();
    init_YAMLSeq();
    init_resolve_block_map();
    init_resolve_block_seq();
    init_resolve_flow_collection();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/resolve-block-scalar.js
function resolveBlockScalar(ctx, scalar, onError) {
  const start = scalar.offset;
  const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
  if (!header) return {
    value: "",
    type: null,
    comment: "",
    range: [
      start,
      start,
      start
    ]
  };
  const type = header.mode === ">" ? Scalar.BLOCK_FOLDED : Scalar.BLOCK_LITERAL;
  const lines2 = scalar.source ? splitLines(scalar.source) : [];
  let chompStart = lines2.length;
  for (let i = lines2.length - 1; i >= 0; --i) {
    const content = lines2[i][1];
    if (content === "" || content === "\r") chompStart = i;
    else break;
  }
  if (chompStart === 0) {
    const value2 = header.chomp === "+" && lines2.length > 0 ? "\n".repeat(Math.max(1, lines2.length - 1)) : "";
    let end2 = start + header.length;
    if (scalar.source) end2 += scalar.source.length;
    return {
      value: value2,
      type,
      comment: header.comment,
      range: [
        start,
        end2,
        end2
      ]
    };
  }
  let trimIndent = scalar.indent + header.indent;
  let offset = scalar.offset + header.length;
  let contentStart = 0;
  for (let i = 0; i < chompStart; ++i) {
    const [indent, content] = lines2[i];
    if (content === "" || content === "\r") {
      if (header.indent === 0 && indent.length > trimIndent) trimIndent = indent.length;
    } else {
      if (indent.length < trimIndent) {
        const message2 = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
        onError(offset + indent.length, "MISSING_CHAR", message2);
      }
      if (header.indent === 0) trimIndent = indent.length;
      contentStart = i;
      if (trimIndent === 0 && !ctx.atRoot) {
        const message2 = "Block scalar values in collections must be indented";
        onError(offset, "BAD_INDENT", message2);
      }
      break;
    }
    offset += indent.length + content.length + 1;
  }
  for (let i = lines2.length - 1; i >= chompStart; --i) {
    if (lines2[i][0].length > trimIndent) chompStart = i + 1;
  }
  let value = "";
  let sep = "";
  let prevMoreIndented = false;
  for (let i = 0; i < contentStart; ++i) value += lines2[i][0].slice(trimIndent) + "\n";
  for (let i = contentStart; i < chompStart; ++i) {
    let [indent, content] = lines2[i];
    offset += indent.length + content.length + 1;
    const crlf = content[content.length - 1] === "\r";
    if (crlf) content = content.slice(0, -1);
    if (content && indent.length < trimIndent) {
      const src = header.indent ? "explicit indentation indicator" : "first line";
      const message2 = `Block scalar lines must not be less indented than their ${src}`;
      onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message2);
      indent = "";
    }
    if (type === Scalar.BLOCK_LITERAL) {
      value += sep + indent.slice(trimIndent) + content;
      sep = "\n";
    } else if (indent.length > trimIndent || content[0] === "	") {
      if (sep === " ") sep = "\n";
      else if (!prevMoreIndented && sep === "\n") sep = "\n\n";
      value += sep + indent.slice(trimIndent) + content;
      sep = "\n";
      prevMoreIndented = true;
    } else if (content === "") {
      if (sep === "\n") value += "\n";
      else sep = "\n";
    } else {
      value += sep + content;
      sep = " ";
      prevMoreIndented = false;
    }
  }
  switch (header.chomp) {
    case "-":
      break;
    case "+":
      for (let i = chompStart; i < lines2.length; ++i) value += "\n" + lines2[i][0].slice(trimIndent);
      if (value[value.length - 1] !== "\n") value += "\n";
      break;
    default:
      value += "\n";
  }
  const end = start + header.length + scalar.source.length;
  return {
    value,
    type,
    comment: header.comment,
    range: [
      start,
      end,
      end
    ]
  };
}
function parseBlockScalarHeader({ offset, props }, strict, onError) {
  if (props[0].type !== "block-scalar-header") {
    onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
    return null;
  }
  const { source } = props[0];
  const mode = source[0];
  let indent = 0;
  let chomp = "";
  let error = -1;
  for (let i = 1; i < source.length; ++i) {
    const ch = source[i];
    if (!chomp && (ch === "-" || ch === "+")) chomp = ch;
    else {
      const n = Number(ch);
      if (!indent && n) indent = n;
      else if (error === -1) error = offset + i;
    }
  }
  if (error !== -1) onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
  let hasSpace = false;
  let comment = "";
  let length = source.length;
  for (let i = 1; i < props.length; ++i) {
    const token = props[i];
    switch (token.type) {
      case "space":
        hasSpace = true;
      // fallthrough
      case "newline":
        length += token.source.length;
        break;
      case "comment":
        if (strict && !hasSpace) {
          const message2 = "Comments must be separated from other tokens by white space characters";
          onError(token, "MISSING_CHAR", message2);
        }
        length += token.source.length;
        comment = token.source.substring(1);
        break;
      case "error":
        onError(token, "UNEXPECTED_TOKEN", token.message);
        length += token.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const message2 = `Unexpected token in block scalar header: ${token.type}`;
        onError(token, "UNEXPECTED_TOKEN", message2);
        const ts = token.source;
        if (ts && typeof ts === "string") length += ts.length;
      }
    }
  }
  return {
    mode,
    indent,
    chomp,
    comment,
    length
  };
}
function splitLines(source) {
  const split = source.split(/\n( *)/);
  const first = split[0];
  const m = first.match(/^( *)/);
  const line0 = m?.[1] ? [
    m[1],
    first.slice(m[1].length)
  ] : [
    "",
    first
  ];
  const lines2 = [
    line0
  ];
  for (let i = 1; i < split.length; i += 2) lines2.push([
    split[i],
    split[i + 1]
  ]);
  return lines2;
}
var init_resolve_block_scalar = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/resolve-block-scalar.js"() {
    init_Scalar();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/resolve-flow-scalar.js
function resolveFlowScalar(scalar, strict, onError) {
  const { offset, type, source, end } = scalar;
  let _type;
  let value;
  const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
  switch (type) {
    case "scalar":
      _type = Scalar.PLAIN;
      value = plainValue(source, _onError);
      break;
    case "single-quoted-scalar":
      _type = Scalar.QUOTE_SINGLE;
      value = singleQuotedValue(source, _onError);
      break;
    case "double-quoted-scalar":
      _type = Scalar.QUOTE_DOUBLE;
      value = doubleQuotedValue(source, _onError);
      break;
    /* istanbul ignore next should not happen */
    default:
      onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
      return {
        value: "",
        type: null,
        comment: "",
        range: [
          offset,
          offset + source.length,
          offset + source.length
        ]
      };
  }
  const valueEnd = offset + source.length;
  const re = resolveEnd(end, valueEnd, strict, onError);
  return {
    value,
    type: _type,
    comment: re.comment,
    range: [
      offset,
      valueEnd,
      re.offset
    ]
  };
}
function plainValue(source, onError) {
  let badChar = "";
  switch (source[0]) {
    /* istanbul ignore next should not happen */
    case "	":
      badChar = "a tab character";
      break;
    case ",":
      badChar = "flow indicator character ,";
      break;
    case "%":
      badChar = "directive indicator character %";
      break;
    case "|":
    case ">": {
      badChar = `block scalar indicator ${source[0]}`;
      break;
    }
    case "@":
    case "`": {
      badChar = `reserved character ${source[0]}`;
      break;
    }
  }
  if (badChar) onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
  return foldLines(source);
}
function singleQuotedValue(source, onError) {
  if (source[source.length - 1] !== "'" || source.length === 1) onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
  return foldLines(source.slice(1, -1)).replace(/''/g, "'");
}
function foldLines(source) {
  let first, line;
  try {
    first = new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
    line = new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
  } catch {
    first = /(.*?)[ \t]*\r?\n/sy;
    line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
  }
  let match = first.exec(source);
  if (!match) return source;
  let res = match[1];
  let sep = " ";
  let pos = first.lastIndex;
  line.lastIndex = pos;
  while (match = line.exec(source)) {
    if (match[1] === "") {
      if (sep === "\n") res += sep;
      else sep = "\n";
    } else {
      res += sep + match[1];
      sep = " ";
    }
    pos = line.lastIndex;
  }
  const last = /[ \t]*(.*)/sy;
  last.lastIndex = pos;
  match = last.exec(source);
  return res + sep + (match?.[1] ?? "");
}
function doubleQuotedValue(source, onError) {
  let res = "";
  for (let i = 1; i < source.length - 1; ++i) {
    const ch = source[i];
    if (ch === "\r" && source[i + 1] === "\n") continue;
    if (ch === "\n") {
      const { fold, offset } = foldNewline(source, i);
      res += fold;
      i = offset;
    } else if (ch === "\\") {
      let next = source[++i];
      const cc = escapeCodes[next];
      if (cc) res += cc;
      else if (next === "\n") {
        next = source[i + 1];
        while (next === " " || next === "	") next = source[++i + 1];
      } else if (next === "\r" && source[i + 1] === "\n") {
        next = source[++i + 1];
        while (next === " " || next === "	") next = source[++i + 1];
      } else if (next === "x" || next === "u" || next === "U") {
        const length = {
          x: 2,
          u: 4,
          U: 8
        }[next];
        res += parseCharCode(source, i + 1, length, onError);
        i += length;
      } else {
        const raw = source.substr(i - 1, 2);
        onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
        res += raw;
      }
    } else if (ch === " " || ch === "	") {
      const wsStart = i;
      let next = source[i + 1];
      while (next === " " || next === "	") next = source[++i + 1];
      if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n")) res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
    } else {
      res += ch;
    }
  }
  if (source[source.length - 1] !== '"' || source.length === 1) onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
  return res;
}
function foldNewline(source, offset) {
  let fold = "";
  let ch = source[offset + 1];
  while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
    if (ch === "\r" && source[offset + 2] !== "\n") break;
    if (ch === "\n") fold += "\n";
    offset += 1;
    ch = source[offset + 1];
  }
  if (!fold) fold = " ";
  return {
    fold,
    offset
  };
}
function parseCharCode(source, offset, length, onError) {
  const cc = source.substr(offset, length);
  const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
  const code = ok ? parseInt(cc, 16) : NaN;
  if (isNaN(code)) {
    const raw = source.substr(offset - 2, length + 2);
    onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
    return raw;
  }
  return String.fromCodePoint(code);
}
var escapeCodes;
var init_resolve_flow_scalar = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/resolve-flow-scalar.js"() {
    init_Scalar();
    init_resolve_end();
    escapeCodes = {
      "0": "\0",
      a: "\x07",
      b: "\b",
      e: "\x1B",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "	",
      v: "\v",
      N: "\x85",
      _: "\xA0",
      L: "\u2028",
      P: "\u2029",
      " ": " ",
      '"': '"',
      "/": "/",
      "\\": "\\",
      "	": "	"
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/compose-scalar.js
function composeScalar(ctx, token, tagToken, onError) {
  const { value, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar(ctx, token, onError) : resolveFlowScalar(token, ctx.options.strict, onError);
  const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
  let tag;
  if (ctx.options.stringKeys && ctx.atKey) {
    tag = ctx.schema[SCALAR];
  } else if (tagName) tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
  else if (token.type === "scalar") tag = findScalarTagByTest(ctx, value, token, onError);
  else tag = ctx.schema[SCALAR];
  let scalar;
  try {
    const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
    scalar = isScalar(res) ? res : new Scalar(res);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
    scalar = new Scalar(value);
  }
  scalar.range = range;
  scalar.source = value;
  if (type) scalar.type = type;
  if (tagName) scalar.tag = tagName;
  if (tag.format) scalar.format = tag.format;
  if (comment) scalar.comment = comment;
  return scalar;
}
function findScalarTagByName(schema4, value, tagName, tagToken, onError) {
  if (tagName === "!") return schema4[SCALAR];
  const matchWithTest = [];
  for (const tag of schema4.tags) {
    if (!tag.collection && tag.tag === tagName) {
      if (tag.default && tag.test) matchWithTest.push(tag);
      else return tag;
    }
  }
  for (const tag of matchWithTest) if (tag.test?.test(value)) return tag;
  const kt = schema4.knownTags[tagName];
  if (kt && !kt.collection) {
    schema4.tags.push(Object.assign({}, kt, {
      default: false,
      test: void 0
    }));
    return kt;
  }
  onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
  return schema4[SCALAR];
}
function findScalarTagByTest({ atKey, directives, schema: schema4 }, value, token, onError) {
  const tag = schema4.tags.find((tag2) => (tag2.default === true || atKey && tag2.default === "key") && tag2.test?.test(value)) || schema4[SCALAR];
  if (schema4.compat) {
    const compat = schema4.compat.find((tag2) => tag2.default && tag2.test?.test(value)) ?? schema4[SCALAR];
    if (tag.tag !== compat.tag) {
      const ts = directives.tagString(tag.tag);
      const cs = directives.tagString(compat.tag);
      const msg = `Value may be parsed as either ${ts} or ${cs}`;
      onError(token, "TAG_RESOLVE_FAILED", msg, true);
    }
  }
  return tag;
}
var init_compose_scalar = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/compose-scalar.js"() {
    init_identity();
    init_Scalar();
    init_resolve_block_scalar();
    init_resolve_flow_scalar();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/util-empty-scalar-position.js
function emptyScalarPosition(offset, before, pos) {
  if (before) {
    pos ?? (pos = before.length);
    for (let i = pos - 1; i >= 0; --i) {
      let st = before[i];
      switch (st.type) {
        case "space":
        case "comment":
        case "newline":
          offset -= st.source.length;
          continue;
      }
      st = before[++i];
      while (st?.type === "space") {
        offset += st.source.length;
        st = before[++i];
      }
      break;
    }
  }
  return offset;
}
var init_util_empty_scalar_position = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/util-empty-scalar-position.js"() {
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/compose-node.js
function composeNode(ctx, token, props, onError) {
  const atKey = ctx.atKey;
  const { spaceBefore, comment, anchor, tag } = props;
  let node;
  let isSrcToken = true;
  switch (token.type) {
    case "alias":
      node = composeAlias(ctx, token, onError);
      if (anchor || tag) onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      node = composeScalar(ctx, token, tag, onError);
      if (anchor) node.anchor = anchor.source.substring(1);
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      node = composeCollection(CN, ctx, token, props, onError);
      if (anchor) node.anchor = anchor.source.substring(1);
      break;
    default: {
      const message2 = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
      onError(token, "UNEXPECTED_TOKEN", message2);
      node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError);
      isSrcToken = false;
    }
  }
  if (anchor && node.anchor === "") onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
  if (atKey && ctx.options.stringKeys && (!isScalar(node) || typeof node.value !== "string" || node.tag && node.tag !== "tag:yaml.org,2002:str")) {
    const msg = "With stringKeys, all keys must be strings";
    onError(tag ?? token, "NON_STRING_KEY", msg);
  }
  if (spaceBefore) node.spaceBefore = true;
  if (comment) {
    if (token.type === "scalar" && token.source === "") node.comment = comment;
    else node.commentBefore = comment;
  }
  if (ctx.options.keepSourceTokens && isSrcToken) node.srcToken = token;
  return node;
}
function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
  const token = {
    type: "scalar",
    offset: emptyScalarPosition(offset, before, pos),
    indent: -1,
    source: ""
  };
  const node = composeScalar(ctx, token, tag, onError);
  if (anchor) {
    node.anchor = anchor.source.substring(1);
    if (node.anchor === "") onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
  }
  if (spaceBefore) node.spaceBefore = true;
  if (comment) {
    node.comment = comment;
    node.range[2] = end;
  }
  return node;
}
function composeAlias({ options }, { offset, source, end }, onError) {
  const alias = new Alias(source.substring(1));
  if (alias.source === "") onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
  if (alias.source.endsWith(":")) onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
  const valueEnd = offset + source.length;
  const re = resolveEnd(end, valueEnd, options.strict, onError);
  alias.range = [
    offset,
    valueEnd,
    re.offset
  ];
  if (re.comment) alias.comment = re.comment;
  return alias;
}
var CN;
var init_compose_node = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/compose-node.js"() {
    init_Alias();
    init_identity();
    init_compose_collection();
    init_compose_scalar();
    init_resolve_end();
    init_util_empty_scalar_position();
    CN = {
      composeNode,
      composeEmptyNode
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/compose-doc.js
function composeDoc(options, directives, { offset, start, value, end }, onError) {
  const opts = Object.assign({
    _directives: directives
  }, options);
  const doc = new Document(void 0, opts);
  const ctx = {
    atKey: false,
    atRoot: true,
    directives: doc.directives,
    options: doc.options,
    schema: doc.schema
  };
  const props = resolveProps(start, {
    indicator: "doc-start",
    next: value ?? end?.[0],
    offset,
    onError,
    parentIndent: 0,
    startOnNewline: true
  });
  if (props.found) {
    doc.directives.docStart = true;
    if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline) onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
  }
  doc.contents = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
  const contentEnd = doc.contents.range[2];
  const re = resolveEnd(end, contentEnd, false, onError);
  if (re.comment) doc.comment = re.comment;
  doc.range = [
    offset,
    contentEnd,
    re.offset
  ];
  return doc;
}
var init_compose_doc = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/compose-doc.js"() {
    init_Document();
    init_compose_node();
    init_resolve_end();
    init_resolve_props();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/composer.js
function getErrorPos(src) {
  if (typeof src === "number") return [
    src,
    src + 1
  ];
  if (Array.isArray(src)) return src.length === 2 ? src : [
    src[0],
    src[1]
  ];
  const { offset, source } = src;
  return [
    offset,
    offset + (typeof source === "string" ? source.length : 1)
  ];
}
function parsePrelude(prelude) {
  let comment = "";
  let atComment = false;
  let afterEmptyLine = false;
  for (let i = 0; i < prelude.length; ++i) {
    const source = prelude[i];
    switch (source[0]) {
      case "#":
        comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
        atComment = true;
        afterEmptyLine = false;
        break;
      case "%":
        if (prelude[i + 1]?.[0] !== "#") i += 1;
        atComment = false;
        break;
      default:
        if (!atComment) afterEmptyLine = true;
        atComment = false;
    }
  }
  return {
    comment,
    afterEmptyLine
  };
}
var Composer;
var init_composer = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/compose/composer.js"() {
    init_directives();
    init_Document();
    init_errors();
    init_identity();
    init_compose_doc();
    init_resolve_end();
    Composer = class {
      constructor(options = {}) {
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = (source, code, message2, warning) => {
          const pos = getErrorPos(source);
          if (warning) this.warnings.push(new YAMLWarning(pos, code, message2));
          else this.errors.push(new YAMLParseError(pos, code, message2));
        };
        this.directives = new Directives({
          version: options.version || "1.2"
        });
        this.options = options;
      }
      decorate(doc, afterDoc) {
        const { comment, afterEmptyLine } = parsePrelude(this.prelude);
        if (comment) {
          const dc = doc.contents;
          if (afterDoc) {
            doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
          } else if (afterEmptyLine || doc.directives.docStart || !dc) {
            doc.commentBefore = comment;
          } else if (isCollection(dc) && !dc.flow && dc.items.length > 0) {
            let it = dc.items[0];
            if (isPair(it)) it = it.key;
            const cb = it.commentBefore;
            it.commentBefore = cb ? `${comment}
${cb}` : comment;
          } else {
            const cb = dc.commentBefore;
            dc.commentBefore = cb ? `${comment}
${cb}` : comment;
          }
        }
        if (afterDoc) {
          Array.prototype.push.apply(doc.errors, this.errors);
          Array.prototype.push.apply(doc.warnings, this.warnings);
        } else {
          doc.errors = this.errors;
          doc.warnings = this.warnings;
        }
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
      }
      /**
         * Current stream status information.
         *
         * Mostly useful at the end of input for an empty stream.
         */
      streamInfo() {
        return {
          comment: parsePrelude(this.prelude).comment,
          directives: this.directives,
          errors: this.errors,
          warnings: this.warnings
        };
      }
      /**
         * Compose tokens into documents.
         *
         * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
         * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
         */
      *compose(tokens, forceDoc = false, endOffset = -1) {
        for (const token of tokens) yield* this.next(token);
        yield* this.end(forceDoc, endOffset);
      }
      /** Advance the composer by one CST token. */
      *next(token) {
        switch (token.type) {
          case "directive":
            this.directives.add(token.source, (offset, message2, warning) => {
              const pos = getErrorPos(token);
              pos[0] += offset;
              this.onError(pos, "BAD_DIRECTIVE", message2, warning);
            });
            this.prelude.push(token.source);
            this.atDirectives = true;
            break;
          case "document": {
            const doc = composeDoc(this.options, this.directives, token, this.onError);
            if (this.atDirectives && !doc.directives.docStart) this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
            this.decorate(doc, false);
            if (this.doc) yield this.doc;
            this.doc = doc;
            this.atDirectives = false;
            break;
          }
          case "byte-order-mark":
          case "space":
            break;
          case "comment":
          case "newline":
            this.prelude.push(token.source);
            break;
          case "error": {
            const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
            const error = new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
            if (this.atDirectives || !this.doc) this.errors.push(error);
            else this.doc.errors.push(error);
            break;
          }
          case "doc-end": {
            if (!this.doc) {
              const msg = "Unexpected doc-end without preceding document";
              this.errors.push(new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
              break;
            }
            this.doc.directives.docEnd = true;
            const end = resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
            this.decorate(this.doc, true);
            if (end.comment) {
              const dc = this.doc.comment;
              this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
            }
            this.doc.range[2] = end.offset;
            break;
          }
          default:
            this.errors.push(new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
        }
      }
      /**
         * Call at end of input to yield any remaining document.
         *
         * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
         * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
         */
      *end(forceDoc = false, endOffset = -1) {
        if (this.doc) {
          this.decorate(this.doc, true);
          yield this.doc;
          this.doc = null;
        } else if (forceDoc) {
          const opts = Object.assign({
            _directives: this.directives
          }, this.options);
          const doc = new Document(void 0, opts);
          if (this.atDirectives) this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
          doc.range = [
            0,
            endOffset,
            endOffset
          ];
          this.decorate(doc, false);
          yield doc;
        }
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/parse/cst-scalar.js
function resolveAsScalar(token, strict = true, onError) {
  if (token) {
    const _onError = (pos, code, message2) => {
      const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
      if (onError) onError(offset, code, message2);
      else throw new YAMLParseError([
        offset,
        offset + 1
      ], code, message2);
    };
    switch (token.type) {
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return resolveFlowScalar(token, strict, _onError);
      case "block-scalar":
        return resolveBlockScalar({
          options: {
            strict
          }
        }, token, _onError);
    }
  }
  return null;
}
function createScalarToken(value, context) {
  const { implicitKey = false, indent, inFlow = false, offset = -1, type = "PLAIN" } = context;
  const source = stringifyString({
    type,
    value
  }, {
    implicitKey,
    indent: indent > 0 ? " ".repeat(indent) : "",
    inFlow,
    options: {
      blockQuote: true,
      lineWidth: -1
    }
  });
  const end = context.end ?? [
    {
      type: "newline",
      offset: -1,
      indent,
      source: "\n"
    }
  ];
  switch (source[0]) {
    case "|":
    case ">": {
      const he = source.indexOf("\n");
      const head = source.substring(0, he);
      const body = source.substring(he + 1) + "\n";
      const props = [
        {
          type: "block-scalar-header",
          offset,
          indent,
          source: head
        }
      ];
      if (!addEndtoBlockProps(props, end)) props.push({
        type: "newline",
        offset: -1,
        indent,
        source: "\n"
      });
      return {
        type: "block-scalar",
        offset,
        indent,
        props,
        source: body
      };
    }
    case '"':
      return {
        type: "double-quoted-scalar",
        offset,
        indent,
        source,
        end
      };
    case "'":
      return {
        type: "single-quoted-scalar",
        offset,
        indent,
        source,
        end
      };
    default:
      return {
        type: "scalar",
        offset,
        indent,
        source,
        end
      };
  }
}
function setScalarValue(token, value, context = {}) {
  let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
  let indent = "indent" in token ? token.indent : null;
  if (afterKey && typeof indent === "number") indent += 2;
  if (!type) switch (token.type) {
    case "single-quoted-scalar":
      type = "QUOTE_SINGLE";
      break;
    case "double-quoted-scalar":
      type = "QUOTE_DOUBLE";
      break;
    case "block-scalar": {
      const header = token.props[0];
      if (header.type !== "block-scalar-header") throw new Error("Invalid block scalar header");
      type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
      break;
    }
    default:
      type = "PLAIN";
  }
  const source = stringifyString({
    type,
    value
  }, {
    implicitKey: implicitKey || indent === null,
    indent: indent !== null && indent > 0 ? " ".repeat(indent) : "",
    inFlow,
    options: {
      blockQuote: true,
      lineWidth: -1
    }
  });
  switch (source[0]) {
    case "|":
    case ">":
      setBlockScalarValue(token, source);
      break;
    case '"':
      setFlowScalarValue(token, source, "double-quoted-scalar");
      break;
    case "'":
      setFlowScalarValue(token, source, "single-quoted-scalar");
      break;
    default:
      setFlowScalarValue(token, source, "scalar");
  }
}
function setBlockScalarValue(token, source) {
  const he = source.indexOf("\n");
  const head = source.substring(0, he);
  const body = source.substring(he + 1) + "\n";
  if (token.type === "block-scalar") {
    const header = token.props[0];
    if (header.type !== "block-scalar-header") throw new Error("Invalid block scalar header");
    header.source = head;
    token.source = body;
  } else {
    const { offset } = token;
    const indent = "indent" in token ? token.indent : -1;
    const props = [
      {
        type: "block-scalar-header",
        offset,
        indent,
        source: head
      }
    ];
    if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0)) props.push({
      type: "newline",
      offset: -1,
      indent,
      source: "\n"
    });
    for (const key of Object.keys(token)) if (key !== "type" && key !== "offset") delete token[key];
    Object.assign(token, {
      type: "block-scalar",
      indent,
      props,
      source: body
    });
  }
}
function addEndtoBlockProps(props, end) {
  if (end) for (const st of end) switch (st.type) {
    case "space":
    case "comment":
      props.push(st);
      break;
    case "newline":
      props.push(st);
      return true;
  }
  return false;
}
function setFlowScalarValue(token, source, type) {
  switch (token.type) {
    case "scalar":
    case "double-quoted-scalar":
    case "single-quoted-scalar":
      token.type = type;
      token.source = source;
      break;
    case "block-scalar": {
      const end = token.props.slice(1);
      let oa = source.length;
      if (token.props[0].type === "block-scalar-header") oa -= token.props[0].source.length;
      for (const tok of end) tok.offset += oa;
      delete token.props;
      Object.assign(token, {
        type,
        source,
        end
      });
      break;
    }
    case "block-map":
    case "block-seq": {
      const offset = token.offset + source.length;
      const nl = {
        type: "newline",
        offset,
        indent: token.indent,
        source: "\n"
      };
      delete token.items;
      Object.assign(token, {
        type,
        source,
        end: [
          nl
        ]
      });
      break;
    }
    default: {
      const indent = "indent" in token ? token.indent : -1;
      const end = "end" in token && Array.isArray(token.end) ? token.end.filter((st) => st.type === "space" || st.type === "comment" || st.type === "newline") : [];
      for (const key of Object.keys(token)) if (key !== "type" && key !== "offset") delete token[key];
      Object.assign(token, {
        type,
        indent,
        source,
        end
      });
    }
  }
}
var init_cst_scalar = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/parse/cst-scalar.js"() {
    init_resolve_block_scalar();
    init_resolve_flow_scalar();
    init_errors();
    init_stringifyString();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/parse/cst-stringify.js
function stringifyToken(token) {
  switch (token.type) {
    case "block-scalar": {
      let res = "";
      for (const tok of token.props) res += stringifyToken(tok);
      return res + token.source;
    }
    case "block-map":
    case "block-seq": {
      let res = "";
      for (const item of token.items) res += stringifyItem(item);
      return res;
    }
    case "flow-collection": {
      let res = token.start.source;
      for (const item of token.items) res += stringifyItem(item);
      for (const st of token.end) res += st.source;
      return res;
    }
    case "document": {
      let res = stringifyItem(token);
      if (token.end) for (const st of token.end) res += st.source;
      return res;
    }
    default: {
      let res = token.source;
      if ("end" in token && token.end) for (const st of token.end) res += st.source;
      return res;
    }
  }
}
function stringifyItem({ start, key, sep, value }) {
  let res = "";
  for (const st of start) res += st.source;
  if (key) res += stringifyToken(key);
  if (sep) for (const st of sep) res += st.source;
  if (value) res += stringifyToken(value);
  return res;
}
var stringify2;
var init_cst_stringify = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/parse/cst-stringify.js"() {
    stringify2 = (cst) => "type" in cst ? stringifyToken(cst) : stringifyItem(cst);
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/parse/cst-visit.js
function visit2(cst, visitor) {
  if ("type" in cst && cst.type === "document") cst = {
    start: cst.start,
    value: cst.value
  };
  _visit(Object.freeze([]), cst, visitor);
}
function _visit(path, item, visitor) {
  let ctrl = visitor(item, path);
  if (typeof ctrl === "symbol") return ctrl;
  for (const field2 of [
    "key",
    "value"
  ]) {
    const token = item[field2];
    if (token && "items" in token) {
      for (let i = 0; i < token.items.length; ++i) {
        const ci = _visit(Object.freeze(path.concat([
          [
            field2,
            i
          ]
        ])), token.items[i], visitor);
        if (typeof ci === "number") i = ci - 1;
        else if (ci === BREAK2) return BREAK2;
        else if (ci === REMOVE2) {
          token.items.splice(i, 1);
          i -= 1;
        }
      }
      if (typeof ctrl === "function" && field2 === "key") ctrl = ctrl(item, path);
    }
  }
  return typeof ctrl === "function" ? ctrl(item, path) : ctrl;
}
var BREAK2, SKIP2, REMOVE2;
var init_cst_visit = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/parse/cst-visit.js"() {
    BREAK2 = Symbol("break visit");
    SKIP2 = Symbol("skip children");
    REMOVE2 = Symbol("remove item");
    visit2.BREAK = BREAK2;
    visit2.SKIP = SKIP2;
    visit2.REMOVE = REMOVE2;
    visit2.itemAtPath = (cst, path) => {
      let item = cst;
      for (const [field2, index] of path) {
        const tok = item?.[field2];
        if (tok && "items" in tok) {
          item = tok.items[index];
        } else return void 0;
      }
      return item;
    };
    visit2.parentCollection = (cst, path) => {
      const parent = visit2.itemAtPath(cst, path.slice(0, -1));
      const field2 = path[path.length - 1][0];
      const coll = parent?.[field2];
      if (coll && "items" in coll) return coll;
      throw new Error("Parent collection not found");
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/parse/cst.js
var cst_exports = {};
__export(cst_exports, {
  BOM: () => BOM,
  DOCUMENT: () => DOCUMENT,
  FLOW_END: () => FLOW_END,
  SCALAR: () => SCALAR2,
  createScalarToken: () => createScalarToken,
  isCollection: () => isCollection2,
  isScalar: () => isScalar2,
  prettyToken: () => prettyToken,
  resolveAsScalar: () => resolveAsScalar,
  setScalarValue: () => setScalarValue,
  stringify: () => stringify2,
  tokenType: () => tokenType,
  visit: () => visit2
});
function prettyToken(token) {
  switch (token) {
    case BOM:
      return "<BOM>";
    case DOCUMENT:
      return "<DOC>";
    case FLOW_END:
      return "<FLOW_END>";
    case SCALAR2:
      return "<SCALAR>";
    default:
      return JSON.stringify(token);
  }
}
function tokenType(source) {
  switch (source) {
    case BOM:
      return "byte-order-mark";
    case DOCUMENT:
      return "doc-mode";
    case FLOW_END:
      return "flow-error-end";
    case SCALAR2:
      return "scalar";
    case "---":
      return "doc-start";
    case "...":
      return "doc-end";
    case "":
    case "\n":
    case "\r\n":
      return "newline";
    case "-":
      return "seq-item-ind";
    case "?":
      return "explicit-key-ind";
    case ":":
      return "map-value-ind";
    case "{":
      return "flow-map-start";
    case "}":
      return "flow-map-end";
    case "[":
      return "flow-seq-start";
    case "]":
      return "flow-seq-end";
    case ",":
      return "comma";
  }
  switch (source[0]) {
    case " ":
    case "	":
      return "space";
    case "#":
      return "comment";
    case "%":
      return "directive-line";
    case "*":
      return "alias";
    case "&":
      return "anchor";
    case "!":
      return "tag";
    case "'":
      return "single-quoted-scalar";
    case '"':
      return "double-quoted-scalar";
    case "|":
    case ">":
      return "block-scalar-header";
  }
  return null;
}
var BOM, DOCUMENT, FLOW_END, SCALAR2, isCollection2, isScalar2;
var init_cst = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/parse/cst.js"() {
    init_cst_scalar();
    init_cst_stringify();
    init_cst_visit();
    BOM = "\uFEFF";
    DOCUMENT = "";
    FLOW_END = "";
    SCALAR2 = "";
    isCollection2 = (token) => !!token && "items" in token;
    isScalar2 = (token) => !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar");
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/parse/lexer.js
function isEmpty(ch) {
  switch (ch) {
    case void 0:
    case " ":
    case "\n":
    case "\r":
    case "	":
      return true;
    default:
      return false;
  }
}
var hexDigits, tagChars, flowIndicatorChars, invalidAnchorChars, isNotAnchorChar, Lexer;
var init_lexer = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/parse/lexer.js"() {
    init_cst();
    hexDigits = new Set("0123456789ABCDEFabcdef");
    tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
    flowIndicatorChars = new Set(",[]{}");
    invalidAnchorChars = new Set(" ,[]{}\n\r	");
    isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);
    Lexer = class {
      constructor() {
        this.atEnd = false;
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        this.buffer = "";
        this.flowKey = false;
        this.flowLevel = 0;
        this.indentNext = 0;
        this.indentValue = 0;
        this.lineEndPos = null;
        this.next = null;
        this.pos = 0;
      }
      /**
         * Generate YAML tokens from the `source` string. If `incomplete`,
         * a part of the last line may be left as a buffer for the next call.
         *
         * @returns A generator of lexical tokens
         */
      *lex(source, incomplete = false) {
        if (source) {
          if (typeof source !== "string") throw TypeError("source is not a string");
          this.buffer = this.buffer ? this.buffer + source : source;
          this.lineEndPos = null;
        }
        this.atEnd = !incomplete;
        let next = this.next ?? "stream";
        while (next && (incomplete || this.hasChars(1))) next = yield* this.parseNext(next);
      }
      atLineEnd() {
        let i = this.pos;
        let ch = this.buffer[i];
        while (ch === " " || ch === "	") ch = this.buffer[++i];
        if (!ch || ch === "#" || ch === "\n") return true;
        if (ch === "\r") return this.buffer[i + 1] === "\n";
        return false;
      }
      charAt(n) {
        return this.buffer[this.pos + n];
      }
      continueScalar(offset) {
        let ch = this.buffer[offset];
        if (this.indentNext > 0) {
          let indent = 0;
          while (ch === " ") ch = this.buffer[++indent + offset];
          if (ch === "\r") {
            const next = this.buffer[indent + offset + 1];
            if (next === "\n" || !next && !this.atEnd) return offset + indent + 1;
          }
          return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
        }
        if (ch === "-" || ch === ".") {
          const dt = this.buffer.substr(offset, 3);
          if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3])) return -1;
        }
        return offset;
      }
      getLine() {
        let end = this.lineEndPos;
        if (typeof end !== "number" || end !== -1 && end < this.pos) {
          end = this.buffer.indexOf("\n", this.pos);
          this.lineEndPos = end;
        }
        if (end === -1) return this.atEnd ? this.buffer.substring(this.pos) : null;
        if (this.buffer[end - 1] === "\r") end -= 1;
        return this.buffer.substring(this.pos, end);
      }
      hasChars(n) {
        return this.pos + n <= this.buffer.length;
      }
      setNext(state) {
        this.buffer = this.buffer.substring(this.pos);
        this.pos = 0;
        this.lineEndPos = null;
        this.next = state;
        return null;
      }
      peek(n) {
        return this.buffer.substr(this.pos, n);
      }
      *parseNext(next) {
        switch (next) {
          case "stream":
            return yield* this.parseStream();
          case "line-start":
            return yield* this.parseLineStart();
          case "block-start":
            return yield* this.parseBlockStart();
          case "doc":
            return yield* this.parseDocument();
          case "flow":
            return yield* this.parseFlowCollection();
          case "quoted-scalar":
            return yield* this.parseQuotedScalar();
          case "block-scalar":
            return yield* this.parseBlockScalar();
          case "plain-scalar":
            return yield* this.parsePlainScalar();
        }
      }
      *parseStream() {
        let line = this.getLine();
        if (line === null) return this.setNext("stream");
        if (line[0] === BOM) {
          yield* this.pushCount(1);
          line = line.substring(1);
        }
        if (line[0] === "%") {
          let dirEnd = line.length;
          let cs = line.indexOf("#");
          while (cs !== -1) {
            const ch = line[cs - 1];
            if (ch === " " || ch === "	") {
              dirEnd = cs - 1;
              break;
            } else {
              cs = line.indexOf("#", cs + 1);
            }
          }
          while (true) {
            const ch = line[dirEnd - 1];
            if (ch === " " || ch === "	") dirEnd -= 1;
            else break;
          }
          const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
          yield* this.pushCount(line.length - n);
          this.pushNewline();
          return "stream";
        }
        if (this.atLineEnd()) {
          const sp = yield* this.pushSpaces(true);
          yield* this.pushCount(line.length - sp);
          yield* this.pushNewline();
          return "stream";
        }
        yield DOCUMENT;
        return yield* this.parseLineStart();
      }
      *parseLineStart() {
        const ch = this.charAt(0);
        if (!ch && !this.atEnd) return this.setNext("line-start");
        if (ch === "-" || ch === ".") {
          if (!this.atEnd && !this.hasChars(4)) return this.setNext("line-start");
          const s = this.peek(3);
          if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            this.indentValue = 0;
            this.indentNext = 0;
            return s === "---" ? "doc" : "stream";
          }
        }
        this.indentValue = yield* this.pushSpaces(false);
        if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1))) this.indentNext = this.indentValue;
        return yield* this.parseBlockStart();
      }
      *parseBlockStart() {
        const [ch0, ch1] = this.peek(2);
        if (!ch1 && !this.atEnd) return this.setNext("block-start");
        if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
          const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
          this.indentNext = this.indentValue + 1;
          this.indentValue += n;
          return yield* this.parseBlockStart();
        }
        return "doc";
      }
      *parseDocument() {
        yield* this.pushSpaces(true);
        const line = this.getLine();
        if (line === null) return this.setNext("doc");
        let n = yield* this.pushIndicators();
        switch (line[n]) {
          case "#":
            yield* this.pushCount(line.length - n);
          // fallthrough
          case void 0:
            yield* this.pushNewline();
            return yield* this.parseLineStart();
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel = 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            return "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "doc";
          case '"':
          case "'":
            return yield* this.parseQuotedScalar();
          case "|":
          case ">":
            n += yield* this.parseBlockScalarHeader();
            n += yield* this.pushSpaces(true);
            yield* this.pushCount(line.length - n);
            yield* this.pushNewline();
            return yield* this.parseBlockScalar();
          default:
            return yield* this.parsePlainScalar();
        }
      }
      *parseFlowCollection() {
        let nl, sp;
        let indent = -1;
        do {
          nl = yield* this.pushNewline();
          if (nl > 0) {
            sp = yield* this.pushSpaces(false);
            this.indentValue = indent = sp;
          } else {
            sp = 0;
          }
          sp += yield* this.pushSpaces(true);
        } while (nl + sp > 0);
        const line = this.getLine();
        if (line === null) return this.setNext("flow");
        if (indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
          const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
          if (!atFlowEndMarker) {
            this.flowLevel = 0;
            yield FLOW_END;
            return yield* this.parseLineStart();
          }
        }
        let n = 0;
        while (line[n] === ",") {
          n += yield* this.pushCount(1);
          n += yield* this.pushSpaces(true);
          this.flowKey = false;
        }
        n += yield* this.pushIndicators();
        switch (line[n]) {
          case void 0:
            return "flow";
          case "#":
            yield* this.pushCount(line.length - n);
            return "flow";
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel += 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            this.flowKey = true;
            this.flowLevel -= 1;
            return this.flowLevel ? "flow" : "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "flow";
          case '"':
          case "'":
            this.flowKey = true;
            return yield* this.parseQuotedScalar();
          case ":": {
            const next = this.charAt(1);
            if (this.flowKey || isEmpty(next) || next === ",") {
              this.flowKey = false;
              yield* this.pushCount(1);
              yield* this.pushSpaces(true);
              return "flow";
            }
          }
          // fallthrough
          default:
            this.flowKey = false;
            return yield* this.parsePlainScalar();
        }
      }
      *parseQuotedScalar() {
        const quote = this.charAt(0);
        let end = this.buffer.indexOf(quote, this.pos + 1);
        if (quote === "'") {
          while (end !== -1 && this.buffer[end + 1] === "'") end = this.buffer.indexOf("'", end + 2);
        } else {
          while (end !== -1) {
            let n = 0;
            while (this.buffer[end - 1 - n] === "\\") n += 1;
            if (n % 2 === 0) break;
            end = this.buffer.indexOf('"', end + 1);
          }
        }
        const qb = this.buffer.substring(0, end);
        let nl = qb.indexOf("\n", this.pos);
        if (nl !== -1) {
          while (nl !== -1) {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1) break;
            nl = qb.indexOf("\n", cs);
          }
          if (nl !== -1) {
            end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
          }
        }
        if (end === -1) {
          if (!this.atEnd) return this.setNext("quoted-scalar");
          end = this.buffer.length;
        }
        yield* this.pushToIndex(end + 1, false);
        return this.flowLevel ? "flow" : "doc";
      }
      *parseBlockScalarHeader() {
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        let i = this.pos;
        while (true) {
          const ch = this.buffer[++i];
          if (ch === "+") this.blockScalarKeep = true;
          else if (ch > "0" && ch <= "9") this.blockScalarIndent = Number(ch) - 1;
          else if (ch !== "-") break;
        }
        return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
      }
      *parseBlockScalar() {
        let nl = this.pos - 1;
        let indent = 0;
        let ch;
        loop: for (let i2 = this.pos; ch = this.buffer[i2]; ++i2) {
          switch (ch) {
            case " ":
              indent += 1;
              break;
            case "\n":
              nl = i2;
              indent = 0;
              break;
            case "\r": {
              const next = this.buffer[i2 + 1];
              if (!next && !this.atEnd) return this.setNext("block-scalar");
              if (next === "\n") break;
            }
            default:
              break loop;
          }
        }
        if (!ch && !this.atEnd) return this.setNext("block-scalar");
        if (indent >= this.indentNext) {
          if (this.blockScalarIndent === -1) this.indentNext = indent;
          else {
            this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
          }
          do {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1) break;
            nl = this.buffer.indexOf("\n", cs);
          } while (nl !== -1);
          if (nl === -1) {
            if (!this.atEnd) return this.setNext("block-scalar");
            nl = this.buffer.length;
          }
        }
        let i = nl + 1;
        ch = this.buffer[i];
        while (ch === " ") ch = this.buffer[++i];
        if (ch === "	") {
          while (ch === "	" || ch === " " || ch === "\r" || ch === "\n") ch = this.buffer[++i];
          nl = i - 1;
        } else if (!this.blockScalarKeep) {
          do {
            let i2 = nl - 1;
            let ch2 = this.buffer[i2];
            if (ch2 === "\r") ch2 = this.buffer[--i2];
            const lastChar = i2;
            while (ch2 === " ") ch2 = this.buffer[--i2];
            if (ch2 === "\n" && i2 >= this.pos && i2 + 1 + indent > lastChar) nl = i2;
            else break;
          } while (true);
        }
        yield SCALAR2;
        yield* this.pushToIndex(nl + 1, true);
        return yield* this.parseLineStart();
      }
      *parsePlainScalar() {
        const inFlow = this.flowLevel > 0;
        let end = this.pos - 1;
        let i = this.pos - 1;
        let ch;
        while (ch = this.buffer[++i]) {
          if (ch === ":") {
            const next = this.buffer[i + 1];
            if (isEmpty(next) || inFlow && flowIndicatorChars.has(next)) break;
            end = i;
          } else if (isEmpty(ch)) {
            let next = this.buffer[i + 1];
            if (ch === "\r") {
              if (next === "\n") {
                i += 1;
                ch = "\n";
                next = this.buffer[i + 1];
              } else end = i;
            }
            if (next === "#" || inFlow && flowIndicatorChars.has(next)) break;
            if (ch === "\n") {
              const cs = this.continueScalar(i + 1);
              if (cs === -1) break;
              i = Math.max(i, cs - 2);
            }
          } else {
            if (inFlow && flowIndicatorChars.has(ch)) break;
            end = i;
          }
        }
        if (!ch && !this.atEnd) return this.setNext("plain-scalar");
        yield SCALAR2;
        yield* this.pushToIndex(end + 1, true);
        return inFlow ? "flow" : "doc";
      }
      *pushCount(n) {
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos += n;
          return n;
        }
        return 0;
      }
      *pushToIndex(i, allowEmpty) {
        const s = this.buffer.slice(this.pos, i);
        if (s) {
          yield s;
          this.pos += s.length;
          return s.length;
        } else if (allowEmpty) yield "";
        return 0;
      }
      *pushIndicators() {
        switch (this.charAt(0)) {
          case "!":
            return (yield* this.pushTag()) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
          case "&":
            return (yield* this.pushUntil(isNotAnchorChar)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
          case "-":
          case "?":
          case ":": {
            const inFlow = this.flowLevel > 0;
            const ch1 = this.charAt(1);
            if (isEmpty(ch1) || inFlow && flowIndicatorChars.has(ch1)) {
              if (!inFlow) this.indentNext = this.indentValue + 1;
              else if (this.flowKey) this.flowKey = false;
              return (yield* this.pushCount(1)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
            }
          }
        }
        return 0;
      }
      *pushTag() {
        if (this.charAt(1) === "<") {
          let i = this.pos + 2;
          let ch = this.buffer[i];
          while (!isEmpty(ch) && ch !== ">") ch = this.buffer[++i];
          return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
        } else {
          let i = this.pos + 1;
          let ch = this.buffer[i];
          while (ch) {
            if (tagChars.has(ch)) ch = this.buffer[++i];
            else if (ch === "%" && hexDigits.has(this.buffer[i + 1]) && hexDigits.has(this.buffer[i + 2])) {
              ch = this.buffer[i += 3];
            } else break;
          }
          return yield* this.pushToIndex(i, false);
        }
      }
      *pushNewline() {
        const ch = this.buffer[this.pos];
        if (ch === "\n") return yield* this.pushCount(1);
        else if (ch === "\r" && this.charAt(1) === "\n") return yield* this.pushCount(2);
        else return 0;
      }
      *pushSpaces(allowTabs) {
        let i = this.pos - 1;
        let ch;
        do {
          ch = this.buffer[++i];
        } while (ch === " " || allowTabs && ch === "	");
        const n = i - this.pos;
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos = i;
        }
        return n;
      }
      *pushUntil(test) {
        let i = this.pos;
        let ch = this.buffer[i];
        while (!test(ch)) ch = this.buffer[++i];
        return yield* this.pushToIndex(i, false);
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/parse/line-counter.js
var LineCounter;
var init_line_counter = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/parse/line-counter.js"() {
    LineCounter = class {
      constructor() {
        this.lineStarts = [];
        this.addNewLine = (offset) => this.lineStarts.push(offset);
        this.linePos = (offset) => {
          let low = 0;
          let high = this.lineStarts.length;
          while (low < high) {
            const mid = low + high >> 1;
            if (this.lineStarts[mid] < offset) low = mid + 1;
            else high = mid;
          }
          if (this.lineStarts[low] === offset) return {
            line: low + 1,
            col: 1
          };
          if (low === 0) return {
            line: 0,
            col: offset
          };
          const start = this.lineStarts[low - 1];
          return {
            line: low,
            col: offset - start + 1
          };
        };
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/parse/parser.js
function includesToken(list2, type) {
  for (let i = 0; i < list2.length; ++i) if (list2[i].type === type) return true;
  return false;
}
function findNonEmptyIndex(list2) {
  for (let i = 0; i < list2.length; ++i) {
    switch (list2[i].type) {
      case "space":
      case "comment":
      case "newline":
        break;
      default:
        return i;
    }
  }
  return -1;
}
function isFlowToken(token) {
  switch (token?.type) {
    case "alias":
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "flow-collection":
      return true;
    default:
      return false;
  }
}
function getPrevProps(parent) {
  switch (parent.type) {
    case "document":
      return parent.start;
    case "block-map": {
      const it = parent.items[parent.items.length - 1];
      return it.sep ?? it.start;
    }
    case "block-seq":
      return parent.items[parent.items.length - 1].start;
    /* istanbul ignore next should not happen */
    default:
      return [];
  }
}
function getFirstKeyStartProps(prev) {
  if (prev.length === 0) return [];
  let i = prev.length;
  loop: while (--i >= 0) {
    switch (prev[i].type) {
      case "doc-start":
      case "explicit-key-ind":
      case "map-value-ind":
      case "seq-item-ind":
      case "newline":
        break loop;
    }
  }
  while (prev[++i]?.type === "space") {
  }
  return prev.splice(i, prev.length);
}
function fixFlowSeqItems(fc) {
  if (fc.start.type === "flow-seq-start") {
    for (const it of fc.items) {
      if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
        if (it.key) it.value = it.key;
        delete it.key;
        if (isFlowToken(it.value)) {
          if (it.value.end) Array.prototype.push.apply(it.value.end, it.sep);
          else it.value.end = it.sep;
        } else Array.prototype.push.apply(it.start, it.sep);
        delete it.sep;
      }
    }
  }
}
var Parser;
var init_parser = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/parse/parser.js"() {
    init_cst();
    init_lexer();
    Parser = class {
      /**
         * @param onNewLine - If defined, called separately with the start position of
         *   each new line (in `parse()`, including the start of input).
         */
      constructor(onNewLine) {
        this.atNewLine = true;
        this.atScalar = false;
        this.indent = 0;
        this.offset = 0;
        this.onKeyLine = false;
        this.stack = [];
        this.source = "";
        this.type = "";
        this.lexer = new Lexer();
        this.onNewLine = onNewLine;
      }
      /**
         * Parse `source` as a YAML stream.
         * If `incomplete`, a part of the last line may be left as a buffer for the next call.
         *
         * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
         *
         * @returns A generator of tokens representing each directive, document, and other structure.
         */
      *parse(source, incomplete = false) {
        if (this.onNewLine && this.offset === 0) this.onNewLine(0);
        for (const lexeme of this.lexer.lex(source, incomplete)) yield* this.next(lexeme);
        if (!incomplete) yield* this.end();
      }
      /**
         * Advance the parser by the `source` of one lexical token.
         */
      *next(source) {
        this.source = source;
        if (this.atScalar) {
          this.atScalar = false;
          yield* this.step();
          this.offset += source.length;
          return;
        }
        const type = tokenType(source);
        if (!type) {
          const message2 = `Not a YAML token: ${source}`;
          yield* this.pop({
            type: "error",
            offset: this.offset,
            message: message2,
            source
          });
          this.offset += source.length;
        } else if (type === "scalar") {
          this.atNewLine = false;
          this.atScalar = true;
          this.type = "scalar";
        } else {
          this.type = type;
          yield* this.step();
          switch (type) {
            case "newline":
              this.atNewLine = true;
              this.indent = 0;
              if (this.onNewLine) this.onNewLine(this.offset + source.length);
              break;
            case "space":
              if (this.atNewLine && source[0] === " ") this.indent += source.length;
              break;
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
              if (this.atNewLine) this.indent += source.length;
              break;
            case "doc-mode":
            case "flow-error-end":
              return;
            default:
              this.atNewLine = false;
          }
          this.offset += source.length;
        }
      }
      /** Call at end of input to push out any remaining constructions */
      *end() {
        while (this.stack.length > 0) yield* this.pop();
      }
      get sourceToken() {
        const st = {
          type: this.type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
        return st;
      }
      *step() {
        const top = this.peek(1);
        if (this.type === "doc-end" && (!top || top.type !== "doc-end")) {
          while (this.stack.length > 0) yield* this.pop();
          this.stack.push({
            type: "doc-end",
            offset: this.offset,
            source: this.source
          });
          return;
        }
        if (!top) return yield* this.stream();
        switch (top.type) {
          case "document":
            return yield* this.document(top);
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return yield* this.scalar(top);
          case "block-scalar":
            return yield* this.blockScalar(top);
          case "block-map":
            return yield* this.blockMap(top);
          case "block-seq":
            return yield* this.blockSequence(top);
          case "flow-collection":
            return yield* this.flowCollection(top);
          case "doc-end":
            return yield* this.documentEnd(top);
        }
        yield* this.pop();
      }
      peek(n) {
        return this.stack[this.stack.length - n];
      }
      *pop(error) {
        const token = error ?? this.stack.pop();
        if (!token) {
          const message2 = "Tried to pop an empty stack";
          yield {
            type: "error",
            offset: this.offset,
            source: "",
            message: message2
          };
        } else if (this.stack.length === 0) {
          yield token;
        } else {
          const top = this.peek(1);
          if (token.type === "block-scalar") {
            token.indent = "indent" in top ? top.indent : 0;
          } else if (token.type === "flow-collection" && top.type === "document") {
            token.indent = 0;
          }
          if (token.type === "flow-collection") fixFlowSeqItems(token);
          switch (top.type) {
            case "document":
              top.value = token;
              break;
            case "block-scalar":
              top.props.push(token);
              break;
            case "block-map": {
              const it = top.items[top.items.length - 1];
              if (it.value) {
                top.items.push({
                  start: [],
                  key: token,
                  sep: []
                });
                this.onKeyLine = true;
                return;
              } else if (it.sep) {
                it.value = token;
              } else {
                Object.assign(it, {
                  key: token,
                  sep: []
                });
                this.onKeyLine = !it.explicitKey;
                return;
              }
              break;
            }
            case "block-seq": {
              const it = top.items[top.items.length - 1];
              if (it.value) top.items.push({
                start: [],
                value: token
              });
              else it.value = token;
              break;
            }
            case "flow-collection": {
              const it = top.items[top.items.length - 1];
              if (!it || it.value) top.items.push({
                start: [],
                key: token,
                sep: []
              });
              else if (it.sep) it.value = token;
              else Object.assign(it, {
                key: token,
                sep: []
              });
              return;
            }
            /* istanbul ignore next should not happen */
            default:
              yield* this.pop();
              yield* this.pop(token);
          }
          if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
            const last = token.items[token.items.length - 1];
            if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
              if (top.type === "document") top.end = last.start;
              else top.items.push({
                start: last.start
              });
              token.items.splice(-1, 1);
            }
          }
        }
      }
      *stream() {
        switch (this.type) {
          case "directive-line":
            yield {
              type: "directive",
              offset: this.offset,
              source: this.source
            };
            return;
          case "byte-order-mark":
          case "space":
          case "comment":
          case "newline":
            yield this.sourceToken;
            return;
          case "doc-mode":
          case "doc-start": {
            const doc = {
              type: "document",
              offset: this.offset,
              start: []
            };
            if (this.type === "doc-start") doc.start.push(this.sourceToken);
            this.stack.push(doc);
            return;
          }
        }
        yield {
          type: "error",
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML stream`,
          source: this.source
        };
      }
      *document(doc) {
        if (doc.value) return yield* this.lineEnd(doc);
        switch (this.type) {
          case "doc-start": {
            if (findNonEmptyIndex(doc.start) !== -1) {
              yield* this.pop();
              yield* this.step();
            } else doc.start.push(this.sourceToken);
            return;
          }
          case "anchor":
          case "tag":
          case "space":
          case "comment":
          case "newline":
            doc.start.push(this.sourceToken);
            return;
        }
        const bv = this.startBlockValue(doc);
        if (bv) this.stack.push(bv);
        else {
          yield {
            type: "error",
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML document`,
            source: this.source
          };
        }
      }
      *scalar(scalar) {
        if (this.type === "map-value-ind") {
          const prev = getPrevProps(this.peek(2));
          const start = getFirstKeyStartProps(prev);
          let sep;
          if (scalar.end) {
            sep = scalar.end;
            sep.push(this.sourceToken);
            delete scalar.end;
          } else sep = [
            this.sourceToken
          ];
          const map2 = {
            type: "block-map",
            offset: scalar.offset,
            indent: scalar.indent,
            items: [
              {
                start,
                key: scalar,
                sep
              }
            ]
          };
          this.onKeyLine = true;
          this.stack[this.stack.length - 1] = map2;
        } else yield* this.lineEnd(scalar);
      }
      *blockScalar(scalar) {
        switch (this.type) {
          case "space":
          case "comment":
          case "newline":
            scalar.props.push(this.sourceToken);
            return;
          case "scalar":
            scalar.source = this.source;
            this.atNewLine = true;
            this.indent = 0;
            if (this.onNewLine) {
              let nl = this.source.indexOf("\n") + 1;
              while (nl !== 0) {
                this.onNewLine(this.offset + nl);
                nl = this.source.indexOf("\n", nl) + 1;
              }
            }
            yield* this.pop();
            break;
          /* istanbul ignore next should not happen */
          default:
            yield* this.pop();
            yield* this.step();
        }
      }
      *blockMap(map2) {
        const it = map2.items[map2.items.length - 1];
        switch (this.type) {
          case "newline":
            this.onKeyLine = false;
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment") end?.push(this.sourceToken);
              else map2.items.push({
                start: [
                  this.sourceToken
                ]
              });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              it.start.push(this.sourceToken);
            }
            return;
          case "space":
          case "comment":
            if (it.value) {
              map2.items.push({
                start: [
                  this.sourceToken
                ]
              });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              if (this.atIndentedComment(it.start, map2.indent)) {
                const prev = map2.items[map2.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  Array.prototype.push.apply(end, it.start);
                  end.push(this.sourceToken);
                  map2.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
        }
        if (this.indent >= map2.indent) {
          const atMapIndent = !this.onKeyLine && this.indent === map2.indent;
          const atNextItem = atMapIndent && (it.sep || it.explicitKey) && this.type !== "seq-item-ind";
          let start = [];
          if (atNextItem && it.sep && !it.value) {
            const nl = [];
            for (let i = 0; i < it.sep.length; ++i) {
              const st = it.sep[i];
              switch (st.type) {
                case "newline":
                  nl.push(i);
                  break;
                case "space":
                  break;
                case "comment":
                  if (st.indent > map2.indent) nl.length = 0;
                  break;
                default:
                  nl.length = 0;
              }
            }
            if (nl.length >= 2) start = it.sep.splice(nl[1]);
          }
          switch (this.type) {
            case "anchor":
            case "tag":
              if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map2.items.push({
                  start
                });
                this.onKeyLine = true;
              } else if (it.sep) {
                it.sep.push(this.sourceToken);
              } else {
                it.start.push(this.sourceToken);
              }
              return;
            case "explicit-key-ind":
              if (!it.sep && !it.explicitKey) {
                it.start.push(this.sourceToken);
                it.explicitKey = true;
              } else if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map2.items.push({
                  start,
                  explicitKey: true
                });
              } else {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [
                    {
                      start: [
                        this.sourceToken
                      ],
                      explicitKey: true
                    }
                  ]
                });
              }
              this.onKeyLine = true;
              return;
            case "map-value-ind":
              if (it.explicitKey) {
                if (!it.sep) {
                  if (includesToken(it.start, "newline")) {
                    Object.assign(it, {
                      key: null,
                      sep: [
                        this.sourceToken
                      ]
                    });
                  } else {
                    const start2 = getFirstKeyStartProps(it.start);
                    this.stack.push({
                      type: "block-map",
                      offset: this.offset,
                      indent: this.indent,
                      items: [
                        {
                          start: start2,
                          key: null,
                          sep: [
                            this.sourceToken
                          ]
                        }
                      ]
                    });
                  }
                } else if (it.value) {
                  map2.items.push({
                    start: [],
                    key: null,
                    sep: [
                      this.sourceToken
                    ]
                  });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [
                      {
                        start,
                        key: null,
                        sep: [
                          this.sourceToken
                        ]
                      }
                    ]
                  });
                } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
                  const start2 = getFirstKeyStartProps(it.start);
                  const key = it.key;
                  const sep = it.sep;
                  sep.push(this.sourceToken);
                  delete it.key;
                  delete it.sep;
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [
                      {
                        start: start2,
                        key,
                        sep
                      }
                    ]
                  });
                } else if (start.length > 0) {
                  it.sep = it.sep.concat(start, this.sourceToken);
                } else {
                  it.sep.push(this.sourceToken);
                }
              } else {
                if (!it.sep) {
                  Object.assign(it, {
                    key: null,
                    sep: [
                      this.sourceToken
                    ]
                  });
                } else if (it.value || atNextItem) {
                  map2.items.push({
                    start,
                    key: null,
                    sep: [
                      this.sourceToken
                    ]
                  });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [
                      {
                        start: [],
                        key: null,
                        sep: [
                          this.sourceToken
                        ]
                      }
                    ]
                  });
                } else {
                  it.sep.push(this.sourceToken);
                }
              }
              this.onKeyLine = true;
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (atNextItem || it.value) {
                map2.items.push({
                  start,
                  key: fs,
                  sep: []
                });
                this.onKeyLine = true;
              } else if (it.sep) {
                this.stack.push(fs);
              } else {
                Object.assign(it, {
                  key: fs,
                  sep: []
                });
                this.onKeyLine = true;
              }
              return;
            }
            default: {
              const bv = this.startBlockValue(map2);
              if (bv) {
                if (bv.type === "block-seq") {
                  if (!it.explicitKey && it.sep && !includesToken(it.sep, "newline")) {
                    yield* this.pop({
                      type: "error",
                      offset: this.offset,
                      message: "Unexpected block-seq-ind on same line with key",
                      source: this.source
                    });
                    return;
                  }
                } else if (atMapIndent) {
                  map2.items.push({
                    start
                  });
                }
                this.stack.push(bv);
                return;
              }
            }
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *blockSequence(seq2) {
        const it = seq2.items[seq2.items.length - 1];
        switch (this.type) {
          case "newline":
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment") end?.push(this.sourceToken);
              else seq2.items.push({
                start: [
                  this.sourceToken
                ]
              });
            } else it.start.push(this.sourceToken);
            return;
          case "space":
          case "comment":
            if (it.value) seq2.items.push({
              start: [
                this.sourceToken
              ]
            });
            else {
              if (this.atIndentedComment(it.start, seq2.indent)) {
                const prev = seq2.items[seq2.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  Array.prototype.push.apply(end, it.start);
                  end.push(this.sourceToken);
                  seq2.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
          case "anchor":
          case "tag":
            if (it.value || this.indent <= seq2.indent) break;
            it.start.push(this.sourceToken);
            return;
          case "seq-item-ind":
            if (this.indent !== seq2.indent) break;
            if (it.value || includesToken(it.start, "seq-item-ind")) seq2.items.push({
              start: [
                this.sourceToken
              ]
            });
            else it.start.push(this.sourceToken);
            return;
        }
        if (this.indent > seq2.indent) {
          const bv = this.startBlockValue(seq2);
          if (bv) {
            this.stack.push(bv);
            return;
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *flowCollection(fc) {
        const it = fc.items[fc.items.length - 1];
        if (this.type === "flow-error-end") {
          let top;
          do {
            yield* this.pop();
            top = this.peek(1);
          } while (top && top.type === "flow-collection");
        } else if (fc.end.length === 0) {
          switch (this.type) {
            case "comma":
            case "explicit-key-ind":
              if (!it || it.sep) fc.items.push({
                start: [
                  this.sourceToken
                ]
              });
              else it.start.push(this.sourceToken);
              return;
            case "map-value-ind":
              if (!it || it.value) fc.items.push({
                start: [],
                key: null,
                sep: [
                  this.sourceToken
                ]
              });
              else if (it.sep) it.sep.push(this.sourceToken);
              else Object.assign(it, {
                key: null,
                sep: [
                  this.sourceToken
                ]
              });
              return;
            case "space":
            case "comment":
            case "newline":
            case "anchor":
            case "tag":
              if (!it || it.value) fc.items.push({
                start: [
                  this.sourceToken
                ]
              });
              else if (it.sep) it.sep.push(this.sourceToken);
              else it.start.push(this.sourceToken);
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (!it || it.value) fc.items.push({
                start: [],
                key: fs,
                sep: []
              });
              else if (it.sep) this.stack.push(fs);
              else Object.assign(it, {
                key: fs,
                sep: []
              });
              return;
            }
            case "flow-map-end":
            case "flow-seq-end":
              fc.end.push(this.sourceToken);
              return;
          }
          const bv = this.startBlockValue(fc);
          if (bv) this.stack.push(bv);
          else {
            yield* this.pop();
            yield* this.step();
          }
        } else {
          const parent = this.peek(2);
          if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
            yield* this.pop();
            yield* this.step();
          } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            fixFlowSeqItems(fc);
            const sep = fc.end.splice(1, fc.end.length);
            sep.push(this.sourceToken);
            const map2 = {
              type: "block-map",
              offset: fc.offset,
              indent: fc.indent,
              items: [
                {
                  start,
                  key: fc,
                  sep
                }
              ]
            };
            this.onKeyLine = true;
            this.stack[this.stack.length - 1] = map2;
          } else {
            yield* this.lineEnd(fc);
          }
        }
      }
      flowScalar(type) {
        if (this.onNewLine) {
          let nl = this.source.indexOf("\n") + 1;
          while (nl !== 0) {
            this.onNewLine(this.offset + nl);
            nl = this.source.indexOf("\n", nl) + 1;
          }
        }
        return {
          type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
      }
      startBlockValue(parent) {
        switch (this.type) {
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return this.flowScalar(this.type);
          case "block-scalar-header":
            return {
              type: "block-scalar",
              offset: this.offset,
              indent: this.indent,
              props: [
                this.sourceToken
              ],
              source: ""
            };
          case "flow-map-start":
          case "flow-seq-start":
            return {
              type: "flow-collection",
              offset: this.offset,
              indent: this.indent,
              start: this.sourceToken,
              items: [],
              end: []
            };
          case "seq-item-ind":
            return {
              type: "block-seq",
              offset: this.offset,
              indent: this.indent,
              items: [
                {
                  start: [
                    this.sourceToken
                  ]
                }
              ]
            };
          case "explicit-key-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            start.push(this.sourceToken);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [
                {
                  start,
                  explicitKey: true
                }
              ]
            };
          }
          case "map-value-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [
                {
                  start,
                  key: null,
                  sep: [
                    this.sourceToken
                  ]
                }
              ]
            };
          }
        }
        return null;
      }
      atIndentedComment(start, indent) {
        if (this.type !== "comment") return false;
        if (this.indent <= indent) return false;
        return start.every((st) => st.type === "newline" || st.type === "space");
      }
      *documentEnd(docEnd) {
        if (this.type !== "doc-mode") {
          if (docEnd.end) docEnd.end.push(this.sourceToken);
          else docEnd.end = [
            this.sourceToken
          ];
          if (this.type === "newline") yield* this.pop();
        }
      }
      *lineEnd(token) {
        switch (this.type) {
          case "comma":
          case "doc-start":
          case "doc-end":
          case "flow-seq-end":
          case "flow-map-end":
          case "map-value-ind":
            yield* this.pop();
            yield* this.step();
            break;
          case "newline":
            this.onKeyLine = false;
          // fallthrough
          case "space":
          case "comment":
          default:
            if (token.end) token.end.push(this.sourceToken);
            else token.end = [
              this.sourceToken
            ];
            if (this.type === "newline") yield* this.pop();
        }
      }
    };
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/public-api.js
function parseOptions(options) {
  const prettyErrors = options.prettyErrors !== false;
  const lineCounter = options.lineCounter || prettyErrors && new LineCounter() || null;
  return {
    lineCounter,
    prettyErrors
  };
}
function parseAllDocuments(source, options = {}) {
  const { lineCounter, prettyErrors } = parseOptions(options);
  const parser = new Parser(lineCounter?.addNewLine);
  const composer = new Composer(options);
  const docs = Array.from(composer.compose(parser.parse(source)));
  if (prettyErrors && lineCounter) for (const doc of docs) {
    doc.errors.forEach(prettifyError(source, lineCounter));
    doc.warnings.forEach(prettifyError(source, lineCounter));
  }
  if (docs.length > 0) return docs;
  return Object.assign([], {
    empty: true
  }, composer.streamInfo());
}
function parseDocument(source, options = {}) {
  const { lineCounter, prettyErrors } = parseOptions(options);
  const parser = new Parser(lineCounter?.addNewLine);
  const composer = new Composer(options);
  let doc = null;
  for (const _doc of composer.compose(parser.parse(source), true, source.length)) {
    if (!doc) doc = _doc;
    else if (doc.options.logLevel !== "silent") {
      doc.errors.push(new YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  }
  if (prettyErrors && lineCounter) {
    doc.errors.forEach(prettifyError(source, lineCounter));
    doc.warnings.forEach(prettifyError(source, lineCounter));
  }
  return doc;
}
function parse(src, reviver, options) {
  let _reviver = void 0;
  if (typeof reviver === "function") {
    _reviver = reviver;
  } else if (options === void 0 && reviver && typeof reviver === "object") {
    options = reviver;
  }
  const doc = parseDocument(src, options);
  if (!doc) return null;
  doc.warnings.forEach((warning) => warn(doc.options.logLevel, warning));
  if (doc.errors.length > 0) {
    if (doc.options.logLevel !== "silent") throw doc.errors[0];
    else doc.errors = [];
  }
  return doc.toJS(Object.assign({
    reviver: _reviver
  }, options));
}
function stringify3(value, replacer, options) {
  let _replacer = null;
  if (typeof replacer === "function" || Array.isArray(replacer)) {
    _replacer = replacer;
  } else if (options === void 0 && replacer) {
    options = replacer;
  }
  if (typeof options === "string") options = options.length;
  if (typeof options === "number") {
    const indent = Math.round(options);
    options = indent < 1 ? void 0 : indent > 8 ? {
      indent: 8
    } : {
      indent
    };
  }
  if (value === void 0) {
    const { keepUndefined } = options ?? replacer ?? {};
    if (!keepUndefined) return void 0;
  }
  if (isDocument(value) && !_replacer) return value.toString(options);
  return new Document(value, _replacer, options).toString(options);
}
var init_public_api = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/public-api.js"() {
    init_composer();
    init_Document();
    init_errors();
    init_log();
    init_identity();
    init_line_counter();
    init_parser();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/index.js
var dist_exports = {};
__export(dist_exports, {
  Alias: () => Alias,
  CST: () => cst_exports,
  Composer: () => Composer,
  Document: () => Document,
  Lexer: () => Lexer,
  LineCounter: () => LineCounter,
  Pair: () => Pair,
  Parser: () => Parser,
  Scalar: () => Scalar,
  Schema: () => Schema,
  YAMLError: () => YAMLError,
  YAMLMap: () => YAMLMap,
  YAMLParseError: () => YAMLParseError,
  YAMLSeq: () => YAMLSeq,
  YAMLWarning: () => YAMLWarning,
  isAlias: () => isAlias,
  isCollection: () => isCollection,
  isDocument: () => isDocument,
  isMap: () => isMap,
  isNode: () => isNode,
  isPair: () => isPair,
  isScalar: () => isScalar,
  isSeq: () => isSeq,
  parse: () => parse,
  parseAllDocuments: () => parseAllDocuments,
  parseDocument: () => parseDocument,
  stringify: () => stringify3,
  visit: () => visit,
  visitAsync: () => visitAsync
});
var init_dist = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/dist/index.js"() {
    init_composer();
    init_Document();
    init_Schema();
    init_errors();
    init_Alias();
    init_identity();
    init_Pair();
    init_Scalar();
    init_YAMLMap();
    init_YAMLSeq();
    init_cst();
    init_lexer();
    init_line_counter();
    init_parser();
    init_public_api();
    init_visit();
  }
});

// ../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/index.js
var browser_exports = {};
__export(browser_exports, {
  Alias: () => Alias,
  CST: () => cst_exports,
  Composer: () => Composer,
  Document: () => Document,
  Lexer: () => Lexer,
  LineCounter: () => LineCounter,
  Pair: () => Pair,
  Parser: () => Parser,
  Scalar: () => Scalar,
  Schema: () => Schema,
  YAMLError: () => YAMLError,
  YAMLMap: () => YAMLMap,
  YAMLParseError: () => YAMLParseError,
  YAMLSeq: () => YAMLSeq,
  YAMLWarning: () => YAMLWarning,
  default: () => browser_default,
  isAlias: () => isAlias,
  isCollection: () => isCollection,
  isDocument: () => isDocument,
  isMap: () => isMap,
  isNode: () => isNode,
  isPair: () => isPair,
  isScalar: () => isScalar,
  isSeq: () => isSeq,
  parse: () => parse,
  parseAllDocuments: () => parseAllDocuments,
  parseDocument: () => parseDocument,
  stringify: () => stringify3,
  visit: () => visit,
  visitAsync: () => visitAsync
});
var browser_default;
var init_browser = __esm({
  "../../../../../../../Users/mgubi/Library/Caches/deno/npm/registry.npmjs.org/yaml/2.8.1/browser/index.js"() {
    init_dist();
    init_dist();
    browser_default = dist_exports;
  }
});

// core/http.js
var LIMITS = {
  json: 16 * 2 ** 20,
  page: 16 * 2 ** 20,
  file: 512 * 2 ** 20,
  large: 32 * 2 ** 20,
  cache: 64 * 2 ** 20,
  timeout: 6e4,
  stall: 3e4,
  concurrency: 6,
  depth: 3,
  pins: 2e3,
  mirrors: 5,
  versions: 1e4,
  objects: 1e4,
  nesting: 64,
  retry: 3e4,
  pageRequests: 4e4,
  pageBytes: 256 * 2 ** 20
};
var FetchError = class extends Error {
  constructor(kind, url, detail, status = null) {
    super(url ? `${url}: ${detail}` : detail);
    this.kind = kind;
    this.url = url;
    this.detail = detail;
    this.status = status;
  }
};
function pool(size) {
  let active = 0;
  const waiting = [];
  const next = () => {
    while (active < size && waiting.length) {
      active++;
      waiting.shift()();
    }
  };
  function acquire(signal) {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) return reject(new FetchError("aborted", "", "cancelled"));
      let released = false;
      const release = () => {
        if (released) return;
        released = true;
        active--;
        next();
      };
      const grant = () => {
        signal?.removeEventListener("abort", give);
        resolve(release);
      };
      const give = () => {
        const k = waiting.indexOf(grant);
        if (k >= 0) {
          waiting.splice(k, 1);
          reject(new FetchError("aborted", "", "cancelled"));
        }
      };
      signal?.addEventListener("abort", give, {
        once: true
      });
      waiting.push(grant);
      next();
    });
  }
  async function run(task, signal) {
    const release = await acquire(signal);
    try {
      return await task();
    } finally {
      release();
    }
  }
  run.acquire = acquire;
  return run;
}
function pause(ms, signal) {
  return new Promise((resolve, reject) => {
    const stop2 = () => {
      clearTimeout(timer);
      reject(new FetchError("aborted", "", "cancelled"));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", stop2);
      resolve();
    }, ms);
    if (signal?.aborted) stop2();
    else signal?.addEventListener("abort", stop2, {
      once: true
    });
  });
}
function watchdog() {
  const controller = new AbortController();
  let timer = null, ms = 0;
  return {
    signal: controller.signal,
    fired: null,
    why: "",
    arm(limit, why) {
      ms = limit;
      this.why = why;
      this.rearm();
    },
    rearm() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.fired = this.why;
        controller.abort();
      }, ms);
    },
    stop() {
      clearTimeout(timer);
    }
  };
}
var Busy = class {
  constructor(retryAfter) {
    const s = String(retryAfter ?? "").trim();
    const ms = /^\d+$/.test(s) ? Number(s) * 1e3 : s ? Date.parse(s) - Date.now() : NaN;
    this.after = Number.isNaN(ms) ? null : Math.min(Math.max(ms, 0), LIMITS.retry);
  }
};
function tooLarge(url, limit, declared = null) {
  return new FetchError("too-large", url, declared === null ? `more than ${limit} bytes` : `${declared} bytes, more than the limit of ${limit}`);
}
async function readLimited(response, url, limit, { dog, large, signal } = {}) {
  const declared = Number(response.headers.get("content-length"));
  if (declared > limit) {
    response.body?.cancel().catch(() => {
    });
    throw tooLarge(url, limit, declared);
  }
  if (!response.body?.getReader) {
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.length > limit) throw tooLarge(url, limit);
    return bytes;
  }
  const reader = response.body.getReader();
  let buffer = new Uint8Array(Math.min(declared > 0 ? declared : limit, 65536));
  let size = 0, release = null;
  const turn = async () => {
    dog?.stop();
    release = await large.acquire(signal);
    dog?.rearm();
  };
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) break;
      const end = size + value.length;
      if (end > limit) throw tooLarge(url, limit);
      if (!release && large && end > LIMITS.large) await turn();
      if (end > buffer.length) {
        let room = Math.min(limit, Math.max(2 * buffer.length, end));
        if (declared >= end) room = Math.min(room, declared);
        if (!release && large && room > LIMITS.large) await turn();
        if (release && declared >= end) room = declared;
        const grown = new Uint8Array(room);
        grown.set(buffer.subarray(0, size));
        buffer = grown;
      }
      buffer.set(value, size);
      size = end;
      dog?.rearm();
    }
  } catch (error) {
    reader.cancel().catch(() => {
    });
    throw error;
  } finally {
    release?.();
  }
  return size === buffer.length ? buffer : buffer.slice(0, size);
}
var Http = class _Http {
  constructor({ fetch: fetch2 = globalThis.fetch?.bind(globalThis), concurrency = LIMITS.concurrency, timeout = LIMITS.timeout, stall = LIMITS.stall, cacheLimit = LIMITS.cache, run = pool(concurrency), large = pool(1), budget = {
    requests: LIMITS.pageRequests,
    bytes: LIMITS.pageBytes
  }, spent = {
    requests: 0,
    bytes: 0
  } } = {}) {
    this.fetchImpl = fetch2;
    this.run = run;
    this.large = large;
    this.timeout = timeout;
    this.stall = stall;
    this.cache = /* @__PURE__ */ new Map();
    this.cacheLimit = cacheLimit;
    this.cacheBytes = 0;
    this.requests = 0;
    this.bytesRead = 0;
    this.budget = budget;
    this.spent = spent;
  }
  newPage() {
    this.spent.requests = 0;
    this.spent.bytes = 0;
  }
  another({ budget = this.budget } = {}) {
    return new _Http({
      fetch: this.fetchImpl,
      timeout: this.timeout,
      stall: this.stall,
      run: this.run,
      large: this.large,
      cacheLimit: this.cacheLimit,
      budget,
      spent: budget === this.budget ? this.spent : void 0
    });
  }
  checkUrl(url) {
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      throw new FetchError("scheme", String(url), "not an absolute URL");
    }
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      throw new FetchError("scheme", parsed.href, `${parsed.protocol} addresses cannot be read by a web page`);
    }
    return parsed.href;
  }
  async request(url, { method = "GET", limit = LIMITS.json, signal, headers } = {}) {
    url = this.checkUrl(url);
    const cancelled = () => new FetchError("aborted", url, "cancelled");
    for (const wait of [
      1e3,
      3e3,
      null
    ]) {
      const release = await this.run.acquire(signal).catch(() => {
        throw cancelled();
      });
      let answer;
      try {
        answer = await this.attempt(url, method, limit, signal, wait !== null, headers);
      } finally {
        release();
      }
      if (!(answer instanceof Busy)) return answer;
      await pause(answer.after ?? wait, signal).catch(() => {
        throw cancelled();
      });
    }
  }
  async attempt(url, method, limit, signal, canRetry, headers) {
    const room = this.budget ? this.budget.bytes - this.spent.bytes : Infinity;
    if (this.budget && (this.spent.requests >= this.budget.requests || room <= 0)) {
      throw new FetchError("budget", url, `not read: this page has made ${this.spent.requests} requests and read ${this.spent.bytes} bytes, the most allowed for one page`);
    }
    const dog = watchdog();
    const both = signal ? AbortSignal.any([
      signal,
      dog.signal
    ]) : dog.signal;
    this.requests++;
    this.spent.requests++;
    dog.arm(this.timeout, `no answer in ${this.timeout / 1e3} s`);
    try {
      let response;
      try {
        response = await this.fetchImpl(url, {
          method,
          signal: both,
          credentials: "omit",
          redirect: "follow",
          ...headers ? {
            headers
          } : {}
        });
      } catch (error) {
        throw await this.diagnose(url, error, signal, dog);
      }
      const status = response.status;
      const busy = status === 429 || status >= 500;
      if (canRetry && busy) {
        response.body?.cancel().catch(() => {
        });
        return new Busy(response.headers.get("retry-after"));
      }
      if (!response.ok) {
        response.body?.cancel().catch(() => {
        });
        const kind = status === 404 || status === 410 ? "not-found" : status === 403 ? "forbidden" : busy ? "busy" : "http";
        throw new FetchError(kind, url, `HTTP ${status}`, status);
      }
      if (method === "HEAD") return response;
      dog.arm(this.stall, `the answer stalled: nothing received for ${this.stall / 1e3} s`);
      try {
        const bytes = await readLimited(response, url, Math.min(limit, room), {
          dog,
          large: this.large,
          signal
        });
        this.bytesRead += bytes.length;
        this.spent.bytes += bytes.length;
        return bytes;
      } catch (error) {
        if (error?.kind === "too-large" && room < limit) {
          throw new FetchError("budget", url, `not read whole: this page may read ${this.budget.bytes} bytes at most`);
        }
        if (error instanceof FetchError && error.kind !== "aborted") throw error;
        throw this.interrupted(url, error, signal, dog);
      }
    } finally {
      dog.stop();
    }
  }
  async diagnose(url, error, signal, dog) {
    if (signal?.aborted) return new FetchError("aborted", url, "cancelled");
    if (dog.fired) return new FetchError("timeout", url, dog.fired);
    const page = globalThis.location;
    if (page?.protocol === "https:" && url.startsWith("http:") && !/^http:\/\/(localhost|127\.0\.0\.1|\[::1\])[:/]/.test(url)) {
      return new FetchError("mixed", url, "an http: address cannot be read from an https: page");
    }
    if (typeof document !== "undefined") {
      try {
        await this.fetchImpl(url, {
          method: "HEAD",
          mode: "no-cors",
          credentials: "omit",
          signal: AbortSignal.timeout(this.timeout)
        });
        return new FetchError("cors", url, "the server does not allow other sites to read it (no Access-Control-Allow-Origin header), or it is missing");
      } catch {
      }
    }
    return new FetchError("network", url, `cannot be reached (${error?.message || error})`);
  }
  interrupted(url, error, signal, dog) {
    if (signal?.aborted) return new FetchError("aborted", url, "cancelled");
    if (dog.fired) return new FetchError("timeout", url, dog.fired);
    return new FetchError("network", url, `the answer was interrupted (${error?.message || error})`);
  }
  cached(url, options = {}) {
    url = this.checkUrl(url);
    const { signal, ...rest } = options;
    let entry = this.cache.get(url);
    if (entry) {
      this.cache.delete(url);
      this.cache.set(url, entry);
    } else {
      const controller = new AbortController();
      entry = {
        controller,
        waiters: 0,
        settled: false,
        size: 0
      };
      entry.answer = this.request(url, {
        ...rest,
        signal: controller.signal
      });
      this.cache.set(url, entry);
      entry.answer.then((bytes) => {
        entry.settled = true;
        if (this.cache.get(url) !== entry) return;
        entry.size = bytes.length;
        this.cacheBytes += entry.size;
        this.evict();
      }, () => {
        entry.settled = true;
        this.forget(url, entry);
      });
    }
    return this.share(url, entry, signal);
  }
  share(url, entry, signal) {
    if (signal?.aborted) return Promise.reject(new FetchError("aborted", url, "cancelled"));
    entry.waiters++;
    return new Promise((resolve, reject) => {
      let left = false;
      const leave = () => {
        if (left) return false;
        left = true;
        signal?.removeEventListener("abort", give);
        if (--entry.waiters === 0 && !entry.settled) {
          entry.controller.abort();
          this.forget(url, entry);
        }
        return true;
      };
      const give = () => {
        if (leave()) reject(new FetchError("aborted", url, "cancelled"));
      };
      signal?.addEventListener("abort", give, {
        once: true
      });
      entry.answer.then((bytes) => {
        if (leave()) resolve(bytes);
      }, (error) => {
        if (leave()) reject(error);
      });
    });
  }
  forget(url, entry) {
    if (this.cache.get(url) !== entry) return;
    this.cache.delete(url);
    this.cacheBytes -= entry.size;
  }
  evict() {
    for (const [url, entry] of this.cache) {
      if (this.cacheBytes <= this.cacheLimit) break;
      if (entry.settled) this.forget(url, entry);
    }
  }
  async json(url, options = {}) {
    return parseJson(await this.cached(url, options), url);
  }
  async text(url, options = {}) {
    const bytes = await this.request(url, {
      limit: LIMITS.page,
      ...options
    });
    return new TextDecoder("utf-8").decode(bytes);
  }
  async size(url, options = {}) {
    const response = await this.request(url, {
      ...options,
      method: "HEAD"
    });
    const length = response.headers.get("content-length");
    return length === null ? null : Number(length);
  }
};
function nesting(text3) {
  let depth = 0, most = 0, inString = false;
  for (let k = 0; k < text3.length; k++) {
    const c = text3.charCodeAt(k);
    if (inString) {
      if (c === 92) k++;
      else if (c === 34) inString = false;
    } else if (c === 34) inString = true;
    else if (c === 91 || c === 123) most = Math.max(most, ++depth);
    else if (c === 93 || c === 125) depth--;
  }
  return most;
}
function parseJson(bytes, url = "", { integers = false } = {}) {
  let text3;
  try {
    text3 = new TextDecoder("utf-8", {
      fatal: true,
      ignoreBOM: true
    }).decode(bytes);
  } catch {
    throw new FetchError("json", url, "is not UTF-8 (section 2)");
  }
  if (/^\ufeff?\s*</.test(text3)) {
    throw new FetchError("html", url, "an HTML page, not the file: probably a wrong base URL or a site\u2019s fallback page");
  }
  if (text3.charCodeAt(0) === 65279) throw new FetchError("json", url, "starts with a byte order mark (section 2)");
  if (nesting(text3) > LIMITS.nesting) {
    throw new FetchError("too-large", url, `is nested deeper than ${LIMITS.nesting} levels`);
  }
  try {
    return integers ? parseIntegers(text3) : JSON.parse(text3);
  } catch (error) {
    throw new FetchError("json", url, `is not JSON (${error.message})`);
  }
}
var INTEGER = /^-?(?:0|[1-9][0-9]*)$/;
var EXACT = 2n ** 53n - 1n;
function numberProblem(token) {
  if (!INTEGER.test(token)) return `the number ${token} is not an integer`;
  const n = BigInt(token);
  return n > EXACT || n < -EXACT ? `the integer ${token} has no exact form in JSON (section 2)` : null;
}
function numberTokens(text3) {
  const tokens = [];
  let inString = false;
  for (let k = 0; k < text3.length; k++) {
    const c = text3[k];
    if (inString) {
      if (c === "\\") k++;
      else if (c === '"') inString = false;
    } else if (c === '"') inString = true;
    else if (c === "-" || c >= "0" && c <= "9") {
      let end = k;
      while (end < text3.length && /[-+.eE0-9]/.test(text3[end])) end++;
      tokens.push(text3.slice(k, end));
      k = end - 1;
    }
  }
  return tokens;
}
var HAS_SOURCE = (() => {
  try {
    return JSON.parse("1", (key, value, context) => context?.source === "1") === true;
  } catch {
    return false;
  }
})();
function parseIntegers(text3, { source = HAS_SOURCE } = {}) {
  const check2 = (token) => {
    const problem = numberProblem(token);
    if (problem) throw new Error(problem);
  };
  if (!source) {
    const value = JSON.parse(text3);
    numberTokens(text3).forEach(check2);
    return value;
  }
  return JSON.parse(text3, (key, value, context) => {
    if (typeof value === "number") check2(context.source);
    return value;
  });
}
async function sha512(bytes) {
  const subtle2 = globalThis.crypto?.subtle;
  if (!subtle2) {
    throw new FetchError("crypto", "", "WebCrypto is not available (it needs https: or localhost)");
  }
  const digest = new Uint8Array(await subtle2.digest("SHA-512", bytes));
  return Array.from(digest, (b) => b.toString(16).padStart(2, "0")).join("");
}

// core/crypto.js
function subtle() {
  const s = globalThis.crypto?.subtle;
  if (!s) throw new FetchError("crypto", "", "WebCrypto is not available (it needs https: or localhost)");
  return s;
}
async function sha256(bytes) {
  return new Uint8Array(await subtle().digest("SHA-256", bytes));
}
async function sha512bytes(bytes) {
  return new Uint8Array(await subtle().digest("SHA-512", bytes));
}
function hex(bytes) {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
function utf8(text3) {
  return new TextEncoder().encode(text3);
}
function sameBytes(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  for (let k = 0; k < a.length; k++) if (a[k] !== b[k]) return false;
  return true;
}
var B32 = "abcdefghijklmnopqrstuvwxyz234567";
function base32(bytes) {
  let out = "", bits = 0, value = 0;
  for (const b of bytes) {
    value = value << 8 | b;
    bits += 8;
    while (bits >= 5) {
      out += B32[value >>> bits - 5 & 31];
      bits -= 5;
    }
    value &= (1 << bits) - 1;
  }
  if (bits > 0) out += B32[value << 5 - bits & 31];
  return out;
}
var B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function base58(bytes) {
  let n = 0n;
  for (const b of bytes) n = n * 256n + BigInt(b);
  let out = "";
  while (n > 0n) {
    out = B58[Number(n % 58n)] + out;
    n /= 58n;
  }
  let zeros = 0;
  while (zeros < bytes.length && bytes[zeros] === 0) zeros++;
  return "1".repeat(zeros) + out;
}
function unbase58(text3) {
  let n = 0n;
  for (const c of text3) {
    const k = B58.indexOf(c);
    if (k < 0) throw new Error(`not base58btc: ${JSON.stringify(c)}`);
    n = n * 58n + BigInt(k);
  }
  const body = [];
  while (n > 0n) {
    body.unshift(Number(n % 256n));
    n /= 256n;
  }
  let zeros = 0;
  while (zeros < text3.length && text3[zeros] === "1") zeros++;
  return new Uint8Array([
    ...new Array(zeros).fill(0),
    ...body
  ]);
}
function unbase64(text3) {
  if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(text3)) {
    throw new Error("not base64");
  }
  const binary2 = atob(text3);
  return Uint8Array.from(binary2, (c) => c.charCodeAt(0));
}
var P = 2n ** 255n - 19n;
var L = 2n ** 252n + 27742317777372353535851937790883648493n;
var Y8 = littleEndian(fromHex("26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05"));
var SMALL_ORDER_Y = /* @__PURE__ */ new Set([
  0n,
  1n,
  P - 1n,
  P,
  P + 1n,
  Y8,
  P - Y8
]);
function fromHex(text3) {
  return Uint8Array.from(text3.match(/../g), (b) => parseInt(b, 16));
}
function littleEndian(bytes) {
  let n = 0n;
  for (let k = bytes.length - 1; k >= 0; k--) n = n << 8n | BigInt(bytes[k]);
  return n;
}
function yOf(encoding) {
  return littleEndian(encoding) & (1n << 255n) - 1n;
}
function strictlyAcceptable(publicKey, signature) {
  if (publicKey.length !== 32 || signature.length !== 64) return false;
  if (littleEndian(signature.subarray(32)) >= L) return false;
  const a = yOf(publicKey), r = yOf(signature.subarray(0, 32));
  return a < P && r < P && !SMALL_ORDER_Y.has(a) && !SMALL_ORDER_Y.has(r);
}
async function verifyEd25519(publicKey, message2, signature, { engine = "js" } = {}) {
  if (!strictlyAcceptable(publicKey, signature)) return false;
  if (engine === "webcrypto") {
    try {
      const key = await subtle().importKey("raw", publicKey, {
        name: "Ed25519"
      }, false, [
        "verify"
      ]);
      return await subtle().verify({
        name: "Ed25519"
      }, key, signature, message2);
    } catch {
      return false;
    }
  }
  return verifyInJs(publicKey, message2, signature);
}
var mod = (a) => (a % P + P) % P;
function power(base, exponent) {
  let result = 1n;
  base = mod(base);
  while (exponent > 0n) {
    if (exponent & 1n) result = mod(result * base);
    base = mod(base * base);
    exponent >>= 1n;
  }
  return result;
}
var invert = (a) => power(a, P - 2n);
var D = mod(-121665n * invert(121666n));
var SQRT_M1 = power(2n, (P - 1n) / 4n);
var BY = mod(4n * invert(5n));
var BASE = {
  X: 15112221349535400772501151409588531511454012693041857206046113283949847762202n,
  Y: BY,
  Z: 1n,
  T: mod(15112221349535400772501151409588531511454012693041857206046113283949847762202n * BY)
};
var ZERO = {
  X: 0n,
  Y: 1n,
  Z: 1n,
  T: 0n
};
function add(p, q) {
  const a = mod((p.Y - p.X) * (q.Y - q.X));
  const b = mod((p.Y + p.X) * (q.Y + q.X));
  const c = mod(2n * D * p.T * q.T);
  const d = mod(2n * p.Z * q.Z);
  const e = b - a, f = d - c, g = d + c, h = b + a;
  return {
    X: mod(e * f),
    Y: mod(g * h),
    Z: mod(f * g),
    T: mod(e * h)
  };
}
function multiply(n, point) {
  let result = ZERO;
  while (n > 0n) {
    if (n & 1n) result = add(result, point);
    point = add(point, point);
    n >>= 1n;
  }
  return result;
}
function decode(bytes) {
  const y = yOf(bytes);
  const sign = bytes[31] >> 7;
  if (y >= P) return null;
  const u = mod(y * y - 1n), v = mod(D * y * y + 1n);
  let x = mod(u * power(v, 3n) * power(u * power(v, 7n), (P - 5n) / 8n));
  if (mod(v * x * x) !== u) {
    if (mod(v * x * x) !== mod(-u)) return null;
    x = mod(x * SQRT_M1);
  }
  if (x === 0n && sign === 1) return null;
  if (Number(x & 1n) !== sign) x = P - x;
  return {
    X: x,
    Y: y,
    Z: 1n,
    T: mod(x * y)
  };
}
function encode(point) {
  const zi = invert(point.Z);
  const x = mod(point.X * zi), y = mod(point.Y * zi);
  const out = new Uint8Array(32);
  let n = y;
  for (let k = 0; k < 32; k++) {
    out[k] = Number(n & 255n);
    n >>= 8n;
  }
  out[31] |= Number(x & 1n) << 7;
  return out;
}
async function verifyInJs(publicKey, message2, signature) {
  const a = decode(publicKey);
  if (!a) return false;
  const r = signature.subarray(0, 32);
  const s = littleEndian(signature.subarray(32));
  const k = littleEndian(await sha512bytes(new Uint8Array([
    ...r,
    ...publicKey,
    ...message2
  ]))) % L;
  const minusA = {
    X: mod(-a.X),
    Y: a.Y,
    Z: a.Z,
    T: mod(-a.T)
  };
  return sameBytes(encode(add(multiply(s, BASE), multiply(k, minusA))), r);
}

// core/names.js
var NAME = /^[a-z2-7]{52}$/;
var OWNER_NAME = /^[a-z2-7]{51}[aq]$/;
var LABEL = /^[a-z0-9]+(-[a-z0-9]+)*$/;
var DID_KEY = /^did:key:z6Mk[1-9A-HJ-NP-Za-km-z]{44}$/;
var CREATED = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?Z$/;
var NONCE = /^([0-9a-f]{2}){16,}$/;
var GENESIS = "genesis.json";
var GENESIS_FORMAT = "opensheaf-genesis/0.2";
var KINDS = [
  "document",
  "collection",
  "owner"
];
var ED25519_PUB = [
  237,
  1
];
function didKey(publicKey) {
  if (publicKey.length !== 32) throw new Error("an Ed25519 public key has 32 bytes");
  return "did:key:z" + base58(new Uint8Array([
    ...ED25519_PUB,
    ...publicKey
  ]));
}
function didKeyPublic(did) {
  if (typeof did !== "string" || !did.startsWith("did:key:z")) throw new Error(`not a did:key URI in base58btc: ${did}`);
  const raw = unbase58(did.slice("did:key:z".length));
  if (raw.length !== 34 || raw[0] !== ED25519_PUB[0] || raw[1] !== ED25519_PUB[1]) {
    throw new Error(`not the did:key URI of an Ed25519 key: ${did}`);
  }
  if (didKey(raw.subarray(2)) !== did) throw new Error(`not the canonical did:key URI of its key: ${did}`);
  return raw.subarray(2);
}
async function keyDigest(did) {
  return base32(await sha256(utf8(did)));
}
async function keyId(did) {
  return (await keyDigest(did)).slice(0, 16);
}
async function nameOf(genesis, k = 0) {
  if (!(Number.isInteger(k) && k >= 0 && k <= 15)) throw new Error("the algorithms of names are numbered 0 to 15");
  const s = base32(await sha256(new Uint8Array([
    ...utf8(`opensheaf-name-${k}
`),
    ...genesis
  ])));
  return s.slice(0, -1) + B32[B32.indexOf(s[s.length - 1]) | k];
}
function algorithm(name2) {
  return B32.indexOf(name2[name2.length - 1]) & 15;
}
async function isNameOf(name2, genesis) {
  return typeof name2 === "string" && NAME.test(name2) && await nameOf(genesis, algorithm(name2)) === name2;
}
function objectId(name2, owner) {
  return `sheaf:${name2}:${owner}`;
}
function keyLogPin(owner, number, digest) {
  return `sheaf:${owner}/v${number}?sha512=${digest}`;
}
function parseId(id) {
  const m = typeof id === "string" ? /^sheaf:([^:]+):([^:]+)$/.exec(id) : null;
  if (!m) return null;
  if (m[1] === "draft") return LABEL.test(m[2]) && m[2].length <= 64 ? {
    draft: m[2]
  } : null;
  return NAME.test(m[1]) && OWNER_NAME.test(m[2]) ? {
    name: m[1],
    owner: m[2]
  } : null;
}
async function readGenesis(bytes) {
  if (bytes[0] === 239 && bytes[1] === 187 && bytes[2] === 191) throw new Error("a genesis record has no byte order mark");
  let rec;
  try {
    rec = parseIntegers(new TextDecoder("utf-8", {
      fatal: true
    }).decode(bytes));
  } catch (error) {
    throw new Error(`a genesis record is JSON in UTF-8 (${error.message})`);
  }
  if (!isObject(rec) || rec.format !== GENESIS_FORMAT) throw new Error(`not a genesis record of format ${GENESIS_FORMAT}`);
  if (!KINDS.includes(rec.kind)) throw new Error(`unknown kind ${JSON.stringify(rec.kind)}`);
  if (typeof rec.created !== "string" || !CREATED.test(rec.created)) throw new Error("created must be a date and time in UTC");
  if (typeof rec.nonce !== "string" || !NONCE.test(rec.nonce)) throw new Error("nonce must have at least 128 bits in lowercase hexadecimal");
  const ownerFields = [
    "keys",
    "threshold",
    "next",
    "nextThreshold",
    "keeper",
    "extensions"
  ];
  const allowed = [
    "format",
    "kind",
    "created",
    "nonce",
    ...rec.kind === "owner" ? ownerFields : [
      "originator"
    ]
  ];
  const extra = Object.keys(rec).filter((k) => !allowed.includes(k)).sort();
  if (extra.length) throw new Error(`fields not allowed in a genesis record of kind ${rec.kind}: ${extra.join(", ")}`);
  if (rec.kind === "owner") {
    const problems = await keyRulesOfRecord(rec);
    if ("keeper" in rec && !(Array.isArray(rec.keeper) && rec.keeper.length === 1 && typeof rec.keeper[0] === "string" && keeperValid(rec.keeper[0]))) {
      problems.push("keeper must be a list of one ORCID iD (with its check digit) or https://<domain>/");
    }
    if ("extensions" in rec && !(isObject(rec.extensions) && Object.values(rec.extensions).every(isObject))) {
      problems.push("extensions must map names of extensions to objects");
    }
    if (problems.length) throw new Error(problems.join("; "));
  } else if (typeof rec.originator !== "string" || !OWNER_NAME.test(rec.originator)) {
    throw new Error("a document or a collection names its originator, an owner name");
  }
  return rec;
}
function isObject(x) {
  return x !== null && typeof x === "object" && !Array.isArray(x);
}
async function keyRulesOfRecord(rec) {
  const problems = [];
  let keys = rec.keys, next = rec.next;
  if (!Array.isArray(keys) || !keys.length || !keys.every((k) => typeof k === "string" && DID_KEY.test(k))) {
    problems.push("keys must be a list of at least one did:key URI of an Ed25519 key");
    keys = [];
  }
  if (!Array.isArray(next) || !next.length || !next.every((d) => typeof d === "string" && OWNER_NAME.test(d))) {
    problems.push("next must be a list of at least one digest of a key (52 characters of base32)");
    next = [];
  }
  for (const [field2, items] of [
    [
      "keys",
      keys
    ],
    [
      "next",
      next
    ]
  ]) {
    if (new Set(items).size !== items.length) problems.push(`${field2} lists an item twice`);
  }
  for (const [field2, count, items] of [
    [
      "threshold",
      rec.threshold,
      keys
    ],
    [
      "nextThreshold",
      rec.nextThreshold,
      next
    ]
  ]) {
    if (!Number.isInteger(count) || count < 1) problems.push(`${field2} must be a positive integer`);
    else if (count > items.length) problems.push(`${field2} ${count} exceeds the ${items.length} item(s) it counts (rule 1)`);
  }
  const digests = await Promise.all(keys.map(keyDigest));
  if (digests.some((d) => next.includes(d))) problems.push("a key is both a current key and a rotation key (rules 2 and 3)");
  return problems;
}
function jcs(value) {
  if (value === null || typeof value === "boolean") return String(value);
  if (typeof value === "number") {
    if (!Number.isInteger(value)) throw new Error("the canonical JSON of OpenSheaf has no fractional numbers");
    if (!Number.isSafeInteger(value)) throw new Error(`the integer ${value} has no exact form in JCS`);
    return String(value);
  }
  if (typeof value === "string") {
    if (!value.isWellFormed()) throw new Error("a string with a lone surrogate has no JCS form");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(jcs).join(",")}]`;
  if (isObject(value)) {
    const names = Object.keys(value).sort();
    return `{${names.map((k) => jcs(k) + ":" + jcs(value[k])).join(",")}}`;
  }
  throw new Error(`not a JSON value: ${typeof value}`);
}
function jcsBytes(value) {
  return utf8(jcs(value));
}
var SheafUri = class _SheafUri {
  constructor({ name: name2, owner = null, version = null, sha512: sha5123 = null, at = null, params = [] }) {
    Object.assign(this, {
      name: name2,
      owner,
      version,
      sha512: sha5123,
      at,
      params
    });
  }
  toString() {
    let s = `sheaf:${this.name}`;
    if (this.owner !== null) s += `:${this.owner}`;
    if (this.version !== null) s += `/v${this.version}`;
    const query = [];
    if (this.sha512 !== null) query.push(`sha512=${this.sha512}`);
    if (this.at !== null) query.push("at=" + encodeURIComponent(this.at).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase()));
    for (const [k, v] of this.params) query.push(`${k}=${v}`);
    return s + (query.length ? "?" + query.join("&") : "");
  }
  isComplete() {
    return this.name.length === 52 && (this.owner === null || this.owner === "*" || this.owner.length === 52);
  }
  canonical(originator = null) {
    if (!this.isComplete()) throw new Error(`a short form has no canonical form until it is expanded: ${this}`);
    const owner = this.owner !== null && this.owner === originator ? null : this.owner;
    return new _SheafUri({
      name: this.name,
      owner,
      version: this.version,
      sha512: this.sha512
    }).toString();
  }
  matches(name2, owner) {
    return name2.startsWith(this.name) && (this.owner === null || this.owner === "*" || owner.startsWith(this.owner));
  }
};
var PART = /^[a-z2-7]+$/;
var ESCAPED = /^(?:[A-Za-z0-9\-._~]|%[0-9A-Fa-f]{2})*$/;
function parseSheaf(text3, { short: short2 = false, fold = false } = {}) {
  const fail = (why) => {
    throw new Error(`not a sheaf: URI (${why}): ${text3}`);
  };
  if (typeof text3 !== "string") fail("not a string");
  const q = text3.indexOf("?");
  let head = q < 0 ? text3 : text3.slice(0, q);
  const query = q < 0 ? null : text3.slice(q + 1);
  if (fold) head = head.toLowerCase();
  const m = /^sheaf:([^:/]+)(?::([^:/]+))?(?:\/v([^/]*))?$/.exec(head);
  if (!m) fail("sheaf:<name>[:<owner>][/v<n>]");
  const [, name2, owner = null, version = null] = m;
  for (const [label, part] of [
    [
      "name",
      name2
    ],
    [
      "owner",
      owner
    ]
  ]) {
    if (part === null || label === "owner" && part === "*") continue;
    if (!PART.test(part) || part.length > 52 || part.length < 52 && !(short2 && part.length >= 8)) {
      fail(`the ${label} has 52 characters of base32` + (short2 ? ", or at least 8" : ""));
    }
  }
  if (owner && owner.length === 52 && !OWNER_NAME.test(owner)) fail("an owner name is a name of algorithm 0");
  if (version !== null && !/^[1-9][0-9]*$/.test(version)) fail("a version is /v and a positive integer without leading zeros");
  const uri = new SheafUri({
    name: name2,
    owner,
    version: version === null ? null : Number(version)
  });
  if (query !== null) {
    const seen = [];
    for (const p of query.split("&")) {
      const eq = p.indexOf("=");
      let key = eq < 0 ? p : p.slice(0, eq);
      let value = eq < 0 ? "" : p.slice(eq + 1);
      if (fold) key = key.toLowerCase();
      if (eq < 0 || !key) fail("parameters are name=value");
      if (key === "sha512") {
        if (fold) value = value.toLowerCase();
        if (seen.includes("sha512") || uri.version === null || !/^[0-9a-f]{128}$/.test(value)) {
          fail("one sha512, after a version, of 128 hexadecimal digits");
        }
        if (seen.includes("at")) fail("at comes after sha512");
        uri.sha512 = value;
      } else if (key === "at") {
        if (seen.includes("at") || !ESCAPED.test(value)) fail("one at, percent-encoded");
        const at = decodeURIComponent(value);
        if (!at.startsWith("https://") || !at.endsWith("/")) fail("at is an https URL ending with /");
        uri.at = at;
      } else {
        uri.params.push([
          key,
          value
        ]);
      }
      seen.push(key);
    }
  }
  if (owner === "*" && (uri.version !== null || uri.sha512 !== null)) fail("a work, sheaf:<name>:*, has no version");
  return uri;
}
var ORCID = /^(?:https:\/\/orcid\.org\/)?([0-9]{4})-([0-9]{4})-([0-9]{4})-([0-9]{3}[0-9X])$/;
function orcidValid(text3) {
  const m = ORCID.exec(text3);
  if (!m) return false;
  const digits = m.slice(1).join("");
  let total = 0;
  for (const ch of digits.slice(0, 15)) total = (total + Number(ch)) * 2;
  const r = (12 - total % 11) % 11;
  return (r === 10 ? "X" : String(r)) === digits[15];
}
function keeperValid(uri) {
  if (uri.startsWith("https://orcid.org/")) return orcidValid(uri);
  return /^https:\/\/[a-z0-9.-]+\/$/.test(uri);
}

// core/paths.js
var VERSION_RE = /^v[1-9][0-9]*$/;
function isObjectId(s) {
  return parseId(s) !== null;
}
function isVersion(s) {
  return typeof s === "string" && VERSION_RE.test(s);
}
function versionNumber(v) {
  return Number(String(v).slice(1));
}
var OWNER_NAME_LAYOUT = "opensheaf-owner-name-storage-layout";
var HASHED_LAYOUT = "0003-hash-and-id-n-tuple-storage-layout";
var LAYOUT_FILE = "opensheaf-owner-name-storage-layout.md";
async function pathOf(id, layout = OWNER_NAME_LAYOUT) {
  const parts = parseId(id);
  if (!parts) throw new FetchError("unsafe", "", `${JSON.stringify(id)}: not the identifier of a line or of a draft (sections 3.2 and 4)`);
  if (layout === HASHED_LAYOUT) {
    const h = hex(await sha256(utf8(id)));
    let encoded = [
      ...id
    ].map((c) => /^[A-Za-z0-9_-]$/.test(c) ? c : Array.from(utf8(c), (b) => "%" + b.toString(16).padStart(2, "0")).join("")).join("");
    if (encoded.length > 100) encoded = encoded.slice(0, 100) + "-" + h;
    return [
      h.slice(0, 3),
      h.slice(3, 6),
      h.slice(6, 9),
      encoded
    ];
  }
  return parts.draft ? [
    "draft",
    parts.draft
  ] : [
    parts.owner,
    parts.name
  ];
}
function logicalPathProblem(p) {
  if (typeof p !== "string") return "is not a string";
  if (p.includes("\\")) return "has a \\";
  if (p.split("/").some((x) => x === "" || x === "." || x === "..")) return "has an empty, . or .. segment";
  if (p.normalize("NFC") !== p) return "is not in Unicode normalisation form C";
  return null;
}
function unsafePath(path) {
  if (typeof path !== "string" || path === "") return "is empty";
  for (const segment of path.split("/")) {
    if (segment === "" || segment === "." || segment === "..") return "has an empty, . or .. segment";
    if (/[\u0000-\u001f\u007f\\]/.test(segment)) return "has a control character or a backslash";
  }
  return null;
}
function contentPathProblem(cp, contentDirectory = "content") {
  const unsafe = unsafePath(cp);
  if (unsafe) return unsafe;
  const [ver, dir, ...rest] = cp.split("/");
  if (!isVersion(ver) || dir !== contentDirectory || rest.length === 0) {
    return `is not in the content directory of a version (vN/${contentDirectory}/...)`;
  }
  return null;
}
function encodeSegment(segment) {
  return encodeURIComponent(segment).replace(/%(3D|2C|3A|40|2B|24|26|3B)/g, (m) => decodeURIComponent(m));
}
function under(root, segments) {
  let url = root;
  segments.forEach((segment, k) => {
    const problem = unsafePath(segment) || (segment.includes("/") ? "has a /" : null);
    if (problem) throw new FetchError("unsafe", root, `the name ${JSON.stringify(segment)} ${problem}`);
    url += encodeSegment(segment) + (k + 1 < segments.length ? "/" : "");
  });
  if (!new URL(url).href.startsWith(new URL(root).href)) {
    throw new FetchError("unsafe", url, "is not under the storage root");
  }
  return url;
}
function underPath(root, path) {
  const problem = unsafePath(path);
  if (problem) throw new FetchError("unsafe", root, `the path ${JSON.stringify(path)} ${problem}`);
  return under(root, path.split("/"));
}

// core/signatures.js
var SIGNATURE_FORMAT = "opensheaf-signature/0.2";
var WITNESSES = "extensions/opensheaf-witnesses";
function message(objectId2, version, inventory, keyLog) {
  return utf8(`${SIGNATURE_FORMAT}
object ${objectId2}
version ${version}
inventory ${inventory}
keylog ${keyLog}
`);
}
async function fileName(did) {
  return `signature-${await keyId(did)}.json`;
}
var FIELDS = {
  format: new RegExp(`^${SIGNATURE_FORMAT.replace(/[./]/g, "\\$&")}$`),
  object: /^sheaf:[a-z2-7]{52}:[a-z2-7]{51}[aq]$/,
  version: /^v[1-9][0-9]*$/,
  inventorySha512: /^[0-9a-f]{128}$/,
  signer: OWNER_NAME,
  key: DID_KEY,
  keyLog: /^sheaf:([a-z2-7]{51}[aq])\/v([1-9][0-9]*)\?sha512=([0-9a-f]{128})$/,
  signature: /^[A-Za-z0-9+/]{85}[AQgw]==$/
};
function readSignatureFile(bytes) {
  let d;
  try {
    d = JSON.parse(new TextDecoder("utf-8", {
      fatal: true
    }).decode(bytes));
  } catch (error) {
    throw new Error(`not JSON in UTF-8 (${error.message})`);
  }
  const names = Object.keys(FIELDS);
  if (!d || typeof d !== "object" || Array.isArray(d) || Object.keys(d).length !== names.length || !names.every((n) => Object.hasOwn(d, n))) {
    throw new Error("a signature file has exactly the fields " + names.join(", "));
  }
  for (const [field2, pattern2] of Object.entries(FIELDS)) {
    if (typeof d[field2] !== "string" || !pattern2.test(d[field2])) throw new Error(`${field2} is not of its form`);
  }
  didKeyPublic(d.key);
  if (FIELDS.keyLog.exec(d.keyLog)[1] !== d.signer) throw new Error("keyLog names the key log of another owner than the signer");
  return d;
}
var GOOD = "good";
var UNCHECKED = "unchecked";
var INVALID = "invalid";
async function judge(bytes, file, { objectId: objectId2, version, inventory, owner, lookup, keyLog = false }) {
  const bad = (reason, d2 = null) => ({
    file,
    status: INVALID,
    reason,
    key: d2?.key ?? null,
    keyLog: null,
    threshold: null
  });
  let d;
  try {
    d = readSignatureFile(bytes);
  } catch (error) {
    return bad(`malformed: ${error.message}`);
  }
  if (file !== await fileName(d.key)) return bad("its name does not match the digest of its key");
  let signature;
  try {
    signature = unbase64(d.signature);
  } catch {
    return bad("the signature is not base64", d);
  }
  if (!await verifyEd25519(didKeyPublic(d.key), message(d.object, d.version, d.inventorySha512, d.keyLog), signature)) {
    return bad("the signature does not verify", d);
  }
  if (d.object !== objectId2 || d.version !== version || d.inventorySha512 !== inventory) {
    return bad("it signs another version, or another inventory", d);
  }
  if (d.signer !== owner) return bad("its signer is not the owner of the line", d);
  const [, , number, digest] = FIELDS.keyLog.exec(d.keyLog);
  const n = Number(number);
  if (keyLog && (version === "v1" || n !== Number(version.slice(1)) - 1)) {
    return bad("a key-log version is signed against the version before it, never the first", d);
  }
  const found2 = lookup(n, digest);
  if (!found2) {
    return {
      file,
      status: UNCHECKED,
      reason: `v${n} of the key log, with that digest, is not reached`,
      key: d.key,
      keyLog: [
        n,
        digest
      ],
      threshold: null
    };
  }
  if (found2.forkRecord || !found2.isVersion) return bad(`v${n} is not a version of the key log, or is a fork record`, d);
  const keys = found2.keys || {};
  let threshold;
  if (keyLog) {
    if (!(Array.isArray(keys.next) && keys.next.includes(await keyDigest(d.key)))) {
      return bad(`the key is not a rotation key of v${n} of the key log`, d);
    }
    threshold = keys.nextThreshold;
  } else {
    if (!(Array.isArray(keys.keys) && keys.keys.includes(d.key))) return bad(`the key is not a current key of v${n} of the key log`, d);
    threshold = keys.threshold;
  }
  return {
    file,
    status: GOOD,
    reason: "",
    key: d.key,
    keyLog: [
      n,
      digest
    ],
    threshold
  };
}
async function judgeFolder(witnesses, context) {
  const names = [
    ...witnesses.keys()
  ].filter((n) => n.startsWith("signature-") && n.endsWith(".json")).sort();
  return Promise.all(names.map((n) => judge(witnesses.get(n), n, context)));
}
var SIGNED = "signed";
var VOUCHED = "vouched for";
var CONTESTED = "contested";
var UNSIGNED = "unsigned";
function signedDirectly(judgements, leaveOut = null) {
  const groups = /* @__PURE__ */ new Map();
  for (const j of judgements) {
    if (j.status !== GOOD || leaveOut && leaveOut(j)) continue;
    const key = j.keyLog.join(" ");
    if (!groups.has(key)) groups.set(key, {
      threshold: j.threshold,
      keys: /* @__PURE__ */ new Set()
    });
    groups.get(key).keys.add(j.key);
  }
  return [
    ...groups.values()
  ].some((g) => g.keys.size >= g.threshold);
}
function lineStatuses(versions2, { exposed = /* @__PURE__ */ new Set(), forkPoint = null, trusted = null } = {}) {
  const leaveOut = (j) => {
    const suspect = exposed.has(j.key) || forkPoint !== null && j.keyLog[0] >= forkPoint;
    return suspect && !(trusted && trusted(j));
  };
  const direct = versions2.map((js) => signedDirectly(js));
  const clean = versions2.map((js) => signedDirectly(js, leaveOut));
  const would = versions2.map((js) => js.some((j) => j.status === UNCHECKED) || signedDirectly(js));
  const later = (list2, k) => list2.slice(k).some(Boolean);
  return versions2.map((js, k) => {
    if (direct[k] || later(direct, k + 1)) {
      if (clean[k] || later(clean, k + 1)) return direct[k] ? SIGNED : VOUCHED;
      return CONTESTED;
    }
    if (would[k] || later(would, k + 1)) return UNCHECKED;
    return js.some((j) => j.status === INVALID) ? INVALID : UNSIGNED;
  });
}
function latestSigned(statuses) {
  let found2 = null;
  statuses.forEach((s, k) => {
    if (s === SIGNED || s === VOUCHED) found2 = k + 1;
  });
  return found2;
}
async function lineStatusesOf(objectId2, owner, versions2, log) {
  const lookup = log ? (n, d) => log.lookup(n, d) : () => null;
  const judgements = await Promise.all(versions2.map(({ version, digest, witnesses }) => judgeFolder(witnesses, {
    objectId: objectId2,
    version,
    inventory: digest,
    owner,
    lookup
  })));
  const statuses = lineStatuses(judgements, log ? {
    exposed: log.exposedKeys(),
    forkPoint: log.forkPoint
  } : {});
  return {
    judgements,
    statuses
  };
}

// core/schema.js
function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((k) => `${JSON.stringify(k)}:${canonical(value[k])}`).join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}
function same(a, b) {
  return canonical(a) === canonical(b);
}
var URI_CHAR = "[A-Za-z0-9\\-._~:/?#\\[\\]@!$&'()*+,;=%]";
var URI = new RegExp(`^[A-Za-z][A-Za-z0-9+.\\-]*:${URI_CHAR}*$`);
var URI_REFERENCE = new RegExp(`^${URI_CHAR}*$`);
var PERCENT_OK = (s) => !/%(?![0-9A-Fa-f]{2})/.test(s);
var FORMATS = {
  date(s) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (!m) return false;
    const [y, mo, d] = m.slice(1).map(Number);
    const leap = y % 4 === 0 && y % 100 !== 0 || y % 400 === 0;
    const days = [
      31,
      leap ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ][mo - 1];
    return days !== void 0 && d >= 1 && d <= days;
  },
  uri: (s) => URI.test(s) && PERCENT_OK(s),
  "uri-reference": (s) => URI_REFERENCE.test(s) && PERCENT_OK(s)
};
function show(value) {
  const text3 = JSON.stringify(value) ?? String(value);
  return text3.length > 60 ? text3.slice(0, 57) + "..." : text3;
}
function typeOf(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "number") return Number.isInteger(value) ? "integer" : "number";
  return typeof value;
}
function hasType(type, value) {
  const t = typeOf(value);
  return type === t || type === "number" && t === "integer";
}
function describeNot(schema4) {
  const names = (s) => s?.required || [];
  const forbidden = [
    ...names(schema4),
    ...(schema4?.anyOf || []).flatMap(names)
  ];
  return forbidden.length ? `must not have ${forbidden.join(", ")}` : "is valid under a schema it must not match";
}
function check(s, v, path, root, errors) {
  if (s === true || s === void 0) return;
  if (s === false) {
    errors.push({
      path,
      message: "is not allowed"
    });
    return;
  }
  const fail = (message2) => errors.push({
    path,
    message: message2
  });
  if (typeof s.$ref === "string") check(resolveRef(root, s.$ref), v, path, root, errors);
  if (s.type !== void 0) {
    const types = Array.isArray(s.type) ? s.type : [
      s.type
    ];
    if (!types.some((t) => hasType(t, v))) {
      fail(`${show(v)} is not of type ${types.join(" or ")}`);
      return;
    }
  }
  if ("const" in s && !same(s.const, v)) fail(`${show(v)} should be ${show(s.const)}`);
  if (s.enum && !s.enum.some((e) => same(e, v))) fail(`${show(v)} is not one of ${show(s.enum)}`);
  if (typeof v === "string") {
    const length = [
      ...v
    ].length;
    if (s.minLength !== void 0 && length < s.minLength) fail(`${show(v)} is shorter than ${s.minLength}`);
    if (s.maxLength !== void 0 && length > s.maxLength) fail(`${show(v)} is longer than ${s.maxLength}`);
    if (s.pattern !== void 0 && !pattern(s.pattern).test(v)) fail(`${show(v)} does not match ${s.pattern}`);
    if (s.format !== void 0 && FORMATS[s.format] && !FORMATS[s.format](v)) fail(`${show(v)} is not a valid ${s.format}`);
  }
  if (typeof v === "number" && s.minimum !== void 0 && v < s.minimum) fail(`${v} is less than ${s.minimum}`);
  if (typeof v === "number" && s.maximum !== void 0 && v > s.maximum) fail(`${v} is greater than ${s.maximum}`);
  if (Array.isArray(v)) {
    if (s.minItems !== void 0 && v.length < s.minItems) fail(`has fewer than ${s.minItems} items`);
    if (s.maxItems !== void 0 && v.length > s.maxItems) fail(`has more than ${s.maxItems} items`);
    if (s.uniqueItems && new Set(v.map(canonical)).size !== v.length) fail("has repeated items");
    if (s.items !== void 0) v.forEach((item, k) => check(s.items, item, `${path}/${k}`, root, errors));
  }
  if (v && typeof v === "object" && !Array.isArray(v)) {
    if (s.minProperties !== void 0 && Object.keys(v).length < s.minProperties) {
      fail(`has fewer than ${s.minProperties} properties`);
    }
    for (const name2 of s.required || []) {
      if (!Object.hasOwn(v, name2)) fail(`${JSON.stringify(name2)} is a required property`);
    }
    const props = s.properties || {};
    for (const [name2, value] of Object.entries(v)) {
      const where2 = `${path}/${name2.replace(/~/g, "~0").replace(/\//g, "~1")}`;
      if (Object.hasOwn(props, name2)) check(props[name2], value, where2, root, errors);
      else if (s.additionalProperties !== void 0) check(s.additionalProperties, value, where2, root, errors);
      if (s.propertyNames !== void 0) {
        for (const e of collect(s.propertyNames, name2, root)) {
          errors.push({
            path: where2,
            message: `the name ${e.message}`
          });
        }
      }
    }
    for (const [name2, needed] of Object.entries(s.dependentRequired || {})) {
      if (Object.hasOwn(v, name2)) {
        for (const other of needed) {
          if (!Object.hasOwn(v, other)) fail(`${JSON.stringify(other)} is required with ${JSON.stringify(name2)}`);
        }
      }
    }
  }
  for (const sub of s.allOf || []) check(sub, v, path, root, errors);
  if (s.anyOf && !s.anyOf.some((sub) => isValid(sub, v, root))) {
    const reasons = s.anyOf.map((sub) => collect(sub, v, root)[0]).filter(Boolean).map((e) => (e.path ? `${e.path}: ` : "") + e.message);
    fail(`satisfies none of the alternatives (${reasons.join("; or ")})`);
  }
  if (s.oneOf) {
    const holding = s.oneOf.filter((sub) => isValid(sub, v, root)).length;
    if (holding === 0) {
      const reasons = s.oneOf.map((sub) => collect(sub, v, root)[0]).filter(Boolean).map((e) => (e.path ? `${e.path}: ` : "") + e.message);
      fail(`satisfies none of the alternatives (${reasons.join("; or ")})`);
    } else if (holding > 1) {
      fail(`satisfies ${holding} of the alternatives, and should satisfy one`);
    }
  }
  if (s.not !== void 0 && isValid(s.not, v, root)) fail(describeNot(s.not));
  if (s.if !== void 0) {
    if (isValid(s.if, v, root)) {
      if (s.then !== void 0) check(s.then, v, path, root, errors);
    } else if (s.else !== void 0) {
      check(s.else, v, path, root, errors);
    }
  }
}
function resolveRef(root, ref) {
  if (!ref.startsWith("#")) throw new Error(`unsupported $ref ${ref}`);
  return ref.slice(1).split("/").filter(Boolean).map((p) => p.replace(/~1/g, "/").replace(/~0/g, "~")).reduce((node, key) => node?.[key], root);
}
function validate(schema4, data2) {
  const errors = [];
  check(schema4, data2, "", schema4, errors);
  return errors;
}
function isValid(schema4, data2, root) {
  const errors = [];
  check(schema4, data2, "", root, errors);
  return errors.length === 0;
}
var patterns = /* @__PURE__ */ new Map();
function pattern(source) {
  if (!patterns.has(source)) patterns.set(source, new RegExp(source, "u"));
  return patterns.get(source);
}
function collect(schema4, data2, root) {
  const errors = [];
  check(schema4, data2, "", root, errors);
  return errors;
}
var SCHEMA_FILES = {
  "opensheaf-archive/0.2": "opensheaf-archive-0.2.schema.json",
  "opensheaf-object/0.2": "opensheaf-object-0.2.schema.json",
  "opensheaf-collection/0.2": "opensheaf-collection-0.2.schema.json",
  "opensheaf-genesis/0.2": "opensheaf-genesis-0.2.schema.json",
  "opensheaf-keys/0.2": "opensheaf-keys-0.2.schema.json",
  "opensheaf-signature/0.2": "opensheaf-signature-0.2.schema.json",
  "opensheaf-index/0.2": "opensheaf-index-0.2.schema.json",
  "opensheaf-keeper/0.2": "opensheaf-keeper-0.2.schema.json",
  "opensheaf-timestamps/0.2": "opensheaf-timestamps-0.2.schema.json"
};
async function loadSchemas(read) {
  const schemas2 = {};
  for (const [format, file] of Object.entries(SCHEMA_FILES)) {
    schemas2[format] = await read(new URL(`../schemas/${file}`, import.meta.url));
  }
  return schemas2;
}

// core/owners.js
var OBJECT_FORMAT = "opensheaf-object/0.2";
var KEYS_FORMAT = "opensheaf-keys/0.2";
var INVENTORY_TYPE = "https://ocfl.io/1.1/spec/#inventory";
var OBJ = "object.json";
var KEYS = "keys.json";
var FORKED = "forked/";
var RESERVED = [
  "object.json",
  "datacite.json",
  "genesis.json",
  "members.json",
  "keys.json",
  "forked",
  "parent.inventory.json",
  "parent.object.json",
  "parent.signatures",
  "parent.chain"
];
var Version = class _Version {
  static async make(number, files, inventory, sidecar2 = null, witnesses = /* @__PURE__ */ new Map()) {
    const v = new _Version(number, files, inventory, sidecar2, witnesses);
    v.digest = await sha512(inventory);
    if (v.forkRecord) v.carried = await carriedOf(files);
    return v;
  }
  constructor(number, files, inventory, sidecar2, witnesses) {
    Object.assign(this, {
      number,
      files,
      inventory,
      sidecar: sidecar2,
      witnesses,
      isVersion: true,
      carried: []
    });
  }
  get keys() {
    return jsonOrNull(this.files.get(KEYS), {
      integers: true
    });
  }
  get forkRecord() {
    return !this.files.has(KEYS) && [
      ...this.files.keys()
    ].some((p) => p.startsWith(FORKED));
  }
};
function jsonOrNull(bytes, { integers = false } = {}) {
  if (!bytes) return null;
  try {
    const text3 = new TextDecoder("utf-8", {
      fatal: true
    }).decode(bytes);
    return integers ? parseIntegers(text3) : JSON.parse(text3);
  } catch {
    return null;
  }
}
var CARRIED_FILES = [
  "inventory.json",
  "inventory.json.sha512",
  "keys.json"
];
async function carriedOf(files) {
  const groups = /* @__PURE__ */ new Map();
  for (const [path, bytes] of files) {
    if (!path.startsWith(FORKED)) continue;
    const rest = path.slice(FORKED.length);
    const k = rest.indexOf("/");
    const d = k < 0 ? rest : rest.slice(0, k);
    if (!groups.has(d)) groups.set(d, /* @__PURE__ */ new Map());
    groups.get(d).set(k < 0 ? "" : rest.slice(k + 1), bytes);
  }
  const out = [];
  for (const [d, group] of groups) {
    const inventory = group.get("inventory.json") || new Uint8Array();
    const inv = jsonOrNull(inventory);
    const head = isObject(inv) ? inv.head : null;
    const number = typeof head === "string" && /^v[0-9]+$/.test(head) ? Number(head.slice(1)) : null;
    out.push({
      d,
      files: group,
      inventory,
      sidecar: group.get("inventory.json.sha512") || new Uint8Array(),
      digest: await sha512(inventory),
      number,
      isVersion: true,
      forkRecord: false,
      keys: jsonOrNull(group.get("keys.json"), {
        integers: true
      }),
      witnesses: new Map([
        ...group
      ].filter(([n]) => !CARRIED_FILES.includes(n)))
    });
  }
  return out.sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
}
function sidecarDigest(bytes) {
  if (!bytes) return null;
  let text3;
  try {
    text3 = new TextDecoder("ascii", {
      fatal: true
    }).decode(bytes);
  } catch {
    return null;
  }
  const parts = text3.split(/\s+/).filter(Boolean);
  return parts.length === 2 && parts[1] === "inventory.json" ? parts[0].toLowerCase() : null;
}
function ownerObject(owner, previous = null) {
  const d = {
    format: OBJECT_FORMAT,
    specification: "0.2",
    kind: "owner",
    status: "active",
    name: owner,
    owner
  };
  if (previous !== null) d.previous = previous;
  return d;
}
async function firstVersion(genesis) {
  const rec = await readGenesis(genesis);
  if (rec.kind !== "owner") throw new Error("the genesis record of an owner has kind owner");
  const owner = await nameOf(genesis);
  const files = /* @__PURE__ */ new Map([
    [
      GENESIS,
      genesis
    ],
    [
      OBJ,
      jcsBytes(ownerObject(owner))
    ],
    [
      KEYS,
      jcsBytes({
        format: KEYS_FORMAT,
        keys: rec.keys,
        threshold: rec.threshold,
        next: rec.next,
        nextThreshold: rec.nextThreshold
      })
    ]
  ]);
  const manifest = {}, state = {};
  for (const [path, bytes2] of files) {
    const d = await sha512(bytes2);
    manifest[d] = [
      `v1/content/${path}`
    ];
    state[d] = [
      path
    ];
  }
  const inv = {
    digestAlgorithm: "sha512",
    head: "v1",
    id: objectId(owner, owner),
    manifest,
    type: INVENTORY_TYPE,
    versions: {
      v1: {
        created: rec.created,
        state
      }
    }
  };
  const bytes = jcsBytes(inv);
  return Version.make(1, files, bytes, utf8(`${await sha512(bytes)}  inventory.json
`));
}
var KEYS_FIELDS = [
  "format",
  "keys",
  "threshold",
  "next",
  "nextThreshold",
  "extensions",
  "ended",
  "successor",
  "exposed"
];
async function keyRules(k, earlier, owner) {
  if (!isObject(k) || k.format !== KEYS_FORMAT) return [
    `keys.json is not of format ${KEYS_FORMAT}`
  ];
  const problems = [];
  const extra = Object.keys(k).filter((f) => !KEYS_FIELDS.includes(f)).sort();
  if (extra.length) problems.push("keys.json has fields the specification does not define: " + extra.join(", "));
  if ("ended" in k && k.ended !== true) problems.push("ended, when present, is true");
  if (k.ended === true) {
    if ([
      "keys",
      "threshold",
      "next",
      "nextThreshold"
    ].some((f) => f in k)) {
      problems.push("an ending version has no keys, threshold, next or nextThreshold (section 6.3)");
    }
    const succ = k.successor;
    if (succ !== void 0 && succ !== null && (typeof succ !== "string" || !OWNER_NAME.test(succ) || succ === owner)) {
      problems.push("successor is the owner name of another owner (section 6.3)");
    }
  } else {
    if ("successor" in k) problems.push("only an ending version names a successor (section 6.3)");
    problems.push(...await keyRulesOfRecord(k));
  }
  if ("extensions" in k && !(isObject(k.extensions) && Object.values(k.extensions).every(isObject))) {
    problems.push("extensions maps names of extensions to objects");
  }
  let exposed = Array.isArray(k.exposed) ? k.exposed : [];
  if ("exposed" in k && (!Array.isArray(k.exposed) || !k.exposed.length || !k.exposed.every((x) => typeof x === "string" && DID_KEY.test(x)) || new Set(k.exposed).size !== k.exposed.length)) {
    problems.push("exposed is a list of distinct did:key URIs");
    exposed = [];
  }
  const strings = (x) => Array.isArray(x) ? x.filter((y) => typeof y === "string") : [];
  const keys = strings(k.keys), next = strings(k.next);
  const earlierKeys = new Set(earlier.flatMap((e) => strings(e?.keys)));
  const earlierNext = new Set(earlier.flatMap((e) => strings(e?.next)));
  const earlierExposed = new Set(earlier.flatMap((e) => strings(e?.exposed)));
  if (keys.some((x) => earlierExposed.has(x) || exposed.includes(x))) {
    problems.push("keys lists a key exposed by this version or an earlier one (rule 2)");
  }
  if ((await Promise.all(keys.map(keyDigest))).some((d) => earlierNext.has(d))) {
    problems.push("keys lists a rotation key of an earlier version (rule 2)");
  }
  const earlierKeyDigests = new Set(await Promise.all([
    ...earlierKeys
  ].map(keyDigest)));
  if (next.some((d) => earlierKeyDigests.has(d))) problems.push("next holds the digest of a current key of an earlier version (rule 3)");
  if (next.some((d) => earlierNext.has(d))) problems.push("next holds a digest that next of an earlier version holds (rule 3)");
  if (exposed.some((x) => !earlierKeys.has(x))) problems.push("exposed lists a key that keys of no earlier version lists (rule 4)");
  return problems;
}
var KeyLog = class _KeyLog {
  static async of(genesis, versions2 = null, problems = []) {
    const owner = await nameOf(genesis);
    return new _KeyLog(genesis, owner, versions2 || [
      await firstVersion(genesis)
    ], problems);
  }
  constructor(genesis, owner, versions2, problems = []) {
    this.genesis = genesis;
    this.owner = owner;
    this.id = objectId(owner, owner);
    this.versions = versions2;
    this.problems = problems;
    this.checked = null;
    this.met = null;
  }
  pin(number) {
    return keyLogPin(this.owner, number, this.versions[number - 1].digest);
  }
  side() {
    return this.versions.filter((v) => v.isVersion && !v.forkRecord);
  }
  latest() {
    if (this.ended) return null;
    const side = this.side();
    const last = side[side.length - 1];
    return last && isObject(last.keys) && "keys" in last.keys ? last : null;
  }
  get forkRecord() {
    return this.versions.find((v) => v.forkRecord && v.isVersion) || this.met || null;
  }
  get forkPoint() {
    return this.forkRecord?.carried[0]?.number ?? null;
  }
  get ended() {
    return this.forkRecord !== null || this.side().slice(1).some((v) => v.keys?.ended);
  }
  get successor() {
    return this.side().slice(1).find((v) => v.keys?.ended)?.keys.successor ?? null;
  }
  exposedKeys() {
    const found2 = /* @__PURE__ */ new Set();
    for (const v of this.side()) for (const x of arrayOf(v.keys?.exposed)) found2.add(x);
    for (const c of this.forkRecord?.carried || []) for (const x of arrayOf(c.keys?.exposed)) found2.add(x);
    return found2;
  }
  lookup(number, digest) {
    for (const v of this.versions) if (v.number === number && v.digest === digest) return v;
    for (const c of this.forkRecord?.carried || []) if (c.number === number && c.digest === digest) return c;
    return null;
  }
  extensions() {
    const side = this.side();
    if (side.length <= 1) return jsonOrNull(this.genesis)?.extensions ?? null;
    return side[side.length - 1].keys?.extensions ?? null;
  }
  async check() {
    if (!this.checked) this.checked = this.checkNow();
    return this.checked;
  }
  async checkNow() {
    const errors = [
      ...this.problems
    ], warnings = [];
    let rec = null;
    try {
      rec = await readGenesis(this.genesis);
    } catch (error) {
      errors.push(`genesis.json: ${error.message}`);
    }
    if (rec !== null && rec.kind !== "owner") {
      errors.push("genesis.json: the genesis record of an owner has kind owner");
      rec = null;
    }
    if (rec === null || !this.versions.length) {
      for (const v of this.versions) v.isVersion = false;
      return {
        errors,
        warnings
      };
    }
    const v1 = this.versions[0];
    const computed = await firstVersion(this.genesis);
    if (v1.number !== 1 || !sameFiles(v1.files, computed.files) || !sameBytes(v1.inventory, computed.inventory)) {
      errors.push("v1: not the version computed from the genesis record (section 6.1)");
      v1.isVersion = false;
    } else if (v1.sidecar && v1.sidecar.length && sidecarDigest(v1.sidecar) !== v1.digest) {
      errors.push("v1: the checksum file does not state the digest of the inventory");
      v1.isVersion = false;
    }
    if ([
      ...v1.witnesses.keys()
    ].some((n) => n.startsWith("signature-"))) {
      warnings.push("v1: a signature file of the computed first version is invalid (section 7.3)");
    }
    const side = [
      v1
    ];
    let state = v1.isVersion ? null : "broken";
    for (const v of this.versions.slice(1)) {
      const where2 = `v${v.number}`;
      if (state === "broken") {
        v.isVersion = false;
        warnings.push(`${where2}: follows a version that is not a version of the key log`);
        continue;
      }
      if (state === "forked" || state === "ended" && !v.forkRecord) {
        v.isVersion = false;
        warnings.push(`${where2}: held after ${state === "forked" ? "a fork record" : "an ending version"}: not a version of the key log (section 6.3)`);
        continue;
      }
      const problems = await this.commonProblems(v, side[side.length - 1]);
      if (v.forkRecord) {
        problems.push(...await this.forkRecordProblems(v, side));
      } else if (v.keys === null) {
        problems.push("no keys.json, and not a fork record");
      } else {
        problems.push(...await keyRules(v.keys, side.map((x) => x.keys), this.owner));
        if (!problems.length) problems.push(...await this.signatureProblems(v, side[side.length - 1], heldLookup(side), warnings));
      }
      if (problems.length) {
        v.isVersion = false;
        errors.push(...problems.map((p) => `${where2}: ${p}`));
        state = "broken";
      } else if (v.forkRecord) {
        state = "forked";
      } else {
        side.push(v);
        if (v.keys.ended) state = "ended";
      }
    }
    return {
      errors,
      warnings
    };
  }
  async commonProblems(v, prev) {
    const problems = [];
    const inv = jsonOrNull(v.inventory);
    if (!isObject(inv) || inv.id !== this.id || inv.head !== `v${v.number}`) {
      problems.push(`the inventory is not that of v${v.number} of ${this.id}`);
    }
    if (v.sidecar && v.sidecar.length && sidecarDigest(v.sidecar) !== v.digest) {
      problems.push("the checksum file does not state the digest of the inventory");
    }
    if (!sameBytes(v.files.get(GENESIS), this.genesis)) problems.push("genesis.json differs from that of the first version");
    const obj = jsonOrNull(v.files.get(OBJ));
    const expected = ownerObject(this.owner, prev.digest);
    const withoutExtensions = isObject(obj) ? Object.fromEntries(Object.entries(obj).filter(([k]) => k !== "extensions")) : null;
    if (!withoutExtensions || !same(withoutExtensions, expected)) {
      problems.push(`object.json has not the fields of an owner and previous, the digest of the inventory of v${prev.number} (section 4.3)`);
    }
    for (const path of v.files.keys()) {
      const top = path.split("/")[0];
      if (RESERVED.includes(top) && ![
        GENESIS,
        OBJ,
        KEYS
      ].includes(path) && !path.startsWith(FORKED)) {
        problems.push(`${path}: a name reserved by section 4.1`);
      }
    }
    return problems;
  }
  async signatureProblems(v, prev, lookup, warnings, where2 = null) {
    where2 = where2 || `v${v.number}`;
    const good = /* @__PURE__ */ new Set();
    for (const j of await judgeFolder(v.witnesses, {
      objectId: this.id,
      version: `v${v.number}`,
      inventory: v.digest,
      owner: this.owner,
      lookup,
      keyLog: true
    })) {
      if (j.status === GOOD && j.keyLog[0] === prev.number && j.keyLog[1] === prev.digest) good.add(j.key);
      else if (j.status !== GOOD) warnings.push(`${where2}/${j.file}: ${j.status}: ${j.reason}`);
    }
    const need = prev.keys.nextThreshold;
    if (good.size < need) return [
      `signed by ${good.size} rotation key${good.size === 1 ? "" : "s"} of v${prev.number}, which needs ${need} (section 6.1)`
    ];
    return [];
  }
  async forkRecordProblems(fr, side) {
    const problems = [
      ...fr.files.keys()
    ].filter((p) => p !== GENESIS && p !== OBJ && !p.startsWith(FORKED)).map((p) => `${p}: a fork record holds only genesis.json, object.json and forked/ (section 6.3)`);
    const carried = fr.carried;
    if (!carried.length || carried.some((c) => c.number === null)) {
      return [
        ...problems,
        "a fork record carries versions, each with its inventory"
      ];
    }
    const first = carried[0].number;
    const held2 = new Map(side.map((x) => [
      x.number,
      x
    ]));
    if (carried.some((c, k) => c.number !== first + k)) problems.push("the versions carried are consecutive");
    if (!held2.has(first - 1) || !held2.has(first) || held2.get(first).digest === carried[0].digest) {
      problems.push(`the first version carried, v${first}, differs from a version held of that number`);
      return problems;
    }
    let before = side.filter((x) => x.number < first);
    for (const c of carried) {
      const where2 = `forked/${c.d}`;
      const inv = jsonOrNull(c.inventory);
      if (c.d !== base32(await sha256(c.inventory)).slice(0, 16)) problems.push(`${where2}: not the name its inventory digest gives`);
      if (!isObject(inv) || inv.id !== this.id) {
        problems.push(`${where2}: the inventory carried is not one of ${this.id}`);
        continue;
      }
      if (sidecarDigest(c.sidecar) !== c.digest) problems.push(`${where2}: the checksum file does not state the digest of the inventory`);
      const state = inv.versions?.[`v${c.number}`]?.state || {};
      const keysDigest = c.files.has("keys.json") ? await sha512(c.files.get("keys.json")) : null;
      if (!keysDigest || !Object.entries(state).some(([d, paths]) => Array.isArray(paths) && paths.includes(KEYS) && d === keysDigest)) {
        problems.push(`${where2}: keys.json is not the one its inventory lists`);
        continue;
      }
      const rules = await keyRules(c.keys, before.map((x) => x.keys), this.owner);
      problems.push(...rules.map((p) => `${where2}: ${p}`));
      if (!rules.length) {
        const more = await this.signatureProblems(c, before[before.length - 1], heldLookup(before), [], where2);
        problems.push(...more.map((p) => `${where2}: ${p}`));
      }
      before = [
        ...before,
        c
      ];
    }
    return problems;
  }
  async meet(other) {
    await this.check();
    await other.check();
    if (!sameBytes(this.genesis, other.genesis)) return this;
    const mine = this.side(), theirs = other.side();
    for (let k = 0; k < Math.min(mine.length, theirs.length); k++) {
      if (mine[k].digest !== theirs[k].digest) return this.withFork(theirs.slice(k));
    }
    const theirFork = other.forkRecord;
    if (theirs.length > mine.length) {
      if (this.forkRecord) return this;
      const log = new _KeyLog(this.genesis, this.owner, [
        ...mine,
        ...theirs.slice(mine.length),
        ...theirFork ? [
          theirFork
        ] : []
      ]);
      log.checked = Promise.resolve({
        errors: [],
        warnings: []
      });
      log.met = other.met;
      return log;
    }
    if (theirFork) {
      const first = theirFork.carried[0];
      const held2 = first && first.number <= mine.length ? mine[first.number - 1] : null;
      if (held2 && held2.digest !== first.digest && !this.forkRecord) return this.withFork(theirFork.carried);
    }
    return this;
  }
  withFork(otherSide) {
    if (this.forkRecord) return this;
    const log = new _KeyLog(this.genesis, this.owner, this.versions, this.problems);
    log.checked = this.checked;
    log.met = {
      carried: otherSide,
      isVersion: true,
      forkRecord: true,
      met: true
    };
    return log;
  }
};
function heldLookup(side) {
  return (number, digest) => side.find((x) => x.number === number && x.digest === digest) || null;
}
function sameFiles(a, b) {
  if (a.size !== b.size) return false;
  for (const [path, bytes] of a) if (!sameBytes(bytes, b.get(path))) return false;
  return true;
}
function arrayOf(x) {
  return Array.isArray(x) ? x : [];
}

// core/versions.js
function versionsOf(inv) {
  const versions2 = inv && typeof inv.versions === "object" && inv.versions ? Object.keys(inv.versions) : [];
  return versions2.filter(isVersion).sort((a, b) => versionNumber(a) - versionNumber(b));
}
var own = (o, k) => o !== null && typeof o === "object" && Object.hasOwn(o, k);
function filesOf(inv, ver) {
  const files = /* @__PURE__ */ Object.create(null);
  const state = own(inv?.versions, ver) && inv.versions[ver]?.state || {};
  for (const [digest, paths] of Object.entries(state)) {
    for (const p of Array.isArray(paths) ? paths : []) files[p] = digest;
  }
  return files;
}
function contentPath(inv, ver, logical) {
  const digest = filesOf(inv, ver)[logical];
  const paths = digest && own(inv.manifest, digest) ? inv.manifest[digest] : null;
  return Array.isArray(paths) && typeof paths[0] === "string" ? paths[0] : null;
}
function defaultHistory(inv, objOf2, at = inv.head) {
  const last = /* @__PURE__ */ new Map();
  for (const ver of versionsOf(inv)) {
    if (versionNumber(ver) <= versionNumber(at)) {
      const n = objOf2(ver)?.documentVersion;
      if (Number.isInteger(n)) last.set(n, ver);
    }
  }
  return [
    ...last.keys()
  ].sort((a, b) => a - b).map((n) => last.get(n));
}
function historyOf(inv, objOf2, at = inv.head) {
  const hist = objOf2(at)?.history;
  return Array.isArray(hist) && hist.length ? hist : defaultHistory(inv, objOf2, at);
}
function currentVersion(inv, objOf2, at = inv.head) {
  const hist = historyOf(inv, objOf2, at);
  return hist[hist.length - 1] || at;
}
function memberPins(m) {
  if (own(m, "revisions")) {
    return (Array.isArray(m.revisions) ? m.revisions : []).map((r) => ({
      version: r?.version,
      pin: r?.inventorySha512,
      documentVersion: r?.documentVersion
    }));
  }
  return [
    {
      version: m?.version,
      pin: m?.inventorySha512,
      documentVersion: null
    }
  ];
}
var list = (x) => Array.isArray(x) ? x : [];
var text = (x) => typeof x === "string" ? x : null;
function dateOf(dc, ...types) {
  for (const type of types) {
    const d = list(dc?.dates).find((x) => x?.dateType === type);
    if (d && text(d.date)) return d.date;
  }
  return null;
}
function titleOf(dc) {
  return text(list(dc?.titles).find((t) => !t?.titleType)?.title) || text(list(dc?.titles)[0]?.title);
}
function creatorsOf(dc) {
  return list(dc?.creators).map((c) => text(c?.name) || [
    c?.givenName,
    c?.familyName
  ].filter(text).join(" ")).filter(Boolean);
}
function pdfOf(obj) {
  const rs = list(obj?.renditions).filter((r) => text(r?.path));
  return (rs.find((r) => r.mediaType === "application/pdf") || rs.find((r) => r.path.toLowerCase().endsWith(".pdf")))?.path || null;
}
var IDENTITY = [
  "datacite.json",
  "object.json",
  "genesis.json"
];
function isEvidence(p) {
  return p === "parent.inventory.json" || p === "parent.object.json" || p.startsWith("parent.signatures/") || p.startsWith("parent.chain/");
}
function ownFiles(inv, ver, obj) {
  const notes = new Set([
    ...list(obj?.notices),
    obj?.withdrawal?.reason,
    obj?.licence
  ].map((x) => x?.path).filter(text));
  const files = /* @__PURE__ */ Object.create(null);
  for (const [p, digest] of Object.entries(filesOf(inv, ver))) {
    if (!IDENTITY.includes(p) && !isEvidence(p) && !notes.has(p)) files[p] = digest;
  }
  return files;
}
function documentVersionErrors(inv, objOf2) {
  const errors = [];
  const add2 = (ver, message2) => errors.push({
    ver,
    message: message2
  });
  const versions2 = versionsOf(inv);
  const seen = /* @__PURE__ */ new Map(), filesOfDoc = /* @__PURE__ */ new Map(), missingOf = /* @__PURE__ */ new Map();
  let highest = 0, hadHistory = false, notices = [];
  for (const ver of versions2) {
    const obj = objOf2(ver);
    if (!obj || obj.kind !== "document") return errors;
    const n = obj.documentVersion;
    const own2 = ownFiles(inv, ver, obj);
    const change = obj.changes?.text ?? null;
    if (!seen.size && obj.parent) highest = (Number.isInteger(n) ? n : 1) - 1;
    if (seen.has(n)) {
      const before = filesOfDoc.get(n);
      if (missingOf.get(n)) {
        const changed = Object.entries(own2).some(([p, d]) => Object.hasOwn(before, p) && before[p] !== d);
        const removed2 = Object.keys(before).some((p) => !Object.hasOwn(own2, p));
        if (changed || removed2) add2(ver, `changes files of document version ${n} (only additions allowed)`);
      } else if (!same(own2, before) || change !== seen.get(n)) {
        add2(ver, `has other files than document version ${n}`);
      }
      missingOf.set(n, Boolean(obj.sourcesMissing));
      filesOfDoc.set(n, own2);
    } else {
      if (n !== highest + 1) add2(ver, `document version ${n} breaks the numbering (expected ${highest + 1})`);
      for (const [m, files] of filesOfDoc) {
        if (same(own2, files) && change === seen.get(m)) {
          add2(ver, `document version ${n} holds the same files and change note as document version ${m}, whose number it keeps`);
          break;
        }
      }
      highest = Math.max(highest, Number.isInteger(n) ? n : 0);
      seen.set(n, change);
      filesOfDoc.set(n, own2);
      missingOf.set(n, Boolean(obj.sourcesMissing));
    }
    const hist = obj.history;
    if (hadHistory && hist == null) add2(ver, "lacks the history of earlier versions");
    if (hist != null) {
      hadHistory = true;
      const known = versions2.filter((v) => versionNumber(v) <= versionNumber(ver));
      if (!Array.isArray(hist) || hist.some((h) => !known.includes(h))) {
        add2(ver, "history names unknown object versions");
      } else {
        const docs = hist.map((h) => objOf2(h)?.documentVersion);
        const all = Array.from({
          length: highest
        }, (_, k) => k + 1);
        if (new Set(docs).size !== docs.length || !same([
          ...new Set(docs)
        ].sort((a, b) => a - b), all)) {
          add2(ver, "history does not list each document version once");
        }
        hist.forEach((h, k) => {
          const later = known.filter((v) => versionNumber(v) > versionNumber(h) && objOf2(v)?.documentVersion === docs[k]);
          if (later.length) add2(ver, `history entry ${h} is not the last object version of ${docs[k]}`);
        });
      }
    }
    const current = Array.isArray(obj.notices) ? obj.notices : [];
    if (notices.some((x) => !current.some((y) => same(x, y)))) add2(ver, "drops or changes an earlier notice");
    notices = current;
  }
  return errors;
}

// core/archive.js
function baseOf(url, relativeTo = globalThis.location?.href) {
  const u = new URL(url, relativeTo);
  u.hash = "";
  u.search = "";
  let s = u.href;
  if (/\/[^/]*\.[A-Za-z0-9]{1,8}$/.test(u.pathname)) s = s.slice(0, s.lastIndexOf("/") + 1);
  return s.endsWith("/") ? s : s + "/";
}
var Archive = class _Archive {
  static async open(http, url, options = {}) {
    const base = baseOf(url);
    const where2 = base + "opensheaf.json";
    const disc = parseJson(await http.cached(where2, options), where2);
    if (!isObject(disc)) throw new FetchError("json", where2, "is not a JSON object");
    const archive = new _Archive(http, base, disc);
    if (!archive.old) {
      const ids = [
        ...archive.objects().map((o) => o.id),
        ...archive.drafts().map((d) => d.id),
        ...archive.tombstones().map((t) => t.id).filter(isObjectId)
      ];
      await Promise.all(ids.map((id) => archive.locate(id).catch(() => null)));
    }
    return archive;
  }
  constructor(http, base, disc) {
    this.http = http;
    this.base = base;
    this.disc = disc;
    this.old = disc.specification === "0.1" || disc.format === "opensheaf-archive/0.1" || disc.specification !== "0.2" && Object.hasOwn(disc, "archiveId");
    this.name = typeof disc.name === "string" && disc.name ? disc.name : base;
    this.layout = disc.storageLayout === HASHED_LAYOUT ? HASHED_LAYOUT : OWNER_NAME_LAYOUT;
    let root;
    try {
      root = new URL(typeof disc.storageRoot === "string" ? disc.storageRoot : "ocfl/", base).href;
    } catch {
      root = base + "ocfl/";
    }
    this.root = root.endsWith("/") ? root : root + "/";
    this.paths = /* @__PURE__ */ new Map();
    this.keyLogs = /* @__PURE__ */ new Map();
    this.lines = /* @__PURE__ */ new Map();
    this.lister = null;
  }
  objects() {
    const list2 = Array.isArray(this.disc.objects) ? this.disc.objects : [];
    return list2.filter((o) => isObject(o) && isObjectId(o.id) && !parseId(o.id).draft);
  }
  entry(id) {
    return this.objects().find((o) => o.id === id) || null;
  }
  drafts() {
    const list2 = Array.isArray(this.disc.drafts) ? this.disc.drafts : [];
    return list2.filter((d) => isObject(d) && isObjectId(d.id) && parseId(d.id).draft);
  }
  tombstones() {
    const list2 = Array.isArray(this.disc.tombstones) ? this.disc.tombstones : [];
    return list2.filter((t) => isObject(t) && typeof t.id === "string");
  }
  owners() {
    return (Array.isArray(this.disc.owners) ? this.disc.owners : []).filter((o) => typeof o === "string");
  }
  labelOf(id) {
    return this.objects().find((o) => o.id === id && typeof o.label === "string")?.label ?? null;
  }
  byLabel(label) {
    return this.objects().find((o) => o.label === label)?.id ?? null;
  }
  where(id) {
    const parts = parseId(id);
    if (parts && parts.name === parts.owner) return `owner ${parts.owner}`;
    return this.labelOf(id) || id || "?";
  }
  async locate(id) {
    if (!this.paths.has(id)) this.paths.set(id, await pathOf(id, this.layout));
    return this.paths.get(id);
  }
  url(id, ...segments) {
    if (!this.paths.has(id)) {
      throw new FetchError("unsafe", this.root, `${JSON.stringify(id)} is not the identifier of an object (section 4)`);
    }
    return under(this.root, [
      ...this.paths.get(id),
      ...segments
    ]);
  }
  versionUrl(id, ver, file) {
    if (!isVersion(ver)) throw new FetchError("unsafe", this.root, `${JSON.stringify(ver)} is not an object version (section 4.1)`);
    return this.url(id, ver, file);
  }
  folderUrl(id, ver) {
    const folder = this.url(id, "x").slice(0, -1);
    if (!ver) return folder;
    return this.versionUrl(id, ver, "x").slice(0, -1);
  }
  contentUrl(id, inv, cp) {
    const problem = contentPathProblem(cp, inv?.contentDirectory || "content");
    if (problem) throw new FetchError("unsafe", this.root, `the content path ${JSON.stringify(cp)} ${problem}`);
    return underPath(this.folderUrl(id), cp);
  }
  inventoryUrl(id, ver) {
    return ver ? this.versionUrl(id, ver, "inventory.json") : this.url(id, "inventory.json");
  }
  witnessUrl(id, ver, name2) {
    if (!isVersion(ver)) throw new FetchError("unsafe", this.root, `${JSON.stringify(ver)} is not an object version (section 4.1)`);
    return this.url(id, ...WITNESSES.split("/"), ver, name2);
  }
  async inventoryBytes(id, ver, options = {}) {
    await this.locate(id);
    return this.http.cached(this.inventoryUrl(id, ver), options);
  }
  async inventory(id, ver, options = {}) {
    const bytes = await this.inventoryBytes(id, ver, options);
    const where2 = this.inventoryUrl(id, ver);
    const inv = parseJson(bytes, where2);
    if (!isObject(inv) || !isObject(inv.versions) || !isObject(inv.manifest)) {
      throw new FetchError("json", where2, "is not an OCFL inventory");
    }
    if (Object.keys(inv.versions).length > LIMITS.versions) {
      throw new FetchError("too-large", where2, `has more than ${LIMITS.versions} object versions`);
    }
    return inv;
  }
  async sidecarBytes(id, ver, options = {}) {
    await this.locate(id);
    const where2 = ver ? this.versionUrl(id, ver, "inventory.json.sha512") : this.url(id, "inventory.json.sha512");
    return this.http.cached(where2, {
      ...options,
      limit: 4096
    });
  }
  async sidecar(id, ver, options = {}) {
    return sidecarDigest(await this.sidecarBytes(id, ver, options)) ?? "";
  }
  async pin(id, ver, options = {}) {
    const digest = await sha512(await this.inventoryBytes(id, ver, options));
    if (await this.sidecar(id, ver, options) !== digest) {
      throw new FetchError("digest", this.inventoryUrl(id, ver), "the inventory does not match its checksum file");
    }
    return digest;
  }
  fileUrl(id, inv, ver, logical) {
    const cp = contentPath(inv, ver, logical);
    return cp ? this.contentUrl(id, inv, cp) : null;
  }
  async json(id, inv, ver, logical, options = {}) {
    await this.locate(id);
    const url = this.fileUrl(id, inv, ver, logical);
    if (!url) return null;
    return this.http.json(url, {
      ...options,
      limit: LIMITS.json
    });
  }
  async bytes(id, inv, ver, logical, options = {}) {
    await this.locate(id);
    const url = this.fileUrl(id, inv, ver, logical);
    if (!url) return null;
    return this.http.cached(url, {
      ...options,
      limit: LIMITS.json
    });
  }
  async descriptions(id, inv, ver, options = {}) {
    const [obj, dc] = await Promise.all([
      this.json(id, inv, ver, "object.json", options),
      this.json(id, inv, ver, "datacite.json", options)
    ]);
    return {
      obj,
      dc
    };
  }
  async objectsOf(id, inv, options = {}) {
    const versions2 = versionsOf(inv);
    const objs = await Promise.all(versions2.map((v) => this.json(id, inv, v, "object.json", options).catch((error) => {
      if (error.kind === "aborted") throw error;
      return null;
    })));
    return new Map(versions2.map((v, k) => [
      v,
      objs[k]
    ]));
  }
  async history(id, at, options = {}) {
    const inv = await this.inventory(id, null, options);
    const objs = await this.objectsOf(id, inv, options);
    const objOf2 = (v) => objs.get(v) ?? null;
    return {
      inv,
      objs,
      hist: historyOf(inv, objOf2, at || inv.head),
      current: currentVersion(inv, objOf2, at || inv.head)
    };
  }
  async listWitnesses(id, ver) {
    if (!this.lister) return null;
    const found2 = await this.lister(this.url(id, ...WITNESSES.split("/"), ver, "x").slice(0, -1));
    return found2 ? found2.filter((e) => e.kind === "file").map((e) => e.name) : null;
  }
  async listFolder(id, ...segments) {
    if (!this.lister) return null;
    return this.lister(this.url(id, ...segments, "x").slice(0, -1));
  }
  async witness(id, ver, name2, options = {}) {
    await this.locate(id);
    try {
      return await this.http.cached(this.witnessUrl(id, ver, name2), {
        ...options,
        limit: LIMITS.json
      });
    } catch (error) {
      if (error.kind === "not-found" || error.kind === "forbidden") return null;
      throw error;
    }
  }
  keyLog(owner, options = {}) {
    if (!this.keyLogs.has(owner)) {
      const loading = this.readKeyLog(owner, options);
      this.keyLogs.set(owner, loading);
      loading.catch((error) => {
        if (error?.kind === "aborted") this.keyLogs.delete(owner);
      });
    }
    return this.keyLogs.get(owner);
  }
  async readKeyLog(owner, options) {
    const id = objectId(owner, owner);
    let rootBytes;
    try {
      rootBytes = await this.inventoryBytes(id, null, options);
    } catch (error) {
      if (error.kind === "not-found") return null;
      throw error;
    }
    const root = jsonOrNull(rootBytes);
    const head = typeof root?.head === "string" && /^v[0-9]+$/.test(root.head) ? Number(root.head.slice(1)) : NaN;
    if (!Number.isInteger(head)) throw new Error(`${this.where(id)}: not an OCFL object with an inventory`);
    const versions2 = [], problems = [];
    for (let n = 1; n <= Math.min(head, LIMITS.versions); n++) {
      const ver = `v${n}`;
      let invBytes, entry;
      try {
        invBytes = await this.inventoryBytes(id, ver, options);
        entry = parseJson(invBytes);
        if (!isObject(entry.manifest) || !isObject(entry.versions?.[ver]?.state)) throw new Error("not an inventory");
      } catch (error) {
        if (error.kind === "aborted") throw error;
        problems.push(`${ver}: no readable inventory in the version folder (section 4.1; ${error.detail || error.message})`);
        break;
      }
      const sc = await this.sidecarBytes(id, ver, options).catch((error) => {
        if (error.kind === "aborted") throw error;
        return new Uint8Array();
      });
      const digest = await sha512(invBytes);
      if (sidecarDigest(sc) !== digest) problems.push(`${ver}: the checksum file does not state the digest of the inventory`);
      const files = /* @__PURE__ */ new Map();
      for (const [d, paths] of Object.entries(entry.versions[ver].state)) {
        if (!Array.isArray(paths) || !paths.length) continue;
        let bytes = new Uint8Array();
        try {
          const cp = entry.manifest[d]?.[0];
          bytes = await this.http.cached(this.contentUrl(id, entry, cp), {
            ...options,
            limit: LIMITS.json
          });
        } catch (error) {
          if (error.kind === "aborted") throw error;
          problems.push(`${ver}: the content of ${paths[0]} is missing`);
        }
        if (await sha512(bytes) !== d) problems.push(`${ver}: ${paths[0]} does not have the digest its inventory states`);
        for (const p of paths) files.set(p, bytes);
      }
      const witnesses = /* @__PURE__ */ new Map();
      const prev = versions2[versions2.length - 1]?.keys;
      for (const d of n > 1 && Array.isArray(prev?.next) ? prev.next : []) {
        if (typeof d !== "string") continue;
        const name2 = `signature-${d.slice(0, 16)}.json`;
        const bytes = await this.witness(id, ver, name2, options);
        if (bytes) witnesses.set(name2, bytes);
      }
      versions2.push(await Version.make(n, files, invBytes, sc, witnesses));
    }
    if (!versions2.length || !versions2[0].files.has("genesis.json")) {
      throw new Error(`${this.where(id)}: no genesis record in the first version`);
    }
    if (versions2[versions2.length - 1].number === head && !sameBytes(rootBytes, versions2[versions2.length - 1].inventory)) {
      problems.push("the root inventory differs from that of the head version");
    }
    const log = await KeyLog.of(versions2[0].files.get("genesis.json"), versions2, problems);
    if (root.id !== log.id) {
      problems.push(`the identifier of the object is not ${log.id}, that of the owner its genesis record names`);
    }
    await log.check();
    return log;
  }
  line(id, options = {}) {
    const key = options.log === void 0 ? id : null;
    if (key && this.lines.has(key)) return this.lines.get(key);
    const loading = this.readLine(id, options);
    if (key) {
      this.lines.set(key, loading);
      loading.catch(() => this.lines.delete(key));
    }
    return loading;
  }
  async readLine(id, { log, signal } = {}) {
    const options = {
      signal
    };
    const inv = await this.inventory(id, null, options);
    const names = versionsOf(inv);
    const objs = await this.objectsOf(id, inv, options);
    const versions2 = await Promise.all(names.map(async (ver) => {
      const bytes = await this.inventoryBytes(id, ver, options).catch((error) => {
        if (error.kind === "aborted") throw error;
        return null;
      });
      return {
        ver,
        digest: bytes ? await sha512(bytes) : "",
        obj: objs.get(ver) ?? null
      };
    }));
    const owner = objs.get(names[0])?.owner;
    if (log === void 0) {
      log = typeof owner === "string" ? await this.keyLog(owner, options).catch((error) => {
        if (error?.kind === "aborted") throw error;
        return null;
      }) : null;
    }
    let judgements, statuses, unnamed = false, listed = null;
    if (this.lister) listed = await Promise.all(versions2.map((v) => this.listWitnesses(id, v.ver)));
    if (listed?.every((x) => x !== null)) {
      const withWitnesses = await Promise.all(versions2.map(async (v, k) => {
        const witnesses = /* @__PURE__ */ new Map();
        for (const name2 of listed[k]) {
          const bytes = await this.witness(id, v.ver, name2, options);
          if (bytes) witnesses.set(name2, bytes);
        }
        return {
          version: v.ver,
          digest: v.digest,
          witnesses
        };
      }));
      if (log) {
        ({ judgements, statuses } = await lineStatusesOf(id, owner, withWitnesses, log));
      } else {
        judgements = await Promise.all(withWitnesses.map((v) => judgeFolder(v.witnesses, {
          objectId: id,
          version: v.version,
          inventory: v.digest,
          owner,
          lookup: () => null
        })));
        statuses = lineStatuses(judgements);
      }
    } else if (!log) {
      listed = null;
      unnamed = true;
      judgements = versions2.map(() => []);
      statuses = versions2.map(() => UNCHECKED);
    } else {
      listed = null;
      const dids = /* @__PURE__ */ new Set();
      for (const v of log.versions) {
        for (const did of Array.isArray(v.keys?.keys) ? v.keys.keys : []) dids.add(did);
        for (const c of v.carried || []) for (const did of Array.isArray(c.keys?.keys) ? c.keys.keys : []) dids.add(did);
      }
      for (const c of log.met?.carried || []) for (const did of Array.isArray(c.keys?.keys) ? c.keys.keys : []) dids.add(did);
      const files = (await Promise.all([
        ...dids
      ].filter((d) => typeof d === "string").map(fileName))).sort();
      const withWitnesses = await Promise.all(versions2.map(async (v) => {
        const witnesses = /* @__PURE__ */ new Map();
        for (const name2 of files) {
          const bytes = await this.witness(id, v.ver, name2, options);
          if (bytes) witnesses.set(name2, bytes);
        }
        return {
          version: v.ver,
          digest: v.digest,
          witnesses
        };
      }));
      ({ judgements, statuses } = await lineStatusesOf(id, owner, withWitnesses, log));
    }
    const n = latestSigned(statuses);
    return {
      id,
      inv,
      versions: versions2,
      objs,
      owner,
      log,
      judgements,
      statuses,
      unnamed,
      listed,
      latest: n ? `v${n}` : null
    };
  }
};

// core/storage.js
var StorageError = class extends Error {
};
function checkPath(path, { folder = false } = {}) {
  if (typeof path !== "string") throw new StorageError(`not a path: ${String(path)}`);
  if (path === "" && folder) return path;
  if (path === "" || path.startsWith("/")) throw new StorageError(`not a relative path: ${JSON.stringify(path)}`);
  for (const segment of path.split("/")) {
    if (segment === "" || segment === "." || segment === ".." || /[\u0000-\u001f\u007f\\]/.test(segment)) {
      throw new StorageError(`an unsafe path: ${JSON.stringify(path)}`);
    }
  }
  return path;
}
function joinPath(...parts) {
  return parts.filter((p) => p !== "" && p !== null && p !== void 0).join("/");
}
function parentOf(path) {
  const k = path.lastIndexOf("/");
  return k < 0 ? "" : path.slice(0, k);
}
function compareText(a, b) {
  const x = [
    ...a
  ], y = [
    ...b
  ];
  for (let k = 0; k < Math.min(x.length, y.length); k++) {
    const d = x[k].codePointAt(0) - y[k].codePointAt(0);
    if (d) return d;
  }
  return x.length - y.length;
}
var decoder = new TextDecoder("utf-8", {
  fatal: true
});
async function readText(storage, path) {
  const bytes = await storage.read(path);
  return bytes === null ? null : decoder.decode(bytes);
}
async function readJson(storage, path) {
  const text3 = await readText(storage, path);
  if (text3 === null) return null;
  try {
    return JSON.parse(text3);
  } catch (error) {
    throw new StorageError(`${path}: not JSON (${error.message})`);
  }
}
async function writeText(storage, path, text3, options) {
  return storage.write(path, utf8(text3), options);
}
var ORIGIN = "https://archive.invalid/";
function storageFetch(storage, origin = ORIGIN, { fallback = null } = {}) {
  const base = new URL(origin);
  return async (url, init = {}) => {
    const u = new URL(url);
    if (u.origin !== base.origin || !u.pathname.startsWith(base.pathname)) {
      if (fallback) return fallback(url, init);
      throw new TypeError(`fetch failed: ${url} is not in this archive`);
    }
    let bytes = null;
    try {
      bytes = await storage.read(checkPath(decodeURIComponent(u.pathname.slice(base.pathname.length))));
    } catch {
      bytes = null;
    }
    if (bytes === null) return new Response("not found", {
      status: 404
    });
    const headers = {
      "content-length": String(bytes.length)
    };
    return new Response(init.method === "HEAD" ? null : bytes, {
      status: 200,
      headers
    });
  };
}
function storageLister(storage, origin = ORIGIN) {
  const base = new URL(origin);
  return async (url) => {
    const u = new URL(url);
    if (u.origin !== base.origin || !u.pathname.startsWith(base.pathname)) return null;
    try {
      const path = decodeURIComponent(u.pathname.slice(base.pathname.length)).replace(/\/$/, "");
      return await storage.list(checkPath(path, {
        folder: true
      })) || [];
    } catch {
      return [];
    }
  };
}

// core/keys.js
var KeyError = class extends Error {
};
var PassphraseNeeded = class extends KeyError {
  constructor(message2, passkeys = []) {
    super(message2);
    this.passkeys = passkeys;
  }
};
var PKCS8_ED25519 = [
  48,
  46,
  2,
  1,
  0,
  48,
  5,
  6,
  3,
  43,
  101,
  112,
  4,
  34,
  4,
  32
];
var Key = class _Key {
  static async fromSeed(seed) {
    if (!(seed instanceof Uint8Array) || seed.length !== 32) {
      throw new KeyError("the seed of an Ed25519 key has 32 bytes");
    }
    const own2 = Uint8Array.from(seed);
    const signing = await crypto.subtle.importKey("pkcs8", new Uint8Array([
      ...PKCS8_ED25519,
      ...own2
    ]), {
      name: "Ed25519"
    }, true, [
      "sign"
    ]);
    const jwk = await crypto.subtle.exportKey("jwk", signing);
    const publicKey = unbase64(jwk.x.replaceAll("-", "+").replaceAll("_", "/") + "=");
    const did = didKey(publicKey);
    return new _Key(own2, signing, publicKey, did, await keyDigest(did));
  }
  constructor(seed, signing, publicKey, did, digest) {
    Object.assign(this, {
      seed,
      signing,
      publicKey,
      did,
      digest,
      id: digest.slice(0, 16)
    });
  }
  async sign(message2) {
    return new Uint8Array(await crypto.subtle.sign({
      name: "Ed25519"
    }, this.signing, message2));
  }
  toString() {
    return `Key(${this.did})`;
  }
};
function randomBytes(n) {
  return crypto.getRandomValues(new Uint8Array(n));
}
async function newKey() {
  return Key.fromSeed(randomBytes(32));
}
function base64(bytes) {
  let binary2 = "";
  for (const b of bytes) binary2 += String.fromCharCode(b);
  return btoa(binary2);
}
function unbase32(text3) {
  const t = text3.toUpperCase();
  if (!/^[A-Z2-7]*$/.test(t) || [
    1,
    3,
    6
  ].includes(t.length % 8)) throw new KeyError(`not base32: ${text3}`);
  const out = [];
  let bits = 0, value = 0;
  for (const c of t) {
    value = value << 5 | "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".indexOf(c);
    bits += 5;
    if (bits >= 8) {
      out.push(value >>> bits - 8 & 255);
      bits -= 8;
    }
    value &= (1 << bits) - 1;
  }
  return new Uint8Array(out);
}
function strictBase64(text3) {
  try {
    return unbase64(text3);
  } catch {
    throw new KeyError("not base64");
  }
}
function concat(...parts) {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let k = 0;
  for (const p of parts) {
    out.set(p, k);
    k += p.length;
  }
  return out;
}
var ARGON2ID = {
  opsMin: 1,
  opsMax: 4,
  memMin: 8192,
  memMax: 1073741824,
  saltBytes: 16
};
async function argon2id2(passphrase, salt, opslimit, memlimit) {
  const ops = /^[0-9]+$/.test(String(opslimit)) ? Number(opslimit) : NaN;
  const mem = /^[0-9]+$/.test(String(memlimit)) ? Number(memlimit) : NaN;
  if (Number.isNaN(ops) || Number.isNaN(mem)) throw new KeyError("the encryption of the key is damaged");
  if (!(ARGON2ID.opsMin <= ops && ops <= ARGON2ID.opsMax && ARGON2ID.memMin <= mem && mem <= ARGON2ID.memMax)) {
    throw new KeyError(`the key asks for an Argon2id cost out of bounds (opslimit=${ops}, memlimit=${mem}): at most ${ARGON2ID.opsMax} and ${ARGON2ID.memMax}`);
  }
  if (salt.length !== ARGON2ID.saltBytes) throw new KeyError("the encryption of the key is damaged");
  const hashWasm = await Promise.resolve().then(() => (init_index_esm(), index_esm_exports));
  return hashWasm.argon2id({
    password: utf8(passphrase),
    salt,
    parallelism: 1,
    iterations: ops,
    memorySize: Math.floor(mem / 1024),
    hashLength: 32,
    outputType: "binary"
  });
}
async function secretbox() {
  const nacl = await Promise.resolve().then(() => __toESM(require_nacl_fast()));
  return (nacl.default || nacl).secretbox;
}
async function seal(data2, key) {
  const box = await secretbox();
  const nonce = randomBytes(24);
  return concat(nonce, box(data2, nonce, key));
}
async function unseal(data2, key) {
  const box = await secretbox();
  if (data2.length < 24 + 16) return null;
  return box.open(data2.subarray(24), data2.subarray(0, 24), key);
}
function parameters(words2) {
  const out = {};
  for (const w of words2) {
    const k = w.indexOf("=");
    out[k < 0 ? w : w.slice(0, k)] = k < 0 ? "" : w.slice(k + 1);
  }
  return out;
}
async function decryptSeed(encryption, data2, passphrase) {
  const words2 = encryption.split(/\s+/).filter(Boolean);
  if (words2.length === 1 && words2[0] === "none") return data2;
  if (!words2.length || words2[0] !== "argon2id-secretbox") {
    throw new KeyError(`unknown encryption: '${words2.join(" ")}'`);
  }
  if (passphrase === null || passphrase === void 0) {
    throw new PassphraseNeeded("this key is encrypted: a passphrase is needed");
  }
  const p = parameters(words2.slice(1));
  if (!("salt" in p) || !("opslimit" in p) || !("memlimit" in p)) throw new KeyError("the encryption of the key is damaged");
  let salt;
  try {
    salt = strictBase64(p.salt);
  } catch {
    throw new KeyError("the encryption of the key is damaged");
  }
  const seed = await unseal(data2, await argon2id2(passphrase, salt, p.opslimit, p.memlimit));
  if (!seed) throw new KeyError("wrong passphrase, or a damaged key");
  return seed;
}
var ROTATION_FORMAT = "opensheaf-rotation-key/0.2";
var KEY_FORMAT = "opensheaf-key/0.2";
var TEXT_FORMAT = "opensheaf-key-text/0.2";
var ENVELOPE = "envelope-secretbox";
var CURRENT = "current";
var ROTATION = "rotation";
var KINDS2 = [
  CURRENT,
  ROTATION
];
var SHEET_TITLE = "OpenSheaf rotation key";
async function sheetCheck(seed) {
  return base32(await sha256(concat(utf8("opensheaf-rotation-key-check\n"), seed))).slice(0, 4).toUpperCase();
}
var PASSKEY_RP = "unlock.opensheaf.org";
var PASSKEY_INFO = utf8("opensheaf wallet passkey v1");
var PASSKEY_SALT = "opensheaf wallet unlock v1 ";
async function hmacSha256(key, data2) {
  const k = await crypto.subtle.importKey("raw", key, {
    name: "HMAC",
    hash: "SHA-256"
  }, false, [
    "sign"
  ]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, data2));
}
async function hkdf(ikm, salt, info, length) {
  const prk = await hmacSha256(salt.length ? salt : new Uint8Array(32), ikm);
  const out = [];
  let block = new Uint8Array();
  for (let i = 1; out.length < length; i++) {
    block = await hmacSha256(prk, concat(block, info, new Uint8Array([
      i
    ])));
    out.push(...block);
  }
  return new Uint8Array(out.slice(0, length));
}
async function passkeySalt(owner) {
  return sha256(utf8(PASSKEY_SALT + owner));
}
async function passkeyKek(prfSecret) {
  return hkdf(prfSecret, new Uint8Array(32), PASSKEY_INFO, 32);
}
var Passkey = class {
  constructor(cred, salt, { rp = PASSKEY_RP, kek = null, box = null } = {}) {
    Object.assign(this, {
      cred,
      salt: Uint8Array.from(salt),
      rp,
      kek,
      box
    });
  }
  async opens(kek) {
    return this.box !== null && await unseal(this.box, kek) !== null;
  }
  async wrap(dataKey2) {
    return `wrap passkey prf rp=${this.rp} cred=${this.cred} salt=${base64(this.salt)} ` + base64(await seal(dataKey2, this.kek));
  }
  toString() {
    return `Passkey(${this.rp} ${this.cred})`;
  }
};
function parseWrap(line) {
  const parts = line.split(/\s+/).filter(Boolean);
  if (parts.length < 4 || parts[0] !== "wrap") throw new KeyError(`a damaged lock of the key: '${line}'`);
  const out = parameters(parts.slice(3, -1));
  try {
    out.method = parts[1];
    out.kind = parts[2];
    out.box = strictBase64(parts[parts.length - 1]);
    if ("salt" in out) out.salt = strictBase64(out.salt);
  } catch {
    throw new KeyError("a lock of the key is damaged");
  }
  return out;
}
function wrapsOf(text3) {
  return text3.split(/\r\n|\r|\n/).map((l) => l.trim()).filter((l) => l.startsWith("wrap "));
}
function passkeyOfWrap(w) {
  return new Passkey(w.cred, w.salt || new Uint8Array(), {
    rp: w.rp || PASSKEY_RP,
    box: w.box
  });
}
function passkeysOf(text3) {
  return wrapsOf(text3).map(parseWrap).filter((w) => w.method === "passkey" && w.kind === "prf" && w.cred).map(passkeyOfWrap);
}
async function dataKey(wraps, passphrase = null, keks = null) {
  const parsed = wraps.map(parseWrap);
  for (const w of parsed) {
    if (w.method === "passkey" && keks && w.cred in keks) {
      const opened = await unseal(w.box, keks[w.cred]);
      if (opened) return opened;
    }
  }
  if (passphrase === null || passphrase === void 0) {
    throw new PassphraseNeeded("this key is encrypted: a passphrase is needed", parsed.filter((w) => w.method === "passkey" && w.cred).map(passkeyOfWrap));
  }
  for (const w of parsed) {
    if (w.method !== "passphrase" || w.kind !== "argon2id") continue;
    if (!("salt" in w) || !("opslimit" in w) || !("memlimit" in w)) throw new KeyError("the encryption of the key is damaged");
    const opened = await unseal(w.box, await argon2id2(passphrase, w.salt, w.opslimit, w.memlimit));
    if (opened) return opened;
  }
  throw new KeyError("wrong passphrase, or a damaged key");
}
async function openEnvelope(wraps, data2, passphrase = null, keks = null) {
  const seed = await unseal(data2, await dataKey(wraps, passphrase, keks));
  if (!seed) throw new KeyError("the seed of the key is damaged");
  return seed;
}
async function readKey(text3, passphrase = null, keks = null) {
  const lines2 = text3.split(/\r\n|\r|\n/);
  if (lines2[lines2.length - 1] === "") lines2.pop();
  const formats = [
    ROTATION_FORMAT,
    KEY_FORMAT,
    TEXT_FORMAT
  ];
  const start = lines2.findIndex((line) => formats.includes(line.trim()));
  const format = start < 0 ? null : lines2[start].trim();
  const fields = {};
  for (const line of lines2.slice(start + 1)) {
    const t = line.trim();
    const k = t.indexOf(" ");
    const name2 = k < 0 ? t : t.slice(0, k);
    if (name2 && !(name2 in fields)) fields[name2] = k < 0 ? "" : t.slice(k + 1).trim();
  }
  let data2;
  if (format === ROTATION_FORMAT || format === KEY_FORMAT) {
    try {
      data2 = strictBase64(fields.seed ?? "");
    } catch {
      throw new KeyError("the seed of the file is not base64");
    }
  } else {
    try {
      data2 = unbase32((fields.seed ?? "").replaceAll(" ", ""));
    } catch {
      data2 = new Uint8Array();
    }
    if (!data2.length || (fields.check ?? "").toUpperCase() !== await sheetCheck(data2)) {
      throw new KeyError("the seed does not match its check: a character is mistyped");
    }
  }
  let seed;
  if ((fields.encryption ?? "").split(" ")[0] === ENVELOPE) {
    const wraps = lines2.slice(Math.max(start, 0)).map((l) => l.trim()).filter((l) => l.startsWith("wrap "));
    seed = await openEnvelope(wraps, data2, passphrase, keks);
  } else {
    seed = await decryptSeed(fields.encryption ?? "none", data2, passphrase);
  }
  if (seed.length !== 32) throw new KeyError("not the seed of an Ed25519 key");
  const key = await Key.fromSeed(seed);
  if ((fields.key ?? key.did) !== key.did || (fields.digest ?? key.digest) !== key.digest) {
    throw new KeyError("the seed is not that of the key the file or sheet names");
  }
  const kind = fields.kind ?? ROTATION;
  if (!KINDS2.includes(kind)) throw new KeyError(`unknown kind of key: '${kind}'`);
  const version = (fields.version ?? "").split(" ")[0];
  return {
    key,
    owner: fields.owner ?? null,
    kind,
    version: /^v[0-9]+$/.test(version) ? Number(version.slice(1)) : null
  };
}

// core/write.js
function jsonText(value) {
  return JSON.stringify(value, null, 2) + "\n";
}
function jsonBytes(value) {
  return utf8(jsonText(value));
}
function utcNow() {
  return (/* @__PURE__ */ new Date()).toISOString().replace(/\.[0-9]{3}Z$/, "Z");
}
function today() {
  const d = /* @__PURE__ */ new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function newNonce() {
  return hex(randomBytes(16));
}
async function genesisRecord(kind, { originator = null, keys = null, threshold = null, next = null, nextThreshold = null, keeper = null, extensions = null, created = null, nonce = null } = {}) {
  if (!KINDS.includes(kind)) throw new Error(`unknown kind '${kind}'`);
  nonce = nonce || newNonce();
  created = created || utcNow();
  if (!NONCE.test(nonce) || !CREATED.test(created)) {
    throw new Error("a nonce of at least 128 bits in hexadecimal, and a date in UTC, are needed");
  }
  const rec = {
    format: GENESIS_FORMAT,
    kind,
    created
  };
  if (kind === "owner") {
    if (originator !== null) throw new Error("an owner is its own originator: its genesis record names none");
    Object.assign(rec, {
      nonce,
      keys: [
        ...keys || []
      ],
      threshold,
      next: [
        ...next || []
      ],
      nextThreshold
    });
    const problems = await keyRulesOfRecord(rec);
    if (problems.length) throw new Error(problems.join("; "));
    if (keeper !== null) {
      rec.keeper = typeof keeper === "string" ? [
        keeper
      ] : [
        ...keeper
      ];
      if (rec.keeper.length !== 1 || !keeperValid(rec.keeper[0])) {
        throw new Error(`a keeper is one ORCID iD or https://<domain>/: '${keeper}'`);
      }
    }
    if (extensions) rec.extensions = extensions;
  } else {
    if (typeof originator !== "string" || !OWNER_NAME.test(originator)) {
      throw new Error(`the originator must be an owner name: '${originator}'`);
    }
    if ([
      keys,
      threshold,
      next,
      nextThreshold,
      keeper,
      extensions
    ].some((v) => v !== null)) {
      throw new Error("keys, thresholds, keeper and extensions are only for an owner");
    }
    Object.assign(rec, {
      originator,
      nonce
    });
  }
  return jsonBytes(rec);
}
function place(contentPath2) {
  const k = contentPath2.indexOf("/");
  const ver = k < 0 ? contentPath2 : contentPath2.slice(0, k);
  const rest = k < 0 ? "" : contentPath2.slice(k + 1);
  return [
    /^[0-9]+$/.test(ver.slice(1)) ? Number(ver.slice(1)) : 0,
    rest
  ];
}
function comparePlace(a, b) {
  return a[0] - b[0] || compareText(a[1], b[1]);
}
function smallest(list2, compare) {
  return list2.reduce((best, x) => compare(x, best) < 0 ? x : best);
}
var sortedKeys = (o) => Object.keys(o).sort(compareText);
function orderedVersion(e) {
  const out = {};
  for (const k of [
    "created",
    "state",
    "message",
    "user"
  ]) if (k in e) out[k] = e[k];
  out.state = Object.fromEntries(Object.entries(e.state).map(([d, paths]) => [
    d,
    paths,
    smallest(paths, compareText)
  ]).sort((x, y) => compareText(x[2], y[2])).map(([d, paths]) => [
    d,
    paths
  ]));
  for (const k of sortedKeys(e)) if (!(k in out)) out[k] = e[k];
  return out;
}
function orderedInventory(inv) {
  const out = {};
  for (const k of sortedKeys(inv)) out[k] = inv[k];
  out.manifest = Object.fromEntries(Object.entries(inv.manifest).map(([d, paths]) => [
    d,
    paths,
    place(smallest(paths, (a, b) => comparePlace(place(a), place(b))))
  ]).sort((x, y) => comparePlace(x[2], y[2])).map(([d, paths]) => [
    d,
    paths
  ]));
  out.versions = {};
  for (const k of Object.keys(inv.versions).sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)))) {
    out.versions[k] = orderedVersion(inv.versions[k]);
  }
  return out;
}
function inventoryFile(inv) {
  return jsonBytes(inv);
}
async function sha512hex(bytes) {
  return hex(await sha512bytes(bytes));
}
async function sidecar(inventoryBytes) {
  return utf8(`${await sha512hex(inventoryBytes)}  inventory.json
`);
}
async function sha256hex(bytes) {
  return hex(await sha256(bytes));
}
async function md5hex(bytes) {
  const hashWasm = await Promise.resolve().then(() => (init_index_esm(), index_esm_exports));
  return hashWasm.md5(bytes);
}
async function signatureFile(key, objectId2, version, inventory, signer, keyLog) {
  const signature = await key.sign(message(objectId2, version, inventory, keyLog));
  return jsonBytes({
    format: SIGNATURE_FORMAT,
    object: objectId2,
    version,
    inventorySha512: inventory,
    signer,
    key: key.did,
    keyLog,
    signature: base64(signature)
  });
}

// core/folder.js
var Stop = class extends Error {
};
var LOWER_NAMES = [
  "gh",
  "osheaf",
  "command"
];
function sentence(text3) {
  const m = /^([a-z][a-z']{0,14})(?=[ ,;])/.exec(text3);
  if (m && !LOWER_NAMES.includes(m[1])) text3 = text3[0].toUpperCase() + text3.slice(1);
  return /[.?!:…]$/.test(text3) ? text3 : text3 + ".";
}
function stop(text3) {
  throw new Stop(sentence(text3));
}
function exit(text3) {
  throw new Stop(text3);
}
function short(name2) {
  if (name2.startsWith("did:key:")) name2 = name2.slice("did:key:".length);
  return [
    ...name2
  ].length <= 14 ? name2 : `${name2.slice(0, 8)}\u2026${name2.slice(-4)}`;
}
function plural(n, noun) {
  return n === 1 ? `${n} ${noun}` : `${n} ${noun}s`;
}
function environment(given = {}) {
  return {
    out: (line) => console.log(line),
    err: (line) => console.error(line),
    warn(text3) {
      this.err("Warning: " + sentence(text3));
    },
    newKey,
    now: utcNow,
    today,
    fetch: globalThis.fetch?.bind(globalThis),
    fetchJson: null,
    template: null,
    ...given
  };
}
var CONFIG_NAME = "osheaf.json";
var CONFIG_NAMES = [
  "osheaf.json",
  "osheaf.yaml",
  "osheaf.yml"
];
var SPEC = "0.2";
var OBJ2 = "object.json";
var OBJ_FORMAT = "opensheaf-object/0.2";
var GENESIS2 = "genesis.json";
var LAYOUTS = {
  "owner-name": OWNER_NAME_LAYOUT,
  hashed: HASHED_LAYOUT
};
var LAYOUT_TEXT = "Lines at <owner>/<name>/, drafts at draft/<id>/: the owner-name layout of the OpenSheaf specification 0.2, section 3.2\n";
var REQUIRED = [
  "owner",
  "name",
  "baseUrl",
  "mainCollection",
  "curator",
  "depositor"
];
var REBUILD = "this archive is of specification 0.1, which these tools no longer read: rebuild it under specification 0.2 (section 16.1)";
async function readConfig(storage) {
  const cfg = await readJson(storage, CONFIG_NAME);
  if (cfg !== null) return cfg;
  for (const n of CONFIG_NAMES.slice(1)) {
    if (await storage.kind(n)) exit(`${n}: opensheaf-js reads osheaf.json only (opensheaf-py also reads YAML)`);
  }
  exit(`no ${CONFIG_NAME} or osheaf.yaml in the archive folder`);
}
var ArchiveFolder = class _ArchiveFolder {
  static async open(storage, env = environment()) {
    const folder = new _ArchiveFolder(storage, env);
    await folder.configure();
    return folder;
  }
  constructor(storage, env = environment()) {
    this.storage = storage;
    this.env = env;
    this.archive = {};
    this.index = {};
    this.labels = /* @__PURE__ */ new Map();
    this.tombstones = [];
    this.layout = OWNER_NAME_LAYOUT;
    this.old = false;
    this.cached = null;
  }
  async configure() {
    const cfg = await readConfig(this.storage);
    const disc = await readJson(this.storage, "opensheaf.json") || {};
    this.old = "archiveId" in cfg || disc.specification === "0.1";
    this.layout = cfg.storageLayout || OWNER_NAME_LAYOUT;
    this.archive = Object.fromEntries(Object.entries(cfg).filter(([k]) => k !== "texmacs" && k !== "index"));
    if (this.old) return this;
    const missing = REQUIRED.filter((k) => !(k in cfg));
    if (missing.length) exit(`${CONFIG_NAME} lacks ${missing.join(", ")}`);
    if (!Object.values(LAYOUTS).includes(this.layout)) {
      exit(`${CONFIG_NAME}: storageLayout is one of ${Object.values(LAYOUTS).join(", ")}`);
    }
    this.archive.profiles ??= [];
    this.archive.contact ??= this.archive.baseUrl;
    this.index = cfg.index || {};
    this.labels = new Map((disc.objects || []).filter((o) => o.label).map((o) => [
      o.label,
      o.id
    ]));
    this.tombstones = [
      ...disc.tombstones || []
    ];
    return this;
  }
  archiveOwners() {
    const out = [
      this.archive.owner
    ];
    return out.concat((this.archive.owners || []).filter((o) => !out.includes(o)));
  }
  labelOf(id) {
    for (const [label, i] of this.labels) if (i === id) return label;
    return null;
  }
  depositor() {
    return {
      name: this.archive.depositor.name,
      address: this.archive.depositor.address
    };
  }
  async dirOf(id) {
    return joinPath("ocfl", ...await pathOf(id, this.layout));
  }
  async initStorageRoot() {
    const s = this.storage;
    await writeText(s, "ocfl/0=ocfl_1.1", "ocfl_1.1\n");
    if (this.layout === HASHED_LAYOUT) {
      await s.write("ocfl/ocfl_layout.json", jsonBytes({
        extension: HASHED_LAYOUT,
        description: "Hashed n-tuple storage layout with its default parameters (OpenSheaf 0.2, section 3.2)"
      }));
    } else if (!await s.kind(`ocfl/${LAYOUT_FILE}`)) {
      await writeText(s, `ocfl/${LAYOUT_FILE}`, LAYOUT_TEXT);
    }
  }
  async inventory(dir) {
    try {
      return await readJson(this.storage, joinPath(dir, "inventory.json"));
    } catch {
      return null;
    }
  }
  contentPath(inv, version, logical) {
    for (const [d, paths] of Object.entries(inv.versions[version].state)) {
      if (paths.includes(logical)) return inv.manifest[d][0];
    }
    return null;
  }
  async readLogical(dir, inv, logical, version = null) {
    const cp = this.contentPath(inv, version || inv.head, logical);
    return cp ? this.storage.read(joinPath(dir, cp)) : null;
  }
  async readObjectJson(dir, inv, logical, version = null) {
    const bytes = await this.readLogical(dir, inv, logical, version);
    return bytes ? JSON.parse(new TextDecoder().decode(bytes)) : null;
  }
  async objects() {
    const out = [];
    const walk = async (dir) => {
      for (const entry of await this.storage.list(dir) || []) {
        if (entry.kind !== "dir") continue;
        const child = joinPath(dir, entry.name);
        if (await this.storage.kind(joinPath(child, "0=ocfl_object_1.1")) === "file") {
          const inv = await this.inventory(child);
          out.push({
            id: inv?.id ?? null,
            dir: child,
            inv
          });
        } else if (!(dir === "ocfl" && entry.name === "extensions")) {
          await walk(child);
        }
      }
    };
    if (await this.storage.kind("ocfl") === "dir") await walk("ocfl");
    const idOf = (o) => typeof o.id === "string" ? o.id : "None";
    return out.sort((a, b) => compareText(idOf(a), idOf(b)) || compareText(a.dir, b.dir));
  }
  reader() {
    if (!this.cached) {
      const base = /^https?:\/\/[^/]+\/(.*\/)?$/.test(this.archive.baseUrl || "") ? this.archive.baseUrl : ORIGIN;
      const http = new Http({
        fetch: storageFetch(this.storage, base),
        budget: null
      });
      this.cached = new Archive(http, base, {
        specification: SPEC,
        storageRoot: "ocfl/",
        storageLayout: this.layout
      });
      this.cached.lister = storageLister(this.storage, base);
    }
    return this.cached;
  }
  changed() {
    this.cached = null;
  }
  async keyLog(owner) {
    return this.reader().keyLog(owner);
  }
  async line(id) {
    await this.reader().locate(id);
    return this.reader().line(id);
  }
  async latestSigned(id) {
    return (await this.line(id)).latest;
  }
  async signingKeys(owner) {
    const who = short(owner);
    const log = await this.keyLog(owner);
    if (!log) stop(`the key log of ${who} is not in the storage root (section 6.5)`);
    const { errors } = await log.check();
    if (errors.length) stop(`the key log of ${who} has errors: ` + errors.join("; "));
    const latest = log.latest();
    if (!latest) stop(`the owner ${who} has ended (section 6.3): nothing is signed for it`);
    let found2 = await this.env.keyStore.current(owner, latest.keys.keys);
    const need = latest.keys.threshold;
    if (found2.length < need && !this.env.signingKeyGiven && this.env.pullFromWallet) {
      found2 = await this.env.pullFromWallet(this, owner, latest, found2);
    }
    if (found2.length < need) {
      const hint = this.env.keyStore.keptOnDevice() ? "osheaf key new makes one for this computer" : "configure a key wallet, from which each command opens them";
      stop(`this computer holds ${found2.length} of the current keys of ${who}, and v${latest.number} of its key log needs ${need} to sign (${hint})`);
    }
    return {
      log,
      latest,
      signers: found2
    };
  }
  async checkBeforeExtending(id, acknowledged = false) {
    const { statuses } = await this.line(id);
    const doubtful = statuses.map((s, k) => [
      `v${k + 1}`,
      s
    ]).filter(([, s]) => s !== SIGNED && s !== VOUCHED);
    if (!doubtful.length) return;
    const lines2 = doubtful.map(([v, s]) => `  ${v}: ${s}`).join("\n");
    if (!acknowledged) {
      exit(`${id}: the new version would extend versions that are not signed, or are contested (section 7.3):
${lines2}
look at them; give --i-know to extend them anyway`);
    }
    this.env.err(`warning: ${id}: extending versions that are not signed, or are contested:
${lines2}`);
  }
  async zenodoPending(id) {
    try {
      const state = await readJson(this.storage, joinPath("zenodo-staging", ...await pathOf(id, this.layout), "state.json"));
      return state?.phase === "published";
    } catch {
      return false;
    }
  }
  async addVersion(id, files, obj, message2, { acknowledged = false, stageIn = null } = {}) {
    const s = this.storage;
    const dir = await this.dirOf(id);
    let inv = await this.inventory(dir);
    if (stageIn === null && await this.zenodoPending(id)) {
      const name2 = this.labelOf(id) || id;
      exit(`${name2}: a Zenodo deposit was published and its version is not added yet: osheaf zenodo ${name2} completes it first (appendix A.1)`);
    }
    const draft = id.startsWith("sheaf:draft:");
    const { log, latest, signers: signers2 } = draft ? {
      log: null,
      latest: null,
      signers: []
    } : await this.signingKeys(obj.owner);
    obj = Object.fromEntries(Object.entries(obj).filter(([k]) => k !== "previous"));
    if (inv === null) {
      if (await s.kind(dir)) exit(`${dir} exists, and is not an object`);
      inv = {
        id,
        type: INVENTORY_TYPE,
        digestAlgorithm: "sha512",
        head: "v0",
        manifest: {},
        versions: {},
        fixity: {
          md5: {},
          sha256: {}
        }
      };
    } else if (!draft) {
      await this.checkBeforeExtending(id, acknowledged);
      obj.previous = sidecarDigest(await s.read(joinPath(dir, inv.head, "inventory.json.sha512")));
    }
    const ver = `v${Number(inv.head.slice(1)) + 1}`;
    if (stageIn !== null && await s.kind(stageIn)) exit(`${stageIn} exists`);
    const stage = stageIn ?? `.staging-${hex(randomBytes(6))}`;
    try {
      const content = new Map(files);
      content.set(OBJ2, jsonBytes(obj));
      const state = {};
      for (const logical of [
        ...content.keys()
      ].sort(compareText)) {
        const data3 = content.get(logical);
        const d = await sha512hex(data3);
        (state[d] ||= []).push(logical);
        if (!Object.hasOwn(inv.manifest, d)) {
          const cp = `${ver}/content/${logical}`;
          await s.write(joinPath(stage, cp), data3);
          inv.manifest[d] = [
            cp
          ];
          inv.fixity ??= {};
          inv.fixity.md5 ??= {};
          (inv.fixity.md5[await md5hex(data3)] ||= []).push(cp);
          inv.fixity.sha256 ??= {};
          (inv.fixity.sha256[await sha256hex(data3)] ||= []).push(cp);
        }
      }
      inv.head = ver;
      inv.versions[ver] = {
        created: this.env.now(),
        message: message2,
        user: this.depositor(),
        state
      };
      inv = orderedInventory(inv);
      const data2 = inventoryFile(inv);
      await s.write(joinPath(stage, ver, "inventory.json"), data2);
      await s.write(joinPath(stage, ver, "inventory.json.sha512"), await sidecar(data2));
      const pin = log ? log.pin(latest.number) : null, digest = await sha512hex(data2);
      for (const key of signers2) {
        await s.write(joinPath(stage, "witnesses", await fileName(key.did)), await signatureFile(key, id, ver, digest, obj.owner, pin));
      }
      if (stageIn === null) await this.moveStaged(dir, stage, ver, draft);
    } finally {
      if (stageIn === null) await removeTree(s, stage);
      this.changed();
    }
    return inv;
  }
  async moveStaged(dir, stage, ver, draft = false) {
    const s = this.storage;
    const data2 = await s.read(joinPath(stage, ver, "inventory.json"));
    const sc = await s.read(joinPath(stage, ver, "inventory.json.sha512"));
    if (ver === "v1") {
      const obj = joinPath(stage, "object");
      await writeText(s, joinPath(obj, "0=ocfl_object_1.1"), "ocfl_object_1.1\n");
      await s.rename(joinPath(stage, ver), joinPath(obj, ver));
      if (!draft) await s.rename(joinPath(stage, "witnesses"), joinPath(obj, WITNESSES, ver));
      await s.write(joinPath(obj, "inventory.json"), data2);
      await s.write(joinPath(obj, "inventory.json.sha512"), sc);
      await s.rename(obj, dir);
    } else {
      await s.rename(joinPath(stage, ver), joinPath(dir, ver));
      if (!draft) await s.rename(joinPath(stage, "witnesses"), joinPath(dir, WITNESSES, ver));
      for (const [name2, bytes] of [
        [
          "inventory.json",
          data2
        ],
        [
          "inventory.json.sha512",
          sc
        ]
      ]) {
        await s.write(joinPath(stage, name2), bytes);
        await s.rename(joinPath(stage, name2), joinPath(dir, name2));
      }
    }
  }
  async installVersion(id, stage) {
    const s = this.storage;
    const ver = (await s.list(stage) || []).find((e) => e.kind === "dir" && /^v[1-9][0-9]*$/.test(e.name))?.name;
    if (!ver) exit(`${stage} holds no version`);
    const inv = JSON.parse(new TextDecoder().decode(await s.read(joinPath(stage, ver, "inventory.json"))));
    const dir = await this.dirOf(id);
    const before = await this.inventory(dir);
    if ((before ? before.head : "v0") !== `v${Number(ver.slice(1)) - 1}`) {
      exit(`${id}: the line has moved since ${ver} was built in ${stage}: it cannot be added`);
    }
    await this.moveStaged(dir, stage, ver, id.startsWith("sheaf:draft:"));
    await removeStage(s, stage);
    this.changed();
    return inv;
  }
  async seal(kind, owner) {
    const taken = /* @__PURE__ */ new Set();
    for (const { id } of await this.objects()) {
      const name2 = (id || "").split(":")[1];
      if (name2 !== void 0) taken.add(name2);
    }
    for (const t of this.tombstones) {
      taken.add(t.genesisName);
      taken.add(t.name);
    }
    for (; ; ) {
      const genesis = await genesisRecord(kind, {
        originator: owner
      });
      const name2 = await nameOf(genesis);
      if (!taken.has(name2)) return {
        genesis,
        id: objectId(name2, owner)
      };
    }
  }
};
async function removeTree(storage, path) {
  if (!/^\.staging-[0-9a-f]+$/.test(path.split("/")[0])) throw new Error(`not a staging folder: ${path}`);
  const kind = await storage.kind(path);
  if (kind === "dir") {
    for (const entry of await storage.list(path) || []) await removeTree(storage, joinPath(path, entry.name));
    await storage.remove(path);
  } else if (kind) {
    await storage.remove(path);
  }
}
async function removeStage(storage, path) {
  if (!/^zenodo-staging\/./.test(path)) throw new Error(`not a staging folder of Zenodo: ${path}`);
  const walk = async (p) => {
    const kind = await storage.kind(p);
    if (kind === "dir") for (const entry of await storage.list(p) || []) await walk(joinPath(p, entry.name));
    if (kind) await storage.remove(p);
  };
  await walk(path);
  for (let p = path.slice(0, path.lastIndexOf("/")); p; p = p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : "") {
    if (await storage.kind(p) !== "dir" || (await storage.list(p) || []).length) break;
    await storage.remove(p);
  }
}

// core/keepers.js
var KEEPER_FORMAT = "opensheaf-keeper/0.2";
var CONFIRMED = "confirmed";
var CLAIMED = "claimed only";
var ABSENT = "absent";
var NOT_CHECKED = "not checked";
var ORCID_API = "https://pub.orcid.org/v3.0/{}/researcher-urls";
var KEEPER_TIMEOUT = 15e3;
var OWNER_WORD = /(?<![a-z0-9])[a-z2-7]{51}[aq](?![a-z0-9])/g;
var KeeperUnreachable = class extends Error {
};
function fetchJsonWith(fetch2 = globalThis.fetch?.bind(globalThis)) {
  return async (url) => {
    let response;
    try {
      response = await fetch2(url, {
        headers: {
          Accept: "application/json"
        },
        signal: AbortSignal.timeout(KEEPER_TIMEOUT)
      });
    } catch (error) {
      throw new KeeperUnreachable(`${url}: ${error.cause?.message || error.message}`);
    }
    if (response.status === 404 || response.status === 410) return null;
    if (!response.ok) throw new KeeperUnreachable(`${url}: HTTP ${response.status}`);
    const data2 = new Uint8Array(await response.arrayBuffer());
    if (data2.length > 1 << 20) throw new KeeperUnreachable(`${url}: more than 1 MB`);
    try {
      return JSON.parse(new TextDecoder().decode(data2));
    } catch {
      throw new KeeperUnreachable(`${url}: not JSON`);
    }
  };
}
async function keeperOf(log) {
  try {
    return log ? ((await readGenesis(log.genesis)).keeper || [
      null
    ])[0] : null;
  } catch {
    return null;
  }
}
async function keeperLink(log, fetchJson = null) {
  fetchJson ||= fetchJsonWith();
  const keeper = await keeperOf(log), owner = log.owner;
  if (keeper === null) return {
    keeper: null,
    status: ABSENT,
    reason: "the owner names no keeper",
    successor: null
  };
  const link = (status, reason, successor = null) => ({
    keeper,
    status,
    reason,
    successor
  });
  const orcid = keeper.startsWith("https://orcid.org/");
  const url = orcid ? ORCID_API.replace("{}", keeper.slice(keeper.lastIndexOf("/") + 1)) : keeper + ".well-known/opensheaf";
  let data2;
  try {
    data2 = await fetchJson(url);
  } catch (error) {
    if (!(error instanceof KeeperUnreachable)) throw error;
    return link(NOT_CHECKED, `offline: ${error.message}`);
  }
  const isMap2 = (x) => x !== null && typeof x === "object" && !Array.isArray(x);
  if (orcid) {
    const links = isMap2(data2) ? data2["researcher-url"] : null;
    for (const item of Array.isArray(links) ? links : []) {
      const value = isMap2(item) ? (item.url || {}).value : null;
      const found2 = typeof value === "string" ? value.match(OWNER_WORD) || [] : [];
      if (found2.length && found2[0] === owner) {
        const others = found2.slice(1).filter((w) => w !== owner);
        return link(CONFIRMED, "ORCID record links the owner", others[0] ?? null);
      }
    }
    return link(CLAIMED, "the ORCID record has no link naming the owner");
  }
  if (data2 === null) return link(CLAIMED, `there is no ${url}`);
  if (!isMap2(data2) || data2.format !== KEEPER_FORMAT) return link(CLAIMED, `${url} is not of format ${KEEPER_FORMAT}`);
  if (!(Array.isArray(data2.owners) && data2.owners.includes(owner))) return link(CLAIMED, `${url} does not list the owner`);
  let succ = isMap2(data2.successors) ? data2.successors[owner] : null;
  succ = typeof succ === "string" && OWNER_NAME.test(succ) && succ !== owner ? succ : null;
  return link(CONFIRMED, `${url} lists the owner`, succ);
}
function successorClaim(log, link) {
  if (!link || link.successor === null || link.successor === void 0 || link.successor === log.successor) return null;
  if (log.successor) return `claimed by the keeper (the ending version names ${log.successor}; section 6.6)`;
  return "named by the keeper (section 6.6)";
}

// core/wallets.js
var WalletError = class extends Error {
};
var ENTRY_SUFFIX = ".key.enc";
function entryPath(owner, kid) {
  if (!OWNER_NAME.test(owner || "") || !/^[a-z2-7]{16}$/.test(kid || "")) {
    throw new WalletError(`not an owner name and a key: ${owner} ${kid}`);
  }
  return `${owner}/${kid}${ENTRY_SUFFIX}`;
}
var GitHubWallet = class {
  constructor(repo, github, forbidden = []) {
    this.repo = repo;
    this.name = `github:${repo}`;
    this.github = github;
    this.forbidden = new Set([
      ...forbidden
    ].map((f) => f.toLowerCase()));
    this.token = void 0;
    this.checked = false;
  }
  async api(method, path, body = null) {
    if (this.token === void 0) this.token = await this.github.token();
    if (!this.token) throw new WalletError("gh is not signed in to GitHub, and GITHUB_TOKEN is not set: run gh auth login");
    let r;
    try {
      r = await this.github.fetch(`${this.github.api.replace(/\/$/, "")}/${path}`, {
        method,
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${this.token}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "opensheaf-js",
          ...body ? {
            "Content-Type": "application/json"
          } : {}
        },
        body: body ? JSON.stringify(body) : void 0
      });
    } catch (error) {
      throw new WalletError(`GitHub API ${path}: ${error.message}`);
    }
    const text3 = await r.text();
    if (r.status === 404) return null;
    if (!r.ok) {
      let message2 = text3;
      try {
        message2 = JSON.parse(text3).message || text3;
      } catch {
      }
      throw new WalletError(`GitHub API ${path}: ${message2.trim()} (HTTP ${r.status})`);
    }
    try {
      return text3.trim() ? JSON.parse(text3) : {};
    } catch {
      throw new WalletError(`GitHub API ${path}: not JSON`);
    }
  }
  contents(path = "") {
    return `repos/${this.repo}/contents/${path}`.replace(/\/$/, "");
  }
  checkName() {
    if (this.forbidden.has(this.repo.toLowerCase())) {
      throw new WalletError(`${this.repo} is a repository of the archive, which is public: a wallet is a repository of its own`);
    }
  }
  async checkWritable() {
    this.checkName();
    if (this.checked) return;
    const info = await this.api("GET", `repos/${this.repo}`);
    if (info === null) {
      throw new WalletError(`no repository ${this.repo} that gh can reach: create it, private, with gh repo create ${this.repo} --private`);
    }
    if (info.private !== true || info.visibility !== "private") {
      throw new WalletError(`${this.repo} is not a private repository: a wallet must be private`);
    }
    if (this.forbidden.has(String(info.full_name ?? this.repo).toLowerCase())) {
      throw new WalletError(`${this.repo} is a repository of the archive, which is public: a wallet is a repository of its own`);
    }
    this.checked = true;
  }
  async read(owner, kid) {
    this.checkName();
    const got = await this.api("GET", this.contents(entryPath(owner, kid)));
    if (!got || typeof got !== "object" || Array.isArray(got) || !("content" in got)) return null;
    try {
      return new TextDecoder("utf-8", {
        fatal: true
      }).decode(unbase64(String(got.content).replace(/\s+/g, "")));
    } catch {
      throw new WalletError(`${this.name}: ${entryPath(owner, kid)} is not a key file`);
    }
  }
  async write(owner, kid, kind, text3) {
    await this.checkWritable();
    const path = entryPath(owner, kid);
    const old = await this.api("GET", this.contents(path));
    const body = {
      message: `opensheaf: ${kind} key ${kid} of ${owner}`,
      content: base64(utf8(text3))
    };
    if (old?.sha) body.sha = old.sha;
    if (await this.api("PUT", this.contents(path), body) === null) throw new WalletError(`${this.repo} refused ${path}`);
  }
  async entries(owner = null) {
    this.checkName();
    const listing = async (p) => {
      const got = await this.api("GET", this.contents(p));
      return Array.isArray(got) ? got : [];
    };
    const folders = owner ? [
      owner
    ] : (await listing("")).filter((x) => x.type === "dir" && OWNER_NAME.test(x.name)).map((x) => x.name);
    const out = [];
    for (const o of folders) {
      for (const x of await listing(o)) {
        if (x.type === "file" && x.name.endsWith(ENTRY_SUFFIX)) out.push([
          o,
          x.name.slice(0, -ENTRY_SUFFIX.length)
        ]);
      }
    }
    return out;
  }
  async forget(owner, kid, kind) {
    await this.checkWritable();
    const path = entryPath(owner, kid);
    const old = await this.api("GET", this.contents(path));
    if (old?.sha) await this.api("DELETE", this.contents(path), {
      message: `opensheaf: forget ${kind} key ${kid} of ${owner}`,
      sha: old.sha
    });
  }
};
function describeEntry(text3) {
  const fields = {};
  for (const line of text3.split(/\r\n|\r|\n/)) {
    const t = line.trim();
    const k = t.indexOf(" ");
    const name2 = k < 0 ? t : t.slice(0, k);
    if ([
      "encryption",
      "wrap",
      "seed"
    ].includes(name2)) break;
    if (!(name2 in fields)) fields[name2] = k < 0 ? "" : t.slice(k + 1).trim();
  }
  return fields;
}

// core/github.js
var GITHUB_API = "https://api.github.com";
var GitHubError = class extends Error {
  constructor(message2, status = 0) {
    super(message2);
    this.status = status;
  }
};
var CommitConflict = class extends GitHubError {
};
var GitHub = class {
  constructor({ api = GITHUB_API, fetch: fetch2 = globalThis.fetch?.bind(globalThis), token = null } = {}) {
    this.api = api.replace(/\/$/, "");
    this.fetch = fetch2;
    this.token = token;
  }
  async request(method, path, body = null, { raw = false, fresh = false } = {}) {
    const token = typeof this.token === "function" ? await this.token() : this.token;
    const headers = {
      Accept: raw ? "application/vnd.github.raw+json" : "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    if (body !== null) headers["Content-Type"] = "application/json";
    let r;
    try {
      r = await this.fetch(`${this.api}/${path}`, {
        method,
        headers,
        body: body === null ? void 0 : JSON.stringify(body),
        ...fresh ? {
          cache: "no-store"
        } : {}
      });
    } catch (error) {
      throw new GitHubError(`GitHub API ${path}: ${error.message}`);
    }
    if (r.ok && raw) return new Uint8Array(await r.arrayBuffer());
    const text3 = await r.text();
    let data2 = null;
    try {
      data2 = text3 ? JSON.parse(text3) : null;
    } catch {
      data2 = null;
    }
    if (!r.ok) throw new GitHubError(`GitHub API ${path}: ${data2?.message || text3.slice(0, 200) || r.status}`, r.status);
    return data2;
  }
};
var REPOSITORY = /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\/[A-Za-z0-9._-]+$/;
function checkRepository(repo) {
  if (!REPOSITORY.test(repo || "") || /\/\.\.?$/.test(repo)) throw new GitHubError(`not a repository: ${repo}`);
  return repo;
}
function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}
async function gitBlobSha(bytes) {
  const header = utf8(`blob ${bytes.length}\0`);
  const all = new Uint8Array(header.length + bytes.length);
  all.set(header);
  all.set(bytes, header.length);
  return hex(new Uint8Array(await crypto.subtle.digest("SHA-1", all)));
}
async function inTurn(items, work, concurrency = 6) {
  const queue = [
    ...items
  ];
  const workers = Array.from({
    length: Math.min(concurrency, queue.length)
  }, async () => {
    while (queue.length) await work(queue.shift());
  });
  await Promise.all(workers);
}
var FILE = "100644";
var LINK = "120000";
var GitHubStorage = class _GitHubStorage {
  static async open(repo, github, { branch = null, cache = /* @__PURE__ */ new Map(), mirror = null } = {}) {
    const s = new _GitHubStorage(checkRepository(repo), github, {
      cache,
      mirror
    });
    s.branch = branch || (await github.request("GET", `repos/${repo}`)).default_branch;
    await s.readHead();
    return s;
  }
  constructor(repo, github, { cache = /* @__PURE__ */ new Map(), mirror = null } = {}) {
    Object.assign(this, {
      repo,
      github,
      cache,
      mirror: mirror && (mirror.endsWith("/") ? mirror : mirror + "/")
    });
    this.base = /* @__PURE__ */ new Map();
    this.files = /* @__PURE__ */ new Map();
    this.dirs = /* @__PURE__ */ new Map([
      [
        "",
        /* @__PURE__ */ new Map()
      ]
    ]);
    this.reads = {
      cache: 0,
      mirror: 0,
      api: 0
    };
  }
  async readHead() {
    const r = `repos/${this.repo}/git`;
    const ref = await this.github.request("GET", `${r}/ref/heads/${encodePath(this.branch)}`, null, {
      fresh: true
    });
    if (ref?.object?.type !== "commit") throw new GitHubError(`${this.repo}: the branch ${this.branch} is not a commit`);
    this.head = ref.object.sha;
    this.tree = (await this.github.request("GET", `${r}/commits/${this.head}`)).tree.sha;
    const entries = [];
    const walk = async (sha, prefix) => {
      const t = await this.github.request("GET", `${r}/trees/${sha}${prefix === null ? "?recursive=1" : ""}`);
      if (prefix === null && !t.truncated) {
        entries.push(...t.tree);
        return;
      }
      for (const e of t.tree) {
        const path = prefix ? `${prefix}/${e.path}` : e.path;
        if (e.type === "tree") await walk(e.sha, path);
        else entries.push({
          ...e,
          path
        });
      }
    };
    await walk(this.tree, null);
    this.base = /* @__PURE__ */ new Map();
    for (const e of entries) {
      if (e.type === "blob") this.base.set(e.path, {
        sha: e.sha,
        mode: e.mode,
        size: e.size ?? null
      });
    }
    this.files = /* @__PURE__ */ new Map();
    this.dirs = /* @__PURE__ */ new Map([
      [
        "",
        /* @__PURE__ */ new Map()
      ]
    ]);
    for (const [path, e] of this.base) this.put(path, {
      ...e
    });
  }
  put(path, entry) {
    this.files.set(path, entry);
    let p = path, kind = entry.mode === LINK ? "link" : "file";
    for (; ; ) {
      const parent = parentOf(p), name2 = p.slice(parent ? parent.length + 1 : 0);
      const fresh = !this.dirs.has(parent);
      if (fresh) this.dirs.set(parent, /* @__PURE__ */ new Map());
      this.dirs.get(parent).set(name2, kind);
      if (!fresh || parent === "") return;
      p = parent;
      kind = "dir";
    }
  }
  drop(path) {
    this.files.delete(path);
    let p = path;
    while (p) {
      const parent = parentOf(p), entries = this.dirs.get(parent);
      entries.delete(p.slice(parent ? parent.length + 1 : 0));
      if (entries.size || parent === "") return;
      this.dirs.delete(parent);
      p = parent;
    }
  }
  async read(path) {
    checkPath(path);
    const e = this.files.get(path);
    if (!e || e.mode === LINK) return null;
    if (e.bytes) return e.bytes.slice();
    return (await this.blob(e.sha, path)).slice();
  }
  async write(path, bytes, { exclusive = false } = {}) {
    checkPath(path);
    const old = this.files.get(path);
    if (exclusive && old) throw new StorageError(`${path} exists already`);
    if (this.dirs.has(path)) throw new StorageError(`${path} is a folder`);
    for (let p = parentOf(path); p; p = parentOf(p)) {
      if (this.files.has(p)) throw new StorageError(`${p} is a file`);
    }
    this.put(path, {
      bytes: Uint8Array.from(bytes),
      mode: old && old.mode !== LINK ? old.mode : FILE,
      sha: null
    });
  }
  async kind(path) {
    checkPath(path, {
      folder: true
    });
    if (this.dirs.has(path)) return "dir";
    const e = this.files.get(path);
    return e ? e.mode === LINK ? "link" : "file" : null;
  }
  async list(path) {
    checkPath(path, {
      folder: true
    });
    const entries = this.dirs.get(path);
    if (!entries) return null;
    return [
      ...entries
    ].map(([name2, kind]) => ({
      name: name2,
      kind
    })).sort((a, b) => compareText(a.name, b.name));
  }
  async rename(from, to) {
    checkPath(from);
    checkPath(to);
    const what = await this.kind(from);
    if (!what) throw new StorageError(`no ${from} to move`);
    if (this.dirs.has(to)) throw new StorageError(`${to} exists already`);
    if (what !== "dir") {
      const e = this.files.get(from);
      this.drop(from);
      if (this.files.has(to)) this.drop(to);
      this.put(to, e);
      return;
    }
    for (const k of [
      ...this.files.keys()
    ]) {
      if (k.startsWith(from + "/")) {
        const e = this.files.get(k);
        this.drop(k);
        this.put(to + k.slice(from.length), e);
      }
    }
  }
  async remove(path) {
    checkPath(path);
    if (this.dirs.has(path)) throw new StorageError(`${path} is a folder that is not empty`);
    if (this.files.has(path)) this.drop(path);
  }
  async size(path) {
    const e = this.files.get(checkPath(path));
    if (!e || e.mode === LINK) return null;
    return e.bytes ? e.bytes.length : e.size;
  }
  async blob(sha, path = null) {
    const known = this.cache.get(sha);
    if (known) {
      this.reads.cache++;
      return known;
    }
    let bytes = null;
    if (this.mirror && path) {
      try {
        const r = await this.github.fetch(this.mirror + encodePath(path));
        if (r.ok) {
          const got = new Uint8Array(await r.arrayBuffer());
          if (await gitBlobSha(got) === sha) bytes = got;
        }
      } catch {
        bytes = null;
      }
      if (bytes) this.reads.mirror++;
    }
    if (!bytes) {
      bytes = await this.github.request("GET", `repos/${this.repo}/git/blobs/${sha}`, null, {
        raw: true
      });
      if (await gitBlobSha(bytes) !== sha) throw new GitHubError(`${this.repo}: the blob ${sha} read is not ${sha}`);
      this.reads.api++;
    }
    this.cache.set(sha, bytes);
    return bytes;
  }
  async prefetch({ maxSize = 1 << 20, skip = () => false, concurrency = 6 } = {}) {
    const todo = /* @__PURE__ */ new Map();
    for (const [path, e] of this.base) {
      if (e.mode === LINK || this.cache.has(e.sha) || todo.has(e.sha)) continue;
      if (e.size !== null && e.size > maxSize) continue;
      if (!skip(path, e.size)) todo.set(e.sha, path);
    }
    await inTurn([
      ...todo
    ], async ([sha, path]) => {
      try {
        await this.blob(sha, path);
      } catch {
      }
    }, concurrency);
    return todo.size;
  }
  async changes() {
    const changed = [], removed2 = [];
    for (const [path, e] of this.files) {
      if (e.bytes && e.sha === null) e.sha = await gitBlobSha(e.bytes);
      const b = this.base.get(path);
      if (!b || b.sha !== e.sha || b.mode !== e.mode) changed.push({
        path,
        ...e
      });
    }
    for (const [path, b] of this.base) if (!this.files.has(path)) removed2.push({
      path,
      ...b
    });
    const order = (a, b) => compareText(a.path, b.path);
    return {
      changed: changed.sort(order),
      removed: removed2.sort(order)
    };
  }
  async commit(message2, { author = null } = {}) {
    const { changed, removed: removed2 } = await this.changes();
    if (!changed.length && !removed2.length) return null;
    const r = `repos/${this.repo}/git`;
    const held2 = new Set([
      ...this.base.values()
    ].map((e) => e.sha));
    const upload = /* @__PURE__ */ new Map();
    for (const e of changed) if (e.bytes && !held2.has(e.sha)) upload.set(e.sha, e.bytes);
    await inTurn([
      ...upload
    ], async ([sha, bytes]) => {
      const made2 = await this.github.request("POST", `${r}/blobs`, {
        content: base64(bytes),
        encoding: "base64"
      });
      if (made2.sha !== sha) throw new GitHubError(`${this.repo}: GitHub named a blob ${made2.sha}, not ${sha}`);
    }, 4);
    const tree = await this.github.request("POST", `${r}/trees`, {
      base_tree: this.tree,
      tree: [
        ...changed.map((e) => ({
          path: e.path,
          mode: e.mode,
          type: "blob",
          sha: e.sha
        })),
        ...removed2.map((e) => ({
          path: e.path,
          mode: e.mode,
          type: "blob",
          sha: null
        }))
      ]
    });
    const made = await this.github.request("POST", `${r}/commits`, {
      message: message2,
      tree: tree.sha,
      parents: [
        this.head
      ],
      ...author ? {
        author
      } : {}
    });
    try {
      await this.github.request("PATCH", `${r}/refs/heads/${encodePath(this.branch)}`, {
        sha: made.sha,
        force: false
      });
    } catch (error) {
      if (error.status === 422 || error.status === 409) {
        throw new CommitConflict(`${this.repo}: the branch ${this.branch} has moved since ${this.head.slice(0, 7)} was read`, error.status);
      }
      throw error;
    }
    for (const e of changed) if (e.bytes) this.cache.set(e.sha, e.bytes);
    this.head = made.sha;
    this.tree = tree.sha;
    this.base = new Map([
      ...this.files
    ].map(([path, e]) => [
      path,
      {
        sha: e.sha,
        mode: e.mode,
        size: e.bytes?.length ?? e.size
      }
    ]));
    for (const e of this.files.values()) {
      if (e.bytes) {
        e.size = e.bytes.length;
        delete e.bytes;
      }
    }
    return {
      sha: made.sha,
      url: made.html_url ?? null,
      changed: changed.length,
      removed: removed2.length
    };
  }
};
async function oneCommit(repo, github, run, { branch = null, cache = /* @__PURE__ */ new Map(), mirror = null, attempts = 3, prepare = null } = {}) {
  for (let k = 1; ; k++) {
    const storage = await GitHubStorage.open(repo, github, {
      branch,
      cache,
      mirror
    });
    if (prepare) await prepare(storage);
    const { message: message2, ...rest } = await run(storage);
    if (message2 === null || message2 === void 0) return {
      ...rest,
      commit: null,
      storage
    };
    try {
      return {
        ...rest,
        commit: await storage.commit(message2),
        storage,
        attempts: k
      };
    } catch (error) {
      if (!(error instanceof CommitConflict) || k >= attempts) throw error;
    }
  }
}

// core/discovery.js
async function lineStatus(f, id, dir, inv, head) {
  if (head?.kind === "owner") return "active";
  const signed = await f.latestSigned(id);
  const obj = signed ? await f.readObjectJson(dir, inv, OBJ2, signed) : head;
  return obj?.status ?? "active";
}
var INDEXES = {
  names: 2,
  owners: 2,
  sha512: 2
};
var INDEX_FORMAT = "opensheaf-index/0.2";
var INDEX_KEY = {
  names: "name",
  owners: "owner",
  sha512: "inventorySha512"
};
async function discovery(f) {
  const objs = [], drafts = [], used = /* @__PURE__ */ new Set();
  for (const { id, dir, inv } of await f.objects()) {
    if (!inv || typeof id !== "string") continue;
    const head = await f.readObjectJson(dir, inv, OBJ2) || {};
    for (const k of Object.keys(head.extensions || {})) used.add(k);
    if (id.startsWith("sheaf:draft:")) {
      drafts.push({
        id,
        kind: head.kind ?? null,
        head: inv.head
      });
      continue;
    }
    if (head.kind === "owner") {
      try {
        const log = await f.keyLog(id.split(":")[2]);
        for (const k of Object.keys(log && log.extensions() || {})) used.add(k);
      } catch {
      }
    }
    const entry = {
      id,
      kind: head.kind ?? null,
      name: head.name ?? null,
      owner: head.owner ?? null,
      head: inv.head,
      inventorySha512: sidecarDigest(await f.storage.read(joinPath(dir, "inventory.json.sha512"))),
      status: await lineStatus(f, id, dir, inv, head)
    };
    const label = f.labelOf(id);
    if (label) entry.label = label;
    objs.push(entry);
  }
  const a = f.archive;
  const doc = {
    format: "opensheaf-archive/0.2",
    specification: SPEC,
    name: a.name,
    contact: a.contact,
    storageRoot: "ocfl/",
    storageLayout: f.layout
  };
  if (f.labels.has(a.mainCollection)) doc.mainCollection = f.labels.get(a.mainCollection);
  Object.assign(doc, {
    profiles: a.profiles,
    extensions: [
      ...used
    ].sort(compareText),
    owners: f.archiveOwners(),
    indexes: {
      ...INDEXES
    },
    objects: objs
  });
  if (drafts.length) doc.drafts = drafts;
  if (f.tombstones.length) doc.tombstones = f.tombstones;
  return doc;
}
async function indexEntries(f) {
  const out = {
    names: [],
    owners: [],
    sha512: []
  };
  const lines2 = /* @__PURE__ */ new Map();
  for (const { id, dir, inv } of await f.objects()) {
    if (!inv || typeof id !== "string" || id.startsWith("sheaf:draft:")) continue;
    const head = await f.readObjectJson(dir, inv, OBJ2) || {};
    const genesis = await f.readLogical(dir, inv, GENESIS2);
    if (!genesis || id.split(":").length !== 3) continue;
    let rec;
    try {
      rec = await readGenesis(genesis);
    } catch {
      continue;
    }
    const [, name2, owner] = id.split(":");
    const status = await lineStatus(f, id, dir, inv, head);
    const entry = {
      name: name2,
      owner,
      id,
      status,
      originator: rec.kind === "owner" ? owner : rec.originator ?? null,
      genesis: new TextDecoder().decode(genesis)
    };
    const label = f.labelOf(id);
    if (label) entry.label = label;
    out.names.push(entry);
    if (!lines2.has(owner)) lines2.set(owner, []);
    lines2.get(owner).push(name2);
    for (let n = 1; n <= Number(inv.head.slice(1)); n++) {
      const sc = await f.storage.read(joinPath(dir, `v${n}`, "inventory.json.sha512"));
      if (sc) out.sha512.push({
        inventorySha512: sidecarDigest(sc),
        id,
        version: `v${n}`,
        status
      });
    }
    if (head.kind === "owner") {
      let log = null;
      try {
        log = await f.keyLog(owner);
      } catch {
        continue;
      }
      for (const v of log?.versions || []) {
        for (const c of v.forkRecord ? v.carried : []) {
          out.sha512.push({
            inventorySha512: c.digest,
            id,
            version: `v${c.number}`,
            status: "active"
          });
        }
      }
    }
  }
  out.owners = [
    ...lines2.keys()
  ].sort(compareText).map((o) => ({
    owner: o,
    names: lines2.get(o).sort(compareText)
  }));
  out.names.push(...await removedEntries(f, "names"));
  out.sha512.push(...await removedEntries(f, "sha512"));
  return out;
}
async function readIndex(f, index) {
  const out = [];
  for (const entry of await f.storage.list(index) || []) {
    if (entry.kind !== "file" || !entry.name.endsWith(".json")) continue;
    try {
      const data2 = await readJson(f.storage, `${index}/${entry.name}`);
      out.push(...Array.isArray(data2?.entries) ? data2.entries : []);
    } catch {
    }
  }
  return out;
}
async function removedEntries(f, index) {
  const gone = new Map(f.tombstones.map((t) => [
    t.id,
    t
  ]));
  const kept = (await readIndex(f, index)).filter((e) => gone.has(e.id)).map((e) => ({
    ...e,
    status: "removed"
  }));
  for (const t of gone.values()) {
    if (index === "names" && !kept.some((e) => e.id === t.id)) {
      kept.push({
        name: t.name,
        owner: t.owner,
        id: t.id,
        status: "removed"
      });
    }
    if (index === "sha512" && !kept.some((e) => e.id === t.id && e.version === t.lastVersion)) {
      kept.push({
        inventorySha512: t.inventorySha512,
        id: t.id,
        version: t.lastVersion,
        status: "removed"
      });
    }
  }
  return kept;
}
function indexFiles(entries) {
  const out = {};
  for (const [index, list2] of Object.entries(entries)) {
    const files = out[index] = {};
    const key = INDEX_KEY[index];
    const number = (e) => Number((e.version ?? "v0").slice(1));
    const sorted = [
      ...list2
    ].sort((a, b) => compareText(a[key], b[key]) || compareText(a.id ?? "", b.id ?? "") || number(a) - number(b));
    for (const e of sorted) {
      const p = e[key].slice(0, INDEXES[index]);
      (files[p] ||= {
        format: INDEX_FORMAT,
        index,
        entries: []
      }).entries.push(e);
    }
  }
  return out;
}
async function writeIndexes(f) {
  const files = indexFiles(await indexEntries(f));
  for (const index of Object.keys(INDEXES)) {
    const want = files[index] || {};
    for (const entry of await f.storage.list(index) || []) {
      if (entry.kind === "file" && entry.name.endsWith(".json") && !Object.hasOwn(want, entry.name.slice(0, -5))) {
        await f.storage.remove(`${index}/${entry.name}`);
      }
    }
    for (const [prefix, data2] of Object.entries(want)) await f.storage.write(`${index}/${prefix}.json`, jsonBytes(data2));
  }
}
async function writeDiscovery(f) {
  await writeIndexes(f);
  await f.storage.write("opensheaf.json", jsonBytes(await discovery(f)));
}

// core/deposit.js
var RIGHTS = {
  "cc-by-4.0": {
    rights: "Creative Commons Attribution 4.0 International",
    rightsUri: "https://creativecommons.org/licenses/by/4.0/",
    rightsIdentifier: "cc-by-4.0",
    rightsIdentifierScheme: "SPDX"
  },
  "cc0-1.0": {
    rights: "Creative Commons Zero v1.0 Universal",
    rightsUri: "https://creativecommons.org/publicdomain/zero/1.0/",
    rightsIdentifier: "cc0-1.0",
    rightsIdentifierScheme: "SPDX"
  },
  "cc-by-sa-4.0": {
    rights: "Creative Commons Attribution Share Alike 4.0 International",
    rightsUri: "https://creativecommons.org/licenses/by-sa/4.0/",
    rightsIdentifier: "cc-by-sa-4.0",
    rightsIdentifierScheme: "SPDX"
  },
  "gpl-3.0-only": {
    rights: "GNU General Public License v3.0 only",
    rightsUri: "https://www.gnu.org/licenses/gpl-3.0.html",
    rightsIdentifier: "gpl-3.0-only",
    rightsIdentifierScheme: "SPDX"
  },
  "gpl-3.0-or-later": {
    rights: "GNU General Public License v3.0 or later",
    rightsUri: "https://www.gnu.org/licenses/gpl-3.0.html",
    rightsIdentifier: "gpl-3.0-or-later",
    rightsIdentifierScheme: "SPDX"
  }
};
function rightsList(rights, prevDc = null) {
  if (rights) return [
    Object.hasOwn(RIGHTS, rights) ? {
      ...RIGHTS[rights]
    } : {
      rights
    }
  ];
  if (prevDc?.rightsList?.length) return prevDc.rightsList;
  return [
    {
      rights: "All rights reserved"
    }
  ];
}
function checkRights(rights) {
  const known = Object.keys(RIGHTS).sort().join(", ");
  if (typeof rights !== "string" || !rights.trim() || rights.length > 1e3 || /[\u0000-\u001f\u007f]/.test(rights)) {
    throw new Error(`--rights is one of ${known}, or a statement on one line`);
  }
  if (!Object.hasOwn(RIGHTS, rights) && /^[a-z0-9][a-z0-9.+-]*$/.test(rights)) {
    throw new Error(`--rights ${rights}: not a licence known by its SPDX key (${known}); give one of them, or the licence as a statement, by its name or its address`);
  }
  return rights;
}
function partition(text3, sep) {
  const k = text3.indexOf(sep);
  return k < 0 ? [
    text3,
    ""
  ] : [
    text3.slice(0, k),
    text3.slice(k + sep.length)
  ];
}
function creator(spec) {
  const [name2, aff] = partition(spec, "|");
  let [family, given] = partition(name2, ",");
  family = family.trim();
  given = given.trim();
  const c = {
    name: given ? `${family}, ${given}` : family,
    nameType: "Personal",
    familyName: family
  };
  if (given) c.givenName = given;
  if (aff.trim()) c.affiliation = [
    {
      name: aff.trim()
    }
  ];
  return c;
}
function displayName(c) {
  return "familyName" in c ? `${c.givenName ?? ""} ${c.familyName}`.trim() : c.name;
}
function relatedFromArgs(specs) {
  const related = [];
  for (const kv of specs || []) {
    const [k, v] = partition(kv, "=");
    if (k === "arxiv" && v) {
      related.push({
        relatedIdentifier: `arXiv:${v}`,
        relatedIdentifierType: "arXiv",
        relationType: "IsVariantFormOf"
      });
      continue;
    }
    const [rel, rest] = partition(kv, ":");
    const [type, value] = partition(rest, ":");
    if (!(rel && [
      "doi",
      "arxiv"
    ].includes(type) && value)) {
      exit(`--related ${kv}: use arxiv=ID or RELATION:doi:DOI or RELATION:arxiv:ID`);
    }
    related.push({
      relatedIdentifier: type === "arxiv" ? `arXiv:${value}` : value,
      relatedIdentifierType: type === "arxiv" ? "arXiv" : "DOI",
      relationType: rel
    });
  }
  return related;
}
var SOURCE_FORMATS = {
  ".tex": "application/x-tex",
  ".ltx": "application/x-tex",
  ".tm": "application/x-texmacs",
  ".md": "text/markdown",
  ".txt": "text/plain",
  ".html": "text/html",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".odt": "application/vnd.oasis.opendocument.text",
  ".zip": "application/zip"
};
function suffixOf(name2) {
  const base = name2.slice(name2.lastIndexOf("/") + 1);
  const k = base.lastIndexOf(".");
  return k > 0 && k < base.length - 1 ? base.slice(k) : "";
}
function setDate(dc, dateType, date2, info = null) {
  const entry = {
    date: date2,
    dateType
  };
  if (info) entry.dateInformation = info;
  dc.dates = [
    ...(dc.dates || []).filter((d) => d.dateType !== dateType),
    entry
  ];
}
function landingUrl(f, label) {
  if (f.index.html || f.index.template) return `${f.archive.baseUrl}paper/${label}/`;
  return `${f.archive.baseUrl}site/${label}/${label}.html`;
}
async function docVersionOf(f, dir, inv, ver) {
  return (await f.readObjectJson(dir, inv, OBJ2, ver)).documentVersion;
}
async function defaultHistory2(f, dir, inv) {
  const last = /* @__PURE__ */ new Map();
  for (const ver of Object.keys(inv.versions)) last.set(await docVersionOf(f, dir, inv, ver), ver);
  return [
    ...last.keys()
  ].sort((a, b) => a - b).map((n) => last.get(n));
}
async function carryForward(f, prev, obj, dir, inv, newVer, afterDoc = null) {
  if (prev === null) {
    if (afterDoc !== null && afterDoc !== void 0) exit("--after needs an existing document");
    return;
  }
  if (prev.notices?.length) {
    const kept = [
      ...prev.notices
    ];
    obj.notices = [
      ...kept,
      ...(obj.notices || []).filter((n2) => !kept.some((k) => same(k, n2)))
    ];
  }
  if ((prev.history === void 0 || prev.history === null) && (afterDoc === null || afterDoc === void 0)) return;
  const hist = [
    ...prev.history?.length ? prev.history : await defaultHistory2(f, dir, inv)
  ];
  const docs = /* @__PURE__ */ new Map();
  for (const v of hist) docs.set(await docVersionOf(f, dir, inv, v), v);
  const n = obj.documentVersion;
  if (docs.has(n)) {
    hist[hist.indexOf(docs.get(n))] = newVer;
  } else if (afterDoc === null || afterDoc === void 0) {
    hist.push(newVer);
  } else {
    if (!docs.has(afterDoc)) exit(`--after: no document version ${afterDoc}`);
    hist.splice(hist.indexOf(docs.get(afterDoc)) + 1, 0, newVer);
  }
  obj.history = hist;
}
async function carriedFiles(f, dir, inv) {
  const out = /* @__PURE__ */ new Map();
  if (!inv) return out;
  const head = await f.readObjectJson(dir, inv, OBJ2);
  for (const n of head.notices || []) if (n.path) out.set(n.path, await f.readLogical(dir, inv, n.path));
  return out;
}
async function deposit(f, a) {
  const label = a.label;
  const draft = Boolean(a.draft);
  let id = null, owner = null;
  if (draft) {
    if (!label || !LABEL.test(label) || label.length > 64) {
      exit("the identifier of a draft matches ^[a-z0-9]+(-[a-z0-9]+)*$ and has at most 64 characters (section 10.1)");
    }
    id = `sheaf:draft:${label}`;
    const held2 = await f.storage.kind(joinPath(await f.dirOf(id), "inventory.json")) === "file";
    if (a.new && held2) exit(`the draft ${label} exists: osheaf draft deposit ${label} adds a version to it`);
    if (!a.new && !held2) exit(`no draft ${label} in this archive (osheaf draft new ${label} makes one)`);
  } else if (f.labels.has(label)) {
    if (a.new) exit(`${label} is the label of a line already: deposit a new version without --new, or choose another label for a new work`);
    id = f.labels.get(label);
  } else if (!a.new) {
    exit(`no line labelled ${label} in this archive: give --new to seal a new work (section 10.2), or check the label (osheaf verify lists them)`);
  } else {
    if (!LABEL.test(label || "") || label.length > 64) {
      exit("a label must match ^[a-z0-9]+(-[a-z0-9]+)*$ and have at most 64 characters");
    }
    if (label.length > 32) f.env.err(`warning: ${label} is longer than 32 characters (it appears in every URL of the website)`);
    owner = a.owner || f.archive.owner;
    if (!f.archiveOwners().includes(owner)) exit(`${owner} is not an owner this archive hosts`);
  }
  await f.initStorageRoot();
  const dir = id ? await f.dirOf(id) : null;
  const inv = dir ? await f.inventory(dir) : null;
  let prevObj = null, prevDc = null, docVersion = 1;
  if (inv) {
    prevObj = await f.readObjectJson(dir, inv, OBJ2);
    prevDc = await f.readObjectJson(dir, inv, "datacite.json");
    if (prevObj.kind !== "document") exit(`${label} is not a document`);
    if (prevObj.status === "withdrawn") exit(`${label} is withdrawn (section 13.1): a withdrawn document gets no new versions`);
    let most = 0;
    for (const v of Object.keys(inv.versions)) most = Math.max(most, await docVersionOf(f, dir, inv, v));
    docVersion = most + 1;
    owner = prevObj.owner;
  }
  if (a.created && a.available) exit("give --created (a version not public at the time) or --available, not both");
  const available = a.created ? null : a.available || f.env.today();
  const issued = a.issued || (prevDc ? dateOf(prevDc, "Issued") : null) || available;
  const source = a.source || null;
  if (source && suffixOf(source.name) === ".tm" && !a.pdf) {
    exit("TeXmacs sources are typeset by opensheaf-py (osheaf deposit of opensheaf-py); with opensheaf-js, give the PDF with --pdf");
  }
  if (!a.pdf) exit("give the PDF of this version with --pdf (only TeXmacs sources are typeset by the archive)");
  if (!source && !a.noSource) exit("a deposit without sources needs --no-source REASON (section 4.3: sourcesMissing)");
  if (!a.title || !a.author?.length) exit("give the title (--title) and the authors (--author) of this version");
  const files = /* @__PURE__ */ new Map(), formats = [];
  let main = null, format = null;
  if (source) {
    main = source.name.slice(source.name.lastIndexOf("/") + 1);
    format = a.sourceFormat || SOURCE_FORMATS[suffixOf(main).toLowerCase()] || "application/octet-stream";
    files.set(main, source.bytes);
    formats.push(format);
  }
  formats.push("application/pdf");
  for (const extra of a.extraSource || []) {
    const logical = extra.logical || extra.name.slice(extra.name.lastIndexOf("/") + 1);
    const parts = logical.split("/");
    if (logical.startsWith("/") || parts.includes("..") || parts.includes(".")) exit(`bad logical path ${logical}`);
    files.set(logical, extra.bytes);
    if (logical.endsWith(".bib") && !formats.includes("application/x-bibtex")) formats.push("application/x-bibtex");
  }
  const pdf = a.pdf.bytes;
  if (!(pdf[0] === 37 && pdf[1] === 80 && pdf[2] === 68 && pdf[3] === 70)) exit(`${a.pdf.name} is not a PDF`);
  files.set("paper.pdf", pdf);
  let abstract = null;
  if (a.abstractFile !== void 0 && a.abstractFile !== null) abstract = a.abstractFile.trim();
  else if (a.abstract) abstract = a.abstract.trim();
  if (abstract === null && prevDc) {
    abstract = (prevDc.descriptions || []).find((x) => x.descriptionType === "Abstract")?.description ?? null;
  }
  const datacite = {
    titles: [
      {
        title: a.title
      }
    ],
    creators: a.author.map(creator),
    publisher: {
      name: f.archive.name
    },
    publicationYear: Number((issued || a.created).slice(0, 4)),
    types: {
      resourceTypeGeneral: a.type || "Preprint"
    },
    version: String(docVersion),
    url: landingUrl(f, label),
    dates: [],
    language: a.language || "en",
    formats,
    rightsList: rightsList(a.rights, prevDc)
  };
  if (a.keyword?.length) datacite.subjects = a.keyword.map((k) => ({
    subject: k
  }));
  else if (prevDc?.subjects?.length) datacite.subjects = prevDc.subjects;
  if (issued) setDate(datacite, "Issued", issued);
  if (available) setDate(datacite, "Available", available, a.dateInfo);
  else setDate(datacite, "Created", a.created, a.dateInfo);
  if (abstract) datacite.descriptions = [
    {
      description: abstract,
      descriptionType: "Abstract"
    }
  ];
  const related = relatedFromArgs(a.related);
  if (related.length) datacite.relatedIdentifiers = related;
  if (draft) delete datacite.url;
  const obj = {
    format: OBJ_FORMAT,
    specification: SPEC,
    kind: "document",
    name: null,
    owner,
    documentVersion: docVersion
  };
  if (source) Object.assign(obj, {
    mainSource: main,
    sourceFormat: format
  });
  else obj.sourcesMissing = {
    text: a.noSource
  };
  obj.renditions = [
    {
      path: "paper.pdf",
      mediaType: "application/pdf"
    }
  ];
  if (a.toolchain?.length) obj.toolchain = a.toolchain.map((t) => partition(t, "=")).map(([name2, version]) => ({
    name: name2,
    version
  }));
  obj.status = "active";
  if (a.changes) obj.changes = {
    text: a.changes
  };
  if (a.agreement) {
    obj.agreement = {
      by: datacite.creators.map((c) => c.name),
      date: available || a.created || f.env.today(),
      method: a.agreement
    };
  }
  if (a.stage) obj.stage = {
    scheme: "NISO-JAV",
    value: a.stage
  };
  if (a.licenceFile) {
    if (!files.has(a.licenceFile)) {
      exit(`--licence-file ${a.licenceFile} is not a file of the deposit (give it as the main source or with --extra-source; files: ${[
        ...files.keys()
      ].sort().join(", ")})`);
    }
    obj.licence = {
      path: a.licenceFile,
      mediaType: {
        ".pdf": "application/pdf",
        ".md": "text/markdown",
        ".txt": "text/plain",
        ".html": "text/html"
      }[suffixOf(a.licenceFile).toLowerCase()] || "text/plain"
    };
  }
  if (draft) {
    delete obj.name;
    delete obj.owner;
  } else if (id === null) {
    const sealed = await f.seal("document", owner);
    id = sealed.id;
    files.set(GENESIS2, sealed.genesis);
  } else {
    files.set(GENESIS2, await f.readLogical(dir, inv, GENESIS2));
  }
  if (!draft) obj.name = id.split(":")[1];
  if (prevObj?.parent) {
    obj.parent = prevObj.parent;
    const state = inv.versions[inv.head].state;
    for (const lp of Object.values(state).flat().filter(isEvidence).sort()) files.set(lp, await f.readLogical(dir, inv, lp));
  }
  const next = inv ? `v${Number(inv.head.slice(1)) + 1}` : "v1";
  await carryForward(f, prevObj, obj, dir, inv, next, a.after ?? null);
  for (const [lp, bytes] of await carriedFiles(f, dir, inv)) if (!files.has(lp)) files.set(lp, bytes);
  files.set("datacite.json", jsonBytes(datacite));
  const done = await f.addVersion(id, files, obj, a.message || `Deposit: document version ${docVersion}`, {
    acknowledged: Boolean(a.iKnow)
  });
  if (!draft) f.labels.set(label, id);
  await writeDiscovery(f);
  f.env.out(`${label}: ${done.head} (document version ${docVersion}) ${id}`);
  return {
    id,
    head: done.head,
    documentVersion: docVersion
  };
}

// core/collect.js
async function documents(f) {
  const out = [], mine = f.archiveOwners();
  for (const { id, dir, inv } of await f.objects()) {
    if (!inv || typeof id !== "string" || id.startsWith("sheaf:draft:")) continue;
    const head = await f.readObjectJson(dir, inv, OBJ2);
    if (head?.kind !== "document" || !mine.includes(head.owner)) continue;
    const line = await f.line(id);
    const signed = line.latest;
    if (!signed) {
      f.env.err(`warning: ${f.labelOf(id) || id} has no signed version (section 7.3): left out`);
      continue;
    }
    const cur = currentVersion(inv, (v) => line.objs.get(v) ?? null, signed);
    out.push({
      id,
      dir,
      inv,
      signed,
      cur,
      obj: await f.readObjectJson(dir, inv, OBJ2, cur),
      dc: await f.readObjectJson(dir, inv, "datacite.json", cur)
    });
  }
  return out;
}
var ORDER = "issued-desc";
function compareTuples(a, b) {
  for (let k = 0; k < a.length; k++) {
    if (a[k] < b[k]) return -1;
    if (a[k] > b[k]) return 1;
  }
  return 0;
}
function memberOrder(members, order = ORDER) {
  const key = (m) => [
    m.cite?.issued || "",
    m.cite?.available || ""
  ];
  const line = (a, b) => compareTuples([
    a.name ?? "",
    a.owner ?? ""
  ], [
    b.name ?? "",
    b.owner ?? ""
  ]);
  const dated = members.filter((m) => key(m).some(Boolean)).sort(line);
  dated.sort((a, b) => order === "issued-desc" ? compareTuples(key(b), key(a)) : compareTuples(key(a), key(b)));
  return [
    ...dated,
    ...members.filter((m) => !key(m).some(Boolean)).sort(line)
  ];
}
async function collect2(f, { curated = false, iKnow = false } = {}) {
  await f.initStorageRoot();
  const label = f.archive.mainCollection;
  const collId = f.labels.get(label) ?? null;
  const collDir = collId ? await f.dirOf(collId) : null;
  const cinv = collDir ? await f.inventory(collDir) : null;
  if (cinv && (await f.readObjectJson(collDir, cinv, "members.json"))?.order === "manual") {
    f.env.out(`${label} is curated (order manual): use osheaf collection add|sync|update`);
    return null;
  }
  const isCurated2 = cinv === null && Boolean(curated);
  const order = isCurated2 ? "manual" : ORDER;
  let members = [];
  for (const { dir, signed, obj: obj2, dc } of await documents(f)) {
    const cite2 = {
      title: dc.titles[0].title,
      creators: dc.creators.map(displayName),
      year: dc.publicationYear
    };
    if (dateOf(dc, "Issued")) cite2.issued = dateOf(dc, "Issued");
    const m = {
      kind: "document",
      name: obj2.name,
      owner: obj2.owner,
      at: [
        f.archive.baseUrl
      ],
      version: signed,
      inventorySha512: await sha512hex(await f.storage.read(joinPath(dir, signed, "inventory.json"))),
      follow: "latest",
      cite: cite2
    };
    m.cite.available = dateOf(dc, "Available", "Created");
    members.push(m);
  }
  members = isCurated2 ? [] : memberOrder(members);
  for (const m of members) delete m.cite.available;
  const today2 = f.env.today();
  let version = 1, issued = today2;
  if (cinv) {
    const old = await f.readObjectJson(collDir, cinv, "members.json");
    if (same(old.members, members) && old.type === "catalogue") {
      f.env.out(`${label}: unchanged (${cinv.head})`);
      return null;
    }
    version = (await f.readObjectJson(collDir, cinv, OBJ2)).documentVersion + 1;
    issued = dateOf(await f.readObjectJson(collDir, cinv, "datacite.json"), "Issued") || today2;
  }
  const owner = f.archive.owner;
  let genesis, id = collId;
  if (id === null) {
    ({ genesis, id } = await f.seal("collection", owner));
  } else {
    genesis = await f.readLogical(collDir, cinv, GENESIS2);
  }
  const cur = f.archive.curator;
  const creator2 = {
    name: cur.name,
    nameType: "Personal",
    familyName: cur.familyName
  };
  if (cur.givenName) creator2.givenName = cur.givenName;
  if (cur.affiliation) creator2.affiliation = [
    {
      name: cur.affiliation
    }
  ];
  const files = /* @__PURE__ */ new Map([
    [
      "members.json",
      jsonBytes({
        format: "opensheaf-collection/0.2",
        type: "catalogue",
        order,
        members
      })
    ],
    [
      "datacite.json",
      jsonBytes({
        titles: [
          {
            title: f.archive.name
          }
        ],
        creators: [
          creator2
        ],
        publisher: {
          name: f.archive.name
        },
        publicationYear: Number(issued.slice(0, 4)),
        types: {
          resourceTypeGeneral: "Collection"
        },
        version: String(version),
        url: f.archive.baseUrl,
        dates: [
          {
            date: issued,
            dateType: "Issued"
          },
          {
            date: today2,
            dateType: "Available"
          }
        ],
        descriptions: [
          {
            description: "The documents deposited in this archive, newest first.",
            descriptionType: "Abstract"
          }
        ],
        rightsList: [
          {
            ...RIGHTS["cc0-1.0"]
          }
        ]
      })
    ],
    [
      GENESIS2,
      genesis
    ]
  ]);
  const obj = {
    format: OBJ_FORMAT,
    specification: SPEC,
    kind: "collection",
    name: id.split(":")[1],
    owner,
    documentVersion: version,
    status: "active"
  };
  f.labels.set(label, id);
  const inv = await f.addVersion(id, files, obj, `Collection version ${version}: ${members.length} documents`, {
    acknowledged: iKnow
  });
  await writeDiscovery(f);
  f.env.out(`Done: the main catalogue ${label} is at ${inv.head}, with ${members.length ? plural(members.length, "member") : "no members"}.`);
  return inv;
}

// core/describe.js
async function lineOf(f, label) {
  if (f.labels.has(label)) return f.labels.get(label);
  if (typeof label === "string" && label.startsWith("sheaf:")) {
    try {
      if (await f.storage.kind(joinPath(await f.dirOf(label), "inventory.json")) === "file") return label;
    } catch {
    }
  }
  exit(`no line labelled ${label} in this archive (osheaf deposit --new ${label} seals a new work)`);
}
async function headOf(f, label) {
  const id = await lineOf(f, label);
  const dir = await f.dirOf(id);
  const inv = await f.inventory(dir);
  if (inv === null) exit(`no object ${label}`);
  return {
    id,
    dir,
    inv
  };
}
async function headFiles(f, dir, inv, ver = inv.head) {
  const out = /* @__PURE__ */ new Map();
  for (const paths of Object.values(inv.versions[ver].state)) {
    for (const p of paths) if (p !== "datacite.json" && p !== OBJ2) out.set(p, await f.readLogical(dir, inv, p, ver));
  }
  return out;
}
async function descriptionVersion(f, label, change, message2, addFiles = null, acknowledged = false) {
  const { id, dir, inv } = await headOf(f, label);
  const files = await headFiles(f, dir, inv);
  const dc = await f.readObjectJson(dir, inv, "datacite.json");
  const prev = await f.readObjectJson(dir, inv, OBJ2);
  if (prev.kind !== "document") exit(`${label} is not a document`);
  const obj = JSON.parse(JSON.stringify(prev));
  await change(dc, obj);
  setDate(dc, "Updated", f.env.today());
  await carryForward(f, prev, obj, dir, inv, `v${Number(inv.head.slice(1)) + 1}`);
  for (const [lp, bytes] of addFiles || []) {
    if (files.has(lp)) exit(`${label} has a file ${lp} already`);
    files.set(lp, bytes);
  }
  files.set("datacite.json", jsonBytes(dc));
  const done = await f.addVersion(id, files, obj, typeof message2 === "function" ? message2() : message2, {
    acknowledged: Boolean(acknowledged)
  });
  await writeDiscovery(f);
  return done;
}
var NOTE_TYPES = {
  ".pdf": "application/pdf",
  ".md": "text/markdown",
  ".txt": "text/plain",
  ".html": "text/html"
};
function noteFrom(text3, file, folder) {
  const note = {}, add2 = /* @__PURE__ */ new Map();
  if (text3) note.text = text3;
  if (file) {
    const lp = `${folder}/${file.name}`;
    note.path = lp;
    note.mediaType = NOTE_TYPES[suffixOf(file.name).toLowerCase()] || "application/octet-stream";
    add2.set(lp, file.bytes);
  }
  if (!Object.keys(note).length) exit("a note needs a text, a file, or both");
  return {
    note,
    add: add2
  };
}
async function notice(f, a) {
  const { dir, inv } = await headOf(f, a.label);
  const numbers = /* @__PURE__ */ new Set();
  for (const v of Object.keys(inv.versions)) numbers.add((await f.readObjectJson(dir, inv, OBJ2, v)).documentVersion);
  if (!numbers.has(a.about)) exit(`${a.label} has no document version ${a.about}`);
  const { note, add: add2 } = noteFrom(a.text, a.file, "notices");
  Object.assign(note, {
    documentVersion: a.about,
    date: a.date || f.env.today()
  });
  const done = await descriptionVersion(f, a.label, (dc, obj) => {
    obj.notices = [
      ...obj.notices || [],
      note
    ];
  }, a.message || `Notice about document version ${a.about} (description-only version)`, add2, a.iKnow);
  f.env.out(`${a.label}: ${done.head} (notice about version ${a.about})`);
  return done;
}
async function withdraw(f, a) {
  const { note: reason, add: add2 } = noteFrom(a.reason, a.file, "withdrawal");
  const date2 = a.date || f.env.today();
  const done = await descriptionVersion(f, a.label, (dc, obj) => {
    if (obj.status === "withdrawn") exit(`${a.label} is withdrawn already`);
    obj.status = "withdrawn";
    obj.withdrawal = {
      date: date2,
      reason
    };
    setDate(dc, "Withdrawn", date2);
  }, a.message || "Withdrawal (description-only version)", add2, a.iKnow);
  f.env.out(`${a.label}: ${done.head} (withdrawn)`);
  return done;
}
async function relicense(f, a) {
  const fresh = rightsList(checkRights(a.rights))[0];
  const done = await descriptionVersion(f, a.label, (dc, obj) => {
    if (dc.rightsList !== void 0 && same(dc.rightsList, [
      fresh
    ])) exit(`${a.label} already has ${a.rights}`);
    dc.rightsList = [
      fresh
    ];
    obj.agreement = {
      by: dc.creators.map((c) => c.name),
      date: a.date || f.env.today(),
      method: a.method
    };
  }, a.message || `Licence: ${fresh.rights} (description-only version; content unchanged)`, null, a.iKnow);
  f.env.out(`${a.label}: ${done.head} (${fresh.rights})`);
  return done;
}

// core/resolve.js
var MEMBER_STATUS = {
  [SIGNED]: "verified",
  [VOUCHED]: "verified",
  [CONTESTED]: "contested",
  [UNCHECKED]: "unchecked",
  [UNSIGNED]: "not a version",
  [INVALID]: "not a version"
};
var Copy = class {
  constructor(where2, archive, line) {
    Object.assign(this, {
      where: where2,
      archive,
      line,
      id: line.id
    });
  }
  get head() {
    return this.line.versions.length;
  }
  get statuses() {
    return this.line.statuses;
  }
  get latestSigned() {
    return this.line.latest ? versionNumber(this.line.latest) : 0;
  }
  digest(n) {
    return n > 0 && n <= this.line.versions.length ? this.line.versions[n - 1].digest : null;
  }
  status(n) {
    return n > 0 && n <= this.statuses.length ? this.statuses[n - 1] : null;
  }
  find(digest) {
    const k = this.line.versions.findIndex((v) => v.digest === digest);
    return k < 0 ? null : k + 1;
  }
  obj(n) {
    return this.line.versions[n - 1]?.obj ?? null;
  }
  agrees(other) {
    const k = Math.min(this.latestSigned, other.latestSigned);
    return k === 0 || this.digest(k) === other.digest(k);
  }
};
function found(status, copy = null, version = null, digest = null, copies = [], log = null) {
  return {
    status,
    copy,
    version,
    digest,
    copies,
    log,
    ok: status === "verified" || status === "contested"
  };
}
function ipv6Groups(text3) {
  const halves = text3.split("::");
  if (halves.length > 2) return null;
  const groups = (s) => s ? s.split(":").map((g) => parseInt(g, 16)) : [];
  const head = groups(halves[0]), tail = halves.length === 2 ? groups(halves[1]) : [];
  if (halves.length === 1 && head.length !== 8) return null;
  const out = [
    ...head,
    ...new Array(8 - head.length - tail.length).fill(0),
    ...tail
  ];
  return out.length === 8 && out.every((g) => Number.isInteger(g) && g >= 0 && g <= 65535) ? out : null;
}
function ipv4Kind([a, b]) {
  if (a === 127) return "a loopback address";
  if (a === 10 || a === 172 && b >= 16 && b <= 31 || a === 192 && b === 168) return "a private address";
  if (a === 169 && b === 254) return "a link-local address";
  if (a === 0) return "an address of this network";
  return null;
}
function localKind(hostname) {
  const host = String(hostname).toLowerCase().replace(/\.$/, "");
  if (host === "localhost" || host.endsWith(".localhost")) return "a loopback address";
  if (host === "local" || host.endsWith(".local")) return "a name of the local network (.local)";
  if (/^[0-9]+(\.[0-9]+){3}$/.test(host)) return ipv4Kind(host.split(".").map(Number));
  if (!host.startsWith("[")) return null;
  const g = ipv6Groups(host.slice(1, -1));
  if (!g) return null;
  if (g.slice(0, 5).every((x) => x === 0) && g[5] === 65535) return ipv4Kind([
    g[6] >> 8,
    g[6] & 255
  ]);
  if (g.slice(0, 7).every((x) => x === 0)) return g[7] === 1 ? "a loopback address" : g[7] === 0 ? "an address of this network" : null;
  if ((g[0] & 65024) === 64512) return "a unique local address";
  if ((g[0] & 65472) === 65152) return "a link-local address";
  return null;
}
var Resolver = class _Resolver {
  constructor(http, home = null, { local = false } = {}) {
    this.http = http;
    this.home = home;
    this.local = local;
    this.archives = /* @__PURE__ */ new Map();
    this.logs = /* @__PURE__ */ new Map();
    this.notes = [];
    if (home) this.archives.set(home.base, Promise.resolve(home));
  }
  again() {
    const fresh = new _Resolver(this.http.another(), null, {
      local: this.local
    });
    if (this.home) fresh.home = this.home;
    return fresh;
  }
  note(level2, message2) {
    if (!this.notes.some((n) => n.level === level2 && n.message === message2)) this.notes.push({
      level: level2,
      message: message2
    });
  }
  source(where2, options = {}) {
    const base = baseOf(where2);
    if (!this.archives.has(base)) {
      const refused = this.refused(base);
      if (refused) {
        this.note("warning", `unavailable: ${where2}: ${refused}`);
        this.archives.set(base, Promise.resolve(null));
        return this.archives.get(base);
      }
      const opening = Archive.open(this.http, base, options).then((archive) => {
        if (archive.old || archive.disc.specification !== "0.2") {
          this.note("warning", `unavailable: ${where2}: not an archive of specification 0.2`);
          return null;
        }
        return archive;
      }, (error) => {
        if (error?.kind === "aborted") {
          this.archives.delete(base);
          throw error;
        }
        this.note("warning", `unavailable: ${where2}: ${error.kind === "not-found" ? "no discovery document opensheaf.json" : error.kind === "json" ? "the discovery document is not JSON" : error.detail || error.message}`);
        return null;
      });
      this.archives.set(base, opening);
    }
    return this.archives.get(base);
  }
  refused(base) {
    const kind = localKind(new URL(base).hostname);
    if (!kind || this.local) return null;
    if (this.home && localKind(new URL(this.home.base).hostname)) return null;
    return `not fetched: ${new URL(base).hostname} is ${kind}, which the explorer fetches only for an archive that is itself on a local or private host`;
  }
  places(where2) {
    const out = this.home ? [
      this.home.base
    ] : [];
    const given = [];
    for (const w of where2) {
      if (typeof w !== "string" || !w) continue;
      let base;
      try {
        base = baseOf(w);
      } catch {
        continue;
      }
      if (!out.includes(base) && !given.includes(base)) given.push(base);
    }
    if (given.length > LIMITS.mirrors) {
      this.note("warning", `${given.length - LIMITS.mirrors} more location(s) not tried (at most ${LIMITS.mirrors} are tried, section 15.2)`);
    }
    return [
      ...out,
      ...given.slice(0, LIMITS.mirrors)
    ];
  }
  async archiveOf(url, options = {}) {
    this.bases ??= /* @__PURE__ */ new Map();
    if (this.bases.has(url)) return this.bases.get(url);
    const out = [];
    this.bases.set(url, out);
    let u;
    try {
      u = new URL(url);
    } catch {
      return out;
    }
    if (![
      "https:",
      "http:"
    ].includes(u.protocol) || !u.host) return out;
    const origin = `${u.protocol}//${u.host}`, path = u.pathname, whole = origin + path;
    const cuts = [];
    for (let k = path.length - 2; k >= 0; k--) if (path[k] === "/") cuts.push(k + 1);
    const guess = path.indexOf("/ocfl/");
    if (guess >= 0) cuts.unshift(guess + 1);
    for (const k of [
      ...new Set(cuts)
    ]) {
      const base = origin + path.slice(0, k);
      if (this.refused(base)) continue;
      let archive = this.archives.has(base) ? await this.archives.get(base) : null;
      if (!archive) {
        try {
          archive = await Archive.open(this.http, base, options);
        } catch (error) {
          if (error?.kind === "aborted") throw error;
          continue;
        }
        if (archive.old || archive.disc.specification !== "0.2") continue;
      }
      const root = archive.disc.storageRoot ?? "ocfl/";
      if (typeof root !== "string" || root.includes(":") || !root.endsWith("/") || root.slice(0, -1).split("/").some((x) => [
        "",
        ".",
        ".."
      ].includes(x)) || root.includes("\\")) continue;
      if (whole.startsWith(archive.root) && whole.length > archive.root.length) {
        this.archives.set(base, Promise.resolve(archive));
        out.push(base);
        break;
      }
    }
    return out;
  }
  async keyLog(owner, where2 = [], options = {}) {
    if (!this.logs.has(owner)) this.logs.set(owner, {
      log: null,
      met: /* @__PURE__ */ new Set(),
      found: []
    });
    const entry = this.logs.get(owner);
    for (const w of this.places(where2)) {
      if (entry.met.has(w)) continue;
      entry.met.add(w);
      const archive = await this.source(w, options);
      if (!archive) continue;
      let log;
      try {
        log = await archive.keyLog(owner, options);
      } catch (error) {
        if (error?.kind === "aborted") throw error;
        this.note("warning", `${w}: the key log of ${owner}: ${error.detail || error.message}`);
        continue;
      }
      if (!log || log.owner !== owner) continue;
      entry.found.push({
        where: w,
        log
      });
      const before = entry.log;
      entry.log = before ? await before.meet(log) : log;
      if (before && before.forkPoint === null && entry.log.forkPoint !== null) {
        this.note("result", `a fork of the key log of ${owner} at v${entry.log.forkPoint}, met at ${w} (section 6.3)`);
      }
    }
    return entry.log;
  }
  ownerNotes(owner) {
    const log = this.logs.get(owner)?.log;
    if (!log) return [];
    const out = [];
    if (log.forkPoint) out.push(`owner ${owner} ended by a fork of its key log at v${log.forkPoint}`);
    else if (log.ended) out.push(`owner ${owner} ended`);
    if (log.successor) out.push(`owner ${owner}: successor ${log.successor} named by its ending version`);
    for (const did of [
      ...log.exposedKeys()
    ].sort()) out.push(`owner ${owner}: exposed key ${did}`);
    return out;
  }
  async copies(name2, owner, where2 = [], options = {}) {
    const id = objectId(name2, owner);
    const held2 = [];
    for (const w of this.places(where2)) {
      const archive = await this.source(w, options);
      if (!archive) continue;
      if (archive !== this.home && !archive.objects().some((o) => o.id === id)) continue;
      await this.keyLog(owner, archive === this.home ? [] : [
        w
      ], options);
      held2.push({
        w,
        archive
      });
    }
    const log = await this.keyLog(owner, [], options);
    const out = [];
    for (const { w, archive } of held2) {
      let line;
      try {
        line = await archive.line(id, {
          log,
          signal: options.signal
        });
      } catch (error) {
        if (error?.kind === "aborted") throw error;
        if (error?.kind !== "not-found") this.note("warning", `${w}: ${id}: ${error.detail || error.message}`);
        continue;
      }
      const problem = await this.identityProblem(archive, id, line, options);
      if (problem) {
        this.note("warning", `${w}: ${id}: not a copy of the line: ${problem}`);
        continue;
      }
      out.push(new Copy(w, archive, line));
    }
    if (out.length && await this.tombstoned(id, where2, options)) {
      this.note("result", `${id}: taken down in an archive read, and found elsewhere (section 12.3)`);
    }
    return out;
  }
  async identityProblem(archive, id, line, options) {
    if (line.inv.id !== id) return "its inventory names another object";
    const [, name2, owner] = id.split(":");
    let genesis = null;
    try {
      genesis = await archive.bytes(id, line.inv, "v1", "genesis.json", options);
    } catch (error) {
      if (error?.kind === "aborted") throw error;
    }
    if (!genesis || !await isNameOf(name2, genesis)) return "the name is not a name of its genesis record (section 5.2)";
    for (const v of line.versions) {
      if (v.obj?.name !== name2 || v.obj?.owner !== owner) return `${v.ver}: object.json does not record the line`;
    }
    return null;
  }
  async tombstoned(id, where2 = [], options = {}) {
    for (const w of this.places(where2)) {
      const archive = await this.source(w, options);
      if (archive?.tombstones().some((t) => t.id === id)) return true;
    }
    return false;
  }
  async pin(name2, owner, version, digest, where2 = [], options = {}) {
    if (name2 === owner) {
      const log = await this.keyLog(owner, where2, options);
      const v = log && isVersion(version) ? log.lookup(versionNumber(version), digest) : null;
      if (v) return found("verified", null, version, digest, [], log);
      return found(log ? "mismatch" : "unavailable", null, version, digest, [], log);
    }
    const copies = await this.copies(name2, owner, where2, options);
    const n = isVersion(version) ? versionNumber(version) : 0;
    for (const c of copies) {
      if (n && c.digest(n) === digest) return found(MEMBER_STATUS[c.status(n)] || "not a version", c, version, digest, copies);
    }
    if (copies.length) return found("mismatch", null, version, digest, copies);
    return found(await this.tombstoned(objectId(name2, owner), where2, options) ? "removed" : "unavailable", null, version, digest, copies);
  }
  async latest(name2, owner, where2 = [], options = {}) {
    const copies = await this.copies(name2, owner, where2, options);
    const signed = copies.filter((c) => c.latestSigned).sort((a, b) => b.latestSigned - a.latestSigned);
    if (!signed.length) {
      const status = copies.length ? "not a version" : await this.tombstoned(objectId(name2, owner), where2, options) ? "removed" : "unavailable";
      return found(status, null, null, null, copies);
    }
    const top = signed[0];
    const forks = signed.filter((c) => !top.agrees(c));
    for (const c of forks) {
      this.note("result", `a fork of the line ${top.id}: the copy at ${c.where} (latest signed v${c.latestSigned}) does not agree with the copy at ${top.where} (latest signed v${top.latestSigned}) (section 7.4)`);
    }
    if (forks.length) return found("fork", null, null, null, copies);
    return found("verified", top, `v${top.latestSigned}`, top.digest(top.latestSigned), copies);
  }
  async documentVersion(name2, owner, n, where2 = [], options = {}) {
    const latest = await this.latest(name2, owner, where2, options);
    if (!latest.copy) return latest;
    const c = latest.copy;
    const objOf2 = (v) => c.line.objs.get(v) ?? null;
    for (const h of historyOf(c.line.inv, objOf2, latest.version)) {
      if (objOf2(h)?.documentVersion === n) {
        const k = versionNumber(h);
        return found(MEMBER_STATUS[c.status(k)] || "not a version", c, h, c.digest(k), latest.copies);
      }
    }
    this.note("warning", `${c.id}: no document version ${n} in the history of ${latest.version}`);
    return found("unavailable", null, null, null, latest.copies);
  }
  async resolve(text3, where2 = [], options = {}) {
    const u = parseSheaf(text3, {
      short: true,
      fold: true
    });
    where2 = [
      ...u.at ? [
        u.at
      ] : [],
      ...where2
    ];
    if (u.owner === "*") throw new Error("a work, sheaf:<name>:*, is searched for (section 12.4), which the explorer does not do");
    const [name2, owner] = await this.expand(u, where2, options);
    if (name2 === owner) {
      const id2 = objectId(owner, owner);
      const log = await this.keyLog(owner, where2, options);
      if (!log) return {
        id: id2,
        found: found("unavailable")
      };
      const side = log.side();
      if (u.version === null) {
        const v = side[side.length - 1];
        return {
          id: id2,
          found: found("verified", null, `v${v.number}`, v.digest, [], log)
        };
      }
      if (u.sha512 === null) {
        if (u.version > side.length) return {
          id: id2,
          found: found("unavailable", null, null, null, [], log)
        };
        return {
          id: id2,
          found: found("verified", null, `v${u.version}`, side[u.version - 1].digest, [], log)
        };
      }
      return {
        id: id2,
        found: await this.pin(owner, owner, `v${u.version}`, u.sha512, where2, options)
      };
    }
    const id = objectId(name2, owner);
    if (u.version === null) return {
      id,
      found: await this.latest(name2, owner, where2, options)
    };
    if (u.sha512 === null) return {
      id,
      found: await this.documentVersion(name2, owner, u.version, where2, options)
    };
    const copies = await this.copies(name2, owner, where2, options);
    for (const c of copies) {
      const k = c.find(u.sha512);
      if (k === null) continue;
      const held2 = c.obj(k)?.documentVersion;
      if (held2 !== u.version) {
        this.note("warning", `${id}: the version pinned holds document version ${held2}, not ${u.version}`);
        return {
          id,
          found: found("mismatch", c, `v${k}`, u.sha512)
        };
      }
      return {
        id,
        found: found(MEMBER_STATUS[c.status(k)] || "not a version", c, `v${k}`, u.sha512)
      };
    }
    const status = copies.length ? "mismatch" : await this.tombstoned(id, where2, options) ? "removed" : "unavailable";
    return {
      id,
      found: found(status, null, null, u.sha512, copies)
    };
  }
  async expand(u, where2, options = {}) {
    if (u.isComplete() && u.owner !== null) return [
      u.name,
      u.owner
    ];
    const candidates = /* @__PURE__ */ new Set();
    for (const w of this.places(where2)) {
      const archive = await this.source(w, options);
      if (!archive) continue;
      for (const o of archive.objects()) {
        const name2 = typeof o.name === "string" ? o.name : "", owner = typeof o.owner === "string" ? o.owner : "";
        if (!u.matches(name2, owner)) continue;
        if (u.owner === null) {
          if (o.kind === "owner" ? name2 !== owner : await this.originator(archive, o.id, options) !== owner) continue;
        }
        candidates.add(`${name2} ${owner}`);
      }
    }
    if (candidates.size !== 1) {
      const listed = [
        ...candidates
      ].sort().map((c) => `  sheaf:${c.replace(" ", ":")}`).join("\n");
      throw new Error(`${u}: ` + (candidates.size ? "ambiguous, the candidates are:\n" + listed : "no line of that name in the archives read"));
    }
    return [
      ...candidates
    ][0].split(" ");
  }
  async originator(archive, id, options = {}) {
    try {
      const inv = await archive.inventory(id, null, options);
      const genesis = await archive.bytes(id, inv, "v1", "genesis.json", options);
      return genesis ? (await readGenesis(genesis)).originator ?? null : null;
    } catch (error) {
      if (error?.kind === "aborted") throw error;
      return null;
    }
  }
  async describe(result, { presentCurrent = false } = {}, options = {}) {
    const c = result.copy;
    if (!c) return null;
    const objOf2 = (v) => c.line.objs.get(v) ?? null;
    const shown = presentCurrent ? historyOf(c.line.inv, objOf2, result.version).slice(-1)[0] || result.version : result.version;
    const { obj, dc } = await c.archive.descriptions(c.id, c.line.inv, shown, options);
    const latest = c.line.latest ? objOf2(c.line.latest) : null;
    return {
      version: shown,
      title: titleOf(dc),
      creators: creatorsOf(dc),
      documentVersion: obj?.documentVersion ?? null,
      status: latest?.status ?? null,
      withdrawal: latest?.withdrawal ?? null,
      archive: c.archive
    };
  }
};

// core/inputs.js
async function parseData(name2, text3, { yaml11 = false } = {}) {
  if (name2.toLowerCase().endsWith(".json")) return JSON.parse(text3);
  const YAML = await Promise.resolve().then(() => (init_browser(), browser_exports));
  const options = yaml11 ? {
    version: "1.1",
    schema: "yaml-1.1"
  } : {
    schema: "failsafe"
  };
  return YAML.parse(text3, options);
}

// core/collections.js
var KINDS3 = [
  "catalogue",
  "selection"
];
var ORDERS = [
  "manual",
  "issued-desc",
  "issued-asc"
];
var FORMAT = "opensheaf-collection/0.2";
async function openResolver(f) {
  const base = ORIGIN;
  const http = new Http({
    fetch: storageFetch(f.storage, base, {
      fallback: f.env.fetch
    }),
    budget: null
  });
  const home = await Archive.open(http, base);
  home.lister = storageLister(f.storage, base);
  return new Resolver(http, home, {
    local: true
  });
}
var objOf = (c) => (v) => c.line.objs.get(v) ?? null;
async function copyJson(c, logical, ver) {
  try {
    return await c.archive.json(c.id, c.line.inv, ver, logical);
  } catch {
    return null;
  }
}
function historyOrder(c) {
  if (!c.latestSigned) return [];
  return historyOf(c.line.inv, objOf(c), `v${c.latestSigned}`).map((h) => objOf(c)(h)?.documentVersion);
}
async function cite(c, k) {
  const dc = await copyJson(c, "datacite.json", currentVersion(c.line.inv, objOf(c), `v${k}`)) || {};
  const out = {
    title: (dc.titles || [
      {}
    ])[0]?.title ?? "",
    creators: (dc.creators || []).map(displayName)
  };
  if (Number.isInteger(dc.publicationYear)) out.year = dc.publicationYear;
  if (dateOf(dc, "Issued")) out.issued = dateOf(dc, "Issued");
  return out;
}
async function revision(c, k) {
  const obj = objOf(c)(`v${k}`);
  const dc = await copyJson(c, "datacite.json", `v${k}`) || {};
  const out = {
    documentVersion: obj.documentVersion,
    version: `v${k}`,
    inventorySha512: c.digest(k)
  };
  if (dc.doi) out.doi = dc.doi;
  return out;
}
async function memberRecord(kind, c, k, name2, owner, at, follow = false) {
  const obj = objOf(c)(`v${k}`);
  const dc = await copyJson(c, "datacite.json", `v${k}`) || {};
  const m = {
    kind: obj.kind,
    name: name2,
    owner,
    at: [
      ...at
    ]
  };
  if (kind === "catalogue") {
    Object.assign(m, {
      version: `v${k}`,
      inventorySha512: c.digest(k)
    });
    if (follow) m.follow = "latest";
  } else {
    m.revisions = [
      await revision(c, k)
    ];
  }
  if (dc.doi && kind === "catalogue") m.doi = dc.doi;
  m.cite = await cite(c, k);
  return m;
}
function sortRevisions(revs, order) {
  const key = (x) => order.includes(x.documentVersion) ? order.indexOf(x.documentVersion) : order.length + x.documentVersion;
  return [
    ...revs
  ].sort((a, b) => key(a) - key(b));
}
async function target(f, r, text3, where2) {
  if (f.labels.has(text3)) {
    const [, name3, owner2] = f.labels.get(text3).split(":");
    return {
      name: name3,
      owner: owner2,
      u: null,
      places: []
    };
  }
  let u, name2, owner;
  const places = [];
  try {
    u = parseSheaf(text3, {
      short: true,
      fold: true
    });
    for (const w of [
      ...u.at ? [
        u.at
      ] : [],
      ...where2
    ]) if (w && !places.includes(w)) places.push(w);
    [name2, owner] = await r.expand(u, places);
  } catch (error) {
    exit(error.message);
  }
  return {
    name: name2,
    owner,
    u,
    places
  };
}
function recordedAt(f, r, found2, places) {
  const out = places.filter((w) => typeof w === "string" && w.startsWith("https://") && w.endsWith("/"));
  const c = found2.copy;
  if (c && c.archive === r.home) out.push(f.archive.baseUrl);
  else if (c && c.where.startsWith("https://")) out.push(c.where);
  return [
    ...new Set(out)
  ];
}
async function pinned(r, name2, owner, u, places, kind, revisions = []) {
  let founds;
  if (u?.sha512) {
    founds = [
      (await r.resolve(String(u), places)).found
    ];
  } else if (kind === "selection" && revisions.length) {
    founds = [];
    for (const n of revisions) founds.push(await r.documentVersion(name2, owner, n, places));
  } else {
    let found2 = await r.latest(name2, owner, places);
    if (kind === "selection" && found2.copy) {
      const c = found2.copy;
      const cur = currentVersion(c.line.inv, objOf(c), found2.version);
      const k = Number(cur.slice(1));
      found2 = {
        ...found2,
        status: MEMBER_STATUS[c.status(k)] || "not a version",
        version: cur,
        digest: c.digest(k)
      };
    }
    founds = [
      found2
    ];
  }
  for (const fd of founds) {
    if (fd.status !== "verified" || !fd.copy) {
      const notes = r.notes.map((n) => n.message).join("; ");
      exit(`sheaf:${name2}:${owner}: ${fd.status}` + (notes ? ` (${notes})` : "") + ": a collection pins only verified versions (section 8.5)");
    }
  }
  return founds;
}
function describeCollection(f, title, description, version, issued, members, label = null) {
  const cur = f.archive.curator;
  const creator2 = {
    name: cur.name,
    nameType: "Personal",
    familyName: cur.familyName
  };
  if (cur.givenName) creator2.givenName = cur.givenName;
  const dc = {
    titles: [
      {
        title
      }
    ],
    creators: [
      creator2
    ],
    publisher: {
      name: f.archive.name
    },
    publicationYear: Number(issued.slice(0, 4)),
    types: {
      resourceTypeGeneral: "Collection"
    },
    version: String(version),
    dates: [
      {
        date: issued,
        dateType: "Issued"
      },
      {
        date: f.env.today(),
        dateType: "Available"
      }
    ],
    rightsList: [
      {
        ...RIGHTS["cc0-1.0"]
      }
    ]
  };
  if (label) dc.url = landingUrl(f, label);
  if (description) dc.descriptions = [
    {
      description,
      descriptionType: "Abstract"
    }
  ];
  const dois = [
    ...members.filter((m) => m.doi).map((m) => m.doi),
    ...members.flatMap((m) => (m.revisions || []).filter((x) => x.doi).map((x) => x.doi))
  ];
  if (dois.length) {
    dc.relatedIdentifiers = [
      ...new Set(dois)
    ].map((x) => ({
      relatedIdentifier: x,
      relatedIdentifierType: "DOI",
      relationType: "HasPart"
    }));
  }
  return dc;
}
async function write(f, collId, mem, { message: message2, title = null, description = null, owner = null, label = null }) {
  const dir = collId ? await f.dirOf(collId) : null;
  const inv = dir ? await f.inventory(dir) : null;
  mem = {
    ...mem
  };
  if ((mem.order ?? "manual") !== "manual") mem.members = memberOrder(mem.members, mem.order);
  let version = 1, issued = f.env.today(), genesis = null;
  if (inv) {
    const oldMem = await f.readObjectJson(dir, inv, "members.json");
    const oldDc = await f.readObjectJson(dir, inv, "datacite.json") || {};
    const oldTitle = (oldDc.titles || [
      {}
    ])[0]?.title ?? null;
    const oldDesc = (oldDc.descriptions || []).find((x) => x.descriptionType === "Abstract")?.description ?? null;
    title = title ?? oldTitle;
    description = description ?? oldDesc;
    version = (await f.readObjectJson(dir, inv, OBJ2)).documentVersion;
    if (!same(oldMem, mem)) {
      version += 1;
    } else if (title === oldTitle && description === oldDesc) {
      f.env.out(`${f.labelOf(collId) || collId}: unchanged (${inv.head})`);
      return null;
    }
    issued = dateOf(oldDc, "Issued") || f.env.today();
    genesis = await f.readLogical(dir, inv, GENESIS2);
    owner = collId.split(":")[2];
  } else {
    ({ genesis, id: collId } = await f.seal("collection", owner));
  }
  label = label || f.labelOf(collId);
  const files = /* @__PURE__ */ new Map([
    [
      "members.json",
      jsonBytes(mem)
    ],
    [
      GENESIS2,
      genesis
    ],
    [
      "datacite.json",
      jsonBytes(describeCollection(f, title, description, version, issued, mem.members, label))
    ]
  ]);
  const obj = {
    format: OBJ_FORMAT,
    specification: SPEC,
    kind: "collection",
    name: collId.split(":")[1],
    owner,
    documentVersion: version,
    status: "active"
  };
  if (label) f.labels.set(label, collId);
  const done = await f.addVersion(collId, files, obj, message2);
  await writeDiscovery(f);
  const n = mem.members.length;
  f.env.out(`Done: the collection ${label || collId} is at ${done.head}, document version ${version}, with ${n ? plural(n, "member") : "no members"}.`);
  return done;
}
async function held(f, label) {
  const collId = await lineOf(f, label);
  const dir = await f.dirOf(collId);
  const inv = await f.inventory(dir);
  const head = await f.readObjectJson(dir, inv, OBJ2) || {};
  if (head.kind !== "collection") exit(`${label} is not a collection`);
  if (!f.archiveOwners().includes(head.owner)) exit(`${label} is a collection of an owner this archive does not host`);
  return {
    collId,
    dir,
    inv,
    mem: await f.readObjectJson(dir, inv, "members.json")
  };
}
async function update(f, a) {
  let labels2 = a.collection || [];
  if (!labels2.length) {
    for (const [label, id] of [
      ...f.labels
    ].sort((x, y) => compareText(x[0], y[0]))) {
      if (await isCurated(f, label, id)) labels2.push(label);
    }
  }
  for (const label of labels2) {
    const { collId, mem } = await held(f, label);
    const changed = [];
    const r = await openResolver(f);
    for (const m of mem.members) {
      if (mem.type === "selection") await reportUnvetted(f, r, label, m);
      else if (m.follow === "latest" && await followMember(f, r, label, m)) {
        changed.push(`sheaf:${m.name}:${m.owner} ${m.version}`);
      }
    }
    for (const { level: level2, message: message2 } of r.notes) f.env.out(`${level2}: ${message2}`);
    if (changed.length) await write(f, collId, mem, {
      message: `Followed: ${changed.join(", ")}`
    });
    else f.env.out(`${label}: no member to follow further`);
  }
}
async function isCurated(f, label, id) {
  const dir = await f.dirOf(id);
  const inv = await f.inventory(dir);
  const head = inv ? await f.readObjectJson(dir, inv, OBJ2) : {};
  if (head?.kind !== "collection" || !f.archiveOwners().includes(head.owner)) return false;
  const mem = await f.readObjectJson(dir, inv, "members.json") || {};
  return !(label === f.archive.mainCollection && mem.order !== "manual");
}
async function followMember(f, r, label, m) {
  const log = await r.keyLog(m.owner, m.at || []);
  if (log && log.forkPoint) {
    f.env.out(`${label}: sheaf:${m.name}:${m.owner}: its owner's key log forks at v${log.forkPoint}: not followed (section 7.5)`);
    return false;
  }
  const found2 = await r.latest(m.name, m.owner, m.at || []);
  if (!found2.copy) {
    f.env.out(`${label}: sheaf:${m.name}:${m.owner}: ${found2.status}: the pin is kept`);
    return false;
  }
  const c = found2.copy, k = Number(found2.version.slice(1)), old = Number(m.version.slice(1));
  if (c.digest(old) !== m.inventorySha512) {
    f.env.out(`${label}: sheaf:${m.name}:${m.owner}: the copy at ${c.where} does not extend the pin ${m.version}: a fork of the line (section 7.4); the pin is kept`);
    return false;
  }
  if (k <= old) return false;
  Object.assign(m, {
    version: `v${k}`,
    inventorySha512: c.digest(k),
    cite: await cite(c, k)
  });
  return true;
}
async function reportUnvetted(f, r, label, m) {
  const found2 = await r.latest(m.name, m.owner, m.at || []);
  if (!found2.copy) return;
  const vetted2 = new Set(m.revisions.map((x) => x.documentVersion));
  const rest = historyOrder(found2.copy).filter((n) => !vetted2.has(n));
  if (rest.length) {
    f.env.out(`${label}: sheaf:${m.name}:${m.owner}: document version(s) ${rest.join(", ")} not vetted`);
  }
}
async function loadSpec(name2, text3) {
  const spec = await parseData(name2, text3, {
    yaml11: true
  });
  if (spec === null || typeof spec !== "object" || Array.isArray(spec) || !Array.isArray(spec.members ?? [])) exit(`${name2}: a mapping with members, a list`);
  for (const k of Object.keys(spec)) {
    if (![
      "title",
      "description",
      "type",
      "order",
      "owner",
      "members"
    ].includes(k)) exit(`${name2}: unknown key ${k}`);
  }
  if (!KINDS3.includes(spec.type ?? "catalogue") || !ORDERS.includes(spec.order ?? "manual")) {
    exit(`${name2}: type is catalogue or selection, order one of ${ORDERS.join(", ")}`);
  }
  return spec;
}
async function sync(f, a) {
  const spec = await loadSpec(a.fromFile.name, a.fromFile.text);
  const exists2 = f.labels.has(a.collection);
  let collId = null, old, kind;
  if (exists2) {
    ({ collId, mem: old } = await held(f, a.collection));
    kind = old.type;
    if ((spec.type ?? kind) !== kind) exit(`${a.collection} is a ${kind}: its type does not change`);
  } else {
    if (!spec.title) exit("a new collection needs a title");
    old = {
      members: []
    };
    kind = spec.type ?? "catalogue";
    if (!("type" in spec)) f.env.out(`${a.collection}: no type: a catalogue`);
  }
  const members = [];
  const r = await openResolver(f);
  for (const entry of spec.members ?? []) members.push(await syncMember(f, r, entry, kind, old.members));
  const mem = {
    format: FORMAT,
    type: kind,
    order: spec.order ?? old.order ?? "manual",
    members
  };
  const owner = spec.owner || f.archive.owner;
  if (!exists2) await f.initStorageRoot();
  return write(f, collId, mem, {
    message: a.message || `Members from ${a.fromFile.given}`,
    title: spec.title ?? null,
    description: spec.description ?? null,
    owner,
    label: a.collection
  });
}
async function syncMember(f, r, entry, kind, oldMembers) {
  if (typeof entry === "string") entry = {
    uri: entry
  };
  const text3 = entry.uri || entry.label;
  if (!text3) exit(`a member needs uri or label: ${pyRepr(entry)}`);
  let at = entry.at || [];
  at = typeof at === "string" ? [
    at
  ] : [
    ...at
  ];
  const { name: name2, owner, u, places } = await target(f, r, String(text3), at);
  const follow = [
    true,
    "yes",
    "true",
    "latest"
  ].includes(entry.follow);
  const revs = (entry.revisions || []).map((x) => Number.parseInt(x, 10));
  if (kind === "catalogue" && revs.length) exit(`${text3}: revisions are for selections`);
  const old = oldMembers.find((m2) => m2.name === name2 && m2.owner === owner) ?? null;
  if (old !== null && !u?.sha512) {
    const m2 = JSON.parse(JSON.stringify(old));
    if (at.length) m2.at = [
      .../* @__PURE__ */ new Set([
        ...at,
        ...m2.at
      ])
    ];
    if (kind === "catalogue") {
      delete m2.follow;
      if (follow) m2.follow = "latest";
      return m2;
    }
    const vetted2 = new Set(m2.revisions.map((x) => x.documentVersion));
    const asked = new Set(revs);
    if (!revs.length || asked.size === vetted2.size && [
      ...asked
    ].every((n) => vetted2.has(n))) {
      return m2;
    }
    const founds2 = await pinned(r, name2, owner, u, places, kind, revs.filter((n) => !vetted2.has(n)));
    m2.revisions = m2.revisions.filter((x) => revs.includes(x.documentVersion));
    for (const fd of founds2) m2.revisions.push(await revision(fd.copy, Number(fd.version.slice(1))));
    m2.revisions = sortRevisions(m2.revisions, historyOrder(founds2[0].copy));
    return m2;
  }
  const founds = await pinned(r, name2, owner, u, places, kind, revs);
  const recAt = recordedAt(f, r, founds[0], places);
  if (!recAt.length) exit(`${text3}: no https base URL where copies are found: give at (section 8.2)`);
  const c = founds[0].copy;
  const m = await memberRecord(kind, c, Number(founds[0].version.slice(1)), name2, owner, recAt, follow);
  if (kind === "selection") {
    const revisions = [];
    for (const fd of founds) revisions.push(await revision(fd.copy, Number(fd.version.slice(1))));
    m.revisions = sortRevisions(revisions, historyOrder(c));
  }
  return m;
}
function pyRepr(entry) {
  return "{" + Object.entries(entry).map(([k, v]) => `'${k}': ${typeof v === "string" ? `'${v}'` : JSON.stringify(v)}`).join(", ") + "}";
}

// core/website.js
function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function fill(text3, values) {
  for (const [k, v] of Object.entries(values)) text3 = text3.split(`{{${k}}}`).join(v);
  return text3;
}
var MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function fmtDate(iso) {
  if (!iso) return "";
  const parts = iso.split("/")[0].split("-");
  if (parts.length === 3) return `${Number(parts[2])} ${MONTHS[Number(parts[1]) - 1]} ${parts[0]}`;
  if (parts.length === 2) return `${MONTHS[Number(parts[1]) - 1]} ${parts[0]}`;
  return parts[0];
}
function namesJoined(names) {
  names = [
    ...names
  ];
  return names.length > 1 ? [
    names.slice(0, -1).join(", "),
    names[names.length - 1]
  ].join(" and ") : names.join("");
}
function authorsOf(dc) {
  return namesJoined(dc.creators.map(displayName));
}
var SPACE = /[\t\n\v\f\r\x1c-\x1f \x85\xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]+/;
function words(s) {
  return s.split(SPACE).filter(Boolean);
}
function pyJson(value) {
  if (Array.isArray(value)) return `[${value.map(pyJson).join(", ")}]`;
  if (value !== null && typeof value === "object") {
    return `{${Object.entries(value).map(([k, v]) => `${JSON.stringify(k)}: ${pyJson(v)}`).join(", ")}}`;
  }
  return JSON.stringify(value);
}
function arxivId(obj, dc) {
  for (const e of obj.external || []) {
    if (e.service === "arXiv" && (e.record || "").includes("/abs/")) {
      return e.record.slice(e.record.lastIndexOf("/abs/") + 5).replace(/v\d+$/, "");
    }
  }
  for (const r of dc.relatedIdentifiers || []) {
    if (r.relatedIdentifierType === "arXiv") {
      const k = r.relatedIdentifier.indexOf(":");
      return (k < 0 ? "" : r.relatedIdentifier.slice(k + 1)).replace(/v\d+$/, "");
    }
  }
  return null;
}
function changesNote(obj) {
  const text3 = obj.changes?.text;
  if (!text3) return null;
  const arxiv = (obj.external || []).some((e) => e.role === "source" && e.service === "arXiv");
  return `${arxiv ? "arXiv comments" : "changes"}: ${text3}`;
}
function presentedVersion(m, inv, objOf2) {
  if (m.revisions?.length) return m.revisions[m.revisions.length - 1].version;
  return currentVersion(inv, objOf2, m.version);
}
function lastPin(m) {
  const pins = memberPins(m);
  const p = pins[pins.length - 1];
  return [
    p.version,
    p.pin
  ];
}
async function pageAddress(f, id, ids = null) {
  const label = f.labelOf(id);
  if (label) return label;
  const [, name2, owner] = id.split(":");
  ids ??= (await f.objects()).map((o) => o.id);
  const same2 = ids.filter((i) => typeof i === "string" && i.startsWith(`sheaf:${name2}:`));
  return same2.length <= 1 ? name2 : `${name2}-${owner}`;
}
var Site = class {
  constructor(f, { keeperFetch = null, home = true } = {}) {
    this.f = f;
    this.home = home;
    this.lines = /* @__PURE__ */ new Map();
    this.keepers = /* @__PURE__ */ new Map();
    this.keeperFetch = keeperFetch;
    this.remotes = /* @__PURE__ */ new Map();
    this.ids = null;
    this.http = new Http({
      fetch: f.env.fetch,
      budget: null
    });
  }
  async held(m) {
    if (typeof m?.name !== "string" || typeof m?.owner !== "string") return null;
    const id = objectId(m.name, m.owner);
    if (!parseId(id) || parseId(id).draft) return null;
    let dir;
    try {
      dir = await this.f.dirOf(id);
    } catch {
      return null;
    }
    if (await this.f.storage.kind(joinPath(dir, "inventory.json")) !== "file") return null;
    if (!this.lines.has(id)) this.lines.set(id, await this.line(id, dir));
    return this.lines.get(id);
  }
  async line(id, dir) {
    const f = this.f;
    const [, name2, owner] = id.split(":");
    const inv = await f.inventory(dir);
    this.ids ??= (await f.objects()).map((o) => o.id);
    const slug = await pageAddress(f, id, this.ids);
    let originator = null;
    try {
      const g = await f.readLogical(dir, inv, GENESIS2, "v1");
      originator = g ? (await readGenesis(g)).originator ?? null : null;
    } catch {
      originator = null;
    }
    const read = await f.line(id);
    const json = (logical, ver = null) => f.readObjectJson(dir, inv, logical, ver);
    const line = {
      id,
      name: name2,
      owner,
      dir,
      inv,
      slug,
      originator,
      statuses: read.statuses,
      signed: read.latest,
      objs: read.objs,
      json,
      status: (ver) => read.statuses[Number(ver.slice(1)) - 1],
      digest: (ver) => read.versions[Number(ver.slice(1)) - 1].digest
    };
    line.objOf = (v) => read.objs.get(v) ?? null;
    line.state = await json(OBJ2, line.signed) || {};
    line.withdrawn = line.state.status === "withdrawn";
    return line;
  }
};
function removed(f, m) {
  return f.tombstones.some((t) => t.id === `sheaf:${m?.name}:${m?.owner}`);
}
function fullUri(line) {
  return new SheafUri({
    name: line.name,
    owner: line.owner
  }).canonical(line.originator);
}
function shortUri(line) {
  return `sheaf:${line.name.slice(0, 16)}` + (line.owner === line.originator ? "" : `:${line.owner.slice(0, 16)}`);
}
async function pinUri(line, ver) {
  const n = (await line.json(OBJ2, ver)).documentVersion;
  return `${fullUri(line)}/v${n}?sha512=${line.digest(ver)}`;
}
async function fileUrl(f, root, line, ver, logical) {
  const cp = logical ? contentPathOf(line.inv, ver, logical) : null;
  return cp ? `${root}ocfl/${(await f.dirOf(line.id)).slice("ocfl/".length)}/${cp}` : null;
}
function contentPathOf(inv, ver, logical) {
  for (const [d, paths] of Object.entries(inv.versions[ver || inv.head].state)) {
    if (paths.includes(logical)) return inv.manifest[d][0];
  }
  return null;
}
async function fileLink(f, root, line, ver, logical, label) {
  const u = await fileUrl(f, root, line, ver, logical);
  return u ? `<a href="${esc(u)}">${esc(label)}</a>` : "";
}
function withdrawalHtml(state, where2 = "") {
  if (state?.status !== "withdrawn") return "";
  const w = state.withdrawal || {};
  return `<div class="withdrawn"><strong>Withdrawn${where2} (${esc(fmtDate(w.date))}):</strong> ${esc(w.reason?.text ?? "")}</div>`;
}
function versionsLine(m, obj) {
  if (m.revisions?.length) {
    const ns = m.revisions.map((r) => String(r.documentVersion));
    return `vetted: version${ns.length > 1 ? "s" : ""} ${ns.join(", ")}`;
  }
  return `version ${obj.documentVersion}`;
}
async function versionBlock(f, line, ver, shown, notices, root, vetted2 = null) {
  const obj = await line.json(OBJ2, ver);
  const dc = await line.json("datacite.json", ver);
  const n = obj.documentVersion;
  const labels2 = (obj.external || []).filter((e) => e.role === "source" && e.label).map((e) => `${e.service} ${e.label}`);
  let head = `Version ${n}` + (labels2.length ? ` (${esc(labels2.join(", "))})` : "");
  if (obj.stage) head += ` <span class="stage">${esc(obj.stage.value)}</span>`;
  if (vetted2 !== null && vetted2.has(n)) head += ' <span class="current">vetted</span>';
  else if (vetted2 === null && n === shown) head += ' <span class="current">current</span>';
  const status = line.status(ver);
  if (status === VOUCHED) head += ' <span class="stage">vouched for</span>';
  else if (status !== SIGNED) head += ` <span class="contested">${esc(status)}</span>`;
  let when = "";
  if (dateOf(dc, "Available")) when = fmtDate(dateOf(dc, "Available"));
  else if (dateOf(dc, "Created")) when = `written ${fmtDate(dateOf(dc, "Created"))}, not public at the time`;
  const files = [];
  for (const r of obj.renditions || []) files.push(await fileLink(f, root, line, ver, r.path, "PDF"));
  if (obj.mainSource) {
    const kind = {
      "application/x-tex": "LaTeX source",
      "application/x-texmacs": "TeXmacs source"
    }[obj.sourceFormat] || "source";
    files.push(await fileLink(f, root, line, ver, obj.mainSource, kind));
  } else if (obj.sourcesMissing) {
    files.push(`<span class="missing">sources not available: ${esc(obj.sourcesMissing.text ?? "")}</span>`);
  }
  const at = (await f.dirOf(line.id)).slice("ocfl/".length);
  files.push(`<a href="${root}ocfl/${at}/${ver}/inventory.json">files and digests</a>`);
  const arxiv = arxivId(obj, dc);
  for (const e of obj.external || []) {
    if (e.record) {
      const label = e.service === "arXiv" && arxiv ? `arXiv:${arxiv}` : e.service;
      files.push(`<a href="${esc(e.record)}">${esc(label)}</a>`);
    }
  }
  if (arxiv && !(obj.external || []).some((e) => e.service === "arXiv")) {
    files.push(`<a href="https://arxiv.org/abs/${esc(arxiv)}">arXiv:${esc(arxiv)}</a>`);
  }
  if (dc.doi) files.push(`<a href="https://doi.org/${esc(dc.doi)}">doi:${esc(dc.doi)}</a>`);
  const out = [
    `<li class="version${n === shown ? " is-current" : ""}" id="v${n}">`,
    `<div class="version-head">${head}</div>`
  ];
  if (when) out.push(`<div class="version-date">${esc(when)}</div>`);
  if (changesNote(obj)) out.push(`<div class="changes">${esc(changesNote(obj))}</div>`);
  out.push(`<div class="files">${files.filter(Boolean).join(" \xB7 ")}</div>`);
  const uri = await pinUri(line, ver);
  out.push(`<div class="pin" title="${esc(uri)}">${ver} \xB7 pin <code class="copy" data-copy="${esc(uri)}">${line.digest(ver).slice(0, 32)}\u2026</code> (<a href="${root}ocfl/${at}/${ver}/inventory.json">inventory</a>)</div>`);
  for (const x of notices) {
    if (x.documentVersion === n) {
      const src = line.signed || line.inv.head;
      const link = x.path ? ` ${await fileLink(f, root, line, src, x.path, "statement")}` : "";
      out.push(`<div class="notice"><strong>Notice (${esc(fmtDate(x.date))}):</strong> ${esc(x.text ?? "")}${link}</div>`);
    }
  }
  out.push("</li>");
  return out.join("\n");
}
async function metaTags(f, line, cur, obj, dc) {
  const base = f.archive.baseUrl;
  const landing = `${base}paper/${line.slug}/`;
  const pdf = await fileUrl(f, base, line, cur, pdfOf(obj));
  const date2 = dateOf(dc, "Issued") || dateOf(dc, "Available") || dateOf(dc, "Created") || "";
  const tags = [
    `<meta name="citation_title" content="${esc(dc.titles[0].title)}">`
  ];
  for (const c of dc.creators) tags.push(`<meta name="citation_author" content="${esc(c.name)}">`);
  if (date2) tags.push(`<meta name="citation_publication_date" content="${esc(date2.replace(/-/g, "/"))}">`);
  if (pdf) tags.push(`<meta name="citation_pdf_url" content="${esc(pdf)}">`);
  if (dc.doi) tags.push(`<meta name="citation_doi" content="${esc(dc.doi)}">`);
  const abstract = (dc.descriptions || []).find((x) => x.descriptionType === "Abstract")?.description ?? "";
  if (abstract) tags.push(`<meta name="description" content="${esc([
    ...words(abstract).join(" ")
  ].slice(0, 300).join(""))}">`);
  const rights = (dc.rightsList?.length ? dc.rightsList : [
    {}
  ])[0];
  const cite2 = dc.doi ? `https://doi.org/${dc.doi}` : landing;
  tags.push(`<link rel="canonical" href="${esc(landing)}">`, `<link rel="cite-as" href="${esc(cite2)}">`, `<link rel="describedby" href="${esc(await fileUrl(f, base, line, cur, "datacite.json"))}" type="application/vnd.datacite.datacite+json">`);
  if (pdf) tags.push(`<link rel="item" href="${esc(pdf)}" type="application/pdf">`);
  if (rights.rightsUri) tags.push(`<link rel="license" href="${esc(rights.rightsUri)}">`);
  const ld = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    name: dc.titles[0].title,
    url: landing,
    author: dc.creators.map((c) => ({
      "@type": "Person",
      name: displayName(c)
    })),
    datePublished: date2,
    version: dc.version,
    identifier: [
      ...dc.doi ? [
        `https://doi.org/${dc.doi}`
      ] : [],
      fullUri(line)
    ]
  };
  if (pdf) ld.encoding = {
    "@type": "MediaObject",
    contentUrl: pdf,
    encodingFormat: "application/pdf"
  };
  if (abstract) ld.abstract = abstract;
  if (rights.rightsUri) ld.license = rights.rightsUri;
  tags.push('<script type="application/ld+json">' + pyJson(ld).replace(/<\//g, "<\\/") + "<\/script>");
  return tags.join("\n");
}
function abstractHtml(dc) {
  for (const x of dc.descriptions || []) {
    if (x.descriptionType === "Abstract") {
      return x.description.split("\n\n").map((p) => `<p>${esc(words(p).join(" "))}</p>`).join("\n");
    }
  }
  return "";
}
async function template(f, name2) {
  const html = f.index.html && typeof f.index.html === "object" ? f.index.html : {};
  const dir = html.templates || f.index.templates || "templates";
  const own2 = await f.storage.read(joinPath(dir, name2));
  if (own2) return own2;
  const given = await f.env.template?.(name2);
  if (!given) exit(`no template ${name2} (the templates of the website are not found)`);
  return given;
}
var text2 = async (f, name2) => new TextDecoder().decode(await template(f, name2));
async function render(f, members, { home = true, featured = null, keeperFetch = null } = {}) {
  const site = new Site(f, {
    keeperFetch,
    home
  });
  members = members.filter((m) => !removed(f, m));
  const base = f.archive.baseUrl;
  const urls = [
    [
      base,
      null
    ]
  ], written = [], seenOwners = [];
  const pageT = await text2(f, "paper.html");
  let fline = null, fmembers = [];
  if (featured) {
    fline = await site.held({
      name: featured.split(":")[1],
      owner: featured.split(":")[2]
    });
    fmembers = (await fline.json("members.json", fline.signed) || {}).members || [];
  }
  const pages = /* @__PURE__ */ new Map(), followed = /* @__PURE__ */ new Set();
  const walk = async (queue) => {
    while (queue.length) {
      const qm = queue.shift();
      const line = await site.held(qm);
      if (!line) continue;
      if (!pages.has(line.id)) pages.set(line.id, qm);
      if (qm.kind === "collection" && !followed.has(line.id)) {
        followed.add(line.id);
        const ver = presentedVersion(qm, line.inv, line.objOf);
        queue.push(...(await line.json("members.json", ver) || {}).members || []);
      }
    }
  };
  fmembers = fmembers.filter((m) => !removed(f, m));
  await walk([
    ...members,
    ...fmembers
  ]);
  for (const [, id] of [
    ...f.labels
  ].sort((a, b) => compareText(a[0], b[0]))) {
    const [, nm, owner] = id.split(":");
    const line = await site.held({
      name: nm,
      owner
    });
    if (!pages.has(id) && line && line.signed && [
      "document",
      "collection"
    ].includes(line.state.kind)) {
      await walk([
        {
          kind: line.state.kind,
          name: nm,
          owner,
          version: line.signed,
          inventorySha512: line.digest(line.signed)
        }
      ]);
    }
  }
  for (const [id, m] of pages) {
    const line = site.lines.get(id);
    const cur = presentedVersion(m, line.inv, line.objOf);
    const [pinVer, pin] = lastPin(m);
    const ref = line.signed || pinVer;
    const vetted2 = m.revisions ? new Set(m.revisions.map((r) => r.documentVersion)) : null;
    const obj = await line.json(OBJ2, cur);
    const dc = await line.json("datacite.json", cur);
    const notices = line.state.notices || [];
    const root = "../../";
    const blocks = [];
    for (const v of [
      ...historyOf(line.inv, line.objOf, ref || line.inv.head)
    ].reverse()) {
      blocks.push(await versionBlock(f, line, v, obj.documentVersion, notices, root, vetted2));
    }
    const issued = dateOf(dc, "Issued");
    const contested = line.status(cur) === CONTESTED || line.status(pinVer) === CONTESTED ? `<div class="contested"><strong>Contested:</strong> this version is signed only with keys its owner has since exposed (sections 6.3 and 7.3 of the specification); what it holds may not be the owner's.</div>` : "";
    const rights = (dc.rightsList?.length ? dc.rightsList : [
      {}
    ])[0];
    let licence2 = esc(rights.rights ?? "");
    if (rights.rightsUri) licence2 = `<a href="${esc(rights.rightsUri)}">${licence2}</a>`;
    const citeUrl = dc.doi ? `https://doi.org/${dc.doi}` : `${base}paper/${line.slug}/`;
    const cite2 = esc(`${authorsOf(dc)}. ${dc.titles[0].title}. ${f.archive.name}, ${(issued || "").slice(0, 4)}, version ${obj.documentVersion}.`) + ` <code class="copy">${esc(await pinUri(line, cur))}</code>. <a href="${esc(citeUrl)}">${esc(citeUrl)}</a>`;
    let htmlLink = "";
    if (await f.storage.kind(`site/${line.slug}/${line.slug}.html`) === "file") {
      htmlLink = ` \xB7 <a href="${root}site/${line.slug}/${line.slug}.html">HTML</a>`;
    }
    const at = (await f.dirOf(line.id)).slice("ocfl/".length);
    const common = {
      root,
      archive_name: esc(f.archive.name),
      base_url: esc(base),
      head: await metaTags(f, line, cur, obj, dc),
      title: esc(dc.titles[0].title),
      issued: esc(fmtDate(issued)),
      withdrawn: withdrawalHtml(line.state),
      contested,
      versions: blocks.join("\n"),
      licence: licence2,
      cite: cite2,
      pin,
      pin_url: `${root}ocfl/${at}/${pinVer}/inventory.json`,
      sheaf_uri: esc(fullUri(line)),
      sheaf_short: esc(shortUri(line)),
      owner: await ownerHtml(site, line.owner, root)
    };
    if (!seenOwners.includes(line.owner)) seenOwners.push(line.owner);
    let page;
    if (obj.kind === "collection") {
      const cmembers = await line.json("members.json", cur) || {};
      const kind = {
        selection: "A selection",
        catalogue: "A catalogue"
      }[cmembers.type] || "A collection";
      const items = [];
      for (const cm of cmembers.members || []) {
        if (!removed(f, cm)) items.push(await site.held(cm) ? await localEntry(site, cm, root) : await remoteEntry(site, cm, root));
      }
      page = fill(await text2(f, "collection.html"), {
        ...common,
        kind: `${kind} curated by ${esc(authorsOf(dc))}`,
        count: `${items.length} member${items.length !== 1 ? "s" : ""}`,
        description: abstractHtml(dc),
        members: items.length ? items.join("\n") : '<li class="empty">No members yet.</li>'
      });
    } else {
      page = fill(pageT, {
        ...common,
        authors: esc(authorsOf(dc)),
        abstract: abstractHtml(dc),
        pdf: esc(await fileUrl(f, root, line, cur, pdfOf(obj)) || `#v${obj.documentVersion}`),
        html_link: htmlLink
      });
    }
    await f.storage.write(`paper/${line.slug}/index.html`, new TextEncoder().encode(page));
    written.push(line.slug);
    const lastmod = line.inv.versions[line.inv.head].created.slice(0, 10);
    urls.push([
      `${base}paper/${line.slug}/`,
      lastmod
    ]);
    if (htmlLink) urls.push([
      `${base}site/${line.slug}/${line.slug}.html`,
      lastmod
    ]);
  }
  if (home) {
    await writeHome(site, members, featured, fline, fmembers);
  } else if (pageT.includes("style.css")) {
    await f.storage.write("style.css", await template(f, "style.css"));
  }
  const ownerPages = [];
  for (const owner of seenOwners) {
    const log = await keyLogOf(f, owner);
    if (!log) continue;
    const lines2 = [
      ...pages.keys()
    ].map((i) => site.lines.get(i)).filter((ln) => ln.owner === owner);
    await f.storage.write(`owner/${owner}/index.html`, new TextEncoder().encode(await ownerPage(site, owner, log, lines2)));
    ownerPages.push(owner);
    urls.push([
      `${base}owner/${owner}/`,
      null
    ]);
  }
  const sm = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];
  for (const [url, last] of urls) sm.push(`  <url><loc>${esc(url)}</loc>` + (last ? `<lastmod>${last}</lastmod>` : "") + "</url>");
  sm.push("</urlset>");
  await f.storage.write("sitemap.xml", new TextEncoder().encode(sm.join("\n") + "\n"));
  for (const [folder, keep] of [
    [
      "paper",
      new Set(written)
    ],
    [
      "owner",
      new Set(ownerPages)
    ]
  ]) {
    for (const entry of await f.storage.list(folder) || []) {
      if (entry.kind === "dir" && !keep.has(entry.name)) await removeAll(f.storage, `${folder}/${entry.name}`);
    }
  }
  return written.length;
}
async function removeAll(storage, path) {
  if (await storage.kind(path) === "dir") {
    for (const entry of await storage.list(path) || []) await removeAll(storage, `${path}/${entry.name}`);
  }
  await storage.remove(path);
}
async function keyLogOf(f, owner) {
  try {
    return await f.keyLog(owner);
  } catch {
    return null;
  }
}
async function writeHome(site, members, featured, fline, fmembers) {
  const f = site.f;
  const entries = [];
  for (const m of members) entries.push(await site.held(m) ? await localEntry(site, m) : await remoteEntry(site, m));
  let featuredHtml = "";
  if (featured) {
    const fdc = await fline.json("datacite.json", fline.signed);
    const items = [];
    for (const fm of fmembers) items.push(await site.held(fm) ? await localEntry(site, fm) : await remoteEntry(site, fm));
    featuredHtml = `<section class="featured">
<h2>${esc(fdc.titles[0].title)}</h2>
<ol class="papers">
` + (items.length ? items.join("\n") : '<li class="empty">No members yet.</li>') + "\n</ol>\n</section>";
  }
  let lead = 'Papers with their sources, every version, fixed by digests and signed by their owners. An <a href="https://opensheaf.org">OpenSheaf</a> archive: programs start from <a href="opensheaf.json">opensheaf.json</a>.';
  const mainId = f.labels.get(f.archive.mainCollection);
  const cline = featured ? fline : mainId ? site.lines.get(mainId) || await site.held({
    name: mainId.split(":")[1],
    owner: mainId.split(":")[2]
  }) : null;
  const cmem = cline ? await cline.json("members.json", cline.signed) || {} : {};
  if (featured || cmem.order === "manual") {
    const cdc = await cline.json("datacite.json", cline.signed);
    const desc = (cdc.descriptions || [])[0]?.description ?? "";
    lead = esc(desc) + ' A collection in the <a href="https://opensheaf.org">OpenSheaf</a> format: each member is kept in its own archive and pinned by a digest' + (cmem.type === "selection" ? ", in the versions its curator vetted" : "") + '; programs start from <a href="opensheaf.json">opensheaf.json</a>.';
  }
  const index = fill(await text2(f, "index.html"), {
    root: "",
    archive_name: esc(f.archive.name),
    base_url: esc(f.archive.baseUrl),
    lead,
    papers: entries.length ? entries.join("\n") : '<li class="empty">No documents yet.</li>',
    featured: featuredHtml,
    papers_heading: featured ? "<h2>In this archive</h2>" : "",
    count: String(entries.length),
    updated: esc(fmtDate(f.env.today()))
  });
  await f.storage.write("index.html", new TextEncoder().encode(index));
  await f.storage.write("style.css", await template(f, "style.css"));
  if (!await f.storage.kind(".nojekyll")) await f.storage.write(".nojekyll", new Uint8Array());
}
async function localEntry(site, m, root = "") {
  const f = site.f;
  const line = await site.held(m);
  const cur = presentedVersion(m, line.inv, line.objOf);
  const [pinVer, pin] = lastPin(m);
  const obj = await line.json(OBJ2, cur);
  const dc = await line.json("datacite.json", cur);
  const issued = dateOf(dc, "Issued");
  const pdf = await fileUrl(f, root, line, cur, pdfOf(obj));
  const abstract = abstractHtml(dc);
  const summary = obj.kind === "collection" ? "Description" : "Abstract";
  const contested = [
    line.status(cur),
    line.status(pinVer)
  ].includes(CONTESTED);
  return [
    `<li class="paper${line.withdrawn ? " withdrawn" : ""}">`,
    `<a class="paper-title" href="${root}paper/${line.slug}/">${esc(dc.titles[0].title)}</a>`,
    `<div class="paper-authors">${esc(authorsOf(dc))}</div>`,
    `<div class="paper-meta">${esc((issued || "").slice(0, 4))} \xB7 ${versionsLine(m, obj)}` + (pdf ? ` \xB7 <a href="${esc(pdf)}">PDF</a>` : "") + (contested ? ' \xB7 <span class="contested">contested</span>' : "") + ` \xB7 <span class="pin" title="${pin}">pin ${pin.slice(0, 32)}\u2026</span></div>`,
    abstract ? `<details><summary>${summary}</summary>${abstract}</details>` : "",
    "</li>"
  ].join("\n");
}
async function remoteEntry(site, m, root = "") {
  const cite2 = m.cite || {};
  let title = cite2.title || m.name, by = namesJoined(cite2.creators || []);
  const year = cite2.year ?? "";
  const pin = lastPin(m)[1];
  const links = [];
  let abstract = "", landing = "", withdrawn = "";
  let at = (m.at?.length ? m.at : [
    ""
  ])[0];
  let archiveName = at;
  const view = await remoteView(site, m);
  if (view === null) {
    links.push('<span class="missing">archive unavailable: cached citation</span>');
  } else if (view.mismatch) {
    ({ archive: archiveName, at } = view);
    links.push('<span class="contested">mismatch: its archive holds another version under this pin</span>');
  } else {
    ({ archive: archiveName, at } = view);
    const dc = view.dc;
    title = dc.titles[0].title;
    by = authorsOf(dc);
    abstract = abstractHtml(dc);
    if (view.pdf) links.push(`<a href="${esc(view.pdf)}">PDF</a>`);
    landing = dc.url || "";
    if (landing) links.unshift(`<a href="${esc(landing)}">landing page</a>`);
    withdrawn = withdrawalHtml(view.state || {}, " by its owner");
  }
  return [
    `<li class="paper member${withdrawn ? " withdrawn" : ""}">`,
    landing ? `<a class="paper-title" href="${esc(landing)}">${esc(title)}</a>` : `<span class="paper-title">${esc(title)}</span>`,
    `<div class="paper-authors">${esc(by)}</div>`,
    `<div class="paper-meta">${esc(String(year))} \xB7 in <a href="${esc(at)}">${esc(archiveName)}</a>` + (m.revisions ? ` \xB7 ${versionsLine(m, {})}` : "") + (links.length ? " \xB7 " + links.join(" \xB7 ") : "") + ` \xB7 <span class="pin" title="${pin}">pin ${pin.slice(0, 32)}\u2026</span></div>`,
    withdrawn,
    abstract ? `<details><summary>Abstract</summary>${abstract}</details>` : "",
    "</li>"
  ].join("\n");
}
function safePath(rel) {
  return typeof rel === "string" && Boolean(rel) && !rel.startsWith("/") && !rel.includes("\\") && rel.split("/").every((x) => ![
    "",
    ".",
    ".."
  ].includes(x));
}
async function remoteSource(site, at) {
  if (!site.remotes.has(at)) {
    site.remotes.set(at, (async () => {
      const url = at.endsWith("/") ? at : at + "/";
      const get = async (rel) => {
        try {
          return await site.http.cached(url + rel.split("/").map(encodeURIComponent).join("/"));
        } catch (error) {
          if (error.kind === "not-found") return null;
          throw error;
        }
      };
      const raw = await get("opensheaf.json");
      if (raw === null) throw new Error("no discovery document");
      const disc = JSON.parse(new TextDecoder().decode(raw));
      if (disc === null || typeof disc !== "object" || disc.specification !== "0.2") throw new Error("not 0.2");
      const root = disc.storageRoot ?? "ocfl/";
      if (typeof root !== "string" || root.includes(":") || !safePath(root.replace(/\/+$/, "")) || !root.endsWith("/")) {
        throw new Error("storage root");
      }
      const hint = at.startsWith("https://") ? at.endsWith("/") ? at : at + "/" : null;
      return {
        disc,
        root,
        get,
        at: hint
      };
    })());
  }
  return site.remotes.get(at);
}
async function remoteView(site, m) {
  const id = objectId(m.name, m.owner);
  const [pinVer, pin] = lastPin(m);
  for (const at of m.at || []) {
    try {
      const src = await remoteSource(site, at);
      const path = src.root + (await pathOf(id, src.disc.storageLayout)).join("/");
      const data2 = await src.get(`${path}/${pinVer}/inventory.json`);
      if (data2 === null) continue;
      const view = {
        archive: src.disc.name || at,
        at: src.at || at
      };
      if (await sha512hex(data2) !== pin) return {
        ...view,
        mismatch: true
      };
      const inv = JSON.parse(new TextDecoder().decode(data2));
      const read = async (ver, logical, from = inv) => {
        const cp2 = contentPathOf(from, ver, logical);
        const raw = cp2 && safePath(cp2) ? await src.get(`${path}/${cp2}`) : null;
        return raw ? JSON.parse(new TextDecoder().decode(raw)) : null;
      };
      let shown;
      if (m.revisions) {
        shown = pinVer;
      } else {
        const hist = (await read(pinVer, OBJ2) || {}).history;
        if (hist?.length) {
          shown = hist[hist.length - 1];
        } else {
          const last = /* @__PURE__ */ new Map();
          for (let k = 1; k <= Number(pinVer.slice(1)); k++) {
            const o = Object.hasOwn(inv.versions, `v${k}`) ? await read(`v${k}`, OBJ2) : null;
            if (o) last.set(o.documentVersion, `v${k}`);
          }
          if (!last.size) continue;
          shown = last.get(Math.max(...last.keys()));
        }
      }
      view.dc = await read(shown, "datacite.json");
      const lp = pdfOf(await read(shown, OBJ2) || {});
      const cp = lp ? contentPathOf(inv, shown, lp) : null;
      if (cp && safePath(cp) && src.at) view.pdf = `${src.at}${path}/${cp}`;
      const entry = (src.disc.objects || []).find((o) => o && typeof o === "object" && o.id === id) || {};
      if (entry.status === "withdrawn") {
        const rootInv = JSON.parse(new TextDecoder().decode(await src.get(`${path}/inventory.json`) || new TextEncoder().encode("{}")));
        const state = rootInv.versions ? await read(rootInv.head ?? pinVer, OBJ2, rootInv) : null;
        view.state = state?.status === "withdrawn" ? state : {
          status: "withdrawn"
        };
      }
      if (!view.dc) continue;
      return view;
    } catch {
      continue;
    }
  }
  return null;
}
async function keeperLinkOf(site, log) {
  if (!site.keepers.has(log.owner)) site.keepers.set(log.owner, await keeperLink(log, site.keeperFetch || site.f.env.fetchJson));
  return site.keepers.get(log.owner);
}
async function keeperHtml(site, log) {
  const keeper = await keeperOf(log);
  if (!keeper) return "";
  const mark = (await keeperLinkOf(site, log)).status === CONFIRMED ? " (confirmed)" : "";
  return `<a href="${esc(keeper)}">${esc(keeper)}</a>${mark}`;
}
async function ownerHtml(site, owner, root) {
  const log = await keyLogOf(site.f, owner);
  const name2 = `<code>${esc(owner)}</code>`;
  let out = log ? `<a href="${root}owner/${owner}/">${name2}</a>` : name2;
  const keeper = log ? await keeperHtml(site, log) : "";
  if (keeper) out += ` \xB7 keeper ${keeper}`;
  const notes = ownerNotes(log);
  return out + (notes.length ? ` \xB7 <span class="contested">${esc(notes.join("; "))}</span>` : "");
}
function ownerNotes(log) {
  if (!log) return [];
  const out = [];
  if (log.forkPoint) out.push(`ended by a fork of its key log at v${log.forkPoint}`);
  else if (log.ended) out.push("ended");
  if (log.successor) out.push(`successor ${log.successor}`);
  const exposed = log.exposedKeys();
  if (exposed.size) out.push(`${exposed.size} key${exposed.size !== 1 ? "s" : ""} exposed`);
  return out;
}
async function ownerPage(site, owner, log, lines2) {
  const f = site.f;
  const side = log.side();
  const last = side.length ? side[side.length - 1] : null;
  const keys = last ? last.keys || {} : {};
  const facts = [
    `<li>Key log <code class="copy">sheaf:${esc(owner)}</code>, ${log.versions.length} version${log.versions.length !== 1 ? "s" : ""}` + (last ? `; latest <code class="copy">sheaf:${esc(owner)}/v${last.number}?sha512=${last.digest}</code>` : "") + "</li>"
  ];
  const keeper = await keeperHtml(site, log);
  if (keeper) {
    facts.push(`<li>Keeper: ${keeper}</li>`);
    const link = await keeperLinkOf(site, log);
    const claim = successorClaim(log, link);
    if (claim) facts.push(`<li>Successor ${esc(claim)}: <code>${esc(link.successor)}</code></li>`);
  }
  const latest = log.latest();
  if (latest !== null) {
    facts.push(`<li>Current keys (${latest.keys.threshold} of ${latest.keys.keys.length} sign):<ul>` + latest.keys.keys.map((k) => `<li><code>${esc(k)}</code></li>`).join("") + "</ul></li>");
    facts.push(`<li>Rotation keys committed to: ${(keys.next || []).length}, of which ${keys.nextThreshold ?? "None"} sign the next version of the key log</li>`);
  }
  facts.push(`<li>Rotations, exposures and ends: ${Math.max(side.length - 1, 0)}</li>`);
  const exposed = [
    ...log.exposedKeys()
  ].sort(compareText);
  if (exposed.length) {
    facts.push('<li class="contested">Exposed keys (what they alone signed is contested):<ul>' + exposed.map((k) => `<li><code>${esc(k)}</code></li>`).join("") + "</ul></li>");
  }
  if (log.forkPoint) facts.push(`<li class="contested">Ended by a fork of its key log at v${log.forkPoint}</li>`);
  else if (log.ended) facts.push('<li class="contested">Ended: it signs nothing more</li>');
  if (log.successor) facts.push(`<li>Successor named by its ending version: <code>${esc(log.successor)}</code></li>`);
  const items = [];
  for (const ln of lines2) {
    const title = (await ln.json("datacite.json", ln.signed) || {}).titles?.[0]?.title ?? ln.slug;
    items.push(`<li><a href="../../paper/${ln.slug}/">${esc(title)}</a> <code class="small">${esc(fullUri(ln))}</code></li>`);
  }
  return fill(await text2(f, "owner.html"), {
    root: "../../",
    archive_name: esc(f.archive.name),
    base_url: esc(f.archive.baseUrl),
    owner: esc(owner),
    facts: facts.join("\n"),
    lines: items.length ? items.join("\n") : '<li class="empty">No lines with a page here.</li>'
  });
}
async function mainMembers(f) {
  const mainId = f.labels.get(f.archive.mainCollection);
  const dir = mainId ? await f.dirOf(mainId) : null;
  const inv = dir ? await f.inventory(dir) : null;
  if (inv === null) return null;
  const ver = await f.latestSigned(mainId);
  if (ver === null) {
    f.env.err("warning: the main catalogue has no signed version (section 7.3): nothing is presented");
    return null;
  }
  return (await f.readObjectJson(dir, inv, "members.json", ver)).members;
}
function hasWebsite(f) {
  return Boolean(f.index.html || f.index.template);
}
async function readableIndex(f, options = {}) {
  if (f.index.template && !f.index.html) {
    f.env.warn("the TeXmacs index (index.template) is written by opensheaf-py: run osheaf index of opensheaf-py to write it and its landing pages again");
    return;
  }
  const members = await mainMembers(f);
  if (members === null) return;
  const html = f.index.html && typeof f.index.html === "object" ? f.index.html : {};
  const featured = html.featured || null;
  let fid = null;
  if (featured) {
    fid = f.labels.get(featured) ?? null;
    if (fid === null) {
      exit(`osheaf.json: index.html.featured names ${featured}, which is not a label of this archive`);
    }
    const fd = await f.dirOf(fid);
    if ((await f.readObjectJson(fd, await f.inventory(fd), OBJ2) || {}).kind !== "collection") {
      exit(`osheaf.json: index.html.featured names ${featured}, which is not a collection`);
    }
  }
  const pages = await render(f, members, {
    featured: fid,
    ...options
  });
  f.env.out(`Done: opensheaf.json, index.html, ${plural(pages, "landing page")} and sitemap.xml written.`);
}
async function present(f) {
  if (!hasWebsite(f) || f.old) return;
  try {
    await readableIndex(f);
  } catch (error) {
    f.env.err(`warning: the website was not regenerated (${error.message}); run osheaf index`);
  }
}

// core/rules.js
function finding(level2, place3, message2, { object = null, ver = null } = {}) {
  const section = /\(sections? ([0-9A-Z][^)]*)\)/.exec(message2)?.[1]?.split(/,| and /)[0].trim() ?? null;
  return {
    level: level2,
    place: place3,
    message: message2,
    object,
    ver,
    section,
    text: `${place3}: ${message2}`
  };
}
function schemaFindings(place3, data2, schema4, level2 = "error", context = {}) {
  if (!schema4) return [];
  return validate(schema4, data2).map((e) => finding(level2, place3, `${e.path ? e.path + ": " : ""}${e.message}`, context));
}
function descriptionErrors(inv, ver, obj, dc) {
  const out = [];
  const logical = Object.keys(filesOf(inv, ver));
  if (!isObject(obj) || !isObject(dc)) return out;
  if (String(obj.documentVersion) !== dc.version) out.push("datacite.json and object.json disagree on the version");
  if (obj.status === "withdrawn" && dateOf(dc, "Withdrawn") !== (obj.withdrawal?.date ?? null)) out.push("withdrawal dates disagree");
  for (const k of [
    "titles",
    "creators",
    "publicationYear",
    "types",
    "version",
    "publisher"
  ]) {
    if (!Object.hasOwn(dc, k)) out.push(`datacite.json lacks ${k}`);
  }
  for (const r of Array.isArray(dc.rightsList) ? dc.rightsList : []) {
    const rights = typeof r?.rights === "string" ? r.rights.toLowerCase() : "";
    if (r?.rightsIdentifier == null && (rights.startsWith("creative") || rights.startsWith("arxiv")) && !r?.rightsUri) {
      out.push("licence without SPDX identifier and without rightsUri");
    }
  }
  const notes = [
    obj.changes,
    obj.sourcesMissing,
    obj.licence,
    ...Array.isArray(obj.notices) ? obj.notices : [],
    obj.withdrawal?.reason
  ];
  for (const note of notes) {
    if (note?.path && !logical.includes(note.path)) out.push(`note file ${note.path} not in the version`);
  }
  if (obj.kind === "document") {
    if (obj.mainSource && !logical.includes(obj.mainSource)) out.push("main source not in the version");
    if (obj.sourcesMissing && obj.mainSource) out.push("sourcesMissing together with a main source");
    for (const r of Array.isArray(obj.renditions) ? obj.renditions : []) {
      if (!logical.includes(r?.path)) out.push(`rendition ${r?.path} not in the version`);
    }
  } else if (obj.kind === "collection" && !logical.includes("members.json")) {
    out.push("collection without members.json");
  }
  return out;
}
function memberErrors(type, m) {
  const out = [];
  if (type === "catalogue" && (!m?.version || !m?.inventorySha512 || isObject(m) && Object.hasOwn(m, "revisions"))) {
    out.push("a member of a catalogue needs version and inventorySha512, and no revisions");
  }
  if (type === "selection") {
    const revs = m?.revisions;
    if ([
      "version",
      "inventorySha512",
      "follow"
    ].some((k) => isObject(m) && Object.hasOwn(m, k))) {
      out.push("a member of a selection has no version, inventorySha512 or follow");
    }
    if (!Array.isArray(revs) || !revs.length || revs.some((r) => ![
      "documentVersion",
      "version",
      "inventorySha512"
    ].every((k) => r?.[k]))) {
      out.push("a member of a selection needs revisions, each with documentVersion, version and inventorySha512");
    } else if (new Set(revs.map((r) => r.documentVersion)).size !== revs.length) {
      out.push("a document version is vetted twice");
    }
  }
  return out;
}
function memberPins2(m) {
  if (isObject(m) && Object.hasOwn(m, "revisions")) {
    return (Array.isArray(m.revisions) ? m.revisions : []).map((r) => ({
      version: r?.version,
      pin: r?.inventorySha512,
      documentVersion: r?.documentVersion ?? null
    }));
  }
  return [
    {
      version: m?.version,
      pin: m?.inventorySha512,
      documentVersion: null
    }
  ];
}
var INDEX_KEY2 = {
  names: "name",
  owners: "owner",
  sha512: "inventorySha512"
};
function indexEntries2(objects) {
  const out = {
    names: [],
    owners: [],
    sha512: []
  };
  const lines2 = /* @__PURE__ */ new Map();
  for (const o of objects) {
    const [, name2, owner] = o.id.split(":");
    const entry = {
      name: name2,
      owner,
      id: o.id,
      status: o.status,
      originator: o.rec.kind === "owner" ? owner : o.rec.originator ?? null,
      genesis: new TextDecoder().decode(o.genesis)
    };
    if (o.label) entry.label = o.label;
    out.names.push(entry);
    if (!lines2.has(owner)) lines2.set(owner, []);
    lines2.get(owner).push(name2);
    o.sidecars.forEach((digest, k) => {
      if (digest !== null) out.sha512.push({
        inventorySha512: digest,
        id: o.id,
        version: `v${k + 1}`,
        status: o.status
      });
    });
    for (const c of o.carried || []) {
      out.sha512.push({
        inventorySha512: c.digest,
        id: o.id,
        version: `v${c.number}`,
        status: "active"
      });
    }
  }
  out.owners = [
    ...lines2
  ].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([owner, names]) => ({
    owner,
    names: names.sort()
  }));
  return out;
}

// core/branches.js
var INCONSISTENT = "inconsistent";
var CONFIRMED2 = "confirmed";
var UNCHECKED2 = "unchecked";
var ORDER2 = {
  [CONFIRMED2]: 0,
  [UNCHECKED2]: 1,
  [INCONSISTENT]: 2
};
var MAX_DEPTH = 64;
function level(digests, read) {
  return {
    digests,
    read,
    sub(prefix) {
      const below = /* @__PURE__ */ new Map();
      for (const [p, d] of digests) if (p.startsWith(prefix)) below.set(p.slice(prefix.length), d);
      return level(below, (p) => read(prefix + p));
    },
    async json(path) {
      return digests.has(path) ? jsonOrNull(await read(path)) : null;
    }
  };
}
function levelOfVersion(archive, id, inv, ver, options = {}) {
  const digests = new Map(Object.entries(filesOf(inv, ver)));
  return level(digests, (p) => archive.bytes(id, inv, ver, p, options));
}
async function verdict(lv, obj, genesis, logs, depth = 0) {
  const p = obj?.parent;
  if (!isObject(p)) return [
    INCONSISTENT,
    [
      "object.json has no parent"
    ]
  ];
  if (depth > MAX_DEPTH) return [
    UNCHECKED2,
    [
      `the chain is not followed beyond ${MAX_DEPTH} levels`
    ]
  ];
  const problems = [];
  let rec;
  try {
    rec = await readGenesis(genesis);
  } catch (error) {
    return [
      INCONSISTENT,
      [
        `genesis.json: ${error.message}`
      ]
    ];
  }
  const name2 = typeof obj.name === "string" ? obj.name : "", pname = typeof p.name === "string" ? p.name : "";
  if (!await isNameOf(name2, genesis) || !await isNameOf(pname, genesis)) {
    problems.push("the name and parent.name are not names of genesis.json (section 5.2)");
  } else if (name2 !== pname && algorithm(name2) <= algorithm(pname)) {
    problems.push("a branch renamed after a clash has a greater algorithm number than parent.name (section 5.3)");
  }
  const pinvBytes = lv.digests.has("parent.inventory.json") ? await lv.read("parent.inventory.json") : null;
  const pinv = jsonOrNull(pinvBytes);
  const pobj = await lv.json("parent.object.json");
  if (!isObject(pinv) || !isObject(pobj)) {
    return [
      INCONSISTENT,
      [
        ...problems,
        "parent.inventory.json or parent.object.json is missing (section 9.2)"
      ]
    ];
  }
  if (await sha512(pinvBytes) !== p.inventorySha512 || pinv.head !== p.objectVersion) {
    problems.push("parent.inventory.json is not the inventory the pin of parent names");
  }
  const pstate = /* @__PURE__ */ new Map();
  const state = pinv.versions?.[pinv.head]?.state;
  for (const [d, paths] of Object.entries(isObject(state) ? state : {})) {
    for (const path of Array.isArray(paths) ? paths : []) pstate.set(path, d);
  }
  if (pstate.get("object.json") !== lv.digests.get("parent.object.json")) {
    problems.push("parent.object.json is not the object.json the parent inventory records");
  }
  if (depth === 0) {
    const own2 = [
      "datacite.json",
      "object.json"
    ];
    for (const [path, d] of pstate) {
      if (own2.includes(path) || isEvidence(path)) continue;
      if (lv.digests.get(path) !== d) problems.push(`${path}: a file of the parent version is missing, or differs (section 9.3)`);
    }
    for (const path of lv.digests.keys()) {
      if (!own2.includes(path) && !isEvidence(path) && !pstate.has(path)) problems.push(`${path}: not a file of the parent version (section 9.3)`);
    }
  }
  if (p.owner !== pobj.owner || p.name !== pobj.name || p.documentVersion !== pobj.documentVersion) {
    problems.push("parent does not agree with parent.object.json");
  }
  if (obj.owner === p.owner || obj.owner === rec.originator) {
    problems.push("the owner of a branch is neither the parent's owner nor the originator (section 9.3)");
  }
  if (!(p.owner === rec.originator && !("parent" in pobj) || "parent" in pobj)) {
    problems.push("the parent is the originator's line, or a branch with its own parent (section 9.3)");
  }
  const log = await logs(p.owner);
  const pid = NAME.test(pname) && OWNER_NAME.test(p.owner || "") ? objectId(pname, p.owner) : null;
  if (pid === null) return [
    INCONSISTENT,
    [
      ...problems,
      "parent does not name a line"
    ]
  ];
  const witnesses = /* @__PURE__ */ new Map();
  for (const path of lv.digests.keys()) {
    const rest = path.slice("parent.signatures/".length);
    if (path.startsWith("parent.signatures/") && !rest.includes("/")) witnesses.set(rest, await lv.read(path));
  }
  const judgements = await judgeFolder(witnesses, {
    objectId: pid,
    version: p.objectVersion,
    inventory: p.inventorySha512,
    owner: p.owner,
    lookup: log ? (n, d) => log.lookup(n, d) : () => null
  });
  const status = lineStatuses([
    judgements
  ], log ? {
    exposed: log.exposedKeys(),
    forkPoint: log.forkPoint
  } : {})[0];
  if (status === UNSIGNED || status === INVALID) problems.push(`the parent version is not a version: ${status} (sections 7.3 and 9.3)`);
  let result = status === SIGNED || status === VOUCHED ? CONFIRMED2 : UNCHECKED2;
  const notes = result === CONFIRMED2 ? [] : [
    `the parent version is ${status} (section 9.3)`
  ];
  if (problems.length) return [
    INCONSISTENT,
    problems
  ];
  if ("parent" in pobj) {
    const chain = lv.sub("parent.chain/");
    const evidence = new Map([
      ...pstate
    ].filter(([path]) => isEvidence(path)));
    if (chain.digests.size !== evidence.size || [
      ...evidence
    ].some(([path, d]) => chain.digests.get(path) !== d)) {
      return [
        INCONSISTENT,
        [
          "parent.chain/ is not the evidence of the parent version (section 9.3)"
        ]
      ];
    }
    const [sub, more] = await verdict(chain, pobj, genesis, logs, depth + 1);
    if (sub === INCONSISTENT) return [
      INCONSISTENT,
      more.map((m) => `parent.chain/: ${m}`)
    ];
    notes.push(...more.map((m) => `parent.chain/: ${m}`));
    if (ORDER2[sub] > ORDER2[result]) result = sub;
  }
  return [
    result,
    notes
  ];
}

// core/verify.js
var Report = class {
  constructor(archive, options) {
    this.archive = archive;
    this.options = options;
    this.findings = [];
    this.stats = {
      objects: 0,
      versions: 0,
      pins: 0,
      files: 0,
      filesBytes: 0
    };
    this.started = /* @__PURE__ */ new Date();
    this.finished = null;
    this.cancelled = false;
    this.requests = 0;
    this.bytesRead = 0;
    this.listeners = /* @__PURE__ */ new Set();
  }
  add(...found2) {
    for (const f of found2) {
      this.findings.push(f);
      for (const listen of this.listeners) listen(f);
    }
  }
  counts() {
    const counts = {
      error: 0,
      warning: 0,
      result: 0
    };
    for (const f of this.findings) counts[f.level]++;
    return counts;
  }
  text() {
    const lines2 = this.findings.map((f) => `${f.level}: ${f.text}`);
    const c = this.counts();
    return [
      ...lines2,
      (c.error ? `${c.error} error(s)` : "OK") + `, ${c.warning} warning(s), ${c.result} result(s)`
    ].join("\n");
  }
};
async function verify(given, { schemas: schemas2, remote = true, digests = false, signal, progress = () => {
}, onFinding, pages = true } = {}) {
  const report = new Report(given, {
    remote,
    digests
  });
  if (onFinding) report.listeners.add(onFinding);
  const http = given.http.another({
    budget: null
  });
  const options = {
    signal
  };
  const aborted = (e) => e?.kind === "aborted" || signal?.aborted;
  const add2 = (level2, place3, message2, context) => report.add(finding(level2, place3, message2, context));
  const schema4 = (place3, data2, format, level2 = "error", context = {}) => report.add(...schemaFindings(place3, data2, schemas2[`opensheaf-${format}/0.2`], level2, context));
  let archive;
  try {
    archive = await Archive.open(http, given.base, options);
    archive.lister = given.lister ?? null;
    archive.unlisted = given.unlisted ?? [];
    report.archive = archive;
    if (archive.old) {
      add2("error", "archive", "specification 0.1: rebuild (section 16.1)");
    } else {
      const v = new Verification(archive, {
        report,
        add: add2,
        schema: schema4,
        options,
        aborted,
        remote,
        digests,
        progress,
        http,
        pages
      });
      await v.run();
    }
  } catch (error) {
    if (!aborted(error)) throw error;
    report.cancelled = true;
  }
  report.finished = /* @__PURE__ */ new Date();
  report.requests = http.requests;
  report.bytesRead = http.bytesRead;
  return report;
}
var Verification = class {
  constructor(archive, context) {
    Object.assign(this, context);
    this.archive = archive;
    this.found = /* @__PURE__ */ new Map();
    this.logs = /* @__PURE__ */ new Map();
    this.statuses = /* @__PURE__ */ new Map();
    this.tombstoned = new Set(archive.tombstones().map((t) => t.id));
    this.resolver = context.remote ? new Resolver(context.http, archive) : null;
  }
  where(id) {
    return this.archive.where(id);
  }
  async run() {
    const a = this.archive;
    this.schema("opensheaf.json", a.disc, "archive");
    await this.storageRoot();
    const ids = [
      ...a.objects().map((o) => o.id),
      ...a.drafts().map((d) => d.id),
      ...a.unlisted || []
    ];
    const entries = [
      ...new Set(ids)
    ].slice(0, LIMITS.objects);
    if (ids.length > entries.length) this.add("warning", "opensheaf.json", `lists more than ${LIMITS.objects} objects: only the first ${LIMITS.objects} are checked (section 15.2)`);
    let done = 0;
    const atOnce = pool(4);
    this.progress({
      phase: "objects",
      done,
      total: entries.length
    });
    await Promise.all(entries.map((id) => atOnce(async () => {
      if (this.options.signal?.aborted) return;
      await this.objectStorage(id);
      this.report.stats.objects++;
      this.progress({
        phase: "objects",
        done: ++done,
        total: entries.length,
        current: id
      });
    })));
    this.cancelled();
    await this.keyLogs();
    await this.lines();
    await this.archiveAsAWhole();
    await this.indexes();
    if (this.pages) await this.presentation();
    if (this.digests) await this.contentDigests();
    for (const { level: level2, message: message2 } of this.resolver?.notes || []) this.add(level2, "resolution", message2);
  }
  cancelled() {
    if (this.options.signal?.aborted) throw this.options.signal.reason;
  }
  async fetchOrNull(url, limit = LIMITS.json) {
    try {
      return await this.http.request(url, {
        limit,
        signal: this.options.signal
      });
    } catch (error) {
      if (this.aborted(error)) throw error;
      if (error.kind === "not-found") return null;
      throw error;
    }
  }
  async storageRoot() {
    const a = this.archive;
    const root = a.root;
    const read = async (name2) => {
      try {
        return await this.fetchOrNull(root + name2, 1 << 20);
      } catch (error) {
        if (this.aborted(error)) throw error;
        return null;
      }
    };
    if (await read("0=ocfl_1.1") === null) this.add("error", "ocfl", "no OCFL 1.1 storage root (0=ocfl_1.1)");
    const declared = a.disc.storageLayout;
    if (declared !== OWNER_NAME_LAYOUT && declared !== HASHED_LAYOUT) {
      this.add("error", "opensheaf.json", `storageLayout is ${declared}, not a layout of section 3.2`);
    }
    if (a.layout === OWNER_NAME_LAYOUT) {
      if (await read("ocfl_layout.json") !== null) {
        this.add("error", "ocfl", "ocfl_layout.json names only registered layouts: the owner-name layout has none (section 3.2)");
      }
      if (await read(LAYOUT_FILE) === null) this.add("warning", "ocfl", `${LAYOUT_FILE}, which describes the layout, is missing (section 3.2)`);
    } else {
      const layout = jsonOrNull(await read("ocfl_layout.json"));
      if (layout?.extension !== HASHED_LAYOUT) this.add("error", "ocfl", `ocfl_layout.json must name the extension ${HASHED_LAYOUT} (section 3.2)`);
      const config = jsonOrNull(await read(`extensions/${HASHED_LAYOUT}/config.json`));
      if (config && ((config.digestAlgorithm ?? "sha256") !== "sha256" || (config.tupleSize ?? 3) !== 3 || (config.numberOfTuples ?? 3) !== 3)) {
        this.add("error", "ocfl", "the hashed layout keeps its default parameters (section 3.2)");
      }
    }
  }
  async objectStorage(id) {
    const a = this.archive;
    const place3 = this.where(id);
    const options = this.options;
    const listed = (message2) => this.add("error", "opensheaf.json", message2, {
      object: id
    });
    let rootBytes;
    try {
      await a.locate(id);
      if (await this.fetchOrNull(a.url(id, "0=ocfl_object_1.1"), 4096) === null) {
        listed(`lists ${id}, which is not an object of the storage root (section 3.1)`);
        return;
      }
      rootBytes = await a.inventoryBytes(id, null, options);
    } catch (error) {
      if (this.aborted(error)) throw error;
      if (error.kind === "not-found") listed(`lists ${id}, which is not an object of the storage root (section 3.1)`);
      else this.add("error", `ocfl/${(a.paths.get(id) || [
        id
      ]).join("/")}`, "an object without a readable inventory", {
        object: id
      });
      return;
    }
    const inv = jsonOrNull(rootBytes);
    if (!isObject(inv) || !isObject(inv.versions) || !isObject(inv.manifest)) {
      this.add("error", `ocfl/${a.paths.get(id).join("/")}`, "an object without a readable inventory", {
        object: id
      });
      return;
    }
    if (inv.id !== id) {
      const expected = parseId(inv.id) ? (await a.locate(inv.id).catch(() => null))?.join("/") : null;
      this.add("error", this.where(inv.id), expected ? `is at ocfl/${a.paths.get(id).join("/")}, and its identifier puts it at ocfl/${expected} (section 3.2)` : `${inv.id}: not the identifier of a line or of a draft (sections 3.2 and 4)`, {
        object: id
      });
      listed(`lists ${id}, which is not an object of the storage root (section 3.1)`);
      return;
    }
    const kindOfHead = await a.json(id, inv, inv.head, "object.json", options).catch((e) => {
      if (this.aborted(e)) throw e;
      return null;
    });
    const kind = kindOfHead?.kind;
    const draft = Boolean(parseId(id).draft);
    const o = {
      id,
      inv,
      rootBytes,
      head: kindOfHead,
      objs: /* @__PURE__ */ new Map(),
      digests: [],
      sidecars: [],
      kind,
      draft
    };
    this.found.set(id, o);
    const at = (ver) => ({
      object: id,
      ver
    });
    if (inv.digestAlgorithm !== "sha512") this.add("error", place3, "the digest algorithm is not sha512 (section 4.1)", at());
    const rootDigest = await sha512(rootBytes);
    const sc = await a.sidecarBytes(id, null, options).catch((e) => {
      if (this.aborted(e)) throw e;
      return null;
    });
    if (!sc || sidecarDigest(sc) !== rootDigest) this.add("error", place3, "the checksum file of the inventory does not state its digest", at());
    o.sidecar = sc ? sidecarDigest(sc) : null;
    const head = typeof inv.head === "string" ? inv.head : "";
    const headCopy = /^v[0-9]+$/.test(head) ? await this.fetchOrNull(a.inventoryUrl(id, head)).catch(() => null) : null;
    if (!headCopy || await sha512(headCopy) !== rootDigest) this.add("error", place3, `the inventory of ${head} is not the root inventory`, at());
    const names = Object.keys(inv.versions).sort((x, y) => (Number(x.slice(1)) || 0) - (Number(y.slice(1)) || 0));
    for (const [k, ver] of names.entries()) {
      const n = k + 1;
      const where2 = `${place3} ${ver}`;
      this.report.stats.versions++;
      if (ver !== `v${n}`) {
        this.add("error", where2, "versions are numbered v1, v2, ... without zero padding (section 4.1)", at(ver));
        continue;
      }
      const copy = await this.fetchOrNull(a.inventoryUrl(id, ver)).catch((e) => {
        if (this.aborted(e)) throw e;
        return null;
      });
      const copySc = await a.sidecarBytes(id, ver, this.options).catch((e) => {
        if (this.aborted(e)) throw e;
        return null;
      });
      o.digests[k] = copy ? await sha512(copy) : "";
      o.sidecars[k] = copySc ? sidecarDigest(copySc) : null;
      if (!copy || !copySc) {
        this.add("error", where2, "no copy of the inventory with its checksum file in the version folder (section 4.1)", at(ver));
      } else {
        if (sidecarDigest(copySc) !== o.digests[k]) this.add("error", where2, "the checksum file of the inventory copy does not state its digest", at(ver));
        const c = jsonOrNull(copy) || {};
        const upto = names.slice(0, n);
        if (c.head !== ver) this.add("error", where2, `the inventory copy has the head ${c.head ?? "None"}`, at(ver));
        const theirs = isObject(c.versions) ? Object.keys(c.versions).sort() : [];
        if (!same(theirs, [
          ...upto
        ].sort())) {
          this.add("error", where2, `the inventory copy does not record exactly the versions v1 to ${ver}`, at(ver));
        } else if (upto.some((v) => !same(c.versions[v], inv.versions[v]))) {
          this.add("error", where2, "the inventory copy disagrees with the inventory about the versions it records", at(ver));
        }
      }
      const vinfo = isObject(inv.versions[ver]) ? inv.versions[ver] : {};
      if (!(kind === "owner" && n === 1) && (!vinfo.user?.name || !vinfo.message)) {
        this.add("error", where2, "a version has a user with a name, and a message (section 4.1)", at(ver));
      }
      const logical = Object.keys(filesOf(inv, ver));
      for (const p of [
        ...logical
      ].sort()) {
        if (logicalPathProblem(p)) this.add("error", where2, `the logical path '${p}' breaks the rules of section 4.1`, at(ver));
      }
      const needed = [
        "object.json",
        ...kind !== "owner" ? [
          "datacite.json"
        ] : [],
        ...draft ? [] : [
          "genesis.json"
        ]
      ];
      for (const name2 of needed) if (!logical.includes(name2)) this.add("error", where2, `has no ${name2} (section 4.1)`, at(ver));
      if (!logical.includes("object.json")) continue;
      let obj = null;
      try {
        obj = await a.json(id, inv, ver, "object.json", this.options);
      } catch (error) {
        if (this.aborted(error)) throw error;
        this.add("error", where2, `object.json cannot be read: ${error.detail || error.message}`, at(ver));
      }
      o.objs.set(ver, obj);
      if (!obj || kind === "owner") continue;
      this.schema(`${where2}/object.json`, obj, "object", "error", at(ver));
      if (n === 1 || draft) {
        if (isObject(obj) && "previous" in obj) this.add("error", where2, "a first version, or a draft, has no previous (section 4.3)", at(ver));
      } else if (!isObject(obj) || !("previous" in obj)) {
        this.add("error", where2, "object.json has no previous (section 4.3)", at(ver));
      } else if (obj.previous !== o.sidecars[k - 1]) {
        this.add("error", where2, `previous is not the digest of the inventory of v${n - 1} (section 4.3)`, at(ver));
      }
    }
  }
  async keyLogs() {
    for (const [id, o] of this.found) {
      if (o.kind !== "owner") continue;
      const place3 = this.where(id);
      const owner = parseId(id).owner;
      let log;
      try {
        log = await this.archive.keyLog(owner, this.options);
      } catch (error) {
        if (this.aborted(error)) throw error;
        this.add("error", place3, error.detail || error.message, {
          object: id
        });
        continue;
      }
      if (!log) continue;
      const { errors, warnings } = await log.check();
      for (const e of errors) this.add("error", place3, e, {
        object: id
      });
      for (const w of warnings) this.add("warning", place3, w, {
        object: id
      });
      const genesis = jsonOrNull(log.genesis);
      if (genesis) this.schema(`${place3} v1/genesis.json`, genesis, "genesis", "error", {
        object: id,
        ver: "v1"
      });
      for (const v of log.versions) {
        if (v.keys !== null) this.schema(`${place3} v${v.number}/keys.json`, v.keys, "keys", "error", {
          object: id,
          ver: `v${v.number}`
        });
      }
      this.logs.set(log.owner, log);
      const held2 = log.versions.filter((v) => v.isVersion);
      if (held2.length) this.add("result", place3, `key log of ${log.owner}: latest version v${held2[held2.length - 1].number}`, {
        object: id
      });
      for (const did of [
        ...log.exposedKeys()
      ].sort()) this.add("result", place3, `exposed key ${did}`, {
        object: id
      });
      if (log.forkPoint) this.add("result", place3, `ended by a fork of its key log at v${log.forkPoint} (section 6.3)`, {
        object: id
      });
      else if (log.ended) {
        this.add("result", place3, "ended (section 6.3)" + (log.successor ? `, successor ${log.successor} (named by the ending version)` : ""), {
          object: id
        });
      }
    }
  }
  async lines() {
    const genesisNames = /* @__PURE__ */ new Map();
    for (const [id, o] of this.found) {
      this.cancelled();
      const head = o.objs.get(o.inv.head) || {};
      if (o.kind === "owner") continue;
      const place3 = this.where(id);
      const a = this.archive;
      if (o.draft) {
        const g = await a.bytes(id, o.inv, o.inv.head, "genesis.json", this.options).catch(() => null);
        if ([
          "name",
          "owner",
          "parent"
        ].some((k) => isObject(head) && k in head) || g) {
          this.add("error", place3, "a draft has no genesis record, and no name, owner or parent (section 10.1)", {
            object: id
          });
        }
        continue;
      }
      const [, name2, owner] = id.split(":");
      let genesis = null;
      for (const ver of versionsOf(o.inv)) {
        const g = await a.bytes(id, o.inv, ver, "genesis.json", this.options).catch((e) => {
          if (this.aborted(e)) throw e;
          return null;
        });
        const obj = o.objs.get(ver) || {};
        if (obj.name !== name2 || obj.owner !== owner) {
          this.add("error", `${place3} ${ver}`, "object.json does not record the line of the identifier (section 4.3)", {
            object: id,
            ver
          });
        }
        if (!g) continue;
        if (genesis === null) genesis = g;
        else if (!sameBytes2(g, genesis)) this.add("error", `${place3} ${ver}`, "genesis.json differs from that of v1 (section 5.1)", {
          object: id,
          ver
        });
      }
      o.genesis = genesis;
      let rec = null;
      if (genesis !== null) {
        try {
          rec = await readGenesis(genesis);
          this.schema(`${place3} genesis.json`, parseJson(genesis, "", {
            integers: true
          }), "genesis", "error", {
            object: id
          });
        } catch (error) {
          this.add("error", place3, `genesis.json: ${error.message}`, {
            object: id
          });
        }
      }
      o.rec = rec;
      if (rec !== null) {
        const g0 = await nameOf(genesis);
        if (!genesisNames.has(g0)) genesisNames.set(g0, []);
        genesisNames.get(g0).push([
          id,
          isObject(head) && "parent" in head
        ]);
        if (rec.kind !== head.kind) {
          this.add("error", place3, `its genesis record is of kind ${rec.kind}, its object.json of kind ${head.kind}`, {
            object: id
          });
        }
        if (!await isNameOf(name2, genesis)) {
          this.add("error", place3, "its name is not a name of its genesis record (section 5.2)", {
            object: id
          });
        } else if (rec.originator !== owner) {
          if (isObject(head) && "parent" in head) await this.branch(id, o, genesis);
          else this.add("error", place3, "a line of another owner than the originator is a branch, and declares its parent (section 5.3)", {
            object: id
          });
        } else if (algorithm(name2) !== 0) {
          this.add("error", place3, "the originator's line is named by algorithm 0 (section 5.3)", {
            object: id
          });
        } else if ([
          ...o.objs.values()
        ].some((x) => isObject(x) && "parent" in x)) {
          this.add("error", place3, "the originator's line has no parent: an originator never owns a branch of its own work (sections 5.3 and 9)", {
            object: id
          });
        }
      }
      for (const ver of versionsOf(o.inv)) {
        const obj = o.objs.get(ver);
        if (!obj || !filesOf(o.inv, ver)["datacite.json"]) continue;
        const dc = await a.json(id, o.inv, ver, "datacite.json", this.options).catch((e) => {
          if (this.aborted(e)) throw e;
          return null;
        });
        for (const message2 of descriptionErrors(o.inv, ver, obj, dc)) this.add("error", `${place3} ${ver}`, message2, {
          object: id,
          ver
        });
      }
      if (head.kind === "document") {
        for (const e of documentVersionErrors(o.inv, (v) => o.objs.get(v) ?? null)) this.add("error", place3, `${e.ver} ${e.message}`, {
          object: id,
          ver: e.ver
        });
      }
      let log = this.logs.get(owner) ?? null;
      if (!log) {
        const ownerId = objectId(owner, owner);
        this.add(this.tombstoned.has(ownerId) ? "warning" : "error", place3, `the key log of its owner ${owner} is not in the storage root (section 6.5)`, {
          object: id
        });
      }
      const line = await a.line(id, {
        log,
        signal: this.options.signal
      });
      o.line = line;
      this.statuses.set(id, line.statuses);
      line.statuses.forEach((s, k) => {
        const ver = `v${k + 1}`, where2 = `${place3} ${ver}`;
        for (const j of line.judgements[k]) if (j.status !== GOOD) this.add("warning", where2, `${j.file}: ${j.status}: ${j.reason}`, {
          object: id,
          ver
        });
        for (const n of line.listed?.[k] || []) {
          if (!(n.startsWith("signature-") && n.endsWith(".json"))) this.add("warning", where2, `${n}: not a witness these tools know (section 7.2)`, {
            object: id,
            ver
          });
        }
        if (s === UNSIGNED || s === INVALID) this.add("warning", where2, `not a version of the line: ${s} (sections 7.3 and 7.5)`, {
          object: id,
          ver
        });
        else if (s === UNCHECKED) this.add("warning", where2, "unchecked: the version of the key log its signatures name is not reached (section 7.3)", {
          object: id,
          ver
        });
        else if (s === CONTESTED) this.add("result", where2, "contested (section 7.3)", {
          object: id,
          ver
        });
      });
      for (const x of await a.listFolder(id, ...WITNESSES.split("/")) || []) {
        if (!(x.kind === "dir" && Object.hasOwn(o.inv.versions, x.name))) {
          this.add("warning", place3, `${WITNESSES}/${x.name}: not the folder of a version (section 7.2)`, {
            object: id
          });
        }
      }
      const signed = latestSigned(line.statuses);
      if (signed === null) this.add("warning", place3, "the line has no signed version (section 7.3)", {
        object: id
      });
      else {
        this.add("result", place3, `latest signed version v${signed}`, {
          object: id
        });
        if (o.objs.get(`v${signed}`)?.status === "withdrawn") this.add("result", place3, "withdrawn (section 13.1)", {
          object: id
        });
      }
    }
    for (const ids of genesisNames.values()) {
      const lines2 = ids.filter(([, branch]) => !branch).map(([id]) => id);
      if (lines2.length > 1) {
        this.add("error", lines2.map((id) => this.where(id)).join(", "), "objects with the same genesis record: only the originator's line and its branches may share one (section 5.4)");
      }
    }
    for (const [id, o] of this.found) {
      if (o.kind === "collection" && this.statuses.has(id)) await this.members(id, o);
    }
  }
  async branch(id, o, genesis) {
    const a = this.archive;
    const place3 = this.where(id);
    const [, name2, owner] = id.split(":");
    let prevObj = null, prevEvidence = null;
    const verdicts = [];
    for (const ver of versionsOf(o.inv)) {
      const where2 = `${place3} ${ver}`;
      const obj = o.objs.get(ver) || {};
      const files = filesOf(o.inv, ver);
      const evidence = Object.fromEntries(Object.entries(files).filter(([p3]) => p3 === "genesis.json" || isEvidencePath(p3)));
      const p2 = obj.parent;
      if (!isObject(p2)) {
        this.add("error", where2, "every version of a branch has parent (section 9.1)", {
          object: id,
          ver
        });
        continue;
      }
      if (prevObj !== null && same(p2, prevObj.parent)) {
        if (!same(evidence, prevEvidence)) this.add("error", where2, "the identity files change without moving the branch point (section 9.4)", {
          object: id,
          ver
        });
      } else {
        const [v, problems] = await verdict(levelOfVersion(a, id, o.inv, ver, this.options), obj, genesis, async (who) => this.logs.get(who) ?? null);
        verdicts.push(v);
        if (v === INCONSISTENT) this.add("error", where2, "inconsistent branch point: " + problems.join("; "), {
          object: id,
          ver
        });
        else if (v === UNCHECKED2) this.add("warning", where2, "unchecked branch point: " + problems.join("; "), {
          object: id,
          ver
        });
        if (prevObj !== null && v !== INCONSISTENT) await this.movedBranchPoint(id, o, ver, p2, prevObj.parent, where2);
      }
      prevObj = obj;
      prevEvidence = evidence;
    }
    if (!verdicts.length) return;
    const worst = verdicts.reduce((x, y) => ORDER2[y] > ORDER2[x] ? y : x);
    const p = prevObj.parent;
    const pid = objectId(p.name, p.owner);
    this.add("result", place3, `a branch of ${this.where(pid)}: ${worst} (section 9.3)`, {
      object: id
    });
    if (this.found.has(pid)) {
      const line = await a.line(pid, {
        log: this.logs.get(p.owner) ?? null,
        signal: this.options.signal
      });
      const status = line.latest ? line.objs.get(line.latest)?.status : null;
      this.add("result", place3, "the parent's line is held here" + (status === "withdrawn" ? ", withdrawn" : ""), {
        object: id
      });
    } else if (this.tombstoned.has(pid)) {
      this.add("result", place3, "the parent's line is removed: a tombstone in this archive (section 13.3)", {
        object: id
      });
    } else if (this.resolver) {
      const at = typeof p.url === "string" ? await this.resolver.archiveOf(p.url, this.options) : [];
      const res = await this.resolver.latest(p.name, p.owner, at, this.options);
      this.add("result", place3, `the parent's line: ${res.status}` + (res.copy ? ` at ${res.copy.where}` : ""), {
        object: id
      });
    } else {
      this.add("result", place3, "the parent's line is not held here (osheaf verify --remote looks for it)", {
        object: id
      });
    }
    if (name2 !== p.name && algorithm(name2) > algorithm(p.name)) {
      const gone = new Set(a.tombstones().filter((t) => t.owner === owner).map((t) => t.name));
      for (let k = algorithm(p.name); k < algorithm(name2); k++) {
        const other = await nameOf(genesis, k);
        if (!this.found.has(objectId(other, owner)) && !gone.has(other)) {
          this.add("warning", place3, `renamed by algorithm ${algorithm(name2)}, though algorithm ${k} gives a line free here (section 5.3)`, {
            object: id
          });
          break;
        }
      }
    }
    if (owner === o.rec?.originator) this.add("error", place3, "an originator never owns a branch of its own work (section 5.3)", {
      object: id
    });
  }
  async movedBranchPoint(id, o, ver, p, old, where2) {
    const a = this.archive;
    const before = `v${versionNumber(ver) - 1}`;
    const read = async (v) => jsonOrNull(await a.bytes(id, o.inv, v, "parent.inventory.json", this.options).catch(() => null)) || {};
    const [oldInv, newInv] = [
      await read(before),
      await read(ver)
    ];
    if (p.owner !== old.owner || p.name !== old.name) {
      this.add("error", where2, "a branch point moves only to a version of the same parent line (section 9.4)", {
        object: id,
        ver
      });
    } else if (versionNumber(p.objectVersion) <= versionNumber(old.objectVersion) || p.documentVersion === old.documentVersion) {
      this.add("error", where2, "a branch point moves only to a higher object version, holding another document version (section 9.4)", {
        object: id,
        ver
      });
    }
    const oldVersions = isObject(oldInv.versions) ? oldInv.versions : {};
    const newVersions = isObject(newInv.versions) ? newInv.versions : {};
    const manifest = isObject(newInv.manifest) ? newInv.manifest : {};
    if (oldInv.id !== newInv.id || Object.entries(oldVersions).some(([v, e]) => !same(newVersions[v], e)) || Object.values(oldVersions).some((e) => Object.keys(isObject(e?.state) ? e.state : {}).some((d) => !Object.hasOwn(manifest, d)))) {
      this.add("error", where2, "the new parent inventory does not continue the previous one (section 9.4)", {
        object: id,
        ver
      });
    }
  }
  async members(id, o) {
    const a = this.archive;
    for (const ver of versionsOf(o.inv)) {
      this.cancelled();
      const at = `${this.where(id)} ${ver}`;
      const mem = await a.json(id, o.inv, ver, "members.json", this.options).catch((e) => {
        if (this.aborted(e)) throw e;
        return null;
      });
      if (!mem) continue;
      this.schema(`${at}/members.json`, mem, "collection", "error", {
        object: id,
        ver
      });
      const type = mem.type;
      if (type !== "catalogue" && type !== "selection") this.add("error", at, "members.json has no valid type (catalogue or selection)", {
        object: id,
        ver
      });
      for (const m of Array.isArray(mem.members) ? mem.members : []) {
        const mid = objectId(m?.name, m?.owner);
        const who = `${at} member ${this.where(mid)}`;
        const context = {
          object: id,
          ver
        };
        for (const message2 of memberErrors(type, m)) this.add("error", who, message2, context);
        if (this.found.has(mid)) {
          await this.memberHeld(m, mid, who, type, context);
        } else if (ver === o.inv.head) {
          await this.memberElsewhere(m, mid, who, context);
        }
      }
    }
  }
  async memberHeld(m, mid, who, type, context) {
    const a = this.archive;
    const held2 = this.found.get(mid);
    const sts = this.statuses.get(mid) || [];
    for (const { version: pv, pin, documentVersion: n } of memberPins2(m)) {
      this.report.stats.pins++;
      const k = typeof pv === "string" && /^v[1-9][0-9]*$/.test(pv) ? versionNumber(pv) : 0;
      const digest = k ? held2.digests[k - 1] : void 0;
      if (!digest) {
        this.add("warning", `${who} ${pv}`, "unavailable: the copy held here lacks this version", context);
        continue;
      }
      if (digest !== pin) {
        this.add("error", `${who} ${pv}`, "mismatch: the inventory held here has another digest (section 8.5)", context);
        continue;
      }
      const pobj = held2.objs.get(pv) || {};
      if (pobj.kind !== m.kind || pobj.name !== m.name || pobj.owner !== m.owner) {
        this.add("error", `${who} ${pv}`, "kind, name and owner are not those of the version pinned (section 8.5)", context);
      }
      if (n !== null && pobj.documentVersion !== n) this.add("error", `${who} ${pv}`, `does not hold document version ${n}`, context);
      const s = k <= sts.length ? sts[k - 1] : null;
      if (s === UNSIGNED || s === INVALID) this.add("error", `${who} ${pv}`, "not a version: a collection pins only signed versions (section 8.5)", context);
      else if (s === UNCHECKED || s === CONTESTED) this.add("warning", `${who} ${pv}`, `${s} (section 8.5)`, context);
    }
    if (type === "selection" && sts.length) {
      const signed = latestSigned(sts);
      const objOf2 = (v) => held2.objs.get(v) ?? null;
      const order = historyOf(held2.inv, objOf2, signed ? `v${signed}` : held2.inv.head).map((h) => objOf2(h)?.documentVersion);
      const vetted2 = (Array.isArray(m.revisions) ? m.revisions : []).map((r) => r?.documentVersion);
      const pos = vetted2.filter((x) => order.includes(x)).map((x) => order.indexOf(x));
      if (pos.some((p, i) => i > 0 && p < pos[i - 1])) this.add("error", who, "revisions not in the order of the history (section 8.4)", context);
    }
  }
  async memberElsewhere(m, mid, who, context) {
    if (this.resolver) {
      for (const { version: pv, pin, documentVersion: n } of memberPins2(m)) {
        this.report.stats.pins++;
        const res = await this.resolver.pin(m.name, m.owner, pv, pin, Array.isArray(m.at) ? m.at : [], this.options);
        if (res.copy) {
          const pobj = res.copy.obj(versionNumber(pv)) || {};
          if (pobj.kind !== m.kind || pobj.name !== m.name || pobj.owner !== m.owner || n !== null && pobj.documentVersion !== n) {
            this.add("error", `${who} ${pv}`, "the version pinned is not of the kind, line and document version the member gives (section 8.5)", context);
          }
        }
        if (res.status === "not a version") this.add("error", `${who} ${pv}`, "not a version: a collection pins only signed versions (section 8.5)", context);
        else if (res.status === "verified") this.add("result", `${who} ${pv}`, `verified at ${res.copy ? res.copy.where : "?"} (section 8.5)`, context);
        else this.add("warning", `${who} ${pv}`, `${res.status} (section 8.5)`, context);
        this.progress({
          phase: "members",
          done: this.report.stats.pins,
          total: this.report.stats.pins,
          current: mid
        });
      }
    } else if (this.tombstoned.has(mid)) {
      this.add("result", who, "removed: a tombstone in this archive (section 13.3)", context);
    } else {
      this.add("warning", who, "not held in this archive: not resolved (osheaf verify --remote resolves it, section 14.5)", context);
    }
  }
  status(id, o) {
    if (o.kind === "owner") return "active";
    const latest = o.line?.latest;
    return ((latest ? o.objs.get(latest) : o.objs.get(o.inv.head)) || {}).status ?? "active";
  }
  async archiveAsAWhole() {
    const a = this.archive;
    const disc = a.disc;
    const listed = /* @__PURE__ */ new Map();
    for (const e of Array.isArray(disc.objects) ? disc.objects : []) {
      if (!isObject(e)) continue;
      if (listed.has(e.id)) this.add("error", "opensheaf.json", `lists ${this.where(e.id)} twice`);
      listed.set(e.id, e);
    }
    const needed = /* @__PURE__ */ new Set();
    for (const id of this.found.keys()) {
      const parts = parseId(id);
      if (parts && !parts.draft) needed.add(objectId(parts.owner, parts.owner));
    }
    for (const kid of needed) {
      if (this.found.has(kid) || listed.has(kid)) continue;
      const owner = parseId(kid).owner;
      const log = await a.keyLog(owner, this.options).catch(() => null);
      if (log) this.add("error", "opensheaf.json", `does not list ${this.where(kid)}, an object of the storage root (section 3.1)`);
    }
    const fields = [
      "kind",
      "name",
      "owner",
      "head",
      "inventorySha512",
      "status"
    ];
    for (const [id, o] of this.found) {
      if (o.draft) continue;
      const e = listed.get(id);
      if (!e) {
        this.add("error", "opensheaf.json", `does not list ${this.where(id)}, an object of the storage root (section 3.1)`, {
          object: id
        });
        continue;
      }
      const expected = {
        kind: o.head?.kind ?? null,
        name: o.head?.name ?? null,
        owner: o.head?.owner ?? null,
        head: o.inv.head,
        inventorySha512: o.sidecar,
        status: this.status(id, o)
      };
      const stale = fields.filter((k) => (e?.[k] ?? null) !== expected[k]);
      if (stale.length) {
        this.add("error", "opensheaf.json", `the entry of ${this.where(id)} is stale: ` + stale.map((k) => `${k} ${py(e?.[k])} instead of ${py(expected[k])}`).join(", "), {
          object: id
        });
      }
    }
    const labels2 = [
      ...listed.values()
    ].map((e) => e.label).filter(Boolean);
    for (const lb of [
      ...new Set(labels2.filter((x, k) => labels2.indexOf(x) !== k))
    ].sort()) {
      this.add("error", "opensheaf.json", `the label ${lb} is given twice (section 3.1)`);
    }
    const main = disc.mainCollection;
    if (main === void 0 || main === null) {
      this.add("warning", "opensheaf.json", "no mainCollection (section 3.1)");
    } else if (!listed.has(main) || listed.get(main).kind !== "collection") {
      this.add("error", "opensheaf.json", `mainCollection ${main} is not a collection it lists`);
    } else if (this.found.has(main)) {
      const o = this.found.get(main);
      const mem = await a.json(main, o.inv, o.inv.head, "members.json", this.options).catch(() => null) || {};
      if (mem.type !== "catalogue") this.add("error", "opensheaf.json", "mainCollection is not a catalogue (section 8.1)");
      if (Array.isArray(disc.owners)) {
        for (const m of Array.isArray(mem.members) ? mem.members : []) {
          if (!disc.owners.includes(m?.owner)) {
            this.add("warning", "opensheaf.json", `the main catalogue lists ${m?.name}, a line of an owner that owners does not list (section 8.1)`);
          }
        }
      }
    }
    for (const owner of a.owners()) {
      if (!this.found.has(objectId(owner, owner))) this.add("warning", "opensheaf.json", `owners lists ${owner}, whose key log is not held here (section 3.1)`);
    }
    for (const d of Array.isArray(disc.drafts) ? disc.drafts : []) {
      const o = this.found.get(d?.id);
      if (!o || !o.draft || o.inv.head !== d.head) {
        this.add("error", "opensheaf.json", `drafts lists ${d?.id}, which is not a draft held with that head`);
      }
    }
    const used = /* @__PURE__ */ new Set();
    for (const o of this.found.values()) {
      if (isObject(o.head?.extensions)) for (const k of Object.keys(o.head.extensions)) used.add(k);
      if (o.kind === "owner") {
        const log = this.logs.get(parseId(o.id).owner);
        const ext = log?.extensions();
        if (isObject(ext)) for (const k of Object.keys(ext)) used.add(k);
      }
    }
    const declared = Array.isArray(disc.extensions) ? disc.extensions : [];
    for (const e of [
      ...used
    ].filter((x) => !declared.includes(x)).sort()) {
      this.add("warning", "opensheaf.json", `extensions does not list ${e}, which objects use (section 3.1)`);
    }
    const seen = /* @__PURE__ */ new Set();
    for (const t of Array.isArray(disc.tombstones) ? disc.tombstones : []) {
      const tid = t?.id;
      if (tid !== objectId(t?.name, t?.owner)) this.add("error", "opensheaf.json", `the tombstone ${tid} is not the line of its name and owner (section 13.3)`);
      if (seen.has(tid)) this.add("error", "opensheaf.json", `two tombstones of ${tid}`);
      seen.add(tid);
      if (this.found.has(tid) || listed.has(tid)) {
        this.add("error", "opensheaf.json", `${tid} has a tombstone, and is an object of the archive (section 13.3)`);
      } else if (t?.kind === "owner" && needed.has(tid)) {
        this.add("warning", "opensheaf.json", `a tombstone stands for the key log ${tid}, which lines of the archive need: only the law or its keeper justifies it (section 13.2)`);
      } else {
        this.add("result", "opensheaf.json", `removed: ${tid} (${py(t?.date)}: ${py(t?.reason)})`);
      }
    }
  }
  async indexes() {
    const a = this.archive;
    const declared = isObject(a.disc.indexes) ? a.disc.indexes : {};
    if (!Object.keys(declared).length) {
      this.add("warning", "opensheaf.json", "no indexes declared (section 12.5)");
      return;
    }
    const objects = [];
    for (const [id, o] of this.found) {
      if (o.draft) continue;
      if (o.kind === "owner") {
        const log = this.logs.get(parseId(id).owner);
        if (!log) continue;
        objects.push({
          id,
          rec: {
            kind: "owner"
          },
          genesis: log.genesis,
          status: "active",
          label: a.labelOf(id),
          sidecars: o.sidecars,
          carried: log.versions.filter((v) => v.forkRecord).flatMap((v) => v.carried)
        });
      } else if (o.rec) {
        objects.push({
          id,
          rec: o.rec,
          genesis: o.genesis,
          status: this.status(id, o),
          label: a.labelOf(id),
          sidecars: o.sidecars
        });
      }
    }
    const expected = indexEntries2(objects);
    const gone = new Map(a.tombstones().map((t) => [
      t.id,
      t
    ]));
    const listedNames = [];
    const order = (x) => [
      "owners",
      "names",
      "sha512"
    ].indexOf(x);
    for (const [index, length] of Object.entries(declared).sort(([x], [y]) => order(x) - order(y))) {
      if (!Object.hasOwn(INDEX_KEY2, index)) continue;
      const key = INDEX_KEY2[index];
      const want = expected[index];
      const prefixes = new Set(want.map((e) => String(e[key]).slice(0, length)));
      if (index === "names") for (const n of listedNames) prefixes.add(n.slice(0, length));
      for (const t of gone.values()) {
        const k = index === "names" ? t.name : index === "owners" ? t.owner : t.inventorySha512;
        if (typeof k === "string") prefixes.add(k.slice(0, length));
      }
      const held2 = [];
      for (const p of [
        ...prefixes
      ].sort()) {
        const place3 = `${index}/${p}.json`;
        let data2;
        try {
          const bytes = await this.fetchOrNull(a.base + place3);
          if (bytes === null) continue;
          data2 = parseJson(bytes);
        } catch (error) {
          if (this.aborted(error)) throw error;
          this.add("error", place3, `not JSON: ${error.message}`);
          continue;
        }
        this.schema(place3, data2, "index");
        if (data2?.index !== index) this.add("error", place3, `an index file of ${index}/ names the index ${data2?.index}`);
        for (const e of Array.isArray(data2?.entries) ? data2.entries : []) {
          if (!isObject(e) || String(e[key] ?? "").slice(0, length) !== p || p.length !== length) {
            this.add("error", place3, `an entry not in the file of its prefix (${JSON.stringify(e).slice(0, 60)}...)`);
          }
          held2.push(e);
          if (index === "owners" && Array.isArray(e?.names)) listedNames.push(...e.names.filter((n) => typeof n === "string"));
        }
      }
      for (const e of want) {
        if (!held2.some((x) => same(x, e))) {
          this.add("error", `${index}/`, `no entry, or a stale one, for ${e.id ?? e.owner} ${e.version ?? ""} (section 12.5)`);
        }
      }
      for (const e of held2) {
        if (want.some((x) => same(x, e))) continue;
        if (gone.has(e?.id) && e?.status === "removed") continue;
        this.add("error", `${index}/`, `an entry the storage root does not justify: ${e?.id ?? e?.owner} ${e?.version ?? ""} (section 12.5)`);
      }
      for (const [tid, t] of gone) {
        if ((index === "names" || index === "sha512") && !held2.some((e) => e?.id === tid && e?.status === "removed")) {
          this.add("error", `${index}/`, `no entry with the status removed for the tombstone ${tid} (section 12.5)`);
        }
        if (index === "owners" && held2.some((e) => e?.owner === t.owner && Array.isArray(e?.names) && e.names.includes(t.name))) {
          this.add("error", `${index}/`, `owners/ lists ${tid}, which is taken down (section 12.5)`);
        }
      }
    }
  }
  async presentation() {
    const a = this.archive;
    const website = Array.isArray(a.disc.profiles) && a.disc.profiles.includes("website");
    const home = await this.fetchOrNull(a.base + "index.html", LIMITS.page).catch((e) => {
      if (this.aborted(e)) throw e;
      return null;
    });
    if (!website && home === null) return;
    const level2 = website ? "error" : "warning";
    const note = website ? "" : " (the archive does not declare the profile website)";
    if (home === null) {
      this.add(level2, "index.html", "the home page is missing (appendix A.3)" + note);
      return;
    }
    let members = [];
    const main = this.found.get(a.disc.mainCollection);
    if (main?.line?.latest) {
      const mem = await a.json(main.id, main.inv, main.line.latest, "members.json", this.options).catch(() => null);
      members = Array.isArray(mem?.members) ? mem.members : [];
    }
    const page = new TextDecoder().decode(home);
    for (const m of members) {
      const mid = objectId(m?.name, m?.owner);
      if (this.tombstoned.has(mid)) continue;
      const pins = memberPins2(m);
      const pin = pins[pins.length - 1]?.pin || "";
      if (!page.includes(pin.slice(0, 32))) this.add(level2, "index.html", `does not show the pin of ${m?.name}` + note);
      if (!this.found.has(mid)) continue;
      const same2 = [
        ...this.found.keys()
      ].filter((i) => i.startsWith(`sheaf:${m.name}:`)).length;
      const landing = `paper/${a.labelOf(mid) || (same2 <= 1 ? m.name : `${m.name}-${m.owner}`)}/index.html`;
      const text3 = await this.fetchOrNull(a.base + landing, LIMITS.page).catch((e) => {
        if (this.aborted(e)) throw e;
        return null;
      });
      const words2 = text3 ? new TextDecoder().decode(text3) : "";
      const originator = this.found.get(mid).rec?.originator === m.owner;
      if (!words2.includes(mid) && !(originator && new RegExp(`sheaf:${m.name}(?![a-z0-9:/])`).test(words2))) {
        this.add(level2, landing, `no landing page giving the sheaf: URI of ${this.where(mid)} (appendix A.3)` + note);
      }
    }
  }
  async contentDigests() {
    const a = this.archive;
    const files = [];
    for (const [id, o] of this.found) {
      for (const [digest, paths] of Object.entries(o.inv.manifest)) {
        for (const cp of Array.isArray(paths) ? paths : []) {
          try {
            files.push({
              id,
              url: a.contentUrl(id, o.inv, cp),
              cp,
              digest
            });
          } catch {
            this.add("error", this.where(id), `missing ${cp}`, {
              object: id
            });
          }
        }
      }
    }
    let checked = 0;
    this.progress({
      phase: "digests",
      done: 0,
      total: files.length
    });
    await Promise.all(files.map(async ({ id, url, cp, digest }) => {
      const place3 = this.where(id);
      try {
        const bytes = await this.http.request(url, {
          limit: LIMITS.file,
          signal: this.options.signal
        });
        this.report.stats.files++;
        this.report.stats.filesBytes += bytes.length;
        if (await sha512(bytes) !== digest) this.add("error", place3, `${cp} does not have the digest of the manifest`, {
          object: id
        });
      } catch (error) {
        if (this.aborted(error)) throw error;
        if (error.kind === "not-found") this.add("error", place3, `missing ${cp}`, {
          object: id
        });
        else if (error.kind === "too-large") this.add("warning", place3, `${cp} is too large to be checked in the browser`, {
          object: id
        });
        else this.add("error", place3, `${cp} cannot be read (${error.detail})`, {
          object: id
        });
      }
      this.progress({
        phase: "digests",
        done: ++checked,
        total: files.length,
        current: cp
      });
    }));
  }
};
function isEvidencePath(p) {
  return p === "parent.inventory.json" || p === "parent.object.json" || p.startsWith("parent.signatures/") || p.startsWith("parent.chain/");
}
function sameBytes2(x, y) {
  if (x.length !== y.length) return false;
  for (let k = 0; k < x.length; k++) if (x[k] !== y[k]) return false;
  return true;
}
function py(value) {
  return value === null || value === void 0 ? "None" : String(value);
}

// core/check.js
async function verifyFolder(storage, { schemas: schemas2, remote = false, fetch: fetch2 = globalThis.fetch, digests = true, fetchJson = null } = {}) {
  let base = ORIGIN;
  try {
    const cfg = await readJson(storage, "osheaf.json");
    if (typeof cfg?.baseUrl === "string" && /^https?:\/\/[^/]+\/(.*\/)?$/.test(cfg.baseUrl)) base = cfg.baseUrl;
  } catch {
  }
  const http = new Http({
    fetch: storageFetch(storage, base, {
      fallback: remote ? fetch2 : null
    }),
    budget: null
  });
  let report;
  try {
    const archive = await Archive.open(http, base);
    archive.lister = storageLister(storage, base);
    const f = archive.old ? null : await folderOf(storage);
    if (f) archive.unlisted = await unlistedObjects(f, archive);
    report = await verify(archive, {
      schemas: schemas2,
      remote,
      digests,
      pages: false
    });
    if (!archive.old) {
      if (f) {
        report.add(...await keeperFindings(f, remote, fetchJson));
        report.add(...await presentationFindings(f, archive.disc));
      }
    }
  } catch (error) {
    if (!(error instanceof FetchError)) throw error;
    report = new Report(base, {
      remote,
      digests
    });
    report.add(finding("error", "opensheaf.json", error.kind === "not-found" ? "the discovery document is missing (section 3.1)" : `not JSON: ${error.detail}`));
  }
  if (!report.findings.some((f) => f.message === "specification 0.1: rebuild (section 16.1)")) {
    report.add(...await lookForKeys(storage));
  }
  return report;
}
async function unlistedObjects(f, archive) {
  const listed = /* @__PURE__ */ new Set([
    ...archive.objects().map((o) => o.id),
    ...archive.drafts().map((d) => d.id)
  ]);
  const out = [];
  for (const { id } of await f.objects()) {
    if (typeof id === "string" && parseId(id) && !listed.has(id) && !out.includes(id)) out.push(id);
  }
  return out;
}
async function folderOf(storage) {
  try {
    return await ArchiveFolder.open(storage, environment({
      out: () => {
      },
      err: () => {
      }
    }));
  } catch {
    return null;
  }
}
async function keeperFindings(f, remote, fetchJson = null) {
  const out = [];
  for (const { id, dir, inv } of await f.objects()) {
    if (!inv || typeof id !== "string") continue;
    if ((await f.readObjectJson(dir, inv, "object.json"))?.kind !== "owner") continue;
    let log;
    try {
      log = await f.keyLog(id.split(":")[2]);
    } catch {
      continue;
    }
    const keeper = log ? await keeperOf(log) : null;
    if (!keeper) continue;
    const place3 = `owner ${log.owner}`;
    if (!remote) {
      out.push(finding("result", place3, `keeper ${keeper}: not checked (osheaf verify --remote reads its ORCID record or domain, section 6.6)`));
      continue;
    }
    const link = await keeperLink(log, fetchJson);
    if (link.status === NOT_CHECKED) {
      out.push(finding("warning", place3, `keeper ${keeper}: not checked (${link.reason})`));
      continue;
    }
    out.push(finding("result", place3, `keeper ${keeper}: ${link.status} (${link.reason}; section 6.6)`));
    const claim = successorClaim(log, link);
    if (claim) out.push(finding("result", place3, `successor ${link.successor} ${claim}`));
  }
  return out;
}
async function presentationFindings(f, disc) {
  const out = [];
  const profiles = Array.isArray(disc.profiles) ? disc.profiles : [];
  const website = profiles.includes("website");
  const home = await f.storage.read("index.html");
  const landingPages = profiles.includes("texmacs") || Boolean(f.index.html || f.index.template) || await f.storage.kind("paper") === "dir";
  if (!(website || home || landingPages)) return out;
  const level2 = website ? "error" : "warning";
  const note = website ? "" : " (the archive does not declare the profile website)";
  const report = (place3, message2) => out.push(finding(level2, place3, message2 + (website ? "" : note)));
  let members = [];
  const mainId = f.labels.get(f.archive.mainCollection);
  if (mainId) {
    const dir = await f.dirOf(mainId);
    const inv = await f.inventory(dir);
    const ver = inv ? await f.latestSigned(mainId).catch(() => null) : null;
    if (ver) members = (await f.readObjectJson(dir, inv, "members.json", ver))?.members || [];
  }
  const page = home ? new TextDecoder().decode(home) : null;
  if (page === null && website) out.push(finding(level2, "index.html", "the home page is missing (appendix A.3)"));
  const gone = new Set(f.tombstones.map((t) => t.id));
  const ids = (await f.objects()).map((o) => o.id);
  for (const m of members) {
    const id = objectId(m?.name, m?.owner);
    if (gone.has(id)) continue;
    const pins = memberPins(m);
    const pin = pins[pins.length - 1]?.pin || "";
    if (page !== null && !page.includes(pin.slice(0, 32))) report("index.html", `does not show the pin of ${m?.name}`);
    let dir;
    try {
      dir = await f.dirOf(id);
    } catch {
      continue;
    }
    if (await f.storage.kind(joinPath(dir, "inventory.json")) !== "file") continue;
    const landing = `paper/${await pageAddress(f, id, ids)}/index.html`;
    const bytes = await f.storage.read(landing);
    const text3 = bytes ? new TextDecoder().decode(bytes) : "";
    if (!await landingNames(f, text3, m.name, m.owner, id, dir)) {
      report(landing, `no landing page giving the sheaf: URI of ${where(f, id)} (appendix A.3)`);
    }
  }
  return out;
}
function where(f, id) {
  const parts = (id || "").split(":");
  if (parts.length === 3 && parts[1] === parts[2]) return `owner ${parts[1]}`;
  return f.labelOf(id) || id || "?";
}
async function landingNames(f, text3, name2, owner, id, dir) {
  if (text3.includes(`sheaf:${name2}:${owner}`)) return true;
  let originator = null;
  try {
    const inv = await f.inventory(dir);
    const g = await f.readLogical(dir, inv, "genesis.json", "v1");
    if (!g) return false;
    originator = JSON.parse(new TextDecoder().decode(g)).originator ?? null;
  } catch {
    return false;
  }
  return originator === owner && new RegExp(`sheaf:${name2}(?![a-z0-9:/])`).test(text3);
}
var ROTATION_NAME = /^rotation-[a-z2-7]{16}-[a-z2-7]{16}\.txt$/;
async function lookForKeys(storage) {
  const found2 = [];
  const walk = async (dir) => {
    for (const entry of await storage.list(dir) || []) {
      const path = joinPath(dir, entry.name);
      if (!dir && (entry.name === ".git" || entry.name.startsWith(".staging-"))) continue;
      if (entry.kind === "dir") {
        await walk(path);
        continue;
      }
      if (entry.kind !== "file") continue;
      let looks = ROTATION_NAME.test(entry.name) || entry.name.endsWith(".key") && entry.name !== ".key";
      if (!looks && !(await storage.size?.(path) >= 4096)) {
        const bytes = await storage.read(path);
        if (bytes && bytes.length < 4096) {
          const text3 = Array.from(bytes, (b) => b < 128 ? String.fromCharCode(b) : "\uFFFD").join("");
          if (text3.startsWith(ROTATION_FORMAT) || text3.startsWith(SHEET_TITLE)) {
            looks = true;
          } else {
            try {
              looks = unbase64(text3.trim()).length === 32;
            } catch {
              looks = false;
            }
          }
        }
      }
      if (looks) {
        found2.push(finding("warning", path, "looks like a private key: keys are never kept in an archive (section 15.4)"));
      }
    }
  };
  await walk("");
  return found2;
}

// core/requests.js
var Problem = class extends Error {
};
var LINK2 = /^!?\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)$/;
var LABEL2 = /^[a-z0-9]+(-[a-z0-9]+)*$/;
var SHEAF = /^sheaf:([a-z2-7]{52}):([a-z2-7]{51}[aq])(\/v\d+)?(?:\?(.*))?$/;
var NEW_PAPER = "A new paper";
var NEW_VERSION = "A new version of a paper in the archive";
var SOURCE_SUFFIXES = /* @__PURE__ */ new Set([
  ".tex",
  ".ltx",
  ".tm",
  ".md",
  ".typ",
  ".lyx",
  ".rst",
  ".org",
  ".txt"
]);
var LICENCES = /* @__PURE__ */ new Set([
  "cc-by-4.0",
  "cc-by-sa-4.0",
  "cc0-1.0",
  "gpl-3.0-only",
  "gpl-3.0-or-later"
]);
var HEADER = `# The members of a collection of this archive, in order, for
# \`osheaf collection sync LABEL --from collections/LABEL.yaml\`: kept by the
# issue forms of this repository (Issues, New issue), the OpenSheaf manager,
# or by hand (see the README). A member is a line of this archive, by its
# label (\`label: kpz-uniqueness\`), or of any archive, by its sheaf: URI and
# the base URLs of archives that hold it (\`uri: sheaf:<name>:<owner>\`,
# \`at: [https://example.org/papers/]\`). In a selection, \`revisions\` lists the
# document versions vetted (1, 2, ...); in a catalogue, \`follow: true\` follows
# the line to its latest signed version.
`;
function field(form, label, required = false) {
  const value = String(form.fields[label] ?? "").trim();
  if (required && !value) throw new Problem(`The field **${label}** is empty, and it is needed.`);
  return value;
}
function lines(text3) {
  return text3.split(/\r\n|\r|\n/).map((l) => l.trim()).filter((l) => l && !LINK2.test(l));
}
function labelField(form, name2, limit = 64) {
  const label = field(form, name2, true);
  if (!LABEL2.test(label) || label.length > limit) {
    throw new Problem(`\`${label}\` is not a valid label: at most ${limit} characters, lower-case letters and digits, words joined by \`-\` (for instance \`kpz-uniqueness\`).`);
  }
  return label;
}
function archiveUrl(form, name2, required = true) {
  let url = field(form, name2, required);
  if (!url) return "";
  if (!/^https:\/\/\S+$/.test(url)) {
    throw new Problem(`**${name2}** should be the address of an OpenSheaf archive, the https address of the folder that holds its \`opensheaf.json\` (for instance \`https://mgubi.org/papers/\`), not \`${url}\`.`);
  }
  url = url.replace(/opensheaf\.json$/, "");
  return url.endsWith("/") ? url : url + "/";
}
function versions(form, name2, required = false) {
  const text3 = field(form, name2, required);
  const found2 = text3.match(/\d+/g) || [];
  if (text3 && (!found2.length || text3.replace(/[\d,;\s]/g, ""))) {
    throw new Problem(`**${name2}** should be document versions, numbers such as \`5\` or \`5, 6\`, not \`${text3}\`.`);
  }
  return found2.map(Number);
}
function position(form) {
  const value = field(form, "Position");
  if (value && !/^\d+$/.test(value)) throw new Problem(`**Position** should be a number (1 for the first), not \`${value}\`.`);
  return value ? Number(value) : null;
}
function date(form, name2) {
  const value = field(form, name2);
  if (value && !/^\d{4}(-\d{2}(-\d{2})?)?$/.test(value)) {
    throw new Problem(`The field **${name2}** should be a date written as YYYY-MM-DD, not \`${value}\`.`);
  }
  return value;
}
function licence(form, name2) {
  const value = field(form, name2);
  const m = /\(([a-z0-9.-]+)\)\s*$/.exec(value);
  if (m && LICENCES.has(m[1])) return m[1];
  if (value.toLowerCase().startsWith("all rights reserved")) return "All rights reserved";
  return null;
}
var COLLECTIONS = "collections";
var listPath = (label) => `${COLLECTIONS}/${label}.yaml`;
async function settings(r) {
  return readJson(r.storage, "osheaf.json");
}
async function labels(r) {
  const disc = await readJson(r.storage, "opensheaf.json") || {};
  return new Map((disc.objects || []).filter((o) => o.label).map((o) => [
    o.label,
    o
  ]));
}
async function labelOf(r, name2, owner) {
  for (const [label, o] of await labels(r)) if (o.name === name2 && o.owner === owner) return label;
  return null;
}
async function allCollections(r) {
  return (await r.storage.list(COLLECTIONS) || []).filter((e) => e.kind === "file" && e.name.endsWith(".yaml")).map((e) => e.name.slice(0, -".yaml".length)).sort();
}
async function exists(r, path) {
  return await r.storage.kind(path) === "file";
}
async function collection(r, form, required) {
  const label = field(form, "In collection");
  const known = await allCollections(r);
  if (!label) {
    if (required) {
      throw new Problem("Name the collection in **In collection**" + (known.length ? ": the archive's collections are " + known.map((k) => `\`${k}\``).join(", ") : "; the archive has none yet (create one with the form **New collection**)") + ".");
    }
    return "";
  }
  if (!LABEL2.test(label) || !await exists(r, listPath(label))) {
    throw new Problem(`The archive has no collection \`${label}\`` + (known.length ? ": its collections are " + known.map((k) => `\`${k}\``).join(", ") : " (none has been created yet)") + ".");
  }
  return label;
}
async function load(r, label) {
  const data2 = await parseData(listPath(label), await readText(r.storage, listPath(label)), {
    yaml11: true
  }) || {};
  if (data2.members === null || data2.members === void 0) data2.members = [];
  return data2;
}
async function yamlText(data2) {
  const YAML = await Promise.resolve().then(() => (init_browser(), browser_exports));
  return YAML.stringify(data2, {
    version: "1.1",
    schema: "yaml-1.1",
    indentSeq: false,
    lineWidth: 200,
    singleQuote: true,
    blockQuote: false
  });
}
async function save(r, label, data2) {
  await writeText(r.storage, listPath(label), HEADER + await yamlText(data2));
}
async function headFile(r, label, name2) {
  const entry = (await labels(r)).get(label);
  if (!entry) return null;
  const f = await r.folder();
  const dir = await f.dirOf(entry.id);
  const inv = await f.inventory(dir);
  return inv ? f.readObjectJson(dir, inv, name2) : null;
}
async function documentVersion(r, label) {
  return (await headFile(r, label, "object.json")).documentVersion;
}
async function knownDocument(r, label) {
  const all = await labels(r);
  const entry = all.get(label);
  if (!entry || entry.kind !== "document") {
    const known = [
      ...all
    ].filter(([, o]) => o.kind === "document").map(([k]) => k).sort();
    throw new Problem(`The archive has no paper labelled \`${label}\`` + (known.length ? ": its papers are " + known.slice(0, 40).map((k) => `\`${k}\``).join(", ") : "") + ".");
  }
  return entry;
}
function parseSheaf2(text3) {
  const m = SHEAF.exec(text3.trim());
  if (!m) return null;
  const at = new URLSearchParams(m[4] || "").get("at") || "";
  return [
    m[1],
    m[2],
    at
  ];
}
async function entryKey(r, entry) {
  if (typeof entry === "string") entry = {
    uri: entry
  };
  if (entry.label) {
    const o = (await labels(r)).get(entry.label);
    return o ? `${o.name}:${o.owner}` : null;
  }
  const parsed = parseSheaf2(String(entry.uri ?? ""));
  return parsed ? `${parsed[0]}:${parsed[1]}` : null;
}
async function readDiscovery(r, base) {
  try {
    const res = await r.env.fetch(base + "opensheaf.json");
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    return await res.json();
  } catch (error) {
    throw new Problem(`The archive at \`${base}\` could not be read (${error.message}): give the address of an OpenSheaf archive of specification 0.2, the folder that holds its \`opensheaf.json\`.`);
  }
}
async function memberRef(r, form, name2, archiveName, required = true) {
  const text3 = field(form, name2, required);
  if (!text3) return [
    null,
    null,
    ""
  ];
  const archive = archiveUrl(form, archiveName, false);
  if (text3.startsWith("sheaf:")) {
    const parsed = parseSheaf2(text3);
    if (!parsed) throw new Problem(`\`${text3}\` is not the sheaf: URI of a line (\`sheaf:<name>:<owner>\`, possibly with \`?at=...\`).`);
    const [nm, owner] = parsed;
    const own3 = await labelOf(r, nm, owner);
    if (own3) return [
      {
        label: own3
      },
      `${nm}:${owner}`,
      `\`${own3}\``
    ];
    const at = archive || parsed[2];
    if (at && !at.startsWith("https://")) throw new Problem(`The \`at\` of \`${text3}\` should be the https address of an archive.`);
    const entry = {
      uri: `sheaf:${nm}:${owner}`
    };
    if (at) entry.at = [
      at
    ];
    return [
      entry,
      `${nm}:${owner}`,
      `\`sheaf:${nm.slice(0, 12)}...\`` + (at ? ` (${at})` : "")
    ];
  }
  if (!LABEL2.test(text3)) {
    throw new Problem(`**${name2}** should be a label (\`kpz-uniqueness\`) or a sheaf: URI (\`sheaf:<name>:<owner>\`), not \`${text3}\`.`);
  }
  const own2 = (await settings(r)).baseUrl || "";
  if (!archive || archive.replace(/\/+$/, "") === own2.replace(/\/+$/, "")) {
    const o2 = (await labels(r)).get(text3);
    if (!o2) {
      throw new Problem(`This archive has no line labelled \`${text3}\`; for a line of another archive, give its address in **${archiveName}**.`);
    }
    return [
      {
        label: text3
      },
      `${o2.name}:${o2.owner}`,
      `\`${text3}\``
    ];
  }
  const o = ((await readDiscovery(r, archive)).objects || []).find((x) => x.label === text3);
  if (!o) throw new Problem(`The archive at \`${archive}\` has no line labelled \`${text3}\`.`);
  return [
    {
      uri: `sheaf:${o.name}:${o.owner}`,
      at: [
        archive
      ]
    },
    `${o.name}:${o.owner}`,
    `\`${text3}\` of ${archive}`
  ];
}
async function find(r, data2, key, text3) {
  for (const m of data2.members) if (await entryKey(r, m) === key) return m;
  throw new Problem(`${text3} is not a member of this collection.`);
}
function insert(data2, member, where2) {
  if (where2 && where2 >= 1 && where2 <= data2.members.length) data2.members.splice(where2 - 1, 0, member);
  else data2.members.push(member);
}
async function ownChildren(r, label) {
  const out = [];
  for (const m of (await load(r, label)).members) {
    if (m && typeof m === "object" && m.label && await exists(r, listPath(m.label))) out.push(m.label);
  }
  return out;
}
async function descendants(r, label, seen = /* @__PURE__ */ new Set()) {
  for (const child of await ownChildren(r, label)) {
    if (!seen.has(child)) {
      seen.add(child);
      await descendants(r, child, seen);
    }
  }
  return seen;
}
async function parents(r, label) {
  const out = [];
  for (const c of await allCollections(r)) {
    if (c !== label && (await load(r, c)).members.some((m) => m && typeof m === "object" && m.label === label)) out.push(c);
  }
  return out;
}
async function vetted(r, label, key) {
  for (const m of (await headFile(r, label, "members.json") || {}).members || []) {
    if (`${m.name}:${m.owner}` === key) return (m.revisions || []).map((x) => x.documentVersion);
  }
  return [];
}
var ADDED = /^(\S+): v\d+ (\(|branch of|moves )/;
async function osheaf(r, run, { presented = true } = {}) {
  const f = await ArchiveFolder.open(r.storage, r.env);
  if (f.old) throw new Problem("osheaf stopped with this message:\n\n```\n" + REBUILD + "\n```");
  const start = r.said.length;
  try {
    await run(f);
    if (presented) await present(f);
  } catch (error) {
    if (!(error instanceof Stop)) throw error;
    throw new Problem("osheaf stopped with this message:\n\n```\n" + error.message.split("\n").slice(-15).join("\n") + "\n```");
  }
  for (const line of r.said.slice(start)) if (ADDED.test(line.trim())) r.added.push(line.trim());
}
async function sync2(r, label, message2) {
  const text3 = await readText(r.storage, listPath(label));
  await osheaf(r, (f) => sync(f, {
    collection: label,
    message: message2,
    fromFile: {
      name: listPath(label),
      given: listPath(label),
      text: text3
    }
  }));
  if ((await load(r, label)).type !== "selection") {
    try {
      await osheaf(r, (f) => update(f, {
        collection: [
          label
        ]
      }));
    } catch (error) {
      if (!(error instanceof Problem)) throw error;
    }
  }
}
async function propagate(r, label, message2, seen = /* @__PURE__ */ new Set()) {
  for (const parent of await parents(r, label)) {
    if (seen.has(parent)) continue;
    seen.add(parent);
    const data2 = await load(r, parent);
    const member = data2.members.find((m) => m && typeof m === "object" && m.label === label);
    if (data2.type === "selection") {
      const dv = await documentVersion(r, label);
      const o = (await labels(r)).get(label);
      const revisions = [
        ...member.revisions?.length ? member.revisions : await vetted(r, parent, `${o.name}:${o.owner}`)
      ];
      if (!revisions.includes(dv)) member.revisions = [
        ...revisions,
        dv
      ].sort((a, b) => a - b);
    } else {
      member.follow = true;
    }
    await save(r, parent, data2);
    await sync2(r, parent, message2);
    await propagate(r, parent, message2, seen);
  }
}
function safeName(name2) {
  const last = String(name2).split(/[\\/]/).pop().trim();
  return last.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^[-.]+|[-.]+$/g, "") || "file";
}
function attached(form, label) {
  const used = /* @__PURE__ */ new Set(), out = [];
  for (const file of form.files[label] || []) {
    let name2 = safeName(file.name);
    const dot = name2.lastIndexOf(".");
    for (let k = 1; used.has(name2); k++) {
      const s = safeName(file.name);
      name2 = dot > 0 ? `${s.slice(0, dot)}-${k}${s.slice(dot)}` : `${s}-${k}`;
    }
    used.add(name2);
    out.push({
      name: name2,
      bytes: file.bytes
    });
  }
  return out;
}
var suffix = (name2) => {
  const k = name2.lastIndexOf(".");
  return k > 0 ? name2.slice(k).toLowerCase() : "";
};
async function sources(form) {
  const files = attached(form, "Sources");
  const mainName = field(form, "Main source");
  if (!files.length) return [
    null,
    []
  ];
  if (files.length === 1 && suffix(files[0].name) === ".zip") {
    const { names, bytesOf } = await unpack(files[0].bytes);
    if (!names.length) throw new Problem("The zip of the sources is empty.");
    let main;
    if (mainName) {
      if (!names.includes(mainName)) {
        throw new Problem(`The main source \`${mainName}\` is not in the zip; it holds: ` + [
          ...names
        ].sort().slice(0, 30).map((n) => `\`${n}\``).join(", ") + ".");
      }
      main = mainName;
    } else {
      const candidates = names.filter((n) => !n.includes("/") && SOURCE_SUFFIXES.has(suffix(n)));
      if (candidates.length !== 1) {
        throw new Problem("Say which file of the zip is the main source, in the field **Main source** (for instance `paper.tex`).");
      }
      main = candidates[0];
    }
    const file = (n) => ({
      name: n.split("/").pop(),
      bytes: bytesOf(n),
      logical: n
    });
    return [
      file(main),
      names.filter((n) => n !== main).map(file)
    ];
  }
  if (files.length === 1) return [
    files[0],
    []
  ];
  if (!mainName) {
    throw new Problem("Several source files are attached: put them in one zip, or say which one is the main source in the field **Main source**.");
  }
  const named = files.find((p) => p.name === safeName(mainName));
  if (!named) throw new Problem(`The main source \`${mainName}\` is not among the attached files.`);
  return [
    named,
    files.filter((p) => p !== named).map((p) => ({
      ...p,
      logical: p.name
    }))
  ];
}
async function inflate(bytes) {
  const stream = new Blob([
    bytes
  ]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}
async function readZip(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let end = -1;
  for (let k = bytes.length - 22; k >= Math.max(0, bytes.length - 22 - 65535); k--) {
    if (view.getUint32(k, true) === 101010256) {
      end = k;
      break;
    }
  }
  if (end < 0) throw new Problem("The zip of the sources cannot be read (no central directory).");
  const count = view.getUint16(end + 10, true);
  let at = view.getUint32(end + 16, true);
  const out = [];
  const text3 = new TextDecoder("utf-8");
  for (let n = 0; n < count; n++) {
    if (view.getUint32(at, true) !== 33639248) throw new Problem("The zip of the sources is damaged.");
    const flags = view.getUint16(at + 8, true), method = view.getUint16(at + 10, true);
    const csize = view.getUint32(at + 20, true), nameLength = view.getUint16(at + 28, true);
    const extra = view.getUint16(at + 30, true), comment = view.getUint16(at + 32, true);
    const local = view.getUint32(at + 42, true);
    const name2 = text3.decode(bytes.subarray(at + 46, at + 46 + nameLength));
    at += 46 + nameLength + extra + comment;
    if (csize === 4294967295 || local === 4294967295) throw new Problem("The zip of the sources is a ZIP64 archive: make an ordinary zip.");
    if (flags & 1) throw new Problem("The zip of the sources is encrypted.");
    const start = local + 30 + view.getUint16(local + 26, true) + view.getUint16(local + 28, true);
    const raw = bytes.subarray(start, start + csize);
    out.push({
      name: name2,
      read: async () => {
        if (method === 0) return raw.slice();
        if (method === 8) return inflate(raw);
        throw new Problem(`The zip of the sources compresses ${name2} with a method other than deflate.`);
      }
    });
  }
  return out;
}
async function unpack(bytes) {
  const found2 = /* @__PURE__ */ new Map();
  for (const m of await readZip(bytes)) {
    const parts = m.name.split("/").filter((p) => p !== "" && p !== ".");
    if (m.name.endsWith("/") || !parts.length || m.name.startsWith("/") || parts.includes("..") || parts[0] === "__MACOSX" || parts[parts.length - 1] === ".DS_Store") continue;
    found2.set(parts.join("/"), await m.read());
  }
  let names = [
    ...found2.keys()
  ];
  let prefix = "";
  const tops = new Set(names.map((n) => n.split("/")[0]));
  if (tops.size === 1 && names.every((n) => n.includes("/"))) {
    prefix = [
      ...tops
    ][0] + "/";
    names = names.map((n) => n.slice(prefix.length));
  }
  return {
    names,
    bytesOf: (n) => found2.get(prefix + n)
  };
}
async function currentDescription(r, label) {
  const d = await headFile(r, label, "datacite.json");
  if (!d) return [
    null,
    []
  ];
  const title = (d.titles || [
    {}
  ])[0]?.title ?? null;
  const authors = (d.creators || []).map((c) => {
    const aff = (c.affiliation || []).map((a) => a && typeof a === "object" ? a.name : a);
    return c.name + (aff.length && aff[0] ? `|${aff[0]}` : "");
  });
  return [
    title,
    authors
  ];
}
async function depositOp(r, form, origin) {
  const what = field(form, "This deposit", true);
  if (what !== NEW_PAPER && what !== NEW_VERSION) throw new Problem(`**This deposit** is "${NEW_PAPER}" or "${NEW_VERSION}".`);
  const fresh = what === NEW_PAPER;
  const label = labelField(form, "Label", fresh ? 32 : 64);
  const cid = await collection(r, form, false);
  const entry = (await labels(r)).get(label);
  if (fresh && entry) {
    throw new Problem(`\`${label}\` is already the label of a ${entry.kind || "line"} of this archive: for a new version of it, choose "${NEW_VERSION}"; for a new paper, another label.`);
  }
  if (!fresh) await knownDocument(r, label);
  const pdfs = attached(form, "PDF of this version").filter((p) => suffix(p.name) === ".pdf");
  if (!pdfs.length) throw new Problem("Attach the PDF of this version to the field **PDF of this version**.");
  const [main, others] = await sources(form);
  const missing = field(form, "If there are no sources, why");
  if (!main && !missing) {
    throw new Problem("Attach the sources (one file, or a zip), or say why there are none in the field **If there are no sources, why**.");
  }
  const a = {
    label,
    source: main ? {
      name: main.name,
      bytes: main.bytes
    } : null,
    pdf: pdfs[0],
    type: "Preprint",
    keyword: [],
    toolchain: [],
    author: [],
    related: [],
    extraSource: []
  };
  if (fresh) a.new = true;
  if (!main) a.noSource = missing;
  const licenceFile = field(form, "Licence file");
  if (licenceFile) {
    if (!main) throw new Problem("A **Licence file** must be one of the sources; there are none.");
    if (![
      main.name,
      ...others.map((o) => o.logical)
    ].includes(licenceFile)) {
      throw new Problem(`The licence file \`${licenceFile}\` is not among the sources: give its path inside the zip (for instance \`LICENSE\`).`);
    }
    a.licenceFile = licenceFile;
  }
  a.extraSource = others.map((o) => ({
    name: o.name,
    bytes: o.bytes,
    logical: o.logical === o.name ? "" : o.logical
  }));
  let title = field(form, "Title"), authors = lines(field(form, "Authors"));
  if (!fresh && (!title || !authors.length)) {
    const [oldTitle, oldAuthors] = await currentDescription(r, label);
    title ||= oldTitle;
    if (!authors.length) authors = oldAuthors;
  }
  if (!title || !authors.length) {
    throw new Problem("Give the **Title** and the **Authors** (they can be left empty only for a new version of a paper already in the archive).");
  }
  a.title = title;
  a.author = authors;
  const abstract = field(form, "Abstract");
  if (abstract) a.abstractFile = abstract + "\n";
  for (const keyword of field(form, "Keywords").split(/[,;\n]/)) if (keyword.trim()) a.keyword.push(keyword.trim());
  const rights = licence(form, "Licence");
  if (rights) a.rights = rights;
  else if (fresh) {
    throw new Problem('Choose a **Licence** for a new paper ("Keep as before" is for new versions). "All rights reserved" lets readers read the paper but not copy it; CC BY 4.0 lets anyone copy it with credit. Check what your publisher allows for papers published in journals.');
  }
  a.related = lines(field(form, "Related identifiers"));
  const changes = field(form, "What changed (for a new version)");
  if (changes) a.changes = changes;
  const available = date(form, "Date this version became public");
  if (available) a.available = available;
  const issued = date(form, "Date the paper first appeared");
  if (issued) a.issued = issued;
  a.message = `Deposit from ${origin}`;
  await osheaf(r, (f) => deposit(f, a));
  const where2 = await place2(r, form, cid, label);
  const kind = fresh ? "new paper" : "new version";
  return [
    cid,
    `Deposit ${label}, ${kind}${where2} (${origin})`,
    `Deposit: ${label}`,
    `\`${label}\` was deposited (${kind})${where2}`
  ];
}
async function place2(r, form, cid, label) {
  if (!cid) return "";
  const data2 = await load(r, cid);
  const o = (await labels(r)).get(label), key = `${o.name}:${o.owner}`;
  let member = null;
  for (const m of data2.members) {
    if (await entryKey(r, m) === key) {
      member = m;
      break;
    }
  }
  if (!member) {
    const entry = {
      label
    };
    if (data2.type !== "selection") entry.follow = true;
    insert(data2, entry, position(form));
  } else if (data2.type === "selection") {
    const dv = await documentVersion(r, label);
    const old = member.revisions?.length ? member.revisions : await vetted(r, cid, key);
    member.revisions = [
      .../* @__PURE__ */ new Set([
        ...old,
        dv
      ])
    ].sort((x, y) => x - y);
  }
  await save(r, cid, data2);
  return ` in the collection \`${cid}\``;
}
async function noticeOp(r, form, origin) {
  const label = labelField(form, "Label");
  await knownDocument(r, label);
  const about = field(form, "Document version it is about", true);
  if (!/^\d+$/.test(about)) throw new Problem(`**Document version it is about** should be a number (1, 2, ...), not \`${about}\`.`);
  const text3 = field(form, "Text of the notice", true);
  const files = attached(form, "Full statement (optional)");
  await osheaf(r, (f) => notice(f, {
    label,
    about: Number(about),
    text: text3,
    file: files[0] || null,
    message: `Notice from ${origin}`
  }));
  return [
    "",
    `Notice about ${label}, version ${about} (${origin})`,
    `Notice: ${label}, version ${about}`,
    `\`${label}\` was given a notice`
  ];
}
async function withdrawOp(r, form, origin) {
  const label = labelField(form, "Label");
  await knownDocument(r, label);
  const reason = field(form, "Reason for the withdrawal", true);
  await osheaf(r, (f) => withdraw(f, {
    label,
    reason,
    file: null,
    message: `Withdrawal from ${origin}`
  }));
  return [
    "",
    `Withdraw ${label} (${origin})`,
    `Withdrawal: ${label}`,
    `\`${label}\` was withdrawn (its files stay in the archive)`
  ];
}
async function relicenseOp(r, form, origin) {
  const label = labelField(form, "Label");
  await knownDocument(r, label);
  const rights = licence(form, "New licence");
  if (!LICENCES.has(rights)) throw new Problem("Choose the new licence in the field **New licence**.");
  const method = field(form, "How the authors agreed", true);
  await osheaf(r, (f) => relicense(f, {
    label,
    rights,
    method,
    message: `New licence from ${origin}`
  }));
  return [
    "",
    `Relicense ${label} as ${rights} (${origin})`,
    `Licence: ${label}, ${rights}`,
    `\`${label}\` was relicensed as ${rights}`
  ];
}
async function makeCollection(r, label, title, kind, description, message2) {
  const data2 = {
    title
  };
  if (description) data2.description = description;
  Object.assign(data2, {
    type: kind,
    order: "manual",
    members: []
  });
  await save(r, label, data2);
  await sync2(r, label, message2);
}
async function feature(r, label) {
  const s = await settings(r);
  s.index ??= {};
  s.index.html ??= {
    templates: "templates"
  };
  s.index.html.featured = label;
  await writeText(r.storage, "osheaf.json", jsonText(s));
}
async function newCollectionOp(r, form, origin) {
  const label = labelField(form, "Label of the new collection", 32);
  if (await exists(r, listPath(label)) || (await labels(r)).has(label) || label === (await settings(r)).mainCollection) {
    throw new Problem(`\`${label}\` is already taken in this archive.`);
  }
  const title = field(form, "Title of the collection", true);
  const kind = field(form, "Kind").toLowerCase().startsWith("catalogue") ? "catalogue" : "selection";
  const parent = await collection(r, form, false);
  await makeCollection(r, label, title, kind, field(form, "Description"), `New collection ${label} (${origin})`);
  if (field(form, "Feature it on the home page").toLowerCase().startsWith("yes")) await feature(r, label);
  let where2 = "";
  if (parent) {
    const pdata = await load(r, parent);
    const entry = {
      label
    };
    if (pdata.type !== "selection") entry.follow = true;
    insert(pdata, entry, position(form));
    await save(r, parent, pdata);
    where2 = ` in the collection \`${parent}\``;
  }
  return [
    parent,
    `New collection ${label}${where2} (${origin})`,
    `Collection: ${label}`,
    `the collection \`${label}\` was created${where2}`
  ];
}
async function addOp(r, form, origin) {
  const cid = await collection(r, form, true);
  const data2 = await load(r, cid);
  const [entry, key, text3] = await memberRef(r, form, "New member", "Archive of the new member");
  const revisions = versions(form, "Versions you vet (selection)");
  for (const m of data2.members) if (await entryKey(r, m) === key) throw new Problem(`${text3} is already a member of \`${cid}\`.`);
  const own2 = entry.label;
  if (own2 && (own2 === (await settings(r)).mainCollection || own2 === cid || await exists(r, listPath(own2)) && (await descendants(r, own2)).has(cid))) {
    throw new Problem(`\`${own2}\` cannot be a member of itself, or of a collection inside it.`);
  }
  if (data2.type === "selection") {
    if (revisions.length) entry.revisions = revisions;
  } else {
    if (revisions.length) {
      throw new Problem(`Versions are vetted only in a selection; \`${cid}\` is a catalogue, which follows its members. Leave **Versions you vet** empty.`);
    }
    entry.follow = true;
  }
  insert(data2, entry, position(form));
  await save(r, cid, data2);
  return [
    cid,
    `Add ${text3.replaceAll("`", "")} to ${cid} (${origin})`,
    `Member added to ${cid}`,
    `${text3} was added to \`${cid}\``
  ];
}
async function vetOp(r, form, origin) {
  const cid = await collection(r, form, true);
  const data2 = await load(r, cid);
  if (data2.type !== "selection") {
    throw new Problem(`Versions are vetted only in a selection; \`${cid}\` is a catalogue, which follows its members (run **Update the collections** in the Actions tab to move them on).`);
  }
  const [, key, text3] = await memberRef(r, form, "Member", "Archive of the member");
  let member = await find(r, data2, key, text3);
  const wanted = versions(form, "Versions to vet", true);
  const old = member && typeof member === "object" && member.revisions?.length ? [
    ...member.revisions
  ] : await vetted(r, cid, key);
  const added = wanted.filter((v) => !old.includes(v));
  if (!added.length) throw new Problem(`${text3} already has the versions ${wanted.join(", ")} vetted.`);
  if (typeof member !== "object") {
    const index = data2.members.indexOf(member);
    member = data2.members[index] = {
      uri: member
    };
  }
  member.revisions = [
    ...old,
    ...added
  ].sort((x, y) => x - y);
  await save(r, cid, data2);
  const vs = added.join(", ");
  return [
    cid,
    `Vet version ${vs} of ${text3.replaceAll("`", "")} in ${cid} (${origin})`,
    `Vetted: version ${vs} (in ${cid})`,
    `version ${vs} of ${text3} was vetted`
  ];
}
async function removeOp(r, form, origin) {
  const cid = await collection(r, form, true);
  const data2 = await load(r, cid);
  const [, key, text3] = await memberRef(r, form, "Member to remove", "Archive of the member");
  const member = await find(r, data2, key, text3);
  data2.members.splice(data2.members.indexOf(member), 1);
  await save(r, cid, data2);
  return [
    cid,
    `Remove ${text3.replaceAll("`", "")} from ${cid} (${origin})`,
    `Member removed from ${cid}`,
    `${text3} was removed from \`${cid}\``
  ];
}
var OPERATIONS = {
  deposit: depositOp,
  notice: noticeOp,
  withdraw: withdrawOp,
  relicense: relicenseOp,
  new_collection: newCollectionOp,
  add: addOp,
  vet: vetOp,
  remove: removeOp
};
var WORKFLOW_ONLY = [
  "setup",
  "arxiv"
];
async function carryOut(storage, env, operation, fields, files = {}, { origin = "the OpenSheaf manager", schemas: schemas2 = null, digests = true } = {}) {
  const said = [];
  const r = {
    storage,
    said,
    added: [],
    env: {
      ...env,
      out: (line) => said.push(line),
      err: (line) => said.push(line)
    },
    async folder() {
      return ArchiveFolder.open(storage, this.env);
    }
  };
  const form = {
    fields: fields || {},
    files: files || {}
  };
  try {
    if (WORKFLOW_ONLY.includes(operation)) {
      throw new Problem(`The operation \`${operation}\` is carried out by the archive's workflow, not by the page.`);
    }
    const op = OPERATIONS[operation];
    if (!op) throw new Problem(`Unknown operation \`${operation}\`.`);
    if (!await exists(r, "osheaf.json")) {
      throw new Problem("The archive is not set up yet: set it up first (the workflow **Set up the archive** in the Actions tab, or the manager's setup).");
    }
    let [cid, message2, title, done] = await op(r, form, origin);
    const why = field(form, "Why (optional)");
    if (why) message2 += `: ${why}`;
    await osheaf(r, (f) => collect2(f, {}));
    if (cid) {
      await sync2(r, cid, message2);
      await propagate(r, cid, message2);
    }
    await osheaf(r, async (f) => {
      await writeDiscovery(f);
      if (hasWebsite(f)) await readableIndex(f);
      else r.env.out("opensheaf.json and the indexes written (no readable index configured)");
    }, {
      presented: false
    });
    if (schemas2) await verified(r, schemas2, digests);
    const body = [
      ...new Set(r.added)
    ].join("\n");
    const base = (await settings(r)).baseUrl;
    return {
      ok: true,
      title,
      done,
      said,
      commitMessage: message2 + "\n" + (body ? `
${body}
` : ""),
      message: `Done: ${done}.

The archive's site, <${base}>, shows it once GitHub Pages has published it (usually within a few minutes).
`
    };
  } catch (error) {
    if (!(error instanceof Problem)) throw error;
    return {
      ok: false,
      said,
      message: `Nothing was changed in the archive.

${error.message}

Correct it and send the request again.
`
    };
  }
}
async function verified(r, schemas2, digests) {
  const report = await verifyFolder(r.storage, {
    schemas: schemas2,
    digests,
    fetch: r.env.fetch,
    fetchJson: r.env.fetchJson
  });
  if (!report.counts().error) return;
  const out = report.findings.map((x) => `${x.level}: ${x.place}: ${x.message}`);
  const c = report.counts();
  out.push(`${c.error} error(s), ${c.warning} warning(s), ${c.result} result(s)`);
  throw new Problem("osheaf stopped with this message:\n\n```\n" + out.slice(-15).join("\n") + "\n```");
}

// core/passkey.js
var UNLOCK_PAGE = `https://${PASSKEY_RP}/`;
var UnlockFailed = class extends Error {
};
function b64url(bytes) {
  return base64(bytes).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}
function fromB64url(text3) {
  if (typeof text3 !== "string" || !/^[A-Za-z0-9_-]+$/.test(text3) || text3.length % 4 === 1) throw new Error("not base64url");
  const b = text3.replaceAll("-", "+").replaceAll("_", "/");
  return unbase64(b + "=".repeat((4 - b.length % 4) % 4));
}
function randomState() {
  return b64url(crypto.getRandomValues(new Uint8Array(16)));
}
var CODE_LABEL = utf8("opensheaf unlock code v1");
async function confirmationCode(state, pk) {
  const d = await sha256(new Uint8Array([
    ...CODE_LABEL,
    ...utf8(state),
    ...pk
  ]));
  const n = (d[0] << 24 >>> 0) + (d[1] << 16) + (d[2] << 8) + d[3];
  const digits = String(n % 1e6).padStart(6, "0");
  return `${digits.slice(0, 3)} ${digits.slice(3)}`;
}
var HAND_OFF_INFO = utf8("opensheaf unlock hand-off v2");
async function withPublic(privateKey) {
  const jwk = await crypto.subtle.exportKey("jwk", privateKey);
  return {
    privateKey,
    publicKey: fromB64url(jwk.x)
  };
}
async function newKeyPair() {
  const pair = await crypto.subtle.generateKey({
    name: "X25519"
  }, true, [
    "deriveBits"
  ]);
  return withPublic(pair.privateKey);
}
async function handOffKeys(pair, other, state) {
  const pub = await crypto.subtle.importKey("raw", other, {
    name: "X25519"
  }, true, []);
  const shared = new Uint8Array(await crypto.subtle.deriveBits({
    name: "X25519",
    public: pub
  }, pair.privateKey, 256));
  const both = await hkdf(shared, utf8(state), HAND_OFF_INFO, 64);
  return [
    both.slice(0, 32),
    both.slice(32)
  ];
}
function associatedData(mode, owner, cred, pk, epk) {
  return utf8(`${mode}|${owner}|${cred}|${b64url(pk)}|${b64url(epk)}`);
}
function sameSecret(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let k = 0; k < a.length; k++) diff |= a[k] ^ b[k];
  return diff === 0;
}
var xor = (a, b) => a.map((x, k) => x ^ b[k]);
async function unseal2(pair, epk, ct, tag, state, mode, owner, cred) {
  if (epk.length !== 32 || ct.length !== 32 || tag.length !== 32) throw new Error("not a hand-off of 32 bytes");
  const [enc, mac] = await handOffKeys(pair, epk, state);
  const aad = associatedData(mode, owner, cred, pair.publicKey, epk);
  if (!sameSecret(await hmacSha256(mac, new Uint8Array([
    ...aad,
    ...ct
  ])), tag)) {
    throw new Error("the answer of the page is not authentic");
  }
  return xor(ct, enc);
}
var NO_X25519 = "this browser has no X25519 in WebCrypto, and cannot hand the key to osheaf securely (known to work: Safari 17+, Chrome 133+, Firefox 130+); osheaf uses the passphrase";
function failure(result) {
  const error = result.error;
  return new UnlockFailed(error === "x25519-unavailable" ? NO_X25519 : `the page says: ${error.slice(0, 200)}`);
}
function answerOf(result, creds = []) {
  const secret = result.secret || new Uint8Array(), cred = result.cred ?? null;
  if (secret.length !== 32) throw new UnlockFailed("the page sent a secret that is not 32 bytes");
  if (creds.length && cred !== null && !creds.includes(cred)) throw new UnlockFailed("the page used another passkey than those asked for");
  return [
    cred,
    secret
  ];
}
var POPUP = "popup";
var UNLOCK_ORIGIN = new URL(UNLOCK_PAGE).origin;
var POPUP_MESSAGES = {
  ready: "opensheaf-unlock-ready",
  request: "opensheaf-unlock-request",
  answer: "opensheaf-unlock-answer",
  done: "opensheaf-unlock-done"
};
function popupUrl(origin) {
  return UNLOCK_PAGE + "#" + new URLSearchParams({
    mode: POPUP,
    origin
  }).toString();
}
async function popupRequest(owner, creds, pair = null, state = null) {
  if (!OWNER_NAME.test(owner || "")) throw new UnlockFailed(`not an owner name: ${owner}`);
  if (!creds.length) throw new UnlockFailed("no passkey is enrolled for the keys of this owner (osheaf key enroll)");
  pair ||= await newKeyPair();
  state ||= randomState();
  return {
    owner,
    creds: [
      ...creds
    ],
    state,
    pair,
    code: await confirmationCode(state, pair.publicKey),
    message: {
      type: POPUP_MESSAGES.request,
      state,
      pk: b64url(pair.publicKey),
      owner,
      cred: creds.join(",")
    }
  };
}
function sameCode(typed, code) {
  const digits = (t) => utf8(String(t ?? "").replace(/[^0-9]/g, ""));
  return digits(typed).length === 6 && sameSecret(digits(typed), digits(code));
}
async function openPopupAnswer(request, data2, typed) {
  if (!data2 || data2.type !== POPUP_MESSAGES.answer || typeof data2.state !== "string" || !sameSecret(utf8(data2.state), utf8(request.state))) {
    throw new UnlockFailed("this is not the answer to this request");
  }
  if (typeof data2.error === "string") throw failure({
    error: data2.error
  });
  if (!sameCode(typed, request.code)) {
    throw new UnlockFailed("the code typed is not the code of this request: close the window of the passkey, and unlock again");
  }
  let secret;
  try {
    const [epk, ct, tag] = [
      fromB64url(data2.epk),
      fromB64url(data2.ct),
      fromB64url(data2.tag)
    ];
    fromB64url(data2.cred);
    secret = await unseal2(request.pair, epk, ct, tag, request.state, POPUP, request.owner, data2.cred);
  } catch {
    throw new UnlockFailed("the page sent a damaged answer");
  }
  return answerOf({
    cred: data2.cred,
    secret
  }, request.creds);
}

// web/manager.js
function browserEnvironment({ assets, keys = /* @__PURE__ */ new Map(), fetch: fetch2 = globalThis.fetch?.bind(globalThis) } = {}) {
  const refuse = (what) => async () => {
    throw new Error(`the Manager does not ${what}: use osheaf on your computer`);
  };
  return environment({
    out: () => {
    },
    err: () => {
    },
    fetch: fetch2,
    fetchJson: fetchJsonWith(fetch2),
    template: async (name2) => name2 in (assets?.templates || {}) ? new TextEncoder().encode(assets.templates[name2]) : null,
    newKey: refuse("make keys"),
    passphrase: refuse("ask for passphrases"),
    input: refuse("ask questions"),
    keyStore: {
      keptOnDevice: () => false,
      storeName: () => "the memory of this page",
      current: async (owner, dids) => (keys.get(owner) || []).filter((k) => dids.includes(k.did)),
      keep: refuse("keep keys")
    },
    signingKeyGiven: true
  });
}
async function schemasOf(assets) {
  return loadSchemas(async (url) => assets.schemas[String(url).split("/").pop()]);
}
async function signers(storage, env) {
  const f = await ArchiveFolder.open(storage, env);
  const owner = f.archive.owner;
  const log = await f.keyLog(owner);
  const latest = log?.latest();
  if (!latest) return {
    owner,
    dids: [],
    threshold: 0
  };
  return {
    owner,
    dids: [
      ...latest.keys.keys
    ],
    threshold: latest.keys.threshold
  };
}
async function walletLocks(wallet, owner, dids) {
  const salt = await passkeySalt(owner);
  const out = [];
  for (const [o, kid] of await wallet.entries(owner)) {
    const text3 = await wallet.read(o, kid, "current");
    if (!text3) continue;
    const fields = describeEntry(text3);
    if (fields.kind !== "current" || !dids.includes(fields.key)) continue;
    const creds = passkeysOf(text3).filter((p) => p.rp === PASSKEY_RP && sameBytes(p.salt, salt)).map((p) => p.cred);
    out.push({
      kid,
      did: fields.key,
      text: text3,
      creds
    });
  }
  return out;
}
var PKCS8_ED255192 = [
  48,
  46,
  2,
  1,
  0,
  48,
  5,
  6,
  3,
  43,
  101,
  112,
  4,
  34,
  4,
  32
];
async function sealedKey(key) {
  const signing = await crypto.subtle.importKey("pkcs8", new Uint8Array([
    ...PKCS8_ED255192,
    ...key.seed
  ]), {
    name: "Ed25519"
  }, false, [
    "sign"
  ]);
  key.seed.fill(0);
  return new Key(null, signing, key.publicKey, key.did, key.digest);
}
async function openLocks(locks, owner, cred, prf) {
  const kek = await passkeyKek(prf);
  const keys = [];
  for (const lock of locks) {
    if (!lock.creds.includes(cred)) continue;
    const rk = await readKey(lock.text, null, {
      [cred]: kek
    });
    if (rk.owner !== owner || rk.kind !== "current" || rk.key.did !== lock.did) {
      throw new KeyError(`the wallet's entry ${lock.kid} holds another key`);
    }
    keys.push(await sealedKey(rk.key));
  }
  kek.fill(0);
  return keys;
}
async function keyFromText(text3, { passphrase = null, owner = null } = {}) {
  const line = text3.trim();
  if (/^[A-Za-z0-9+/]{43}=$/.test(line)) {
    if (!owner) throw new KeyError("a seed alone: give the owner of the key");
    return {
      owner,
      kind: "current",
      key: await sealedKey(await Key.fromSeed(unbase64(line)))
    };
  }
  const rk = await readKey(text3, passphrase);
  return {
    owner: rk.owner,
    kind: rk.kind,
    key: await sealedKey(rk.key)
  };
}
function prefetched(path, size = null) {
  return size !== null && size < 4096 || path === "osheaf.json" || path === "opensheaf.json" || path.startsWith("collections/") || path.startsWith("templates/") || path.startsWith("ocfl/") && /\.(json|sha512)$/.test(path) || path.startsWith("ocfl/") && !path.includes("/content/");
}
async function directWrite({ repo, github, operation, fields, files = {}, env, schemas: schemas2, assets = null, mirror = null, cache = /* @__PURE__ */ new Map(), origin = "the OpenSheaf manager", progress = () => {
}, attempts = 3 }) {
  const done = await oneCommit(repo, github, async (storage) => {
    progress("carrying out");
    const answer = await carryOut(storage, env, operation, fields, files, {
      origin,
      schemas: schemas2,
      digests: false
    });
    if (answer.ok) progress("committing");
    return {
      message: answer.ok ? answer.commitMessage : null,
      answer
    };
  }, {
    mirror,
    cache,
    attempts,
    prepare: async (storage) => {
      progress("reading");
      await storage.prefetch({
        skip: (p, size) => !prefetched(p, size),
        concurrency: 12
      });
    }
  });
  return {
    ...done.answer,
    commit: done.commit,
    reads: done.storage.reads,
    attempts: done.attempts ?? 1
  };
}

// dist/manager-entry.js
var ASSETS = { "schemas": { "opensheaf-archive-0.2.schema.json": { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://opensheaf.org/schemas/opensheaf-archive-0.2.schema.json", "title": "OpenSheaf discovery document (opensheaf.json), format opensheaf-archive/0.2", "$comment": "Section 3.1 of the specification. Part of OpenSheaf 0.2 (https://opensheaf.org). Dedicated to the public domain under CC0 1.0: https://creativecommons.org/publicdomain/zero/1.0/", "type": "object", "required": ["format", "specification", "name", "storageRoot", "storageLayout", "objects", "profiles"], "properties": { "format": { "const": "opensheaf-archive/0.2" }, "specification": { "const": "0.2" }, "name": { "type": "string", "minLength": 1 }, "contact": { "type": "string", "format": "uri" }, "storageRoot": { "type": "string", "format": "uri-reference", "pattern": "/$" }, "storageLayout": { "enum": ["opensheaf-owner-name-storage-layout", "0003-hash-and-id-n-tuple-storage-layout"] }, "mainCollection": { "type": "string", "pattern": "^sheaf:[a-z2-7]{52}:[a-z2-7]{51}[aq]$", "$comment": "the object's line (section 4), sheaf:<name>:<owner>" }, "profiles": { "type": "array", "items": { "enum": ["zenodo", "texmacs", "website"] }, "uniqueItems": true }, "feed": { "type": "string", "format": "uri" }, "objects": { "type": "array", "items": { "type": "object", "required": ["id", "kind", "head", "inventorySha512", "status", "name", "owner"], "properties": { "id": { "type": "string", "pattern": "^sheaf:[a-z2-7]{52}:[a-z2-7]{51}[aq]$", "$comment": "the object's line (section 4), sheaf:<name>:<owner>" }, "kind": { "enum": ["document", "collection", "owner"] }, "head": { "type": "string", "pattern": "^v[1-9][0-9]*$" }, "inventorySha512": { "type": "string", "pattern": "^[0-9a-f]{128}$" }, "status": { "enum": ["active", "withdrawn"] }, "name": { "type": "string", "pattern": "^[a-z2-7]{52}$", "$comment": "a name of genesis.json (section 5.2): seeded SHA-256, lowercase base32, the algorithm number in the last character" }, "owner": { "type": "string", "pattern": "^[a-z2-7]{51}[aq]$", "$comment": "an owner name (section 6), the name of the owner's genesis record (52 characters of base32)" }, "label": { "type": "string", "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$", "maxLength": 64, "$comment": "a readable label (section 3.1), not an identifier" } }, "allOf": [{ "if": { "properties": { "kind": { "const": "owner" } } }, "then": { "properties": { "status": { "const": "active" } } } }] } }, "tombstones": { "type": "array", "items": { "type": "object", "required": ["id", "kind", "lastVersion", "inventorySha512", "date", "reason", "name", "owner", "genesisName"], "properties": { "id": { "type": "string", "pattern": "^sheaf:[a-z2-7]{52}:[a-z2-7]{51}[aq]$", "$comment": "the object's line (section 4), sheaf:<name>:<owner>" }, "kind": { "enum": ["document", "collection", "owner"] }, "lastVersion": { "type": "string", "pattern": "^v[1-9][0-9]*$" }, "inventorySha512": { "type": "string", "pattern": "^[0-9a-f]{128}$" }, "date": { "type": "string", "format": "date" }, "reason": { "type": "string" }, "name": { "type": "string", "pattern": "^[a-z2-7]{52}$", "$comment": "a name of genesis.json (section 5.2): seeded SHA-256, lowercase base32, the algorithm number in the last character" }, "owner": { "type": "string", "pattern": "^[a-z2-7]{51}[aq]$", "$comment": "an owner name (section 6), the name of the owner's genesis record (52 characters of base32)" }, "genesisName": { "type": "string", "pattern": "^[a-z2-7]{51}[aq]$", "$comment": "the genesis name, by algorithm 0 (sections 5.2, 13.3)" } } } }, "extensions": { "type": "array", "items": { "type": "string", "format": "uri" }, "uniqueItems": true }, "indexes": { "$comment": "the indexes kept, each with the length of the prefixes of its files (sections 3.1, 12.5)", "type": "object", "minProperties": 1, "properties": { "names": { "type": "integer", "minimum": 2, "maximum": 4 }, "owners": { "type": "integer", "minimum": 2, "maximum": 4 }, "sha512": { "type": "integer", "minimum": 2, "maximum": 4 } }, "additionalProperties": false }, "owners": { "type": "array", "items": { "type": "string", "pattern": "^[a-z2-7]{51}[aq]$" }, "uniqueItems": true, "$comment": "the owner names (section 6) of the owners the archive hosts" }, "drafts": { "type": "array", "$comment": "drafts (section 10.1) shown as unfinished work, on which nothing may rely", "items": { "type": "object", "required": ["id", "kind", "head"], "properties": { "id": { "type": "string", "pattern": "^sheaf:draft:[a-z0-9]+(-[a-z0-9]+)*$", "maxLength": 76, "$comment": "a draft's local identifier (section 10.1), sheaf:draft:<id>, <id> following the pattern of labels, at most 64 characters (76 in all)" }, "kind": { "enum": ["document", "collection"] }, "head": { "type": "string", "pattern": "^v[1-9][0-9]*$" } } } } } }, "opensheaf-collection-0.2.schema.json": { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://opensheaf.org/schemas/opensheaf-collection-0.2.schema.json", "title": "OpenSheaf member list (members.json), format opensheaf-collection/0.2", "$comment": "Section 8.2 of the specification. Part of OpenSheaf 0.2 (https://opensheaf.org). Dedicated to the public domain under CC0 1.0: https://creativecommons.org/publicdomain/zero/1.0/", "type": "object", "required": ["format", "type", "members"], "properties": { "format": { "const": "opensheaf-collection/0.2" }, "order": { "enum": ["manual", "issued-desc", "issued-asc"] }, "members": { "type": "array", "items": { "type": "object", "required": ["kind", "name", "owner", "at"], "properties": { "kind": { "enum": ["document", "collection"] }, "version": { "type": "string", "pattern": "^v[1-9][0-9]*$" }, "inventorySha512": { "type": "string", "pattern": "^[0-9a-f]{128}$" }, "doi": { "type": "string", "pattern": "^10\\.[0-9]+(\\.[0-9]+)*/\\S+$" }, "conceptDoi": { "type": "string", "pattern": "^10\\.[0-9]+(\\.[0-9]+)*/\\S+$" }, "follow": { "const": "latest" }, "cite": { "type": "object", "properties": { "title": { "type": "string" }, "creators": { "type": "array", "items": { "type": "string" } }, "year": { "type": "integer" }, "issued": { "type": "string" } } }, "revisions": { "type": "array", "minItems": 1, "items": { "type": "object", "required": ["documentVersion", "version", "inventorySha512"], "properties": { "documentVersion": { "type": "integer", "minimum": 1 }, "version": { "type": "string", "pattern": "^v[1-9][0-9]*$" }, "inventorySha512": { "type": "string", "pattern": "^[0-9a-f]{128}$" }, "doi": { "type": "string", "pattern": "^10\\.[0-9]+(\\.[0-9]+)*/\\S+$", "$comment": "optional (section 8.4): the version DOI of the document version vetted" } } } }, "name": { "type": "string", "pattern": "^[a-z2-7]{52}$", "$comment": "a name of genesis.json (section 5.2): seeded SHA-256, lowercase base32, the algorithm number in the last character" }, "owner": { "type": "string", "pattern": "^[a-z2-7]{51}[aq]$", "$comment": "an owner name (section 6), the name of the owner's genesis record (52 characters of base32)" }, "at": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "type": "string", "format": "uri", "pattern": "^https://.*/$" }, "$comment": "base URLs where copies of the line may be found, all equal hints (sections 3, 8.2, 12.3)" } } } }, "type": { "enum": ["catalogue", "selection"], "description": "catalogue: members pin objects whole (version, inventorySha512, optional follow); selection: members pin revision sets (revisions)" } }, "allOf": [{ "if": { "properties": { "type": { "const": "catalogue" } } }, "then": { "properties": { "members": { "items": { "required": ["version", "inventorySha512"], "not": { "required": ["revisions"] } } } } } }, { "if": { "properties": { "type": { "const": "selection" } } }, "then": { "properties": { "members": { "items": { "required": ["revisions"], "not": { "anyOf": [{ "required": ["version"] }, { "required": ["inventorySha512"] }, { "required": ["follow"] }] } } } } } }] }, "opensheaf-genesis-0.2.schema.json": { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://opensheaf.org/schemas/opensheaf-genesis-0.2.schema.json", "title": "OpenSheaf genesis record (genesis.json), version 0.2", "$comment": "Section 5 of the specification. Dedicated to the public domain under CC0 1.0.", "type": "object", "additionalProperties": false, "required": ["format", "kind", "created", "nonce"], "properties": { "format": { "const": "opensheaf-genesis/0.2" }, "kind": { "enum": ["document", "collection", "owner"] }, "created": { "type": "string", "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\\.[0-9]+)?Z$" }, "originator": { "type": "string", "pattern": "^[a-z2-7]{51}[aq]$", "$comment": "section 5.3: the owner name of the owner of the first line" }, "nonce": { "type": "string", "pattern": "^([0-9a-f]{2}){16,}$" }, "keys": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "type": "string", "pattern": "^did:key:z6Mk[1-9A-HJ-NP-Za-km-z]{44}$" }, "$comment": "sections 5.1 and 6.1: an owner's first current keys" }, "threshold": { "type": "integer", "minimum": 1 }, "next": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "type": "string", "pattern": "^[a-z2-7]{51}[aq]$" }, "$comment": "sections 5.1 and 6.1: the digests of an owner's first rotation keys, which sign the second version of its key log; the first version is computed from this record" }, "nextThreshold": { "type": "integer", "minimum": 1 }, "keeper": { "type": "array", "minItems": 1, "maxItems": 1, "items": { "type": "string", "format": "uri", "pattern": "^https://(orcid\\.org/[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}[0-9X]|[a-z0-9.-]+/)$" }, "$comment": "optional, for an owner only (sections 5.1 and 6.6): the single person or institution who answers for the owner, an ORCID iD or a domain, fixed by the owner name; at most one" }, "extensions": { "type": "object", "$comment": "optional, for an owner only (sections 2, 5.1 and 6.1): the data of extensions concerning its key log as of the first version, keyed by their names (URIs); each value is an object, validated by the schema of its extension", "propertyNames": { "format": "uri", "minLength": 1 }, "additionalProperties": { "type": "object" } } }, "allOf": [{ "if": { "properties": { "kind": { "const": "owner" } } }, "then": { "required": ["keys", "threshold", "next", "nextThreshold"], "not": { "required": ["originator"] } }, "else": { "required": ["originator"], "not": { "anyOf": [{ "required": ["keys"] }, { "required": ["threshold"] }, { "required": ["next"] }, { "required": ["nextThreshold"] }, { "required": ["keeper"] }, { "required": ["extensions"] }] } } }] }, "opensheaf-index-0.2.schema.json": { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://opensheaf.org/schemas/opensheaf-index-0.2.schema.json", "title": "OpenSheaf index file (names/, owners/, sha512/) and index declaration (indexes.json), version 0.2", "$comment": "Section 12.5 of the specification. An index file has `index` and `entries`; a declaration of indexes kept for several archives (indexes.json) has `indexes`. Dedicated to the public domain under CC0 1.0. The prefix of each entry, which must be the file's, is checked by verifiers, not by this schema.", "oneOf": [{ "$ref": "#/$defs/indexFile" }, { "$ref": "#/$defs/declaration" }], "$defs": { "indexFile": { "type": "object", "required": ["format", "index", "entries"], "properties": { "format": { "const": "opensheaf-index/0.2" }, "index": { "enum": ["names", "owners", "sha512"] }, "entries": { "type": "array", "minItems": 1, "items": { "type": "object", "properties": { "name": { "$ref": "#/$defs/base32" }, "originator": { "$ref": "#/$defs/ownerName", "$comment": "the owner name of the originator (sections 5.1, 12.5); for an owner object, itself" }, "owner": { "$ref": "#/$defs/ownerName", "$comment": "an owner name (section 6)" }, "names": { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/base32" } }, "genesis": { "type": "string", "$comment": "the exact text of genesis.json (sections 5.1, 12.4)" }, "inventorySha512": { "type": "string", "pattern": "^[0-9a-f]{128}$" }, "version": { "type": "string", "pattern": "^v[1-9][0-9]*$" }, "status": { "enum": ["active", "withdrawn", "removed"] }, "id": { "type": "string", "pattern": "^sheaf:[a-z2-7]{52}:[a-z2-7]{51}[aq]$", "$comment": "the object's line, sheaf:<name>:<owner> (section 4)" }, "label": { "type": "string", "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$", "maxLength": 64 }, "at": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "type": "string", "format": "uri", "pattern": "^https://.*/$" }, "$comment": "in indexes kept for several archives: base URLs of the archive serving the copy, equal hints (sections 3, 12.5)" } } } } }, "allOf": [{ "if": { "properties": { "index": { "const": "names" } } }, "then": { "properties": { "entries": { "items": { "required": ["name", "owner", "id", "status"], "if": { "properties": { "status": { "enum": ["active", "withdrawn"] } } }, "then": { "required": ["originator", "genesis"] } } } } } }, { "if": { "properties": { "index": { "const": "owners" } } }, "then": { "properties": { "entries": { "items": { "required": ["owner", "names"] } } } } }, { "if": { "properties": { "index": { "const": "sha512" } } }, "then": { "properties": { "entries": { "items": { "required": ["inventorySha512", "id", "version", "status"] } } } } }] }, "declaration": { "type": "object", "required": ["format", "indexes"], "properties": { "format": { "const": "opensheaf-index/0.2" }, "indexes": { "$ref": "#/$defs/prefixes" } }, "not": { "required": ["entries"] } }, "prefixes": { "type": "object", "minProperties": 1, "properties": { "names": { "type": "integer", "minimum": 2, "maximum": 4 }, "owners": { "type": "integer", "minimum": 2, "maximum": 4 }, "sha512": { "type": "integer", "minimum": 2, "maximum": 4 } }, "additionalProperties": false }, "base32": { "type": "string", "pattern": "^[a-z2-7]{52}$" }, "ownerName": { "type": "string", "pattern": "^[a-z2-7]{51}[aq]$", "$comment": "an owner name (section 6): always made by algorithm 0 (sections 5.2 and 6.2)" } } }, "opensheaf-keeper-0.2.schema.json": { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://opensheaf.org/schemas/opensheaf-keeper-0.2.schema.json", "title": "OpenSheaf keeper confirmation (.well-known/opensheaf), version 0.2", "$comment": "Section 6.6 of the specification. Dedicated to the public domain under CC0 1.0.", "type": "object", "additionalProperties": false, "required": ["format", "owners"], "properties": { "format": { "const": "opensheaf-keeper/0.2" }, "owners": { "type": "array", "uniqueItems": true, "items": { "$ref": "#/$defs/ownerName" }, "$comment": "the owner names this keeper answers for" }, "successors": { "type": "object", "propertyNames": { "pattern": "^[a-z2-7]{51}[aq]$" }, "additionalProperties": { "$ref": "#/$defs/ownerName" }, "$comment": "optional: owner names this keeper answers for, mapped to their successors" } }, "$defs": { "ownerName": { "type": "string", "pattern": "^[a-z2-7]{51}[aq]$" } } }, "opensheaf-keys-0.2.schema.json": { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://opensheaf.org/schemas/opensheaf-keys-0.2.schema.json", "title": "OpenSheaf key log version (keys.json), version 0.2", "$comment": "Section 6 of the specification (field names provisional, #55; next, nextThreshold and exposed provisional, #58). Dedicated to the public domain under CC0 1.0. That threshold does not exceed the number of keys nor nextThreshold that of next, that no version follows one with ended or a fork record (which holds forked/<d>/ and no keys.json), that keys lists no exposed key and no key whose digest next of its version or an earlier one holds, that next holds no digest of a current key nor a digest held in next of an earlier version, that exposed lists only keys of earlier versions of the same key log, that the first version is the one computed from the genesis record, its keys.json being the JCS form of format and the keys, threshold, next and nextThreshold of the genesis record (keeper and the extensions of the first version are in the genesis record), and that each later version is signed by nextThreshold rotation keys of the version before, are checked by verifiers.", "type": "object", "additionalProperties": false, "required": ["format"], "properties": { "format": { "const": "opensheaf-keys/0.2" }, "keys": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "$ref": "#/$defs/didKey" }, "$comment": "section 6.1: the current keys, which sign the versions of the owner's lines and never the key log; absent from an ending version" }, "threshold": { "type": "integer", "minimum": 1, "$comment": "section 6.1: how many distinct current keys must sign a version of a line; absent from an ending version" }, "next": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "$ref": "#/$defs/keyDigest" }, "$comment": "section 6.1: digests of the rotation keys that sign the next version of the key log, each committed in one version only; absent from an ending version" }, "nextThreshold": { "type": "integer", "minimum": 1, "$comment": "section 6.1: how many distinct rotation keys must sign the next version" }, "extensions": { "type": "object", "$comment": "sections 2 and 6.1: the data of extensions concerning the key log, keyed by their names (URIs), for instance https://opensheaf.org/opensheaf-timestamps-0.2; each value is an object, validated by the schema of its extension; absent from the first version, whose extensions are in the genesis record", "propertyNames": { "format": "uri", "minLength": 1 }, "additionalProperties": { "type": "object" } }, "ended": { "const": true, "$comment": "optional (section 6.3): the owner ends with this version, which has no keys, threshold, next or nextThreshold; no later version but a fork record is a version of the key log" }, "successor": { "type": "string", "pattern": "^[a-z2-7]{51}[aq]$", "$comment": "optional, only with ended (section 6.3): the owner name of the owner that continues the work, other than this owner; accepted only as section 6.6 says" }, "exposed": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "$ref": "#/$defs/didKey" }, "$comment": "optional (section 6.3): keys listed in keys of earlier versions of this key log that this version declares exposed; an exposure in any version, on either side of a fork, carried versions included, counts" } }, "$defs": { "didKey": { "type": "string", "pattern": "^did:key:z6Mk[1-9A-HJ-NP-Za-km-z]{44}$", "$comment": "an Ed25519 key as did:key (multibase base58btc, multicodec ed25519-pub)" }, "keyDigest": { "type": "string", "pattern": "^[a-z2-7]{51}[aq]$", "$comment": "the lowercase base32 (RFC 4648, without padding) SHA-256 digest of a did:key URI as UTF-8, 52 characters" } }, "dependentRequired": { "successor": ["ended"], "keys": ["threshold"], "threshold": ["keys"], "next": ["nextThreshold"], "nextThreshold": ["next"] }, "if": { "required": ["ended"] }, "then": { "not": { "anyOf": [{ "required": ["keys"] }, { "required": ["threshold"] }, { "required": ["next"] }, { "required": ["nextThreshold"] }] } }, "else": { "required": ["keys", "threshold", "next"] } }, "opensheaf-object-0.2.schema.json": { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://opensheaf.org/schemas/opensheaf-object-0.2.schema.json", "title": "OpenSheaf object record (object.json), format opensheaf-object/0.2", "$comment": "Section 4.3 of the specification. Part of OpenSheaf 0.2 (https://opensheaf.org). Dedicated to the public domain under CC0 1.0: https://creativecommons.org/publicdomain/zero/1.0/", "type": "object", "required": ["format", "specification", "kind", "status"], "properties": { "format": { "const": "opensheaf-object/0.2" }, "specification": { "const": "0.2" }, "kind": { "enum": ["document", "collection", "owner"] }, "documentVersion": { "type": "integer", "minimum": 1 }, "mainSource": { "type": "string", "minLength": 1, "pattern": "^(?!/)(?!.*//)(?!.*/$)(?!(?:.*/)?\\.{1,2}(?:/|$))[^\\\\]+$" }, "sourceFormat": { "type": "string", "minLength": 1 }, "sourcesMissing": { "$ref": "#/$defs/note" }, "renditions": { "type": "array", "items": { "type": "object", "required": ["path", "mediaType"], "properties": { "path": { "type": "string", "minLength": 1, "pattern": "^(?!/)(?!.*//)(?!.*/$)(?!(?:.*/)?\\.{1,2}(?:/|$))[^\\\\]+$" }, "mediaType": { "type": "string", "minLength": 1 } } } }, "toolchain": { "type": "array", "items": { "type": "object", "required": ["name", "version"], "properties": { "name": { "type": "string" }, "version": { "type": "string" }, "packages": { "type": "array", "items": { "type": "string" } } } } }, "changes": { "$ref": "#/$defs/note" }, "stage": { "type": "object", "required": ["scheme", "value"], "properties": { "scheme": { "type": "string", "minLength": 1 }, "value": { "type": "string", "minLength": 1 } } }, "history": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "$ref": "#/$defs/objectVersion" } }, "notices": { "type": "array", "items": { "allOf": [{ "$ref": "#/$defs/note" }, { "type": "object", "required": ["documentVersion", "date"], "properties": { "documentVersion": { "type": "integer", "minimum": 1 }, "date": { "type": "string", "format": "date" } } }] } }, "licence": { "$ref": "#/$defs/note" }, "agreement": { "type": "object", "required": ["by", "date", "method"], "properties": { "by": { "type": "array", "items": { "type": "string" } }, "date": { "type": "string", "format": "date" }, "method": { "type": "string" } } }, "external": { "type": "array", "items": { "type": "object", "required": ["role", "service", "record"], "properties": { "role": { "enum": ["deposit", "source"] }, "service": { "type": "string" }, "record": { "type": "string", "format": "uri" }, "doi": { "type": "string", "pattern": "^10\\.[0-9]+(\\.[0-9]+)*/\\S+$" }, "files": { "type": "array", "items": { "type": "object", "required": ["name", "sha512"], "properties": { "name": { "type": "string" }, "sha512": { "type": "string", "pattern": "^[0-9a-f]{128}$" }, "md5": { "type": "string", "pattern": "^[0-9a-f]{32}$" }, "bytes": { "type": "integer" } } } }, "label": { "type": "string" } } } }, "status": { "enum": ["active", "withdrawn"] }, "previous": { "type": "string", "pattern": "^[0-9a-f]{128}$", "$comment": "section 4.3: in every sealed object version from the second, the SHA-512 digest of the inventory file of the version before (its pin); absent in a first version and in a draft. Required from the second version on, which a verifier checks (section 14.2), since this file does not state its object version" }, "withdrawal": { "type": "object", "required": ["date", "reason"], "properties": { "date": { "type": "string", "format": "date" }, "reason": { "$ref": "#/$defs/note" } } }, "extensions": { "type": "object", "propertyNames": { "format": "uri", "minLength": 1 }, "additionalProperties": true }, "name": { "type": "string", "pattern": "^[a-z2-7]{52}$", "$comment": "section 5.2: a name of genesis.json: seeded SHA-256, lowercase base32, the algorithm number in the last character" }, "owner": { "type": "string", "pattern": "^[a-z2-7]{51}[aq]$", "$comment": "section 6: an owner name, the name of the owner's genesis record (52 characters of base32)" }, "parent": { "type": "object", "$comment": "section 9.1: the parent version of a branch", "required": ["owner", "name", "objectVersion", "documentVersion", "inventorySha512"], "properties": { "owner": { "type": "string", "pattern": "^[a-z2-7]{51}[aq]$", "$comment": "section 6: an owner name, the name of the owner's genesis record (52 characters of base32)" }, "name": { "type": "string", "pattern": "^[a-z2-7]{52}$", "$comment": "section 5.2: a name of genesis.json: seeded SHA-256, lowercase base32, the algorithm number in the last character" }, "objectVersion": { "$ref": "#/$defs/objectVersion" }, "documentVersion": { "type": "integer", "minimum": 1 }, "inventorySha512": { "type": "string", "pattern": "^[0-9a-f]{128}$" }, "url": { "type": "string", "format": "uri", "pattern": "/$" } } } }, "$defs": { "note": { "type": "object", "properties": { "text": { "type": "string", "minLength": 1 }, "path": { "type": "string", "minLength": 1, "pattern": "^(?!/)(?!.*//)(?!.*/$)(?!(?:.*/)?\\.{1,2}(?:/|$))[^\\\\]+$" }, "mediaType": { "type": "string", "minLength": 1 } }, "anyOf": [{ "required": ["text"] }, { "required": ["path"] }], "dependentRequired": { "path": ["mediaType"] } }, "objectVersion": { "type": "string", "pattern": "^v[1-9][0-9]*$" } }, "allOf": [{ "if": { "properties": { "kind": { "const": "document" } } }, "then": { "anyOf": [{ "required": ["mainSource", "sourceFormat"] }, { "required": ["sourcesMissing", "renditions"], "properties": { "renditions": { "minItems": 1 } } }] } }, { "if": { "properties": { "status": { "const": "withdrawn" } } }, "then": { "required": ["withdrawal"] } }, { "if": { "properties": { "kind": { "const": "collection" } } }, "then": { "not": { "anyOf": [{ "required": ["mainSource"] }, { "required": ["sourceFormat"] }, { "required": ["sourcesMissing"] }, { "required": ["renditions"] }, { "required": ["toolchain"] }, { "required": ["changes"] }, { "required": ["stage"] }, { "required": ["history"] }, { "required": ["notices"] }, { "required": ["licence"] }] }, "properties": { "withdrawal": { "properties": { "reason": { "not": { "required": ["path"] } } } } } } }, { "if": { "required": ["sourcesMissing"] }, "then": { "not": { "anyOf": [{ "required": ["mainSource"] }, { "required": ["sourceFormat"] }] } } }, { "if": { "properties": { "kind": { "enum": ["document", "collection"] } } }, "then": { "required": ["documentVersion"] } }, { "if": { "properties": { "kind": { "const": "owner" } } }, "then": { "$comment": "section 4.3: an owner object records only format, specification, kind, name, owner and status, and optionally extensions", "required": ["name", "owner"], "not": { "anyOf": [{ "required": ["documentVersion"] }, { "required": ["parent"] }, { "required": ["mainSource"] }, { "required": ["sourceFormat"] }, { "required": ["sourcesMissing"] }, { "required": ["renditions"] }, { "required": ["toolchain"] }, { "required": ["changes"] }, { "required": ["stage"] }, { "required": ["history"] }, { "required": ["notices"] }, { "required": ["withdrawal"] }, { "required": ["licence"] }, { "required": ["agreement"] }, { "required": ["external"] }] }, "properties": { "status": { "const": "active" } } } }, { "$comment": "section 4.3: a draft (no name) is never withdrawn", "if": { "not": { "required": ["name"] } }, "then": { "properties": { "status": { "const": "active" } } } }], "dependentRequired": { "name": ["owner"], "parent": ["name", "owner"], "owner": ["name"] } }, "opensheaf-signature-0.2.schema.json": { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://opensheaf.org/schemas/opensheaf-signature-0.2.schema.json", "title": "OpenSheaf signature file, version 0.2", "$comment": "Section 7.2 of the specification (field names provisional, #55; the signed message is defined there). Dedicated to the public domain under CC0 1.0.", "type": "object", "required": ["format", "object", "version", "inventorySha512", "signer", "key", "keyLog", "signature"], "properties": { "format": { "const": "opensheaf-signature/0.2" }, "key": { "type": "string", "pattern": "^did:key:z6Mk[1-9A-HJ-NP-Za-km-z]{44}$" }, "keyLog": { "type": "string", "pattern": "^sheaf:[a-z2-7]{51}[aq]/v[1-9][0-9]*\\?sha512=[0-9a-f]{128}$", "$comment": "a pin of the key-log version the signature relies on" }, "signature": { "type": "string", "pattern": "^[A-Za-z0-9+/]{85}[AQgw]==$", "$comment": "an Ed25519 signature (64 bytes) in canonical base64, the unused bits of the last character zero" }, "object": { "type": "string", "pattern": "^sheaf:[a-z2-7]{52}:[a-z2-7]{51}[aq]$" }, "version": { "type": "string", "pattern": "^v[1-9][0-9]*$" }, "inventorySha512": { "type": "string", "pattern": "^[0-9a-f]{128}$" }, "signer": { "type": "string", "pattern": "^[a-z2-7]{51}[aq]$", "$comment": "the owner name of the signer" } }, "additionalProperties": false }, "opensheaf-timestamps-0.2.schema.json": { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://opensheaf.org/schemas/opensheaf-timestamps-0.2.schema.json", "title": "OpenSheaf timestamps extension: the owner's declaration, version 0.2", "$comment": 'Part of the OpenSheaf timestamps extension 0.2 (https://opensheaf.org/opensheaf-timestamps-0.2), not of the core specification. The value of extensions["https://opensheaf.org/opensheaf-timestamps-0.2"] in the genesis record of an owner (for the first version of its key log) or in keys.json; the entry, even empty, declares that the owner timestamps every signature it makes. Closed to other properties, like the genesis records and key logs that hold it, so that nothing seems committed to that is not defined. Dedicated to the public domain under CC0 1.0.', "type": "object", "additionalProperties": false, "properties": { "timestampAuthorities": { "type": "array", "uniqueItems": true, "items": { "type": "string", "pattern": "^[0-9a-f]{64}$" }, "$comment": "SHA-256 fingerprints of the signing or root certificates of RFC 3161 authorities; a signature file trusts those listed in the key-log version it names and in the versions before it, and a date earlier than that key-log version's own does not count" } } } }, "templates": { "collection.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{title}} \xB7 {{archive_name}}</title>
{{head}}
<link rel="stylesheet" href="{{root}}style.css">
<script>window.MathJax = {tex: {inlineMath: [['$', '$']], processEscapes: true}};<\/script>
<script defer src="https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.js"><\/script>
<script>
document.addEventListener('click', function (e) {
  var el = e.target.closest && e.target.closest('code.copy');
  if (!el || !navigator.clipboard) return;
  navigator.clipboard.writeText(el.getAttribute('data-copy') || el.textContent).then(function () {
    el.classList.add('copied');
    setTimeout(function () { el.classList.remove('copied'); }, 1200);
  });
});
<\/script>
</head>
<body>
<nav><a href="{{root}}">{{archive_name}}</a></nav>
<main class="paper-page collection-page">
  <h1>{{title}}</h1>
  <p class="paper-authors">{{kind}}</p>
  <p class="paper-meta">Since {{issued}} \xB7 {{count}}</p>
  {{withdrawn}}
  {{contested}}
  <dl class="identifiers">
    <dt>Line</dt><dd><code class="copy">{{sheaf_uri}}</code> <span class="small">(short: <code class="copy">{{sheaf_short}}</code>)</span></dd>
    <dt>Owner</dt><dd>{{owner}}</dd>
  </dl>
  <section class="abstract">
    {{description}}
  </section>
  <section>
    <h2>Members</h2>
    <ol class="papers">
{{members}}
    </ol>
  </section>
  <section>
    <h2>Versions</h2>
    <ol class="versions">
{{versions}}
    </ol>
  </section>
  <section>
    <h2>Cite</h2>
    <p class="cite">{{cite}}</p>
    <p class="small">Licence: {{licence}}</p>
    <p class="small">Pin in the collection (SHA-512 of the inventory it fixes):
    <code class="copy">{{pin}}</code> (<a href="{{pin_url}}">the inventory</a>)</p>
  </section>
</main>
<footer>
  <p>An <a href="https://opensheaf.org">OpenSheaf</a> archive (format 0.2, a draft, which may still change) \xB7
  made with <a href="https://github.com/opensheaf/opensheaf-py">opensheaf-py</a></p>
</footer>
</body>
</html>
`, "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{archive_name}}</title>
<link rel="stylesheet" href="{{root}}style.css">
<link rel="describedby" href="{{root}}opensheaf.json" type="application/json">
<script>window.MathJax = {tex: {inlineMath: [['$', '$']], processEscapes: true}};<\/script>
<script defer src="https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.js"><\/script>
</head>
<body>
<header>
  <h1>{{archive_name}}</h1>
  <p class="lead">{{lead}}</p>
</header>
<main>
{{featured}}
{{papers_heading}}
  <ol class="papers">
{{papers}}
  </ol>
</main>
<footer>
  <p>{{count}} documents \xB7 updated {{updated}} \xB7
  made with <a href="https://github.com/opensheaf/opensheaf-py">opensheaf-py</a> \xB7
  format <a href="https://opensheaf.org">OpenSheaf 0.2</a> (a draft, which may still change)</p>
  <p><a href="https://opensheaf.org/explorer/?url={{base_url}}">Explore and verify this archive</a>
  with the OpenSheaf Explorer, in the browser</p>
</footer>
</body>
</html>
`, "owner.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Owner {{owner}} \xB7 {{archive_name}}</title>
<link rel="stylesheet" href="{{root}}style.css">
<script>
document.addEventListener('click', function (e) {
  var el = e.target.closest && e.target.closest('code.copy');
  if (!el || !navigator.clipboard) return;
  navigator.clipboard.writeText(el.getAttribute('data-copy') || el.textContent).then(function () {
    el.classList.add('copied');
    setTimeout(function () { el.classList.remove('copied'); }, 1200);
  });
});
<\/script>
</head>
<body>
<nav><a href="{{root}}">{{archive_name}}</a></nav>
<main class="paper-page owner-page">
  <h1>Owner</h1>
  <p class="paper-meta"><code class="copy">{{owner}}</code></p>
  <p class="small">An owner is the keyed identity that signs the versions of its lines
  (section 6 of the specification); its name identifies no one. What it signs is checked
  against its key log, summarised here as this archive holds it.</p>
  <section>
    <h2>Key log</h2>
    <ul class="facts">
{{facts}}
    </ul>
  </section>
  <section>
    <h2>Lines in this archive</h2>
    <ul class="facts">
{{lines}}
    </ul>
  </section>
</main>
<footer>
  <p>An <a href="https://opensheaf.org">OpenSheaf</a> archive (format 0.2, a draft, which may still change) \xB7
  made with <a href="https://github.com/opensheaf/opensheaf-py">opensheaf-py</a></p>
</footer>
</body>
</html>
`, "paper.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{title}} \xB7 {{archive_name}}</title>
{{head}}
<link rel="stylesheet" href="{{root}}style.css">
<script>window.MathJax = {tex: {inlineMath: [['$', '$']], processEscapes: true}};<\/script>
<script defer src="https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.js"><\/script>
<script>
document.addEventListener('click', function (e) {
  var el = e.target.closest && e.target.closest('code.copy');
  if (!el || !navigator.clipboard) return;
  navigator.clipboard.writeText(el.getAttribute('data-copy') || el.textContent).then(function () {
    el.classList.add('copied');
    setTimeout(function () { el.classList.remove('copied'); }, 1200);
  });
});
<\/script>
</head>
<body>
<nav><a href="{{root}}">{{archive_name}}</a></nav>
<main class="paper-page">
  <h1>{{title}}</h1>
  <p class="paper-authors">{{authors}}</p>
  <p class="paper-meta">First issued {{issued}} \xB7 <a href="{{pdf}}">PDF</a>{{html_link}}</p>
  {{withdrawn}}
  {{contested}}
  <dl class="identifiers">
    <dt>Line</dt><dd><code class="copy">{{sheaf_uri}}</code> <span class="small">(short: <code class="copy">{{sheaf_short}}</code>)</span></dd>
    <dt>Owner</dt><dd>{{owner}}</dd>
  </dl>
  <section class="abstract">
    <h2>Abstract</h2>
    {{abstract}}
  </section>
  <section>
    <h2>Versions</h2>
    <ol class="versions">
{{versions}}
    </ol>
  </section>
  <section>
    <h2>Cite</h2>
    <p class="cite">{{cite}}</p>
    <p class="small">Licence: {{licence}}</p>
    <p class="small">Pin in the collection (SHA-512 of the inventory it fixes):
    <code class="copy">{{pin}}</code> (<a href="{{pin_url}}">the inventory</a>)</p>
  </section>
</main>
<footer>
  <p>An <a href="https://opensheaf.org">OpenSheaf</a> archive (format 0.2, a draft, which may still change) \xB7
  made with <a href="https://github.com/opensheaf/opensheaf-py">opensheaf-py</a></p>
</footer>
</body>
</html>
`, "style.css": '/* The default style of an OpenSheaf archive (opensheaf-py); edit freely. */\n@font-face { font-family: "CMU Serif"; font-style: normal; font-weight: 400; font-display: swap;\n  src: url("https://opensheaf.org/resources/fonts/cmu/cmunrm.woff2") format("woff2"); }\n@font-face { font-family: "CMU Serif"; font-style: italic; font-weight: 400; font-display: swap;\n  src: url("https://opensheaf.org/resources/fonts/cmu/cmunti.woff2") format("woff2"); }\n@font-face { font-family: "CMU Serif"; font-style: normal; font-weight: 600 700; font-display: swap;\n  src: url("https://opensheaf.org/resources/fonts/cmu/cmunbx.woff2") format("woff2"); }\n@font-face { font-family: "CMU Serif"; font-style: italic; font-weight: 600 700; font-display: swap;\n  src: url("https://opensheaf.org/resources/fonts/cmu/cmunbi.woff2") format("woff2"); }\n@font-face { font-family: "IBM Plex Sans"; font-style: normal; font-weight: 100 700; font-display: swap;\n  src: url("https://opensheaf.org/resources/fonts/plex/IBMPlexSans-Roman.woff2") format("woff2"); }\n@font-face { font-family: "IBM Plex Sans"; font-style: italic; font-weight: 100 700; font-display: swap;\n  src: url("https://opensheaf.org/resources/fonts/plex/IBMPlexSans-Italic.woff2") format("woff2"); }\n@font-face { font-family: "JetBrains Mono"; font-style: normal; font-weight: 100 800; font-display: swap;\n  src: url("https://opensheaf.org/resources/fonts/jetbrains/JetBrainsMono-Roman.woff2") format("woff2"); }\n:root {\n    color-scheme: light;\n    --os-paper: #f9f8f5;\n    --os-surface: #f1efea;\n    --os-rule: #dedbd3;\n    --os-ink: #171716;\n    --os-muted: #6a6861;\n    --os-faint: #a09d95;\n    --os-ok: #2c6a3e;\n    --os-ok-bg: #e6efe4;\n    --os-bad: #9d2b22;\n    --os-bad-bg: #f6e4e0;\n    --os-warn: #7d5200;\n    --os-warn-bg: #f5ecd6;\n    --os-code-keyword: #7b3f8c;\n    --os-code-title: #1f5b8f;\n    --os-code-type: #2c6a64;\n    --os-code-literal: #8a5a14;\n    --os-serif: "CMU Serif", "Latin Modern Roman", "Computer Modern", "Times New Roman", serif;\n    --os-sans: "IBM Plex Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif;\n    --os-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;\n}\n@media (prefers-color-scheme: dark) {\n    :root:not([data-theme="light"]) {\n        color-scheme: dark;\n        --os-paper: #12141a;\n        --os-surface: #1b1e25;\n        --os-rule: #31353e;\n        --os-ink: #e6e7ea;\n        --os-muted: #9a9ea8;\n        --os-faint: #646975;\n        --os-ok: #93cfa1;\n        --os-ok-bg: #182a23;\n        --os-bad: #eda59c;\n        --os-bad-bg: #342025;\n        --os-warn: #e7c277;\n        --os-warn-bg: #2d281c;\n        --os-code-keyword: #cfa6dd;\n        --os-code-title: #9cc3ea;\n        --os-code-type: #8ccbc1;\n        --os-code-literal: #e2bd7e;\n    }\n}\n:root[data-theme="dark"] {\n    color-scheme: dark;\n    --os-paper: #12141a;\n    --os-surface: #1b1e25;\n    --os-rule: #31353e;\n    --os-ink: #e6e7ea;\n    --os-muted: #9a9ea8;\n    --os-faint: #646975;\n    --os-ok: #93cfa1;\n    --os-ok-bg: #182a23;\n    --os-bad: #eda59c;\n    --os-bad-bg: #342025;\n    --os-warn: #e7c277;\n    --os-warn-bg: #2d281c;\n    --os-code-keyword: #cfa6dd;\n    --os-code-title: #9cc3ea;\n    --os-code-type: #8ccbc1;\n    --os-code-literal: #e2bd7e;\n}\n@media print {\n    :root, :root[data-theme] {\n        color-scheme: light !important;\n        --os-paper: #fff !important;\n        --os-surface: #fff !important;\n        --os-rule: #999 !important;\n        --os-ink: #000 !important;\n        --os-muted: #333 !important;\n        --os-faint: #666 !important;\n        --os-ok: #000 !important;\n        --os-ok-bg: #fff !important;\n        --os-bad: #000 !important;\n        --os-bad-bg: #fff !important;\n        --os-warn: #000 !important;\n        --os-warn-bg: #fff !important;\n        --os-code-keyword: #000 !important;\n        --os-code-title: #000 !important;\n        --os-code-type: #000 !important;\n        --os-code-literal: #000 !important;\n    }\n}\n* { box-sizing: border-box; }\nhtml { font-size: 20px; }\n@media (max-width: 40rem) { html { font-size: 18px; } }\nbody { margin: 0; background: var(--os-paper); color: var(--os-ink); font-family: var(--os-serif);\n       font-size: 1rem; line-height: 1.6; font-variant-numeric: lining-nums;\n       -webkit-font-smoothing: antialiased; }\nheader, main, footer, nav { max-width: calc(36rem + 32px); margin: 0 auto; padding: 0 16px; }\nheader { padding-top: 3rem; text-align: center; }\nh1, h2 { font-weight: 700; line-height: 1.2; text-wrap: balance; }\nh1 { font-size: 2.1rem; letter-spacing: -0.01em; margin: 0.3em 0 0.4em; text-align: center; }\nh2 { font-size: 1.2rem; margin: 2em 0 0.5em; }\na { color: inherit; text-decoration: underline; text-decoration-thickness: 1px;\n    text-underline-offset: 0.2em; text-decoration-color: var(--os-faint); }\na:hover, a:focus { text-decoration-color: currentColor; }\n.lead { font-style: italic; margin: 0 0 2.5rem; }\n.small, footer, .paper-meta, .version-date, .pin, details summary {\n  font-family: var(--os-sans); color: var(--os-muted); }\n.small, footer { font-size: 0.7rem; line-height: 1.5; }\nnav { padding-top: 1.4rem; font-size: 1.05rem; }\nnav a { text-decoration: none; }\nfooter { margin-top: 4rem; padding-bottom: 2.5rem; }\nfooter a { color: inherit; }\nol.papers { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--os-rule); }\nsection.featured { margin: 0 0 3rem; }\nmain > h2 { margin-top: 0; }\nli.paper { padding: 1rem 0; border-bottom: 1px solid var(--os-rule); }\n.paper-title { font-weight: 700; font-size: 1.1rem; text-decoration: none; }\n.paper-title:hover { text-decoration: underline; }\n.paper-authors { margin: 0.15rem 0; font-style: italic; }\n.paper-page .paper-authors, .paper-page .paper-meta { text-align: center; }\n.paper-meta, .pin, .version-date { font-size: 0.72rem; }\ndetails summary { cursor: pointer; font-size: 0.72rem; margin-top: 0.3rem; }\ndetails p, .abstract p { margin: 0.5em 0; }\nli.paper.withdrawn .paper-title { color: var(--os-muted); }\nli.paper.withdrawn .paper-title::after { content: "withdrawn"; font-family: var(--os-sans); font-size: 0.6rem;\n  font-weight: 400; padding: 0.1rem 0.55rem; border-radius: 999px; margin-left: 0.5rem; vertical-align: 0.2em;\n  background: var(--os-bad-bg); color: var(--os-bad); }\nol.versions { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--os-rule); }\nli.version { padding: 0.6rem 0; border-bottom: 1px solid var(--os-rule); }\n.version-head { font-weight: 700; }\n.stage, .current { font-family: var(--os-sans); font-size: 0.65rem; font-weight: 400; padding: 0.1rem 0.55rem;\n                   border-radius: 999px; background: var(--os-surface); margin-left: 0.3rem;\n                   vertical-align: 0.1em; }\n.current { background: var(--os-ok-bg); color: var(--os-ok); }\n.contested { font-family: var(--os-sans); font-size: 0.65rem; font-weight: 400; padding: 0.1rem 0.55rem;\n             border-radius: 999px; background: var(--os-warn-bg); color: var(--os-warn); margin-left: 0.3rem; }\ndiv.contested, li.contested { display: block; border-radius: 4px; padding: 0.7rem 1rem; margin: 0.6rem 0;\n                              font-size: 0.85rem; }\ndl.identifiers { font-family: var(--os-sans); font-size: 0.75rem; color: var(--os-muted);\n                 display: grid; grid-template-columns: max-content 1fr; gap: 0.2rem 0.8rem; margin: 1.2rem 0; }\ndl.identifiers dt { font-weight: 600; }\ndl.identifiers dd { margin: 0; min-width: 0; }\nul.facts { padding-left: 1.2rem; }\nul.facts li { margin: 0.3rem 0; }\n.changes { font-style: italic; }\n.files { font-size: 0.9rem; }\n.missing { color: var(--os-muted); }\n.notice, div.withdrawn { background: var(--os-surface); border-radius: 4px; padding: 0.7rem 1rem; margin: 0.6rem 0; }\ndiv.withdrawn { background: var(--os-bad-bg); color: var(--os-bad); }\n.cite { background: var(--os-surface); border-radius: 4px; padding: 0.7rem 1rem; font-size: 0.92rem;\n        overflow-wrap: anywhere; }\ncode { font-family: var(--os-mono); font-size: 0.75em; word-break: break-all;\n       font-variant-ligatures: none; }\ncode.copy { cursor: pointer; border-bottom: 1px dotted transparent; }\na:has(> code:only-child):not(:hover):not(:focus-visible) { text-decoration-color: transparent; }\ncode.copy:hover { border-bottom-color: var(--os-ink); }\ncode.copy.copied::after { content: " copied"; font-family: var(--os-sans); color: var(--os-ok); }\n' } };
export {
  ASSETS,
  ArchiveFolder,
  CommitConflict,
  GITHUB_API,
  GitHub,
  GitHubError,
  GitHubStorage,
  GitHubWallet,
  Key,
  KeyError,
  NEW_PAPER,
  NEW_VERSION,
  OPERATIONS,
  PASSKEY_RP,
  POPUP,
  POPUP_MESSAGES,
  Problem,
  Stop,
  UNLOCK_ORIGIN,
  UnlockFailed,
  WORKFLOW_ONLY,
  WalletError,
  browserEnvironment,
  carryOut,
  confirmationCode,
  directWrite,
  gitBlobSha,
  keyFromText,
  oneCommit,
  openLocks,
  openPopupAnswer,
  popupRequest,
  popupUrl,
  prefetched,
  readKey,
  sameCode,
  schemasOf,
  sealedKey,
  signers,
  walletLocks
};
/*!
 * hash-wasm (https://www.npmjs.com/package/hash-wasm)
 * (c) Dani Biro
 * @license MIT
 */
