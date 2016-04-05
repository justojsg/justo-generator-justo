//import
import {HandlebarsGenerator} from "justo-generator";

/**
 * Generator.
 */
export default class extends HandlebarsGenerator {
  /**
   * @override
   */
  get desc() {
    return "Generate a suite.";
  }

  /**
   * @override
   */
   get params() {
     return {
       name: "Suite name",
       overwrite: {
         title: "Overwrite file if needed",
         type: "boolean"
       }
     };
   }

  /**
   * @override
   */
  init() {
    super.init();
  }

  /**
   * @override
   */
  fin() {
    super.fin();
  }

  /**
   * @override
   */
  preprompt() {

  }

  /**
   * @override
   */
  prompt(answers) {
    this.input("name");
    this.confirm({name: "overwrite", default: false});
  }

  /**
   * @override
   */
  pregenerate(answers) {
    if (!answers.overwrite && this.hasEntry("test/unit/lib/" + answers.name + ".js")) {
      return "The file already exists.";
    }
  }

  /**
   * @override
   */
  generate(answers) {
    this.template("test/unit/lib/Suite.js", answers.name + ".js", answers);
  }
}
