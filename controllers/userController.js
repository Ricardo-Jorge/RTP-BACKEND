const models = require("../models/index");
const User = models.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Criação User
const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, isPremium } = req.body;

    // 1. Validação básica dos campos
    if ((!name, !email || !password || !confirmPassword)) {
      return res
        .status(400)
        .json({ errors: "E-mail e Senha são obrigatórios." });
    }

    // Validação de formato de email (exemplo simples)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ errors: "Formato de E-mail inválido." });
    }

    // Validação da senha
    if (password.length < 6) {
      return res
        .status(400)
        .json({ errors: "A senha deve ter pelo menos 6 caracteres." });
    }

    // Validação da confirmação da senha
    if (confirmPassword !== password) {
      return res.status(400).json({ errors: "Confirmação de senha inválida" });
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ errors: "Usuário já existe" });
    }

    // 3. Criptografar a senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Criar o usuário
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      is_premium: isPremium || false,
    });

    // Remover a senha do objeto retornado
    const { password: _, ...userWithoutPassword } = newUser.dataValues;

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      user: userWithoutPassword,
      token: generateToken(newUser.id),
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ errors: "Erro ao criar usuário", error });
  }
};

// Sign user in
const login = async (req, res) => {
  try {
    // Busca email e a senha da requisição do usuário
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ errors: "E-mail e Senha são obrigatórios." });
    }
    // Buscamos um usuário representado por esse email no DB e atribuimos a uma variavel user
    const user = await User.findOne({ where: { email } });

    // Verificação se usuario existe
    if (!user) {
      return res.status(404).json({ errors: ["Usuário não encontrado."] });
    }

    // Verificação se as senhas batem
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(422).json({ errors: ["Senha inválida."] });
    }

    // Retorna user com token
    res.status(201).json({
      id: user.id,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errors: "Erro ao realizar Login, tente novamente mais tarde." });
  }
};

// Get currently logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;

  // Removendo a senha do objeto retornado (se necessário)
  const { password: _, ...userWithoutPassword } = user.dataValues;

  res.status(200).json({ user: userWithoutPassword });
};

// Update user
const update = async (req, res) => {
  try {
    const { name, password, confirmPassword } = req.body;
    const reqUser = req.user;

    const user = await User.findByPk(reqUser.id);
    if (!user) {
      return res.status(404).json({ errors: "Usuário não encontrado." });
    }

    // Se o usuário fizer uma requisição de alterção de nome, aqui determinamos que name(do model de user) sera atualizado.
    if (name) {
      user.name = name;
    }

    if (password) {
      // Validação da confirmação da senha
      if (!confirmPassword) {
        return res
          .status(400)
          .json({ errors: "É necessário confirmar a senha." });
      } else if (confirmPassword !== password) {
        return res
          .status(400)
          .json({ errors: "Confirmação de senha inválida" });
      }

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      user.password = passwordHash;
    }

    await user.save();
    // Removendo a senha do objeto retornado (se necessário)
    const { password: _, ...userWithoutPassword } = user.dataValues;

    res.status(200).json({
      message: "Usuário atualizado com sucesso.",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ errors: "Erro ao atualizar usuário", error });
  }
};

module.exports = { register, login, getCurrentUser, update };
