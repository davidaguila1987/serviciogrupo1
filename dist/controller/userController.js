"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
class UserController {
    signin(req, res) {
        console.log(req.body);
        //res.send('Sign In!!!');
        res.render("partials/signinForm");
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, password } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield userModel_1.default.buscarNombre(usuario);
            console.log(usuario);
            console.log(password);
            console.log(result);
            // const error = "Usuario o contraseña no valido";
            if (!result) {
                res.send({ "Usuario no registrado Recibido": req.body });
                //res.redirect("errorLogin");
                //res.render("partials/error");
                // res.render("partials/signinForm", { error });
            }
            if (result.nombre == usuario && result.password == password) {
                req.session.user = result;
                req.session.auth = true;
                res.redirect("./home");
                return;
            }
            //res.send({ "Usuario y/o contraseña incorrectos": req.body });
            req.flash('error_session', 'Usuario y/o Password Incorrectos');
            res.redirect("./error");
        });
    }
    showError(req, res) {
        // res.send({ "Usuario y/o contraseña incorrectos": req.body });
        res.render("partials/error");
    }
    //registro
    signup(req, res) {
        console.log(req.body);
        //res.send('Sign Up!!!');
        res.render("partials/signupForm");
    }
    home(req, res) {
        if (!req.session.auth) {
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            res.redirect("./error");
        }
        console.log(req.body);
        //  res.send('Bienvenido!!!');
        res.render("partials/home", { mi_session: true });
    }
    /* public errorLogin(req: Request, res: Response) {
         console.log(req.body);
         //  res.send('Bienvenido!!!');
         res.render("errors/errorLogin");
     }*/
    //CRUD
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield userModel_1.default.listar();
            console.log(usuarios);
            return res.json(usuarios);
            //res.send('Listado de usuarios!!!');
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            const { id } = req.params;
            const usuario = yield userModel_1.default.buscarId(id);
            if (usuario)
                return res.json(usuario);
            res.status(404).json({ text: "User doesn't exists" });
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            delete usuario.repassword;
            console.log(req.body);
            //res.send('Usuario agregado!!!');
            const busqueda = yield userModel_1.default.buscarNombre(usuario.nombre);
            if (!busqueda) {
                const result = yield userModel_1.default.crear(usuario);
                return res.json({ message: 'User saved!!' });
            }
            return res.json({ message: 'User exists!!' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield userModel_1.default.actualizar(req.body, id);
            //res.send('Usuario '+ req.params.id +' actualizado!!!');
            return res.json({ text: 'updating a user ' + id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            //res.send('Usuario '+ req.params.id +' Eliminado!!!');
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield userModel_1.default.eliminar(id);
            // return res.json({ text: 'deleting a user ' + id });
            res.redirect('../control');
        });
    }
    //FIN CRUD
    control(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                //   res.redirect("/");
                req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
                res.redirect("./error");
            }
            //res.send('Controles');
            const usuarios = yield userModel_1.default.listar();
            //const users = usuarios;
            res.render('partials/controls', { users: usuarios, mi_session: true });
        });
    }
    auxiliar(req, res) {
        res.render('templates/auxiliar');
    }
    procesar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                //  res.redirect("/");
                req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
                res.redirect("./error");
            }
            //const usuarios = await userModel.listar();
            // res.render('templates/auxiliar', { users: usuarios });
            console.log(req.body);
            let usuario = req.body.usuario;
            var usuarios = [];
            console.log(usuario);
            if (usuario !== undefined) {
                for (let elemento of usuario) {
                    const encontrado = yield userModel_1.default.buscarId(elemento);
                    if (encontrado) {
                        usuarios.push(encontrado);
                        //  console.log(encontrado);
                    }
                }
            }
            console.log(usuarios);
            res.render("partials/seleccion", { usuarios, home: req.session.user, mi_session: true });
            // res.send('Recibido')
        });
    }
    endSession(req, res) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }
}
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map