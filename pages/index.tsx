import { Index } from "@/app/Components/Index/Idex";
import { withLayout } from "@/app/Layout/Layout";

function IndexPage({ }: IIndexPage): JSX.Element {
    return (
        <Index />
    );
};

export default withLayout(IndexPage);

export interface IIndexPage extends Record<string, unknown> {

};
