//import
import {Generator} from "justo-generator";

/**
 * Generator.
 */
export default class extends Generator {
  /**
   * Constructor.
   */
  constructor(opts, responses) {
    super(opts, responses);
  }

  /**
   * @override
   */
   get help() {
     return {
       desc: "Generate the files of a Justo.js project.",
       params: {
         desc: "Project description.",
         author: "Author name.",
         authorEmail: "Author email.",
         authorUrl: "Author URL."
       },
       commands: {

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

  }

  /**
   * @override
   */
  generate(answers) {
    this.copy("Justo.js");
    this.copy("Justo.json");
    this.template("_package.json", "package.json", {
      desc: answers.desc,
      author: answers.author,
      authorName: answers.authorName,
      authorUrl: answers.authorUrl
    });
  }
}
