export default ({ params }: { params: { product: string } }) => {
    return <div>{params.product}</div>;
};
