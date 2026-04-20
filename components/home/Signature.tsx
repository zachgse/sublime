import { FeaturedProducts } from "@/app/dashboard/featured/page";
import { Card } from "../reusable/Card";

type SignatureProps = {
    products: FeaturedProducts[]
}

const Signature = ({products}:SignatureProps) => {
    return (
        <>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full px-4 lg:px-40">
                {products.length > 0 && products.map((p,index) => (
                    <div  key={p.id} className="w-full lg:w-1/3">
                        <Card>
                            <img src={p.url} alt={p.name} className="w-full lg:h-96 h-60 object-fit rounded-lg"/>
                            <div className="flex flex-col items-center gap-2 p-2">
                                <p className="text-secondary text-xl font-bold">{p.name}</p>
                                <hr className="text-[#f2ede3] w-full"/>
                                {p.description}
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Signature;