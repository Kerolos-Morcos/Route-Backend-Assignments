// The First 20 Questions
const path = require('node:path');
const fs = require('node:fs');
const EventEmitter = require("node:events");
const emitter = new EventEmitter();
const os = require('node:os');
const stream = require('node:stream');
const zlib = require('zlib');
const http = require('node:http');
// ==============================================================================
// 1- a function that logs the current file path and directory
// function logFilePath() {
//     console.log(`File: ${__filename} \nDir: ${path.dirname(__filename)}`);
// }
// logFilePath();

// Another Solution
// function logFilePath() {
//     console.log(`File: ${__filename} \nDir: ${__dirname}`);
// }
// logFilePath();

// ==============================================================================
// 2- a function that takes a file path and returns its file name
// function getFileName(filePath) {
//     return path.basename(filePath);
// }
// const fileName = getFileName("/users/files/report.pdf");
// console.log(fileName);

// ==============================================================================
// 3- a function that builds a path from an object
// function buildPath(pathObject) {
//     return path.format(pathObject);
// }
// const pathObject = {
//     dir: '/folder',
//     name: 'app',
//     ext: '.js'
// };
// const filePath = buildPath(pathObject);
// console.log(filePath);

// =============================================================================
// 4- a function that returns the file extension from a given file path
// function getFileExtension(filePath) {
//     return path.extname(filePath);
// }
// const fileExtension = getFileExtension("/docs/readme.md");
// console.log(fileExtension);

// =============================================================================
// 5- a function that parses a given path and returns its name and ext.
// function parsePath(filePath) {
//     return path.parse(filePath);
// }
// const parsedPath = parsePath("/home/app/main.js");
// console.log(parsedPath);

// =============================================================================
// 6- a function that checks whether a given path is absolute
// function isAbsolutePath(filePath) {
//     return path.isAbsolute(filePath);
// }
// const absoluteCheck = isAbsolutePath("/home/user/file.txt");
// console.log(absoluteCheck);

// =============================================================================
// 7- a function that joins multiple segments
// function joinMultipleSegments(...segments) {
//     return path.join(...segments);
// }
// const joinedPath = joinMultipleSegments("/src", "components", "App.js");
// console.log(joinedPath);

// =============================================================================
// 8- a function that resolves a relative path to an absolute one
// function resolveRelativePath(relativePath) {
//     return path.resolve(relativePath);
// }
// const absolutePath = resolveRelativePath("./index.js");
// console.log(absolutePath);

// =============================================================================
// 9- a function that joins two paths
// function joinPaths(path1, path2) {
//     return path.join(path1, path2);
// }
// const joinedPath = joinPaths("/folder1", "folder2/file.txt");
// console.log(joinedPath);

// =============================================================================
// 10- a function that deletes a file asynchronously.
// function removeFileAsynchronously() {
//     fs.rm("delete.txt", (err) => {
//         if (err) {
//             console.log(`Something went wrong -> ${err}`);
//             return;
//         }
//         console.log("File deleted successfully");
//     });
// }
// removeFileAsynchronously();

// Another Solution:
// function removeFileAsynchronously() {
//     fs.unlink("delete.txt", (err) => {
//         if (err) {
//             console.log(`Something went wrong -> ${err}`);
//             return;
//         }
//         console.log("File deleted successfully");
//     });
// }
// removeFileAsynchronously();

// =============================================================================
// 11- a function that creates a folder synchronously
// function createFolderSynchronously() {
//     fs.mkdirSync("New Folder", (err) => {
//         if (err) {
//             console.log(`Something went wrong => ${err}`);
//             return;
//         }
//         console.log("Success");
//     });
// }

// createFolderSynchronously();

// =============================================================================
// 12- an event emitter listens for a "start" event and logs a welcome message
// emitter.on("start", () => console.log("Welcome event triggered!"));
// emitter.emit("start");

// =============================================================================
// 13- a custom "login" event with a username parameter
// emitter.on("login", (name) => {
//     console.log(`User logged in: ${name}`);
// });

// emitter.emit("login", "Kerolos");

// =============================================================================
// 14- Read a file synchronously and log its contents
// try {
//     const readFile = fs.readFileSync("notes.txt", "utf-8");
//     console.log(readFile);
// } catch (err) {
//     console.log(err);
// }

// =============================================================================
// 15- Write asynchronously to a file
// fs.writeFile("async.txt", "Async save", (err) => {
//     if (err) {
//         console.log(`Something went wrong => ${err}`);
//         return;
//     }
//     console.log("Content written to the file successfully");
// })

// =============================================================================
// 16- Check if a directory exists
// const exist = fs.existsSync("./notes.txt");
// console.log(exist);

// Another Solution (using access method):
// fs.access("./notes.txt", fs.constants.F_OK, (err) => {
//     if (err) {
//         console.log("File does not exist");
//         return;
//     }
//     console.log("File exists");
// });

