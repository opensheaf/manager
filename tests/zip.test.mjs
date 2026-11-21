// The zip of the rotation-key files (zip.js): stored, the files at its top
// level under their names, read back by Python's zipfile and by unzip -t when
// they are installed.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { storedZip, crc32, rotationZipName } from "../zip.js";

const files = [{ name: "rotation-abcdefghijklmnop-aaaaaaaaaaaaaaaa.txt", text: "opensheaf-rotation-key/0.2\nowner x\n" },
               { name: "rotation-abcdefghijklmnop-bbbbbbbbbbbbbbbb.txt", text: "second\n" },
               { name: "rotation-abcdefghijklmnop-cccccccccccccccc.txt", text: "" }];

test("crc32 is zip's", () => {
  assert.equal(crc32(new TextEncoder().encode("123456789")), 0xcbf43926);
});

test("the zip of the rotation keys opens with Python's zipfile and unzip", async () => {
  assert.equal(rotationZipName("abcdefghijklmnopqrstuvwxyz", 2), "rotation-keys-abcdefghijklmnop-v2.zip");
  const zip = storedZip(files);
  assert.deepEqual(storedZip(files), zip);
  assert.throws(() => storedZip([{ name: "a/b.txt", text: "" }]), /not a name/);
  const dir = await mkdtemp(path.join(os.tmpdir(), "manager-zip-"));
  try {
    const p = path.join(dir, "keys.zip");
    await writeFile(p, zip);
    const py = spawnSync("python3", ["-c", `import json, sys, zipfile
z = zipfile.ZipFile(sys.argv[1])
assert z.testzip() is None
print(json.dumps([[i.filename, i.compress_type, z.read(i).decode()] for i in z.infolist()]))`, p], { encoding: "utf-8" });
    if (!py.error) {
      assert.equal(py.status, 0, py.stderr);
      assert.deepEqual(JSON.parse(py.stdout), files.map((f) => [f.name, 0, f.text]));
    }
    const unzip = spawnSync("unzip", ["-t", p], { encoding: "utf-8" });
    if (!unzip.error) {
      assert.equal(unzip.status, 0, unzip.stdout + unzip.stderr);
      assert.match(unzip.stdout, /No errors detected/);
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
