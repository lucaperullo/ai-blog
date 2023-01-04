//create a middleware that will translate the english input text into fr, de, ru, it
import translatte from "translatte";

export const internationalizer = async (req, res, next) => {
    try {
        const { title, content } = req.body;
     
        const { text: titleIt } = await translatte(title, { to: "it" });
        const { text: titleEn } = await translatte(title, { to: "en" });
        const { text: titleFr } = await translatte(title, { to: "fr" });
        const { text: titleDe } = await translatte(title, { to: "de" });
        const { text: titleRu } = await translatte(title, { to: "ru" });
        const { text: titleEs } = await translatte(title, { to: "es" });
        const { text: contentEn } = await translatte(content, { to: "en" });
        const { text: contentFr } = await translatte(content, { to: "fr" });
        const { text: contentDe } = await translatte(content, { to: "de" });
        const { text: contentRu } = await translatte(content, { to: "ru" });
        const { text: contentEs } = await translatte(content, { to: "es" });
        req.body.title = {
            it: titleIt,
            en: titleEn,
            fr: titleFr,
            de: titleDe,
            ru: titleRu,
            es: titleEs,
        };
        req.body.content = {
            it: titleIt,
            en: contentEn,
            fr: contentFr,
            de: contentDe,
            ru: contentRu,
            es: contentEs,
        };
        next();
    } catch (error) {
        next(error);
    }
};
