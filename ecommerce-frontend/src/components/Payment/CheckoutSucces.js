import { useLocation } from "react-router-dom";
import SideNav from "../../pages/Home/SideNav/SideNav";
import Footer from "../../pages/Home/Footer";
import "./Style/CheckoutSuccess.css";
import PorosiaDetajet from "../Porosia/PorosiaDetajet";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function CheckoutSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { porosiaVendosurId } = location.state || {};

  useEffect(() => {
    if (!porosiaVendosurId) {
      navigate("/error");
    }
  }, [porosiaVendosurId]);

  // const handleDownloadReceipt = () => {
  //   // const receiptNode = receiptRef.current;
  //   const receiptNode = document.querySelector('.receipt-page');

  //   toPng(receiptNode)
  //     .then((dataUrl) => {
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       const imgWidth = 150; // Desired width in the PDF (in mm)
  //       const pageWidth = pdf.internal.pageSize.getWidth(); // Page width in mm
  //       const imgHeight = (receiptNode.clientHeight * imgWidth) / receiptNode.clientWidth; // Maintain aspect ratio

  //       // Center the image on the page if needed
  //       const xOffset = (pageWidth - imgWidth) / 2;

  //       pdf.addImage(dataUrl, 'PNG', xOffset, 20, imgWidth, imgHeight);
  //       pdf.save('receipt.pdf');
  //     })
  //     .catch((error) => {
  //       console.error('Failed to generate receipt image:', error);
  //     });
  // };

  return (
    <div className="checkout-success-body">
      {porosiaVendosurId && (
        <>
          <SideNav />
          <div className="checkout-success-content">
            <div className="checkout-success-top" style={{backgroundColor:"#f2f2f2"}}>
              <p>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{marginRight:"15px"}}
                />
                Porosia juaj eshte vendosur me sukses !! Ja qfare keni porositur
                :{" "}
              </p>
              <p className="porosite-link">
                Per me shume detaje rreth porosise, kliko{" "}
                <Link to="/MyOrder">ketu</Link>
              </p>
            </div>
            <div>
              <div style={{ width: "fitContent" }}>
                <PorosiaDetajet porosiaId={porosiaVendosurId} />
              </div>
              {/* <div className="download-faturen-container">
                <Button onClick={handleDownloadReceipt} className="download-faturen">
                  Download Receipt
                  <FontAwesomeIcon 
                    icon={faDownload}
                  />
                </Button>
              </div> */}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
