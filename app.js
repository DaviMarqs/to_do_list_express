const express = require("express");
const path = require('path');

const checkListRouter = require('./src/routes/checklist');
const taskRouter = require('./src/routes/tasks');
const rootRouter = require('./src/routes/index');
const methodOverride = require('method-override');


require('./config/database');




const app = express();
app.use(express.json());  // um dos principais middlewares usados. O middleware processa e verifica se existe algo sendo passado via JSON
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/checklists', checkListRouter);
app.use('/checklists', taskRouter.checklistDependent);
app.use('/tasks', taskRouter.simple);


app.listen(3000, () => {
  console.log("Servidor foi iniciado");
});
