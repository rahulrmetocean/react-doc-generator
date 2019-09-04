// https://travis-ci.org/marborkowski/react-doc-generator

require("@babel/polyfill");
const TEST_TIMEOUT = 120000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = TEST_TIMEOUT; // eslint-disable-line no-undef

const path = require("path");
const fs = require("fs");
const spawn = require("child_process").spawn;

function run(command, args) {
  let stdout = [];
  let stderr = [];

  return new Promise((resolve, reject) => {
    let spawned = spawn(command, args);
    spawned.stdout.on("data", data => {
      stdout.push(data);
    });
    spawned.stderr.on("data", data => stderr.push(data));
    spawned.on("close", () => resolve([stdout.join(""), stderr.join("")]));
    spawned.on("error", err => {
      throw err;
    });
  }).catch(error => {
    console.log(error, "Error");
    throw error;
  });
}

function loadDoc(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
let binPath = path.join(__dirname, "../../dist/react-doc-generator.js");
  fs.chmodSync(binPath, "0777");
describe("react-doc-generator", () => {
  
  it("has the proper console output", async () => {
    try {
      const stdout = await run("node", [
        binPath,
        "src/__mocks__/basic",
        "-o",
        "./dist/DOCUMENTATION.md",
        "-d",
        "someduck",
        "-s",
        "someducksidebar",
      ]);
      const output = stdout[0];
    expect(output).toMatchSnapshot()
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  it("return the proper message when given extensions not found", async () => {
    try {
      const stdout = await run("node", [
        binPath,
        "src/__mocks__/basic",
        "-o",
        "./dist/DOCUMENTATION.md",
        "-x",
        "4hs0,kku4",
      ]);
      const output = stdout[0];
      expect(output).toMatchSnapshot()
    } catch (e) {
      throw e;
    }
  });

  it("contains help section if no argument is available in query", async () => {
    try {
      const stdout = await run("node", [
        binPath,
        "-o",
        "./dist/DOCUMENTATION.md",
        "-d",
        "someduck",
        "-s",
        "someducksidebar"
      ]);
      const output = stdout[0];
      expect(output).toMatchSnapshot()
    } catch (e) {
      throw e;
    }
  });
});
describe("output file", () => {
  it("has needed values", async () => {
    try {
      await run("node",[
        binPath,
        "src/__mocks__/basic",
        "-o",
        "./dist/basic.md",
      ]);
      const result = await loadDoc( "./dist/basic.md");
      const lines = result.split("\n");
      expect(lines).toMatchSnapshot()
    } catch (e) {
      throw e;
    }
  });
  it("Defaults docusaurus id and sidebar when values were not passed", async () => {
    try {
      await run("node",[
        binPath,
        "src/__mocks__/basic",
        "-o",
        "./dist/defaultsidebar.md",
      ]);
      const result = await loadDoc("./dist/defaultsidebar.md");
      const lines = result.split("\n");
      expect(lines).toMatchSnapshot()
    } catch (e) {
      throw e;
    }
  });
  it("Populates docusaurus id and sidebar when values were passed", async () => {
    try {
      await run("node",[
        binPath,
        "src/__mocks__/basic",
        "-o",
        "./dist/sidebar.md",
        "-d",
        "someduck",
        "-s",
        "someducksidebar"
      ]);
      const result = await loadDoc('./dist/sidebar.md');
      const lines = result.split("\n");
      expect(lines).toMatchSnapshot()
    } catch (e) {
      throw e;
    }
  });
  it("Works well for flow components as well", async () => {
    try {
      const stdout = await run("node",[
        binPath,
        "src/__mocks__/flow",
        "-o",
        "./dist/flow.md",
        "-d",
        "someduck",
        "-s",
        "someducksidebar"
      ]);
      console.log(stdout[0])
      const result = await loadDoc("./dist/flow.md");
      const lines = result.split("\n");
      expect(lines).toMatchSnapshot()
    } catch (e) {
      throw e;
    }
  });
});
