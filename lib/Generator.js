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
    return "Generate the files of a Justo.js project.";
  }

  /**
   * @override
   */
  get params() {
    return {
      desc: "Project description",
      homepage: "Project homepage",
      author: "Author name",
      authorEmail: "Author email",
      authorUrl: "Author homepage",
      packagejson: {
        title: "Generate the package.json file?",
        type: "Boolean"
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
  prompt(answers) {
    if (this.confirm("packagejson")) {
      this.input("desc");
      this.input("homepage");
      if (this.input("author")) {
        this.input("authorEmail");
        this.input("authorUrl");
      }
    }
  }

  /**
   * @override
   */
  generate(answers) {
    this.copy("Justo.js");
    this.copy("Justo.json");
    this.templateIf(answers.packagejson, "_package.json", "package.json", answers);
  }
}
