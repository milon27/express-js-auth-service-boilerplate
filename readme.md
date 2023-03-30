# Auth Micro Service

## How to run

-   make sure you have [docker](https://www.docker.com/products/docker-desktop/) and [pnpm](https://pnpm.io/) install on your system as node package manager
-   run database on docker(you should have docker install on your machine)

    -   run `bash .script/reload.local.sh`

-   install all dependencies and run the app

    ```bash

    pnpm i
    # rename .env.local to .env then update db connection string (DATABASE_URL) if needed
    npx prisma migrate deploy
    npx prisma generate

    # reload / reopen vscode to restart TS server
    npm run dev # auth api will run on port 4000
    # health check: http://localhost:4000/api/auth/
    ```

## How to push code

-   setup husky Git hooks `npx husky install` it will generate a husky.sh file in `.husky/_` folder
-   create new branch `git checkout -b feature-branch`
-   add files `git add .`
-   commit files `git commit -m 'message'` [here husky wil check the linting, it will thorw error and stop commit if there is any linting error, it will ignore warning]
-   push code `git push origin feature-branch`
-   always create Pull Requst on `dev` branch

## API endpoints

-   BASE url: http://localhost:4000/api/auth
-   Swegger Doc url: http://localhost:4000/api/auth/api-list
-   in `.doc` folder a postman json file `postman_collection.json` is available import it on your postman

## Developer guide

-   **Set up vscode**
    -   Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extention on vscode, then select default formatter to prettier insted of none
    -   Install [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extention
    -   Install [prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) vscode extension
-   **Folder Struture**
    -   All folder name must be singular, e.g. `/login` not `/logins`
    -   Each feature will have a module inside `module` folder
    -   e.g. `user module` folder structure
        -   `/user`
            -   `-> user.router.ts`
            -   `-> user.controller.ts`
            -   `-> user.service.ts`
            -   `-> dto/user.dto.ts`
            -   `-> interface/user.interface.ts`
-   **File Name Convention (all lower case,separated by -)**
    -   All file name must be singular, e.g. `user.router.ts` not `users.router.ts`
    -   Some other file names
        -   app.router.ts | my-app.router.ts
        -   app.controller.ts | my-app.controller.ts
        -   app.service.ts | my-app.service.ts
        -   create-user.dto.ts
        -   jwt-user.interface.ts
        -   anything.someting.ts
-   **Class, interface and Function name convention**
    -   Class: `class MyClass{}` (mostly we will use functional programing, so try to ignore class)
    -   Interface: `interface IMyInterface{}` should start with capital `I`
    -   Function: `function myFunction(){}` should be in camelCase
    -   Variable name: `const aName=""` should be in camelCase
    -   Object name: `const UserService={}` should be in PascalCase
    -   Router Name: `const UserRouter = Router()`
    -   Controller Name: `const UserController = {}`
    -   DTO Name: `const CreateUserDto = Joi.object()`

### TODO

-   setup redis to store token
-   setup swegger for api doc, also maintain postman
-   file upload to s3
-   login with google

@author
[milon27.com](https://milon27.com)
