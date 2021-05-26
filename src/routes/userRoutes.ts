import { Router, Request, Response } from 'express';
import userController from "../controller/userController";
import { validationSingUp } from '../middleware/validationSignUp';
import { registerSchema } from '../schema/register-schema';

class UserRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', (req: Request, res: Response) => {
            res.send('Main!!!');
            //res.render("partials/principal");
        });
        /*  this.router.get('/signin',(req:Request,res:Response)=> {
              res.send('Sign In!!!');
              //res.render("partials/principal");
          }); */
        //Login
        this.router.get('/signin', userController.signin);
        this.router.post('/signin', userController.login);
        //registro
        this.router.get('/signup', userController.signup);
        this.router.post('/signup',registerSchema, validationSingUp, userController.addUser);
        //Home del usuario
        /*  this.router.get('/home', (req: Request, res: Response) => {
             res.send('Bienvenido!!!')
         }); */
        this.router.get('/home', userController.home);
      //  this.router.get('/errorLogin', userController.errorLogin);

        //CRUD	
        this.router.get('/list', userController.list);
        this.router.get('/find/:id', userController.find);
        this.router.post('/add', userController.addUser);
        this.router.put('/update/:id', userController.update);
        this.router.delete('/delete/:id', userController.delete);
        this.router.get('/delete/:id', userController.delete);
        this.router.get('/update/:id', userController.update);
        // this.router.post('/update/', userController.saveChanges);
        //Fin CRUD

        this.router.get('/control', userController.control);

        //Actividad clase 4
        this.router.get('/auxiliar', userController.auxiliar);
        this.router.post('/procesar', userController.procesar);

        this.router.get('/salir',userController.endSession);
        this.router.get('/error',userController.showError);

    }
}

//Exportamos el enrutador con 

const userRoutes = new UserRoutes();
export default userRoutes.router;