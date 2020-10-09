if (process.env.NODE_ENV === "production") {
    module.exports = require("./dist/react-class-hookable.min.js");
} else {
    module.exports = require("./dist/react-class-hookable.js");
}