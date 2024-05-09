import Koa from "koa";
import Router from "koa-router";
import sqlite3 from "sqlite3";
import fs from "fs";
import { koaBody } from "koa-body";
import cors from "@koa/cors";

const app = new Koa();
const router = new Router();

const dbPath = "./challenge.db";
const db = new sqlite3.Database(dbPath);
const dbExists = fs.existsSync(dbPath);

const executeSqlFile = (filePath) => {
  const sql = fs.readFileSync(filePath, "utf-8");
  db.exec(sql, (err) => {
    if (err) {
      console.error("Error executing SQL file", err);
    } else {
      console.log("Successfully executed SQL file");
    }
  });
};

!dbExists && executeSqlFile("./db-init.sql");

const handleAllQuery = async (tableName, ctx, next) => {
  return await new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
      if (err) {
        console.error("Error getting lecturer", err);
        ctx.status = 500;
        reject(err);
      } else {
        ctx.type = "application/json";
        ctx.response.status = 200;
        ctx.body = rows;
        resolve();
      }
    });
  })
    .then(() => {
      next();
    })
    .catch((err) => {
      console.error(err);
    });
};
router.get("/training", async (ctx, next) => {
  await handleAllQuery("training", ctx, next);
});

router.get("/lecturer", async (ctx, next) => {
  await handleAllQuery("lecturers", ctx, next);
});

router.get("/lecturer/:id", async (ctx, next) => {
  return await new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM lecturers WHERE id = ?",
      [ctx.params.id],
      (err, row) => {
        if (err) {
          console.error("Error getting lecturer", err);
          ctx.status = 500;
          reject(err);
        } else {
          ctx.type = "application/json";
          ctx.response.status = 200;
          ctx.body = row;
          resolve();
        }
      },
    );
  })
    .then(() => {
      next();
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/lecturer", koaBody(), async (ctx, next) => {
  const { firstName, lastName } = JSON.parse(ctx.request.body);
  return await new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO lecturers (firstName, lastName, createdAt) VALUES (?, ?, ?)",
      [firstName, lastName, Math.floor(Date.now() / 1000)],
      (err) => {
        if (err) {
          console.error("Error inserting lecturer", err);
          ctx.status = 500;
          reject(err);
        } else {
          ctx.status = 201;
          resolve();
        }
      },
    );
  })
    .then(() => {
      next();
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/appointment", async (ctx, next) => {
  await handleAllQuery("appointment", ctx, next);
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(cors());

app.listen(3001);
console.log("Server running on port 3001");
