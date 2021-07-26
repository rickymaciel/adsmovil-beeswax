module.exports = {
    lintOnSave: false,

    transpileDependencies: ["vuetify"],

    //   devServer: {
    //     host: "dsp-frontend.localhost.com"
    //   },

    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].title = "Adsmovil Beeswax";
            return args;
        });
    }
};
