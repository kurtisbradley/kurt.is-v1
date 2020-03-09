const config = {
    siteTitle: "Kurtis Bradley",
    siteTitleShort: "Kurtis Bradley",
    siteTitleAlt: "Kurtis Bradley",
    siteLogo: "/logos/logo-1024.png",
    siteUrl: "https://kurt.is",
    pathPrefix: "",
    dateFromFormat: "YYYY-MM-DD",
    dateFormat: "MMMM Do, YYYY",
    siteDescription: "Hi, I'm Kurtis Bradley. Full stack web developer.",
    postDefaultCategoryID: "Development",
    userTwitter: 'itskurtis',
    themeColor: "#007aff",
    backgroundColor: "#ffffff"
};

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
    config.pathPrefix = "";
} else {
    // Make sure pathPrefix only contains the first forward slash
    config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
    config.siteUrl = config.siteUrl.slice(0, -1);

module.exports = config;
