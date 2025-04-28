module.exports = {
  collectCoverage: true, // Make sure Jest collects coverage data
  coverageDirectory: "./coverage/lcov-report", // Ensure it writes coverage to the correct directory
  coverageReporters: ["lcov", "text"], // Specify 'lcov' format for SonarQube
};