// =============================================================================
// 17- a function that returns the OS platform and CPU architecture
// function getOSInfo() {
//     console.log(`Platform: ${os.platform()}, arch: ${os.arch()}`);
// }
// getOSInfo();

// =============================================================================
// 18- Use a readable stream to read a file in chunks and log each chunk
// const readableStream = fs.createReadStream('big.txt', { encoding: 'utf-8', highWaterMark: 9 });
// readableStream.on('data', (chunk) => console.log(chunk));
// readableStream.on('end', () => console.log('Done!'));

// =============================================================================
// 19- Use readable and writable streams to copy content from one file to another
// /* Duplex-Stream */
// const readStream = fs.createReadStream('source.txt', { encoding: 'utf-8' });
// console.log(readStream.on('data', (chunk) => console.log(chunk)));
// const writeStream = fs.createWriteStream('dest.txt', { encoding: 'utf-8' });
// readStream.pipe(writeStream);
// /* OR */
// stream.pipeline(readStream, writeStream, (err) => {
//     if (err) {
//         console.log('Pipeline failed.', err);
//         return;
//     }
//     console.log('Pipeline succeeded.');
// });

// =============================================================================
// 20- Create a pipeline that reads a file, compresses it, and writes it to another file.
// /* Transform-Stream | Compressing */
// const readCompressStream = fs.createReadStream('data.txt');
// const writeCompressStream = fs.createWriteStream('data.gz');
// const gzip = zlib.createGzip();

// stream.pipeline(readCompressStream, gzip, writeCompressStream, (err) => {
//     if (err) {
//         console.error('Pipeline failed:', err);
//     } else {
//         console.log('Pipeline succeeded');
//     }
// });
// ==============================================================================
// ------------------------------- PART TWO ------------------------------------
// ==============================================================================
// CRUD APIS
const port = 3003
const server = http.createServer((req, res) => {
    const { url, method } = req;
    // /* GET /user - Retrieve all users */
    if (method === "GET" && (url === "/" || url === "/user")) {
        const users = fs.readFileSync('users.json', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(users);
    }
    // /* POST /user - Create a new user */
    else if (method === "POST" && url === "/user") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            try {
                const user = JSON.parse(body);
                const users = JSON.parse(
                    fs.readFileSync("users.json", "utf-8")
                );
                user.id =
                    users.length > 0
                        ? Math.max(...users.map((user) => user.id)) + 1
                        : 1;
                users.push(user);
                fs.writeFileSync(
                    "users.json",
                    JSON.stringify(users, null, 2)
                );
                res.writeHead(201, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify(user));
            } catch (error) {
                res.writeHead(400, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    message: "Invalid JSON data"
                }));
            }
        });
    }
    // /* PATCH /user/:id - Update a user by ID */
    else if (method === "PATCH" && url.startsWith("/user/")) {
        const id = Number(url.split("/")[2]);
        if (Number.isNaN(id)) {
            res.writeHead(400, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify({
                message: "Invalid user ID"
            }));
            return;
        }
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            try {
                const updatedData = JSON.parse(body);
                const users = JSON.parse(
                    fs.readFileSync("users.json", "utf-8")
                );
                const userIndex = users.findIndex(
                    (user) => user.id === id
                );
                if (userIndex === -1) {
                    res.writeHead(404, {
                        "Content-Type": "application/json"
                    });
                    res.end(JSON.stringify({
                        message: "User not found"
                    }));
                    return;
                }
                users[userIndex] = {
                    ...users[userIndex],
                    ...updatedData,
                    id: users[userIndex].id
                };
                fs.writeFileSync(
                    "users.json",
                    JSON.stringify(users, null, 2)
                );
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify(users[userIndex]));
            } catch (error) {
                res.writeHead(400, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    message: "Invalid JSON data"
                }));
            }
        });
    }
    // /* DELETE /user/:id - Delete a user by ID */
    else if (method === "DELETE" && url.startsWith("/user/")) {
        const id = Number(url.split("/")[2]);
        const users = JSON.parse(
            fs.readFileSync("users.json", "utf-8")
        );
        const userIndex = users.findIndex(
            (user) => user.id === id
        );
        if (userIndex === -1) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify({
                message: "User not found"
            }));
            return;
        }
        const deletedUser = users.splice(userIndex, 1)[0];
        fs.writeFileSync(
            "users.json",
            JSON.stringify(users, null, 2)
        );
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify(deletedUser));
    }
    // /* GET /user/:id - Retrieve a user by ID */
    else if (method === "GET" && url.startsWith("/user/")) {
        const id = Number(url.split("/")[2]);
        const users = JSON.parse(
            fs.readFileSync("users.json", "utf-8")
        );
        const user = users.find((user) => user.id === id);
        if (!user) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify({
                message: "User not found"
            }));
            return;
        }
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify(user));
    }
}).listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
