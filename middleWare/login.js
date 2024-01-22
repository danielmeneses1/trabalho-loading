import  Jwt  from "jsonwebtoken";

const verificarToken = async (req, res, next) => {
    try {
        const tokenHeader = req.headers["authorization"];
        const Token = tokenHeader && tokenHeader.split(" ")[1];

        if (!Token) {
            return res.status(401).json({ message: "Token de autorização não fornecido" });
        }

        await Jwt.verify(Token, "segredo");
        next();

    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
}

export default verificarToken;

