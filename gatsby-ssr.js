import { createElement } from "react";

const applyDarkModeClass = `
(function() {
  try {
    var isDark = JSON.parse(localStorage.getItem('kb-dark-mode'));
    if (isDark || isDark === null) {
        document.querySelector('html').classList.add('dark');
    }
  } catch (e) {}
})();
`;

export const onRenderBody = ({ setPreBodyComponents }) => {
    const script = createElement("script", {
        dangerouslySetInnerHTML: {
            __html: applyDarkModeClass
        }
    });
    setPreBodyComponents([script]);
};
