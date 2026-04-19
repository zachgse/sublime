import { Oval } from "react-loader-spinner"

const Loader = () => {
    return (
      <Oval
        height={48}
        width={48}
        color={"#a2784f"}
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={"#a2784f"}
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    )
}

export default Loader;