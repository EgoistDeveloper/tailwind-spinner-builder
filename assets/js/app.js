const isBrowserDarkTheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

new Vue({
  el: "#app",
  vuetify: new Vuetify({
    theme: {
      dark: isBrowserDarkTheme,
    },
  }),

  data: {
    spinnerSize: 14,
    roundedSizes: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
    roundedSize: 50,
  },

  methods: {
    /** get current browser theme */
    getCurrentTheme: function () {
      if (window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
    },

    /** watch browser theme*/
    watchBrowserTheme: function () {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          const themeOption = {
            theme: `vs-${e.matches ? "dark" : "light"}`,
          };

          this.inputHtmlMonacoEditor.updateOptions(themeOption);

          this.outputHtmlMonacoEditor.updateOptions(themeOption);
          this.outputSassMonacoEditor.updateOptions(themeOption);

          this.$vuetify.theme.isDark = e.matches;
        });
    },

    getSpinnerClass() {
      return `w-${this.spinnerSize} h-${this.spinnerSize} rounded-[${this.roundedSize}%] animate-spin shadow-md
       border-y-8 border-solid border-purple-500 border-t-transparent`;
    },
  },

  mounted: function () {
    document.querySelector(".loader").remove();

    setTimeout(() => {
      this.watchBrowserTheme();
    }, 250);
  },
});
