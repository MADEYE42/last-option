import { create } from "zustand";
interface User{
    fullName:string;
    setfullName:(fullName:string)=>void;
}
export const useUser = create<User>((set)=>({
    fullName:'',
    setfullName:(name:string)=>set({fullName:name}),
}));
export default useUser