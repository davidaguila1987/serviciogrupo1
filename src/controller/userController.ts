import { Request, Response } from 'express';
import userModel from '../models/userModel';
import flash from "connect-flash";
import jwt from "jsonwebtoken";

class UserController {

    public signin(req: Request, res: Response) {
        console.log(req.body);
        //res.send('Sign In!!!');
        res.render("partials/signinForm");
    }

    public async login(req: Request, res: Response) {
        const { usuario, password } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await userModel.buscarNombre(usuario);
        if (!result) {
            return res.status(404).json({ message: "Usuario no registrado" });
            //res.render("partials/signinForm", { error });
        }
        else {
            if (result.nombre == usuario && result.password == password) {
                req.session.user = result;
                req.session.auth = true;
                const token: string = jwt.sign({ _id: result.id }, "secretKey");
                return res.status(200).json({ message: "Bienvenido " + result.nombre, token: token });
            }
        }
        res.status(403).json({ message: "Usuario y/o contraseña incorrectos" });
    }

    public showError(req: Request, res: Response) {
        res.render("partials/error");
    }

    //registro
    public signup(req: Request, res: Response) {
        console.log(req.body);
        res.render("partials/signupForm");
    }

    public home(req: Request, res: Response) {
        if (!req.session.auth) {
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            res.redirect("./error");
        }
        console.log(req.body);
        res.render("partials/home", { mi_session: true });
    }

    //CRUD
    public async list(req: Request, res: Response) {
      /*   console.log(req.body);
        console.log(req.header("Authorization")); *///Observamos el valor del token
        const usuarios = await userModel.listar();
        return res.json(usuarios);
    }

    public async find(req: Request, res: Response) {
        console.log(req.params.id);
        const { id } = req.params;
        const usuario = await userModel.buscarId(id);
        if (usuario)
            return res.json(usuario);
        res.status(404).json({ text: "User doesn't exists" });
    }

    public async addUser(req: Request, res: Response) {
        const usuario = req.body;
        delete usuario.repassword;
        console.log(req.body);
        const busqueda = await userModel.buscarNombre(usuario.nombre);
        console.log("ACA TU BUSCQUEDA PAPA"+busqueda)
        if (!busqueda) {
            const result = await userModel.crear(usuario);
            return res.status(200).json({ message: 'User saved!!' });
        } else {
            return res.status(403).json({ message: 'User exists!!' });
        }
    }

    public async update(req: Request, res: Response) {
        console.log(req.body);
        const { id } = req.params;
        const result = await userModel.actualizar(req.body, id);
        return res.json({ text: 'updating a user ' + id });
    }

    public async delete(req: Request, res: Response) {
        console.log(req.body);
        const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await userModel.eliminar(id);
        res.redirect('../control');
    }
    //FIN CRUD

    public async control(req: Request, res: Response) {
        if (!req.session.auth) {
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            res.redirect("./error");
        }
        const usuarios = await userModel.listar();
        res.render('partials/controls', { users: usuarios, mi_session: true });
    }

    public auxiliar(req: Request, res: Response) {
        res.render('templates/auxiliar')
    }

    public async procesar(req: Request, res: Response) {
        if (!req.session.auth) {
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            res.redirect("./error");
        }
        let usuario = req.body.usuario;
        var usuarios: any = [];
        console.log(usuario);
        if (usuario !== undefined) {
            for (let elemento of usuario) {
                const encontrado = await userModel.buscarId(elemento);
                if (encontrado) {
                    usuarios.push(encontrado);
                }
            }
        }

        console.log(usuarios);
        res.render("partials/seleccion", { usuarios, home: req.session.user, mi_session: true });
    }

    public endSession(req: Request, res: Response) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }
}

const userController = new UserController();
export default userController;