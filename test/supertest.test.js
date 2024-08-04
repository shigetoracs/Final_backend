import * as chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import { __dirname } from "../src/path.js";
import varenv from "../src/dotenv.js";
import { describe, it } from "mocha";
const expect = chai.expect;

before(async () => {
  await mongoose.connect(varenv.mongo_url);
});
const requester = supertest("http://localhost:8080");
// describe("Rutas del CRUD de productos", function () {
//   //Aqui pobrar con usuario de rol Admin y rol User
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1ZmUyMGJhYzA4ZTlhMTg3ZWNkMzc2YyIsImZpcnN0X25hbWUiOiJhbmEiLCJsYXN0X25hbWUiOiJhbmFzIiwiYWdlIjozMywicGFzc3dvcmQiOiIkMmIkMTUkL1Y0Tlh1WGp1UmhjaFkxdkVuemZSZVhmOWlOUEtteWlaeXpnc2VOcmVyRXRjaWN4a01WOXUiLCJlbWFpbCI6ImFkbWluQ29kZXJAY29kZXIuY29tIiwicm9sIjoiQWRtaW4ifSwiaWF0IjoxNzE4NTQ0Mzg4LCJleHAiOjE3MTg1ODc1ODh9.IpXKV0YxknFkWitlAfiaXknfKbSHdLS64eFafsg-91Y";

//   //poner el id del producto con el que desea trabajar
//   const productId = "65f41daf758419b117b9f7ad";

//   it("Ruta: api/products/ con el metodo get", async () => {
//     const response = await requester.get("/api/products");
//     expect(response.ok).to.be.true;
//   });
//   it("Debería permitir a un Admin crear un producto", async () => {
//     const newProduct = {
//       title: "Nuevo producto",
//       description: "Descripción del nuevo producto",
//       stock: 10,
//       category: "categoria",
//       status: true,
//       code: "123abc",
//       price: 1000,
//       thumbnail: {},
//     };

//     const response = await requester
//       .post("/api/products")
//       .set("Authorization", `Bearer ${token}`)
//       .send(newProduct);

//     console.log(response.body); // Log para depuración
//     expect(response.status).to.equal(201);
//     expect(response.body).to.have.property("_id");
//     expect(response.body.title).to.equal("Nuevo producto");
//   });
//   it("No debería permitir a un usuario no ADMIN crear un producto", async () => {
//     const newProduct = {
//       title: "Producto restringido",
//       description: "Descripción del producto restringido",
//       stock: 5,
//       category: "categoria",
//       status: true,
//       code: "456def",
//       price: 2000,
//       thumbnail: {},
//     };

//     const response = await requester
//       .post("/api/products")
//       .set("Authorization", `Bearer ${token}`)
//       .send(newProduct);

//     console.log(response.body); // Log para depuración
//     expect(response.status).to.equal(403);
//     expect(response.text).to.equal("Usuario no autorizado");
//   });
//   it("Debería permitir a un Admin actualizar un producto", async () => {
//     // Datos actualizados del producto
//     const updatedProductData = {
//       title: "notebook",
//       description: "Nueva descripción del producto",
//       stock: 3,
//       category: "nueva categoria",
//       status: true,
//       code: "789gshi",
//       price: 1600,
//       thumbnail: {},
//     };

//     const response = await requester
//       .put(`/api/products/${productId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(updatedProductData);
//     expect(response.status).to.equal(200);
//   });
//   it("Debería permitir a un Admin eliminar un producto", async function () {
//     const response = await requester
//       .delete(`/api/products/${productId}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.status).to.equal(200);
//   });
// });
// describe("Rutas de carts", function () {
//   const cartId = "666f16abf7ebb815f73b36f4";
//   const productId = "65f41998758419b117b9f78d";
//   //token con usuario de rol User
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2MDA5YWY4MDk1ZTA2MWRmZjVlMzBkMCIsImZpcnN0X25hbWUiOiJwZXBlIiwibGFzdF9uYW1lIjoicGVwZXMiLCJhZ2UiOjMzLCJwYXNzd29yZCI6IiQyYiQxNSRhTVlOckljNzgwMEl0WlRubjE3aXNlb1hKZEJXRTV4TlJmMWYycnNVSHpiVnFOTm9DQk4yQyIsImVtYWlsIjoicGVwZUBwZXBlLmNvbSIsInJvbCI6IlVzZXIifSwiaWF0IjoxNzE4NTYyNjY0LCJleHAiOjE3MTg2MDU4NjR9.TZZL_Hu-KfwPJYAtHEOEmH0-6C6N4W6PLUcbxbOGnt4";
//    it("Debería crear un nuevo carrito", async function () {
//   const response = await requester.post("/api/cart");
//   expect(response.status).to.equal(201);
//   expect(response.body).to.have.property("_id");
// });
// it("Debería permitir a un usuario con token agregar un producto al carrito", async function () {
//   const response = await requester
//     .post(`/api/cart/${cartId}/${productId}`)
//     .set("Authorization", `Bearer ${token}`)
//     .send({ quantity: 1 });

//   expect(response.status).to.equal(200);
// });
//   it("Debería permitir a un usuario con token realizar una compra", async function () {
//     const response = await requester
//       .get(`/api/cart/purchase/${cartId}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.status).to.equal(200);
//   });
// });
// describe("Rutas del CRUD de usuarios", function () {
//   // it("Debería registrar un nuevo usuario", async function () {
//   //   const newUser = {
//   //     first_name: "John",
//   //     last_name: "Doe",
//   //     email: "johndoe@example.com",
//   //     age: 30,
//   //     password: "password123",
//   //   };
//   //   const response = await requester
//   //     .post("/api/session/register")
//   //     .send(newUser);
//   //   expect(response.status).to.equal(200);
//   // });
//   // it("Debería permitir a un usuario iniciar sesión con credenciales correctas", async function () {
//   //   const response = await requester
//   //     .get("/api/session/login")
//   //     .send({ email: "johndoe@example.com", password: "password123" });
//   //   expect(response.status).to.equal(200);
//   // });
//   // it("No debería permitir acceso sin un token válido", async function () {
//   //   const response = await requester.get("/api/session/current");
//   //   expect(response.status).to.equal(401);
//   // });
// });
