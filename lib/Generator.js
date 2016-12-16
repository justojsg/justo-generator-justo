//import
import path from "path";
import {HandlebarsGenerator} from "justo-generator";

/**
 * Generator.
 */
export default class extends HandlebarsGenerator {
  /**
   * @override
   */
  get desc() {
    return "Generate and embed the Justo files into a current project.";
  }

  /**
   * @override
   */
  get params() {
    return {
      author: "Author name",
      authorEmail: "Author email",
      authorHomepage: "Author homepage",
      contributor: "Contributor name",
      contributorEmail: "Contributor email",
      contributorHomepage: "Contributor homepage",
      desc: "Project description",
      homepage: "Project homepage",
      name: {
        title: "Name",
        default: path.basename(process.cwd())
      },
      packagejson: {
        title: "Generate the package.json file?",
        type: "Boolean"
      }
    };
  }

  /**
   * @override
   */
  prompt(answers) {
    if (this.confirm("packagejson")) {
      this.input("name");
      this.input("desc");
      this.input("homepage");
      if (this.input("author")) {
        this.input("authorEmail");
        this.input("authorHomepage");
      }
      if (this.input("contributor")) {
        this.input("contributorEmail");
        this.input("contributorHomepage");
      }
    }
  }

  /**
   * @override
   */
  generate(answers) {
    if (answers.packagejson) this.template("_package-embedded.json", "package.json", answers);
    this.template("Justo-embedded.js", "Justo.js", answers);
  }
}
