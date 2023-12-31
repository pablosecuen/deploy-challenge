// noteMiddleware.js
const xss = require("xss");
const { Op } = require("sequelize");

// security validations middleware for passing before routing to the controller and getting to db
const validateNote = (req, res, next) => {
  const { title, content } = req.body;

  req.body.title = xss(title.substring(0, 3000));
  req.body.content = xss(content.substring(0, 3000));

  next();
};

// notes filters for controller
const noteFilters = (req, res, next) => {
  const { ID, archived, title, content, category } = req.query;
  let filters = {};

  if (ID) {
    filters.ID = { [Op.eq]: ID };
  }
  if (category) {
    filters.category = { [Op.eq]: category };
  }
  if (content) {
    filters.content = { [Op.substring]: content };
  }
  if (title) {
    filters.title = { [Op.substring]: title };
  }
  if (archived !== undefined) {
    filters.archived = archived === "true";
  }

  req.noteFilters = filters;
  next();
};

// The below implementation of filters uses several 'if' statements, which might seem redundant, but it is more readable and easier to understand
//compared to using multiple ternary operators and SQL syntax.

/* const noteFilters = (req, res, next) => {
    const { id, title, content, archived, startDate, endDate } = req.query;
  
    const filters = {
      id: id || undefined,
      title: title ? { [Op.substring]: title } : undefined,
      content: content ? { [Op.substring]: content } : undefined,
      archived: archived === "true" ? true : archived === "false" ? false : undefined,
      createdAt:
        startDate && endDate
          ? {
              [Op.between]: [new Date(startDate), new Date(endDate)],
            }
          : undefined,
    };
  
    // Eliminar propiedades con valores undefined
    Object.keys(filters).forEach((key) => filters[key] === undefined && delete filters[key]);
  
    req.filters = filters;
    next();
  }; */

module.exports = { validateNote, noteFilters };
