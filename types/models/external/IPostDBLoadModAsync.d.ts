import { DependencyContainer } from "./tsyringe";
export interface IPostDBLoadModAsync {
    postDBLoadAsync(container: DependencyContainer): Promise<void>;
}
