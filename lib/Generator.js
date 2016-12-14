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
      author: "Author name",
      authorEmail: "Author email",
      authorHomepage: "Author homepage",
      bugsHomepage: "Bugs homepage",
      bugsEmail: "Bugs email",
      contributor: "Contributor name",
      contributorEmail: "Contributor email",
      contributorHomepage: "Contributor homepage",
      desc: "Project description",
      gitUrl: "Git repository URL",
      homepage: "Project homepage",
      linter: {
        title: "Code linter",
        options: ["<none>", "ESLint", "JSHint"],
        default: "ESLint"
      },
      packagejson: {
        title: "Generate the package.json file?",
        type: "Boolean"
      },
      type: {
        title: "Project type",
        options: ["Standalone", "Embedded"],
        default: "Standalone"
      }
    };
  }

  /**
   * @override
   */
  prompt(answers) {
    if (this.select("type") == "Standalone") {
      this.responses.packagejson = true;
      this.list("linter");
    }

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
    if (answers.type == "Standalone") {
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
    if (answers.packagejson) this.template("_package.json", "package.json", answers);

    if (answers.type == "Standalone") {
      this.copy("_editorconfig", ".editorconfig");
      this.copy("_gitignore", ".gitignore");
      this.copy("_travis.yml", ".travis.yml");
      this.copy("index.js");
      this.template("README.md", answers);

      if (answers.linter == "JSHint") this.copy("_jshintrc", ".jshintrc");
      else if (answers.linter == "ESLint") this.copy("_eslintrc", ".eslintrc");

      this.mkdir("lib");
    }

    this.template("Justo.js", answers);
  }
}
