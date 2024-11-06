import PorosiaDetajet from "components/Porosia/PorosiaDetajet"
import { useParams } from "react-router-dom"
import SideNav from "pages/Home/SideNav/SideNav";
import Footer from "pages/Home/Footer";
import "./Fatura.css";
import BreadcrumbComponent from "../../components/Additional/BreadcrumbComponent";


export default function Fatura (){
    const { porosiaID } = useParams();
  
    return(
        <div className="fatura-page-body"> 
          <SideNav />
            <div className="fatura-content">
            <div className="BreadcrumbContainer" style={{paddingTop:"20px"}}>
                <BreadcrumbComponent
                  path={[
                    {
                        pageType:"orders",
                        emri:"My Orders",
                    }
                    ,
                    {
                      pageType: "fatura",
                      emri: "Fatura",
                      id: [porosiaID],
                    },
                  ]}
                />
              </div>
            <div>
              <div style={{width:"fitContent"}}>
                <PorosiaDetajet 
                    porosiaId = {porosiaID}
                />
             
              </div> 
            {/* <div className="download-faturen-container">
               <Button onClick={handleDownloadReceipt} className="download-faturen">
                  Download Receipt
                  <FontAwesomeIcon 
                    icon={faDownload}
                  />
                </Button>
              </div>  */}
            </div>
            </div>
          <Footer/>
        {/* <div>
            <PorosiaDetajet 
                porosiaId = {porosiaID}
            />
        </div> */}
    </div>
    )
}