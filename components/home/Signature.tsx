import { FeaturedProducts } from "@/app/dashboard/featured/page";
import { Card } from "../reusable/Card";

type SignatureProps = {
    products: FeaturedProducts[]
}

const Signature = ({products}:SignatureProps) => {
    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full px-8 lg:px-48">
                {products.length > 0 && products.map((p,index) => (
                    <div  key={p.id} className="w-full md:w-1/3">
                        <Card>
                            <img src={p.url} alt={p.name} className="w-full lg:h-80 h-60 object-cover rounded-lg"/>
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