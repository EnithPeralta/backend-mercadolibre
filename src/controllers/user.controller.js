import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';


export const addUser = async (req, res) => {
    try {
        await User.validate(req.body);
        const hashedpassword = await bcrypt.hash(req.body.password,10);
        const newuser = new User({...req.body,password:hashedpassword});
        const user = await newuser.save();
        res.json(user);
    } catch (error) {
        console.log("Error add the user", error);
    }
}

export const viewUser = async(req, res)=>{
    try {
        const data = await User.find({})
        res.json(data)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const viewUserId = async(req, res)=>{
    const {id} = req.params;
    try {
        const data = await User.findById(id)
        if(!data){
            return res.status(404).json({message:"User not found"})
        }
        res.json(data)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const deleteUserId = async(req, res)=>{
    const {id} = req.params;
    try {
        const data = await User.deleteOne({_id:id});
        if(data.deletedCount === 0){
            return res.status(404).json({message:"User not found"})
        }
        res.json({message: "User successfully deleted", data})  
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const putUser = async (req, res) => {
  const { cedula, nombre, telefono, direccion, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    existingUser.cedula = cedula;
    existingUser.nombre = nombre;
    existingUser.telefono = telefono;
    existingUser.direccion = direccion;
    existingUser.email = email;
    existingUser.password = password;

    await existingUser.save();

    res.status(200).json({
      message: 'User successfully updated',
      user: existingUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};


// export const newUser = async (req,res)=>{
//     const { cedula, nombre, telefono, direccion, email,password } = req.body;
//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }
//         const newUser = new User({
//             cedula,
//             nombre,
//             telefono,
//             direccion,
//             email,
//             password  
//         });
//         await newUser.save();
//         res.status(201).json({ message: 'User added successfully', user: newUser });
//     } catch (error) {
        
//     }
// }

