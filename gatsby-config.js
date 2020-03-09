const urljoin = require("url-join");
const config = require("./data/SiteConfig");

module.exports = {
    pathPrefix: config.pathPrefix === "" ? "/" : config.pathPrefix,
    siteMetadata: {
        siteUrl: urljoin(config.siteUrl, config.pathPrefix),
        title: config.siteTitle,
        description: config.siteDescription
    },
    plugins: [
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "assets",
                path: `${__dirname}/static/`
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "posts",
                path: `${__dirname}/content/`
            }
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 850
                        }
                    },
                    "gatsby-remark-copy-linked-files",
                    {
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                            offsetY: `100`,
                            maintainCase: false,
                            removeAccents: true
                        }
                    }
                ]
            }
        },
        {
            resolve: "gatsby-plugin-nprogress",
            options: {
                color: config.themeColor
            }
        },
        "gatsby-plugin-styled-jsx",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-catch-links",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: config.siteTitle,
                short_name: config.siteTitleShort,
                description: config.siteDescription,
                start_url: config.pathPrefix,
                background_color: config.backgroundColor,
                theme_color: config.themeColor,
                display: "minimal-ui",
                icons: [
                    {
                        src: "/logos/logo-48.png",
                        sizes: "48x48",
                        type: "image/png"
                    },
                    {
                        src: "/logos/logo-1024.png",
                        sizes: "1024x1024",
                        type: "image/png"
                    }
                ]
            }
        },
        `gatsby-plugin-offline`,
    ]
};
