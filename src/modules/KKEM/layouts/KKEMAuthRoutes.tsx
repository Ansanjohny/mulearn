import { useSearchParams } from "react-router-dom";
import KKEMAuth from "../modules/Auth";
import Landing from "../modules/Landing";
import MulearnBrand from "../../Dashboard/assets/MulearnBrand";
import styles from "./KKEMAuthRoutes.module.css";
export default function KKEMAuthRoutes() {
    const [searchParams] = useSearchParams();
    const dwms_id = searchParams.get("dwms_id");
    const muid = searchParams.get("mu_id");

    return (
        <div className={styles.container}>
            <MulearnBrand />
            {(() => {
                if (muid) {
                    return <Landing />;
                } else if (dwms_id) {
                    return <KKEMAuth dwmsId={dwms_id} />;
                } else {
                    return <Landing />;
                }
            })()}
        </div>
    );
}
