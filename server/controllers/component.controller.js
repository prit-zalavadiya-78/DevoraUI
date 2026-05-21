import Component from "../models/component.model.js";
import User from "../models/user.model.js";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const saveComponent = async (req, res) => {
    try {
        const {name, code, props} = req.body;
        
        const user = await User.findById(req.userID);
        
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        if(user.role === "admin"){
            const existingComponent = await Component.findOne({name});
            if(existingComponent){
                // console.log(existingComponent);
                return res.status(400).json({message: "Component already exists"});
            }
        }
        else{
            const existingComponent = await Component.findOne({name, ownerId: req.userID});
            if(existingComponent){
                return res.status(400).json({message: "Component already exists"});
            }
        }

        const component = await Component.create({name, code, props, ownerId: req.userID});
        
        return res.status(200).json({message: "Component created successfully", component});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

const publishComponent = async (req, res) => {
    try {
        const user = await User.findById(req.userID);
        
        if(!user || user.role === "user"){
            return res.status(403).json({ message: "Forbidden" });
        }

        const {componentId} = req.body;
        if(!componentId){
            return res.status(400).json({message: "Component ID is required"});
        }

        const component = await Component.findById(componentId);
        if(!component){
            return res.status(404).json({message: "Component not found"});
        }

        if(component.ownerId.toString() !== req.userID.toString()){
            return res.status(403).json({message: "Forbidden"});
        }

        const libPath = path.join(process.cwd(), "../lib");

        const componentDir = path.join(libPath, "src/components", component.name);

        const componentFile = path.join(componentDir, `${component.name}.jsx`);

        const indexFile = path.join(libPath, "src/index.js");

        if(!fs.existsSync(componentDir)){
            fs.mkdirSync(componentDir, {recursive: true});
        }

        fs.writeFileSync(componentFile, component.code);

        let indexContent = fs.readFileSync(indexFile, "utf8");
        const exportStatement = `export { ${component.name} } from "./components/${component.name}/${component.name}.jsx";`;
        
        if(!indexContent.includes(exportStatement)){
            fs.appendFileSync(indexFile, '\n' + exportStatement + '\n');
        }

        const distPath = path.join(libPath, "dist");
        if(fs.existsSync(distPath)){
            fs.rmSync(distPath, {recursive: true, force: true});
        }
        
        execSync("npm version patch --no-git-tag-version", {cwd: libPath, stdio: "inherit"});
        
        execSync("npm run build", {cwd: libPath, stdio: "inherit"});

        execSync("npm publish --access public", {cwd: libPath, stdio: "inherit"});

        component.visibility = "public";
        component.npmPackageName = "devora-ui";

        await component.save();

        return res.status(200).json({message: "Component published successfully"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

const getAllComponents = async (req, res) => {
    try {
        const components = await Component.find().populate("ownerId", "name, email").sort({createdAt: -1});

        if(!components) {
            return res.status(404).json({message: "Components not found"});
        }

        return res.status(200).json(components);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export { saveComponent, publishComponent, getAllComponents };