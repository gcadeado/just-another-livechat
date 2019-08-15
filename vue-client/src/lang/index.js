import Vue from "vue";
import VueI18n from "vue-i18n";
import enLocale from "./en";
import ptBRLocale from "./ptBR";

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale
  },
  ptBR: {
    ...ptBRLocale
  }
};

const i18n = new VueI18n({
  locale: "ptBR", // set locale
  messages // set locale messages
});

export default i18n;
