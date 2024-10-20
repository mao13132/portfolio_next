import { PropsWithChildren, createContext } from "react";
import { ICategory } from "../interface/category";

export interface IAppContext {
    category: ICategory[]
}

export const AppContext = createContext<IAppContext>({
    category: [],
})


export const AppContextProvider = ({ children, ...props }: PropsWithChildren<IAppContext>): JSX.Element => {

    return <AppContext.Provider value={{...props}}>

        {children}
        
    </AppContext.Provider>

};
