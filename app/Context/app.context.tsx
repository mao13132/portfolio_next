import { PropsWithChildren, createContext } from "react";
import { ICategory } from "../interface/category";
import { IWorks } from "../interface/works";

export interface IAppContext {
    category: ICategory[],
    slug?: string,
    current_category?: ICategory,
    works?: IWorks[],
    work?: IWorks,
}

export const AppContext = createContext<IAppContext>({
    category: [],
})


export const AppContextProvider = ({ children, ...props }: PropsWithChildren<IAppContext>): JSX.Element => {

    return <AppContext.Provider value={{ ...props }}>

        {children}

    </AppContext.Provider>

};
