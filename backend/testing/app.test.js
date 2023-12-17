import { request } from 'express';
import supertest from 'supertest';
const app = require('../app')
//const { signup_post, login_post } = require('./authController');
//const { signup_post } = require('../auth/authController');
//const authRoutes = require('../auth/authRoutes');


//it('', ()=>{})

describe("POST /signup", () => {

  test("should respond with a 200 status code", async () => {
    const response = await request(app)
      .post('/signup').send({
          email: "username@email.com",
          password: "sSTmkd#Ythg",
          firstName: "aviva",
          lastName:"lodjj"
    })
    expect(response.statusCode).toBe(200)
  })
})




/*import request from 'supertest'

const { Router } = require('express');
const { authController } = require('./authController');

const router = Router();


router.post('/login', authController.login_post);

describe("POST /users", () => {
  describe("given an email and a password", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).router
        .post('/signup', authController.signup_post).send({
        email: "username@email.com",
        password: "sSTmkd#Ythg"
      })
      expect(response.statusCode).toBe(200)
    })


    test("should specify json in the content type header", async () => {
      const response = await request(app).router
        .post('/signup', authController.signup_post).send({
        email: "username",
        password: "password"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })


    test("response has userId", async () => {
      const response = await request(app).router
        .post('/signup', authController.signup_post).send({
        email: "username",
        password: "password"
      })
      expect(response.body.userId).toBeDefined()
    })
  })

  describe("when the username and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {email: "username"},
        {password: "password"},
        {}
      ]
      for (const body of bodyData) {
      const response = await request(app).router.post('/signup', authController.signup_post).send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })

})*/