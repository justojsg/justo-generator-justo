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
    return "Generate the scaffold for a Justo module.";
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
      davidDm: "David DM",
      desc: "Project description",
      gitUrl: "Git repository URL",
      homepage: "Project homepage",
      linter: {
        title: "Code linter",
        options: ["<none>", "ESLint", "JSHint"],
        default: "ESLint"
      },
      name: {
        title: "Name",
        default: path.basename(process.cwd())
      },
      dependencies: {
        title: "Dependencies",
        options: [
          "getos",
          "justo-plugin-apt",
          "justo-plugin-cli",
          "justo-plugin-download",
          "justo-plugin-handlebars",
          "justo-plugin-tar",
          "justo-plugin-unzip",
          "justo-plugin-zip",
          "justo-sync"
        ]
      },
      npmWho: "NPM user to use for publishing",
      travisCi: "Travis CI"
    };
  }

  /**
   * @override
   */
  prompt(answers) {
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
    this.input("npmWho");
    if (this.input("gitUrl")) {
      const re = /http[s]:\/\/github\.com\/([^\/]+\/[^\/]+).git/;
      this.input({name: "travisCi", default: "https://travis-ci.org/" + re.exec(answers.gitUrl)[1]});
      this.input({name: "davidDm", default: "https://david-dm.org/" + re.exec(answers.gitUrl)[1]});
    }
    this.input("bugsHomepage");
    this.input("bugsEmail");
    this.select("linter");
    this.multiselect("dependencies");
  }

  /**
   * @override
   */
  pregenerate(answers) {
    let entries = this.getEntryNames(".").sort();

    if (!(entries.length === 0 ||
          (entries.length == 1 && entries[0] == ".git") ||
          (entries.length == 2 && entries[0] == ".git" && entries[1] == "README.md")
         )) {
      return "Destination dir is not empty.";
    }
  }

  /**
   * @override
   */
  generate(answers) {
    this.copy("_editorconfig", ".editorconfig");
    if (answers.linter == "JSHint") this.copy("_jshintrc", ".jshintrc");
    else if (answers.linter == "ESLint") this.copy("_eslintrc", ".eslintrc");
    this.copy("_gitignore", ".gitignore");
    this.template("_package-module.json", "package.json", answers);
    this.copy("_travis.yml", ".travis.yml");
    this.copy("index.js");
    this.template("Justo.dev.js", answers);
    this.template("Justo-module.js", "Justo.js", answers);
    this.template("README.md", answers);
    this.mkdir("dist");
    this.mkdir("lib");
  }
}
