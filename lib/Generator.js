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
      standalone: {
        title: "Standalone?",
        type: "Boolean"
      },
      desc: "Project description",
      homepage: "Project homepage",
      author: "Author name",
      authorEmail: "Author email",
      authorHomepage: "Author homepage",
      contributor: "Contributor name",
      contributorEmail: "Contributor email",
      contributorHomepage: "Contributor homepage",
      gitUrl: "Git repository URL",
      bugsHomepage: "Bugs homepage",
      bugsEmail: "Bugs email",
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
  preprompt() {

  }

  /**
   * @override
   */
  prompt(answers) {
    if (this.confirm("standalone") && !this.responses.hasOwnProperty("packagejson")) this.responses.packagejson = true;
    if (this.confirm("packagejson")) {
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
      this.input("gitUrl");
      this.input("bugsHomepage");
      this.input("bugsEmail");
    }
  }

  /**
   * @override
   */
  pregenerate(answers) {
    if (answers.standalone) {
      let entries = this.getEntryNames(".").sort();

      if (!(entries.length === 0 ||
            (entries.length == 1 && entries[0] == ".git") ||
            (entries.length == 2 && entries[0] == ".git" && entries[1] == "README.md")
           )) {
        return "Destination dir is not empty.";
      }
    }
  }

  /**
   * @override
   */
  generate(answers) {
    this.copyIf(answers.standalone, "_editorconfig", ".editorconfig");
    this.copyIf(answers.standalone, "_gitignore", ".gitignore");
    this.copyIf(answers.standalone, "_jshintrc", ".jshintrc");
    this.templateIf(answers.packagejson, "_package.json", "package.json", answers);
    this.copyIf(answers.standalone, "_travis.yml", ".travis.yml");
    this.copyIf(answers.standalone, "index.js");
    this.template("Justo.js", answers);
    this.copy("Justo.json");
    this.templateIf(answers.standalone, "README.md", answers);
  }
}
