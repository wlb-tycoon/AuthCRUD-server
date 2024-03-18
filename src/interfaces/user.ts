const { hash } = require("bcrypt");
// const { pool } = require("./db");
import pool from "./db";

export async function findByEmail(email: string): Promise<unknown> {
  const query = "SELECT * FROM users WHERE email = ?";
  const values: string[] = [email];
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error: any, results: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}

export async function findById(id: number): Promise<unknown> {
  const query = "SELECT * FROM users WHERE id = ?";
  const values: number[] = [id];
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error: any, results: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<unknown> {
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const hashedPassword: any = await hash(password, 10);
  const values: any[] = [name, email, hashedPassword];

  return new Promise((resolve, reject) => {
    pool.query(query, values, (error: any, results: any) => {
      if (error) {
        console.error("error: ", error);
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  });
}

export async function fetchUser(): Promise<unknown> {
  const query = "SELECT * FROM users";
  return new Promise((resolve, reject) => {
    pool.query(query, (error: any, results: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
