import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.header("authorization").split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decoded;
        if (isCustomAuth && token) {
        decoded = jwt.verify(token, "secretlyouday");
        req.userId = decoded?.id;
        }else{
        decoded = jwt.decode(token);
        req.userId = decoded?.sub;
        }
        next();
    } catch (e) {
        res.status(401).send({ error: "Please authenticate." });
    }
    }

    export default auth;