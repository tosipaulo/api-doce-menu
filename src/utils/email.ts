import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';

export const getEmailTemplate = (data: {base_url: string}, templateName: string) => {
  const template = handlebars.compile(fs.readFileSync(`${path.resolve('src')}/templates/${templateName}.html`, 'utf8').toString());
  return template(data);
};

export const template = (data: Record<string, string>, templateName: string) => {
  const templatePath = path.join(__dirname, `../templates/${templateName}.html`);
  let templateContent = fs.readFileSync(templatePath, 'utf8');

  for (const key in data) {
    const placeholder = `{{${key}}}`;
    templateContent = templateContent.replace(new RegExp(placeholder, 'g'), data[key]);
  }

  return templateContent;
}