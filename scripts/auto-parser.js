const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const rawData = fs.readFileSync('cars.json', 'utf-8');
const cars = JSON.parse(rawData);

const marks = [];
const models = [];

cars.forEach((brand) => {
    const id = uuidv4();
    marks.push({
        id,
        name: brand.name,
        rusName: brand['cyrillic-name'],
        country: brand.country,
        popular: brand.popular,
    });
    brand.models.forEach((model) => {
        models.push({
            name: model.name,
            rusName: model['cyrillic-name'],
            className: model.class,
            yearFrom: model['year-from'],
            yearTo: model['year-to'],
            markId: id,
        });
    });
});

const marksString = marks
    .map(({ id, name, rusName, country, popular }) => `('${id}', '${name}', '${rusName}', '${country}', ${popular})`)
    .join(',\n');
const modelsString = models
    .map(
        ({ name, rusName, className, yearFrom, yearTo, markId }) =>
            `('${name}', '${rusName}', '${className}', ${yearFrom}, ${yearTo}, '${markId}')`,
    )
    .join('\n');

fs.writeFileSync('marks.txt', marksString, 'utf-8');
fs.writeFileSync('models.txt', modelsString, 'utf-8');

